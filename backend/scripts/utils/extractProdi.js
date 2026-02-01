
import pool from '../../config/database.js';

async function extractProdi() {
    try {
        const resFIK = await pool.query("SELECT DISTINCT prodi FROM dosen WHERE fakultas = 'FIK' AND excluded = FALSE ORDER BY prodi");
        const resFES = await pool.query("SELECT DISTINCT prodi FROM dosen WHERE fakultas = 'FES' AND excluded = FALSE ORDER BY prodi");
        const resFST = await pool.query("SELECT DISTINCT prodi FROM dosen WHERE fakultas = 'FST' AND excluded = FALSE ORDER BY prodi");

        console.log('=== PRODI FIK ===');
        resFIK.rows.forEach(r => console.log(`'${r.prodi}'`));

        console.log('\n=== PRODI FES ===');
        resFES.rows.forEach(r => console.log(`'${r.prodi}'`));

        console.log('\n=== PRODI FST ===');
        resFST.rows.forEach(r => console.log(`'${r.prodi}'`));

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

extractProdi();
