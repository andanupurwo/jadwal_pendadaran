
import pool from '../config/database.js';
import { generateSchedule } from '../controllers/scheduleController.js';

async function runStressTest() {
    console.log('🚀 Starting Backend Stress Test...');

    const client = await pool.connect();

    try {
        // 1. Get existing Dosen to assign as Pembimbing
        const { rows: dosenList } = await client.query('SELECT nama, prodi FROM dosen WHERE excluded = FALSE');
        if (dosenList.length === 0) {
            console.error('❌ No active dosen found. Cannot run stress test.');
            process.exit(1);
        }

        const prodis = [...new Set(dosenList.map(d => d.prodi).filter(Boolean))];
        console.log(`ℹ️ Found ${dosenList.length} dosen across ${prodis.length} prodis.`);

        // 2. Generate 500 Dummy Mahasiswa
        console.log('📦 Generating 500 dummy students...');
        const testStudents = [];
        for (let i = 1; i <= 500; i++) {
            const prodi = prodis[Math.floor(Math.random() * prodis.length)];
            const lecturersFromProdi = dosenList.filter(d => d.prodi === prodi);
            const pembimbing = lecturersFromProdi.length > 0
                ? lecturersFromProdi[Math.floor(Math.random() * lecturersFromProdi.length)].nama
                : dosenList[Math.floor(Math.random() * dosenList.length)].nama;

            testStudents.push({
                nim: `STRESS_TEST_${10000 + i}`,
                nama: `Student StressTest ${i}`,
                prodi,
                pembimbing
            });
        }

        // 3. Bulk Insert
        await client.query('BEGIN');
        console.log('📥 Inserting students to database...');

        for (const s of testStudents) {
            await client.query(
                `INSERT INTO mahasiswa (nim, nama, prodi, pembimbing) 
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (nim) DO NOTHING`,
                [s.nim, s.nama, s.prodi, s.pembimbing]
            );
        }
        await client.query('COMMIT');
        console.log('✅ Inserted 500 students.');


        // 3a. Generate 100 Random Libur Entries (Dosen Unavailability)
        console.log('🏖️ Generating 100 dummy libur entries for dosen...');
        const DATES_VALUES = ['2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20'];
        const testLibur = [];

        for (let i = 0; i < 100; i++) {
            const randomDosen = dosenList[Math.floor(Math.random() * dosenList.length)];
            // Fetch the NIK for this dosen (need to query it or assume we have it)
            // Wait, dosenList earlier only selected nama, prodi. We need NIK. 
            // Let's refetch dosen list with NIK.
        }

        // Refetch Dosen with NIK
        const { rows: dosenListFull } = await client.query('SELECT nik, nama, prodi FROM dosen WHERE excluded = FALSE');

        for (let i = 0; i < 100; i++) {
            const randomDosen = dosenListFull[Math.floor(Math.random() * dosenListFull.length)];
            const randomDate = DATES_VALUES[Math.floor(Math.random() * DATES_VALUES.length)];

            testLibur.push({
                date: randomDate,
                reason: 'STRESS_TEST_LIBUR',
                nik: randomDosen.nik
            });
        }

        console.log('📥 Inserting libur entries...');
        for (const l of testLibur) {
            await client.query(
                `INSERT INTO libur (date, reason, nik) 
                 VALUES ($1, $2, $3)`,
                [l.date, l.reason, l.nik]
            );
        }
        console.log('✅ Inserted 100 libur entries.');

        // 4. Run Scheduling Engine
        console.log('⚙️ Running Scheduling Engine...');
        const startTime = performance.now();


        // Mock Req and Res
        const req = {
            body: {
                targetProdi: 'all',
                isIncremental: false // RESET mode
            }
        };

        const res = {
            json: (data) => {
                const endTime = performance.now();
                const duration = ((endTime - startTime) / 1000).toFixed(2);

                console.log('\n📊 STRESS TEST RESULTS:');
                console.log('-----------------------');
                console.log(`⏱️ Duration: ${duration} seconds`);
                console.log(`✅ Scheduled: ${data.scheduled} / ${data.total}`);
                console.log(`🚀 Speed: ${(data.scheduled / duration).toFixed(1)} students/sec`);
                if (data.error) console.error('❌ Error:', data.error);
            },
            status: (code) => {
                return {
                    json: (data) => console.error(`❌ Error ${code}:`, data)
                };
            }
        };

        await generateSchedule(req, res);

        // 5. Cleanup
        console.log('\n🧹 Cleaning up test data...');
        // Delete slots for test students
        await client.query("DELETE FROM slot_examiners WHERE slot_id IN (SELECT id FROM slots WHERE mahasiswa_nim LIKE 'STRESS_TEST_%')");
        await client.query("DELETE FROM slots WHERE mahasiswa_nim LIKE 'STRESS_TEST_%'");
        // Delete test students
        await client.query("DELETE FROM mahasiswa WHERE nim LIKE 'STRESS_TEST_%'");
        // Delete test libur
        await client.query("DELETE FROM libur WHERE reason = 'STRESS_TEST_LIBUR'");

        console.log('✅ Cleanup complete.');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Stress test failed:', error);
    } finally {
        client.release();
        pool.end();
    }
}

runStressTest();
