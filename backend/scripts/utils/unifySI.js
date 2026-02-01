
import pool from '../../config/database.js';

async function unifySI() {
    try {
        console.log('🔄 Merging "Sistem Informasi" into "S1 Sistem Informasi"...');

        // 1. Update Tabel Mahasiswa
        const resMhs = await pool.query("UPDATE mahasiswa SET prodi = 'S1 Sistem Informasi' WHERE prodi = 'Sistem Informasi'");
        console.log(`✅ Mahasiswa updated: ${resMhs.rowCount}`);

        // 2. Update Tabel Dosen
        const resDosen = await pool.query("UPDATE dosen SET prodi = 'S1 Sistem Informasi' WHERE prodi = 'Sistem Informasi'");
        console.log(`✅ Dosen updated: ${resDosen.rowCount}`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

unifySI();

