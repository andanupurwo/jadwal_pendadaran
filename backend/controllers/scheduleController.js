import pool from '../config/database.js';



// Helper functions
function normalizeName(nama) {
    return nama?.toLowerCase().trim() || '';
}

async function getAllDosen() {
    // Select lecturers who are NOT excluded (ON)
    const { rows } = await pool.query('SELECT * FROM dosen WHERE exclude = FALSE');
    return rows.map(d => ({
        id: d.id,
        nik: d.nik,
        nama: d.nama,
        prodi: d.prodi,
        fakultas: d.fakultas,
        exclude: false
    }));
}

async function isDosenAvailable(namaDosen, date, time, allDosen, liburData, slotsData, excludeSlotStudent = null, ignoreGlobalExclude = false) {
    const searchNameNorm = normalizeName(namaDosen);
    const dosenData = allDosen.find(d => normalizeName(d.nama) === searchNameNorm);

    // DEBUG KHUSUS UNTUK AMIR
    const isAmir = searchNameNorm.includes('amir');
    if (isAmir) {
        // console.log(`[DEBUG AMIR] Checking ${namaDosen} for ${date} ${time}`);
        if (!dosenData) console.log(`[DEBUG AMIR] ⚠️ Dosen data NOT FOUND for ${namaDosen}`);
        else console.log(`[DEBUG AMIR] Found NIK: ${dosenData.nik}`);
    }

    if (!dosenData) {
        // console.warn(`[Availability] Data dosen tidak ditemukan untuk nama: ${namaDosen}`);
    }

    // 1. Check manual 'OFF' toggle
    if (!ignoreGlobalExclude && dosenData && dosenData.exclude) return false;

    // 2. Check Libur/Unavailability Rules
    const isLibur = liburData.some(l => {
        // Match by NIK if available (more accurate), otherwise by Name
        const matchId = (dosenData && l.nik && String(l.nik) === String(dosenData.nik));
        const matchNama = normalizeName(l.nama || "") === searchNameNorm;

        if (!matchId && !matchNama) return false;

        // DEBUG AMIR
        if (isAmir) {
            console.log(`[DEBUG AMIR] Rule found: Date=${l.date}, Time=${l.time}. MatchId=${matchId}, MatchNama=${matchNama}`);
        }

        // Condition A: Block specific date AND specific time
        if (l.date && l.time) {
            const hit = String(l.date) === String(date) && String(l.time) === String(time);
            if (isAmir && hit) console.log(`[DEBUG AMIR] 🛑 BLOCKED by Condition A (Specific D&T)`);
            return hit;
        }

        // Condition B: Block specific date (all times)
        if (l.date && !l.time) {
            const hit = String(l.date) === String(date);
            if (isAmir && hit) console.log(`[DEBUG AMIR] 🛑 BLOCKED by Condition B (Date Only)`);
            return hit;
        }

        // Condition C: Block specific time (all dates)
        if (!l.date && l.time) {
            const hit = l.time === time;
            if (isAmir && hit) console.log(`[DEBUG AMIR] 🛑 BLOCKED by Condition C (Time Only, All Dates)`);
            return hit;
        }

        // Condition D: Block absolutely everything (no date, no time specified)
        if (!l.date && !l.time) {
            if (isAmir) console.log(`[DEBUG AMIR] 🛑 BLOCKED by Condition D (Total Block)`);
            return true;
        }

        return false;
    });

    if (isLibur) return false;

    // 3. Check for busy conflicts (already scheduled)
    const busy = slotsData.some(slot => {
        if (excludeSlotStudent && slot.student === excludeSlotStudent) return false;
        if (slot.date !== date || slot.time !== time) return false;

        // Check Pembimbing (student's supervisor) being busy
        // IMPORTANT: We need check if 'namaDosen' IS the supervisor of 'slot.student'
        // But slotsData structure doesn't keep supervisor NIK, only 'examiners' array.
        // Wait, the current check is checks if 'namaDosen' is in 'examiners'.
        // But if 'namaDosen' is the SUPERVISOR of a scheduled slot, they are effectively busy too!

        // HOWEVER, in generateSchedule, we put supervisor into 'examiners' array (at the end).
        // See: const final = [...examiners, mhs.pembimbing]; 
        // So checking slot.examiners IS enough.

        const isBusy = slot.examiners && slot.examiners.some(ex => normalizeName(ex) === searchNameNorm);
        if (isAmir && isBusy) console.log(`[DEBUG AMIR] 📅 BUSY at ${slot.date} ${slot.time} with ${slot.student}`);
        return isBusy;
    });

    return !busy;
}

/**
 * Generate schedule endpoint
 * This is the core scheduling engine that allocates exam slots
 */
