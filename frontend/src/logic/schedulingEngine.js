import { APP_DATA, DATES, TIMES, ROOMS } from '../data/store.js';
import { navigate } from '../ui/core/router.js';
import { scheduleAPI, slotsAPI } from '../services/api.js';

export function logToLogic(message) {
    const logEl = document.getElementById('logicLog');
    if (logEl) {
        const time = new Date().toLocaleTimeString();
        logEl.innerHTML += `[${time}] ${message}\n`;
        logEl.scrollTop = logEl.scrollHeight;
    }
    console.log(message);
}

export async function generateSchedule(options = { silent: false }) {
    const logEl = document.getElementById('logicLog');
    if (logEl) logEl.innerHTML = '';

    const scopeEl = document.getElementById('scheduleScope');
    const incrementalEl = document.getElementById('incrementalMode');
    const targetProdi = scopeEl ? scopeEl.value : 'all';
    const isIncremental = incrementalEl ? incrementalEl.checked : false;

    logToLogic("🚀 MEMULAI PROSES PENJADWALAN OTOMATIS...");
    logToLogic(`⚙️ Mode: ${isIncremental ? 'INCREMENTAL' : 'RESET FULL'}`);
    logToLogic(`🎯 Target: ${targetProdi}`);
    logToLogic("📡 Mengirim request ke backend...");

    try {
        // Call backend API to generate schedule
        const response = await scheduleAPI.generate(targetProdi, isIncremental);

        if (response.success) {
            // Display logs from backend
            if (response.logs && response.logs.length > 0) {
                response.logs.forEach(log => logToLogic(log));
            }

            logToLogic(`✅ Penjadwalan selesai!`);
            logToLogic(`📊 Berhasil: ${response.scheduled}/${response.total} mahasiswa`);

            // Reload slots from API to update UI
            const slotsResponse = await slotsAPI.getAll();
            if (slotsResponse.success) {
                APP_DATA.slots = slotsResponse.data;
            }

            if (!options.silent) {
                setTimeout(() => {
                    if (confirm(`Selesai! Terjadwal: ${response.scheduled}/${response.total}\n\nLihat hasil?`)) {
                        navigate('home');
                    }
                }, 300);
            }
        } else {
            logToLogic(`❌ Error: ${response.error}`);
            alert('Gagal generate jadwal: ' + response.error);
        }

    } catch (error) {
        logToLogic(`❌ Error: ${error.message}`);
        console.error('Error generating schedule:', error);
        alert('Gagal terhubung ke backend: ' + error.message);
    }
}
