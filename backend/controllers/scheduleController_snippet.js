
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