export async function generateSchedule(req, res) {
    const client = await pool.connect();

    try {
        let { targetProdi = 'all', isIncremental = false } = req.body;

        const logs = [];
        const log = (message) => {
            const time = new Date().toLocaleTimeString();
            logs.push(`[${time}] ${message}`);
            console.log(message);
        };

        log("🚀 MEMULAI PROSES PENJADWALAN OTOMATIS (POSTGRES)...");
        log(`⚙️ Mode: ${isIncremental ? 'INCREMENTAL' : 'RESET FULL'}`);
        log(`🎯 Target: ${targetProdi}`);

        await client.query('BEGIN');

        // 1. Fetch Dynamic Settings
        const settingsRes = await client.query('SELECT * FROM app_settings');
        const settings = settingsRes.rows.reduce((acc, row) => {
            try { acc[row.setting_key] = JSON.parse(row.setting_value); } catch { acc[row.setting_key] = row.setting_value; }
            return acc;
        }, {});

        // Fallback defaults if DB is empty
        const ROOMS = settings.schedule_rooms || ['6.3.A'];
        const DISABLED_ROOMS = settings.schedule_disabled_rooms || [];
        const ACTIVE_ROOMS = ROOMS.filter(r => !DISABLED_ROOMS.includes(r));

        const TIMES = settings.schedule_times || ['08:30'];
        const DATES = settings.schedule_dates || [];

        if (DATES.length === 0) {
            log("⚠️ EROR: Tidak ada konfigurasi tanggal di database.");
            await client.query('ROLLBACK');
            return res.status(400).json({ success: false, error: 'Konfigurasi tanggal belum diatur.' });
        }

        // Load data
        let { rows: mahasiswaList } = await client.query('SELECT * FROM mahasiswa ORDER BY nim');

        // Filter by target student if specified (Single Student Scheduling Mode)
        const { targetStudent } = req.body;
        if (targetStudent) {
            mahasiswaList = mahasiswaList.filter(m => m.nim === targetStudent);
            isIncremental = true; // Force incremental so existing slots are not wiped
            log(`🎯 ONLY SCHEDULING: ${mahasiswaList[0]?.nama || targetStudent}`);
        } else if (targetProdi !== 'all') {
            mahasiswaList = mahasiswaList.filter(m => m.prodi === targetProdi);
        }

        if (mahasiswaList.length === 0) {
            log("⚠️ Tidak ada mahasiswa yang sesuai filter.");
            await client.query('COMMIT');
            return res.json({ success: true, logs, scheduled: 0, total: 0 });
        }

        // Get current slots
        let { rows: currentSlots } = await client.query('SELECT * FROM slots');
        const { rows: examinerRows } = await client.query('SELECT slot_id, examiner_name FROM slot_examiners ORDER BY slot_id, examiner_order');

        // Map examiners to slots
        const slotExaminersMap = {};
        examinerRows.forEach(row => {
            if (!slotExaminersMap[row.slot_id]) {
                slotExaminersMap[row.slot_id] = [];
            }
            slotExaminersMap[row.slot_id].push(row.examiner_name);
        });

        let slotsData = currentSlots.map(slot => ({
            ...slot,
            examiners: slotExaminersMap[slot.id] || []
        }));

        const scheduledMahasiswaIds = new Set();
        if (isIncremental) {
            slotsData.forEach(s => {
                const m = mahasiswaList.find(x => x.nama === s.student);
                if (m) scheduledMahasiswaIds.add(m.nim);
            });
        } else {
            // Reset mode: delete all slots
            await client.query('DELETE FROM slot_examiners');
            await client.query('DELETE FROM slots');
            slotsData = [];
        }

        const allDosen = await getAllDosen();
        const { rows: liburData } = await client.query('SELECT * FROM libur');

        const examinerCounts = {};
        if (isIncremental || !isIncremental) { // counts for fairness
            slotsData.forEach(slot => {
                slot.examiners.forEach(ex => {
                    examinerCounts[ex] = (examinerCounts[ex] || 0) + 1;
                });
            });
        }

        // Scheduling algorithm
        const findExaminers = async (pembimbing, date, time, studentProdi) => {
            let candidates = [];
            const sProdiNorm = studentProdi?.toLowerCase().trim();
            const pembimbingNorm = pembimbing?.toLowerCase().trim();

            const candidatePool = [...allDosen].sort((a, b) => (examinerCounts[a.nama] || 0) - (examinerCounts[b.nama] || 0));

            for (const d of candidatePool) {
                if (candidates.length >= 2) break;

                const candidateNameNorm = d.nama.toLowerCase().trim();

                // 1. Not the student's supervisor
                if (candidateNameNorm === pembimbingNorm) continue;

                // 2. Not already selected as P1
                if (candidates.some(c => c.toLowerCase().trim() === candidateNameNorm)) continue;

                // 3. STRICT RULE: Candidate must be from the EXACT SAME PRODI as the student
                const dProdiNorm = d.prodi?.toLowerCase().trim();
                if (dProdiNorm !== sProdiNorm) continue;

                // 4. Check availability
                const available = await isDosenAvailable(d.nama, date, time, allDosen, liburData, slotsData);
                if (!available) continue;

                candidates.push(d.nama);
            }
            return candidates.length < 2 ? null : candidates;
        };

        let successCount = 0;
        const newSlotsCreated = [];

        for (const dateObj of DATES) {
            for (const time of TIMES) {
                if (dateObj.label === 'Jumat' && time === '11:30') continue;

                for (const room of ACTIVE_ROOMS) {
                    const slotExists = slotsData.some(s => s.date === dateObj.value && s.time === time && s.room === room);
                    if (slotExists) continue;

                    for (const mhs of mahasiswaList) {
                        if (scheduledMahasiswaIds.has(mhs.nim)) continue;

                        const supervisorAvailable = await isDosenAvailable(mhs.pembimbing, dateObj.value, time, allDosen, liburData, slotsData, null, true);
                        if (!mhs.pembimbing || !supervisorAvailable) continue;

                        const examiners = await findExaminers(mhs.pembimbing, dateObj.value, time, mhs.prodi);
                        if (!examiners) continue;

                        const final = [...examiners, mhs.pembimbing];

                        // Save to database
                        const { rows: insertedSlot } = await client.query(
                            'INSERT INTO slots (date, time, room, student, mahasiswa_nim) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                            [dateObj.value, time, room, mhs.nama, mhs.nim]
                        );

                        const slotId = insertedSlot[0].id;

                        for (let i = 0; i < final.length; i++) {
                            await client.query(
                                'INSERT INTO slot_examiners (slot_id, examiner_name, examiner_order) VALUES ($1, $2, $3)',
                                [slotId, final[i], i]
                            );
                        }

                        const newSlotObj = {
                            date: dateObj.value,
                            time,
                            room,
                            student: mhs.nama,
                            examiners: final
                        };

                        newSlotsCreated.push(newSlotObj);
                        slotsData.push(newSlotObj);

                        scheduledMahasiswaIds.add(mhs.nim);
                        successCount++;
                        final.forEach(ex => { examinerCounts[ex] = (examinerCounts[ex] || 0) + 1; });
                        log(`✅ [${dateObj.value} ${time}] ${mhs.nama}`);

                        break;
                    }
                }
            }
        }

        log(`🏁 Selesai. Terjadwal: ${successCount}/${mahasiswaList.length}`);

        await client.query('COMMIT');

        res.json({
            success: true,
            logs,
            scheduled: successCount,
            total: mahasiswaList.length,
            slots: newSlotsCreated
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error generating schedule:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        client.release();
    }
}

export async function moveSlot(req, res) {
    const client = await pool.connect();
    try {
        const { slotId, newDate, newTime, newRoom } = req.body;

        // 1. Get Target Slot
        const { rows: slotRows } = await client.query('SELECT * FROM slots WHERE id = $1', [slotId]);
        if (slotRows.length === 0) return res.status(404).json({ success: false, error: 'Slot not found' });
        const slot = slotRows[0];

        // 2. Check if new position is occupied
        const { rows: collision } = await client.query(
            'SELECT * FROM slots WHERE date = $1 AND time = $2 AND room = $3 AND id != $4',
            [newDate, newTime, newRoom, slotId]
        );
        if (collision.length > 0) {
            return res.json({ success: false, error: `Ruangan ${newRoom} sudah terisi pada ${newDate} ${newTime}` });
        }

        // 3. Get Data for Validation
        const allDosen = await getAllDosen();
        const { rows: liburData } = await client.query('SELECT * FROM libur');
        const { rows: currentSlots } = await client.query('SELECT * FROM slots');
        const { rows: examinerRows } = await client.query('SELECT slot_id, examiner_name FROM slot_examiners ORDER BY slot_id, examiner_order');

        const slotExaminersMap = {};
        examinerRows.forEach(row => {
            if (!slotExaminersMap[row.slot_id]) slotExaminersMap[row.slot_id] = [];
            slotExaminersMap[row.slot_id].push(row.examiner_name);
        });

        const slotsData = currentSlots.map(s => ({
            ...s,
            examiners: slotExaminersMap[s.id] || []
        }));

        // 4. Validate All Examiners (including Supervisor)
        const myExaminers = slotExaminersMap[slot.id] || [];

        for (const dosenName of myExaminers) {
            const available = await isDosenAvailable(
                dosenName,
                newDate,
                newTime,
                allDosen,
                liburData,
                slotsData,
                slot.student // Exclude this slot from busy check
            );

            if (!available) {
                return res.json({ success: false, error: `Gagal: ${dosenName} tidak tersedia/bentrok.` });
            }
        }

        // 5. Update Slot
        await client.query(
            'UPDATE slots SET date = $1, time = $2, room = $3 WHERE id = $4',
            [newDate, newTime, newRoom, slotId]
        );

        res.json({ success: true, message: 'Jadwal berhasil dipindahkan' });

    } catch (error) {
        console.error('Move Slot Error:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        client.release();
    }
}
