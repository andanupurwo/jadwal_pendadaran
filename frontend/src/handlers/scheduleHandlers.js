import { APP_DATA } from '../data/store.js';
import { generateSchedule } from '../logic/schedulingEngine.js';
import { navigate } from '../ui/core/router.js';

/**
 * Schedule individual student by NIM
 * This will trigger the scheduling engine to schedule only this specific student
 */
export async function scheduleIndividualStudent(nim) {
    const student = APP_DATA.mahasiswa.find(m => m.nim === nim);

    if (!student) {
        showToast('Mahasiswa tidak ditemukan!', 'error');
        return;
    }

    if (!confirm(`Jadwalkan pendadaran untuk ${student.nama}?`)) {
        return;
    }

    try {
        // Call scheduling engine with specific student
        await generateSchedule({
            silent: false,
            targetStudent: nim
        });

        showToast(`Berhasil menjadwalkan ${student.nama}`, 'success');

        // Navigate to home to see the result
        setTimeout(() => {
            navigate('home');
        }, 1000);

    } catch (error) {
        console.error('Error scheduling student:', error);
        showToast('Gagal menjadwalkan mahasiswa: ' + error.message, 'error');
    }
}
