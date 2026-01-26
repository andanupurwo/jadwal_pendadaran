import './style.css'
import { loadDosenData } from './loadDosenData.js'
import { loadFacultyData } from './loadFacultyData.js'

const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

let MOCK_DATA = {
    masterDosen: [],
    facultyData: {
        FIK: [],
        FES: [],
        FST: []
    },
    mahasiswa: [
        { nim: '22.11.4501', nama: 'Andi Saputra', prodi: 'S1 Informatika', pembimbing: 'Arif Akbarul Huda, S.Si., M.Eng.' },
        { nim: '22.11.4502', nama: 'Budi Santoso', prodi: 'S1 Informatika', pembimbing: 'Heri Sismoro, S.Kom., M.Kom.' },
        { nim: '22.12.5601', nama: 'Citra Lestari', prodi: 'S1 Sistem Informasi', pembimbing: 'Acihmah Sidauruk, S.Kom., M.Kom.' },
        { nim: '22.21.3401', nama: 'Dewi Sartika', prodi: 'S1 Akuntansi', pembimbing: 'Alfriadi Dwi Atmoko, S.E., Ak., M.Si.' },
        { nim: '22.22.1201', nama: 'Eko Prasetyo', prodi: 'S1 Kewirausahaan', pembimbing: 'Laksmindra Saptyawati, S.E., M.B.A.' },
        { nim: '22.11.4503', nama: 'Fajar Pratama', prodi: 'S1 Informatika', pembimbing: 'Arif Dwi Laksito, S.Kom., M.Kom.' },
        { nim: '22.82.7801', nama: 'Gita Permata', prodi: 'S1 Teknik Komputer', pembimbing: 'Melwin Syafrizal, S.Kom., M.Eng., Ph.D.' },
        { nim: '22.61.9001', nama: 'Heri Susanto', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Angga Intueri Mahendra Purbakusuma, S.Sos., M.I.Kom.' },
        { nim: '22.51.2301', nama: 'Indah Sari', prodi: 'S1 Hubungan Internasional', pembimbing: 'Isti Nur Rahmahwati, S.IP., Ll.M., Ph.D.' },
        { nim: '22.11.4504', nama: 'Joko Widodo', prodi: 'S1 Informatika', pembimbing: 'Prof. Arief Setyanto, S.Si., M.T., Ph.D.' },
        { nim: '22.11.4505', nama: 'Kurniawan', prodi: 'S1 Informatika', pembimbing: 'Drs. Asro Nasiri, M.Kom.' },
        { nim: '22.11.4506', nama: 'Lani Marlina', prodi: 'S1 Informatika', pembimbing: 'Sudarmawan, S.T., M.T.' },
        { nim: '22.12.5602', nama: 'Mulyono', prodi: 'S1 Sistem Informasi', pembimbing: 'Krisnawati, S.Si., M.T.' },
        { nim: '22.12.5603', nama: 'Nina Zatulini', prodi: 'S1 Sistem Informasi', pembimbing: 'Drs. Bambang Sudaryatno, M.M.' },
        { nim: '22.61.9002', nama: 'Oky Pratama', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Erik Hadi Saputra, S.Kom., M.Eng.' },
        { nim: '22.61.9003', nama: 'Putri Andriani', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Dr. Nurbayti, S.I.Kom., M.A.' },
        { nim: '22.21.3402', nama: 'Qori Sandioriva', prodi: 'S1 Akuntansi', pembimbing: 'Edy Anan, S.E., M.Ak., Ak., CA' },
        { nim: '22.82.7802', nama: 'Rahmat Hidayat', prodi: 'S1 Teknik Komputer', pembimbing: 'Joko Dwi Santoso, S.Kom., M.Kom.' },
        { nim: '22.51.2302', nama: 'Siska Kohl', prodi: 'S1 Hubungan Internasional', pembimbing: 'Yoga Suharman, S.IP., M.A.' },
        { nim: '22.11.4507', nama: 'Taufik Hidayat', prodi: 'S1 Informatika', pembimbing: 'Mardhiya Hayaty, S.T., M.Kom.' },
        { nim: '22.11.4508', nama: 'Umar Bakri', prodi: 'S1 Informatika', pembimbing: 'Kusnawi, S.Kom., M.Eng.' },
        { nim: '22.61.9004', nama: 'Vina Panduwinata', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Dwiyono Iriyanto, Drs., M.M.' },
        { nim: '22.12.5604', nama: 'Wawan Wanisar', prodi: 'S1 Sistem Informasi', pembimbing: 'Wiwi Widayani, S.Kom., M.Kom.' },
        { nim: '22.11.4509', nama: 'Xavi Hernandez', prodi: 'S1 Informatika', pembimbing: 'Mujiyanto, M.Kom.' },
        { nim: '22.11.4510', nama: 'Yuni Shara', prodi: 'S1 Informatika', pembimbing: 'Sudarmawan, S.T., M.T.' },
        // Tambahan 25 mahasiswa baru
        { nim: '22.11.4511', nama: 'Zahra Amalia', prodi: 'S1 Informatika', pembimbing: 'Arif Akbarul Huda, S.Si., M.Eng.' },
        { nim: '22.11.4512', nama: 'Ahmad Fauzi', prodi: 'S1 Informatika', pembimbing: 'Heri Sismoro, S.Kom., M.Kom.' },
        { nim: '22.12.5605', nama: 'Bella Safira', prodi: 'S1 Sistem Informasi', pembimbing: 'Acihmah Sidauruk, S.Kom., M.Kom.' },
        { nim: '22.21.3403', nama: 'Cahyo Nugroho', prodi: 'S1 Akuntansi', pembimbing: 'Alfriadi Dwi Atmoko, S.E., Ak., M.Si.' },
        { nim: '22.22.1202', nama: 'Dina Mariana', prodi: 'S1 Kewirausahaan', pembimbing: 'Laksmindra Saptyawati, S.E., M.B.A.' },
        { nim: '22.11.4513', nama: 'Eka Wijaya', prodi: 'S1 Informatika', pembimbing: 'Arif Dwi Laksito, S.Kom., M.Kom.' },
        { nim: '22.82.7803', nama: 'Fitri Handayani', prodi: 'S1 Teknik Komputer', pembimbing: 'Melwin Syafrizal, S.Kom., M.Eng., Ph.D.' },
        { nim: '22.61.9005', nama: 'Gilang Ramadhan', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Angga Intueri Mahendra Purbakusuma, S.Sos., M.I.Kom.' },
        { nim: '22.51.2303', nama: 'Hana Pertiwi', prodi: 'S1 Hubungan Internasional', pembimbing: 'Isti Nur Rahmahwati, S.IP., Ll.M., Ph.D.' },
        { nim: '22.11.4514', nama: 'Irfan Hakim', prodi: 'S1 Informatika', pembimbing: 'Prof. Arief Setyanto, S.Si., M.T., Ph.D.' },
        { nim: '22.11.4515', nama: 'Julia Perez', prodi: 'S1 Informatika', pembimbing: 'Drs. Asro Nasiri, M.Kom.' },
        { nim: '22.11.4516', nama: 'Kevin Aprilio', prodi: 'S1 Informatika', pembimbing: 'Sudarmawan, S.T., M.T.' },
        { nim: '22.12.5606', nama: 'Linda Wijaya', prodi: 'S1 Sistem Informasi', pembimbing: 'Krisnawati, S.Si., M.T.' },
        { nim: '22.12.5607', nama: 'Mira Lesmana', prodi: 'S1 Sistem Informasi', pembimbing: 'Drs. Bambang Sudaryatno, M.M.' },
        { nim: '22.61.9006', nama: 'Nanda Arsyad', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Erik Hadi Saputra, S.Kom., M.Eng.' },
        { nim: '22.61.9007', nama: 'Olivia Zalianty', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Dr. Nurbayti, S.I.Kom., M.A.' },
        { nim: '22.21.3404', nama: 'Pandu Winata', prodi: 'S1 Akuntansi', pembimbing: 'Edy Anan, S.E., M.Ak., Ak., CA' },
        { nim: '22.82.7804', nama: 'Qonita Azzahra', prodi: 'S1 Teknik Komputer', pembimbing: 'Joko Dwi Santoso, S.Kom., M.Kom.' },
        { nim: '22.51.2304', nama: 'Reza Pahlevi', prodi: 'S1 Hubungan Internasional', pembimbing: 'Yoga Suharman, S.IP., M.A.' },
        { nim: '22.11.4517', nama: 'Siti Nurhaliza', prodi: 'S1 Informatika', pembimbing: 'Mardhiya Hayaty, S.T., M.Kom.' },
        { nim: '22.11.4518', nama: 'Tono Suratman', prodi: 'S1 Informatika', pembimbing: 'Kusnawi, S.Kom., M.Eng.' },
        { nim: '22.61.9008', nama: 'Umi Kalsum', prodi: 'S1 Ilmu Komunikasi', pembimbing: 'Dwiyono Iriyanto, Drs., M.M.' },
        { nim: '22.12.5608', nama: 'Vero Moda', prodi: 'S1 Sistem Informasi', pembimbing: 'Wiwi Widayani, S.Kom., M.Kom.' },
        { nim: '22.11.4519', nama: 'Wahyu Hidayat', prodi: 'S1 Informatika', pembimbing: 'Mujiyanto, M.Kom.' },
        { nim: '22.11.4520', nama: 'Yanto Basna', prodi: 'S1 Informatika', pembimbing: 'Sudarmawan, S.T., M.T.' }
    ],
    libur: [
        { dosenId: '190302036', date: '2026-02-16', reason: 'Dinas Luar Kota' }, // NIK Prof Arief Setyanto - Senin Minggu 1
        { dosenId: '190302112', date: '2026-02-17', reason: 'Sakit' }, // NIK Kusnawi - Selasa Minggu 1
        { dosenId: '190302036', date: '2026-02-19', reason: 'Seminar Nasional' }, // NIK Prof Arief - Kamis Minggu 1
        { dosenId: '190302045', date: '2026-02-24', reason: 'Cuti' }, // NIK Heri Sismoro - Selasa Minggu 2
        { dosenId: '190302078', date: '2026-02-25', reason: 'Rapat Pimpinan' } // NIK Arif Dwi Laksito - Rabu Minggu 2
    ],
    slots: [],
    clipboard: null
};

// State Management
let currentView = 'home';
let selectedDate = '2026-02-16'; // Fokus Tanggal
let currentDosenTab = 'sdm';
let sortColumn = null;
let sortDirection = 'asc';
let searchTerm = '';

const ROOMS = ['6.3.A', '6.3.B', '6.3.C', '6.3.D', '6.3.E', '6.3.F', '6.3.G', '6.3.H'];
const TIMES = ['08:30', '10:00', '11:30', '13:30'];
const DATES = [
    { value: '2026-02-16', label: 'Senin', display: '16 Feb' },
    { value: '2026-02-17', label: 'Selasa', display: '17 Feb' },
    { value: '2026-02-18', label: 'Rabu', display: '18 Feb' },
    { value: '2026-02-19', label: 'Kamis', display: '19 Feb' },
    { value: '2026-02-20', label: 'Jumat', display: '20 Feb' },
    { value: '2026-02-23', label: 'Senin', display: '23 Feb' },
    { value: '2026-02-24', label: 'Selasa', display: '24 Feb' },
    { value: '2026-02-25', label: 'Rabu', display: '25 Feb' },
    { value: '2026-02-26', label: 'Kamis', display: '26 Feb' },
    { value: '2026-02-27', label: 'Jumat', display: '27 Feb' }
];

// Soft Constraint: Distribusi beban penguji merata
const MAX_EXAMINER_ASSIGNMENTS = 5;

// Helper: Ambil semua dosen dari MOCK_DATA
function getAllDosen() {
    return [
        ...(MOCK_DATA.facultyData.FIK || []),
        ...(MOCK_DATA.facultyData.FES || []),
        ...(MOCK_DATA.facultyData.FST || [])
    ].sort((a, b) => a.nama.localeCompare(b.nama));
}

// Helper: Cek ketersediaan dosen (Fokus pada Tanggal)
function isDosenAvailable(namaDosen, date, time, excludeSlotStudent = null) {
    const allDosen = getAllDosen();
    const dosenData = allDosen.find(d => d.nama === namaDosen);

    // 1. Cek Apakah Dosen di-OFF-kan
    if (dosenData && dosenData.exclude) return false;

    // 2. Cek Libur Dosen (Berdasarkan Tanggal Persis)
    const isLibur = MOCK_DATA.libur.some(l => {
        return l.dosenId === dosenData?.nik && l.date === date;
    });
    if (isLibur) return false;

    // 3. Cek Bentrok di Slot Lain (Berdasarkan Tanggal)
    const bentrok = MOCK_DATA.slots.some(slot => {
        if (excludeSlotStudent && slot.student === excludeSlotStudent) return false;
        return slot.date === date && slot.time === time && slot.examiners.includes(namaDosen);
    });

    return !bentrok;
}

// Helper: Persiapan data untuk pencocokan
function normalizeName(name) {
    if (!name) return '';
    return name
        .toLowerCase()
        // Ganti tanda baca dengan spasi agar tidak menggabungkan kata (misal Dr.,S.Si -> Dr S Si)
        .replace(/[,.'"]/g, ' ')
        // Hapus gelar umum & sebutan akademik
        .replace(/\b(dr|prof|ir|drs|dra|h|hj|s\.?\w*|m\.?\w*|a\.?md\.?\w*|ph\.?d\.?|kom|sos|si|t|se|mm|ma|ba|sc|ak|ca)\b/gi, '')
        .replace(/\s+/g, ' ') // Spasi ganda jadi satu
        .trim();
}

// Helper: Hitung kemiripan string (Levenshtein Distance-based)
function getSimilarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;

    // Optimasi: jika salah satu string kosong
    if (!s1 || !s2) return 0;

    // Hitung jarak Levenshtein
    const costs = [];
    for (let i = 0; i <= longer.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= shorter.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newValue = costs[j - 1];
                if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[shorter.length] = lastValue;
    }

    return (longer.length - costs[shorter.length]) / longer.length;
}

// Fungsi Utama: Pencocokan Data
function processMatching() {
    console.log('Memulai proses pencocokan data...');
    const sdmData = MOCK_DATA.masterDosen;
    if (!sdmData || sdmData.length === 0) return;

    // Manual Overrides (Raw Name Lowercase -> SDM No)
    // Kunci dictionary adalah nama asli dari CSV (lowercased)
    const manualOverrides = {
        'angga intueri mahendra p., s.sos, m.i.kom': '191',
        'laksmindra saptyawati, se, mba': '188',
        'nurhayanto, s.e., m.b.a.': '382',
        'arief setyanto, dr.,s.si, mt': '16',
        'fauzia anis sekar ningrum, s.t., m.t.': '458',
        'nimah mahnunah, s.t., m.t': '224'
    };

    ['FIK', 'FES', 'FST'].forEach(fakultas => {
        const facultyRows = MOCK_DATA.facultyData[fakultas];
        if (!facultyRows) return;

        facultyRows.forEach(dosen => {
            let bestMatch = null;
            let matchType = 'none'; // 'nik', 'name_exact', 'name_fuzzy', 'manual'
            let score = 0;

            // Nama raw lowercased untuk cek manual override
            const rawNameLower = dosen.nama ? dosen.nama.toLowerCase().trim() : '';
            const normName = normalizeName(dosen.nama);

            // 1. Cek Manual Override (Prioritas Tertinggi)
            if (manualOverrides[rawNameLower]) {
                const targetNo = manualOverrides[rawNameLower];
                // Cari data SDM berdasarkan 'no' (bukan 'No')
                const manualMatch = sdmData.find(s => s.no == targetNo);
                if (manualMatch) {
                    bestMatch = manualMatch;
                    matchType = 'manual';
                    score = 100;
                }
            }

            // 2. Cek NIK (Jika belum match via manual)
            if (!bestMatch) {
                const cleanNik = dosen.nik ? dosen.nik.replace(/\D/g, '') : '';
                if (cleanNik && cleanNik !== '0' && cleanNik.length > 3) {
                    const nikMatch = sdmData.find(s => s.nik && s.nik.replace(/\D/g, '') === cleanNik);
                    if (nikMatch) {
                        bestMatch = nikMatch;
                        matchType = 'nik';
                        score = 100;
                    }
                }
            }

            // 3. Cek Nama (Exact & Fuzzy) untuk sisa yang belum match
            if (!bestMatch) {
                let bestNameScore = 0;
                let bestNameMatch = null;

                sdmData.forEach(sdm => {
                    const normSdm = normalizeName(sdm.nama);

                    if (normName === normSdm) {
                        // Exact match after normalization
                        if (bestNameScore < 100) {
                            bestNameScore = 100;
                            bestNameMatch = sdm;
                        }
                    } else {
                        // Fuzzy match
                        const sim = getSimilarity(normName, normSdm);
                        if (sim > bestNameScore) {
                            bestNameScore = sim;
                            bestNameMatch = sdm;
                        }
                    }
                });

                // Threshold 0.65
                if (bestNameScore >= 0.65) {
                    bestMatch = bestNameMatch;
                    score = Math.round(bestNameScore * 100);
                    matchType = score === 100 ? 'name_exact' : 'name_fuzzy';
                }
            }

            // Simpan hasil pencocokan
            dosen.matchResult = {
                matched: !!bestMatch,
                type: matchType,
                score: score,
                sdm: bestMatch
            };

            // ACTION: Rename/Update data sesuai Master SDM jika match
            if (bestMatch) {
                if (!dosen.originalNama) dosen.originalNama = dosen.nama;
                if (!dosen.originalNik) dosen.originalNik = dosen.nik;
                dosen.nama = bestMatch.nama;
                dosen.nik = bestMatch.nik;
            }
        });
    });
    console.log('Pencocokan dan standardisasi selesai.');
}

// Load data saat aplikasi dimulai
// Load data saat aplikasi dimulai
async function initializeApp() {
    console.log('🚀 Initializing application...');

    try {
        // Reveal app content nicely (Anti-FOUC)
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
            document.body.style.pointerEvents = 'auto';
        });

        // Render halaman pertama
        navigate('home');

        // Load SDM master data
        console.log('📥 Loading SDM master data...');
        MOCK_DATA.masterDosen = await loadDosenData();
        console.log(`✅ Loaded ${MOCK_DATA.masterDosen.length} SDM records`);

        // Load faculty data from new CSV (Dosen Prodi.csv)
        console.log('📥 Loading faculty data from Dosen Prodi.csv...');
        const facultyDataRaw = await loadFacultyData();

        // Verify faculty data against SDM
        console.log('🔍 Verifying faculty data against SDM...');
        const { verifyFacultyData } = await import('./loadFacultyData.js');
        const verificationResults = verifyFacultyData(facultyDataRaw, MOCK_DATA.masterDosen);

        // Update MOCK_DATA with verified data
        MOCK_DATA.facultyData = {
            FIK: verificationResults.FIK.details,
            FES: verificationResults.FES.details,
            FST: verificationResults.FST.details
        };

        console.log('✅ Faculty data loaded and verified:');
        console.log(`   FIK: ${MOCK_DATA.facultyData.FIK.length} dosen (${verificationResults.FIK.matched} matched, ${verificationResults.FIK.unmatched} unmatched)`);
        console.log(`   FES: ${MOCK_DATA.facultyData.FES.length} dosen (${verificationResults.FES.matched} matched, ${verificationResults.FES.unmatched} unmatched)`);
        console.log(`   FST: ${MOCK_DATA.facultyData.FST.length} dosen (${verificationResults.FST.matched} matched, ${verificationResults.FST.unmatched} unmatched)`);

        // --- SIMULASI: Set beberapa Dosen Senior ke status "OFF" (Tidak Dijadwalkan) ---
        const lecturersToExclude = ['Prof. Dr. Mohammad Suyanto, M.M.', 'Prof. Dr. Ema Utami, S.Si., M.Kom.', 'Dr. Achmad Fauzi, S.E., M.M.'];
        Object.keys(MOCK_DATA.facultyData).forEach(fak => {
            MOCK_DATA.facultyData[fak].forEach(d => {
                if (lecturersToExclude.includes(d.nama)) {
                    d.exclude = true;
                }
            });
        });
        console.log('🚫 Simulasi: Beberapa dosen senior telah di-set status OFF (Constraint).');

        // Refresh view jika user sedang di tab dosen
        if (currentView === 'dosen') {
            mainContent.innerHTML = views.dosen();
        }

        console.log('✅ Application initialized successfully!');

    } catch (error) {
        console.error('❌ Error initializing app:', error);
        // Still show the UI even if data loading fails
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
    }
}


// Fungsi sorting
function sortData(data, column) {
    const sorted = [...data].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Convert to string for comparison if needed
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        // Handle numbers
        if (!isNaN(valA) && !isNaN(valB)) {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return sorted;
}

// Fungsi filtering/search
function filterData(data, term) {
    if (!term || term.trim() === '') {
        return data;
    }

    const lowerTerm = term.toLowerCase().trim();

    return data.filter(item => {
        // Search di semua kolom
        return (
            (item.no && item.no.toString().toLowerCase().includes(lowerTerm)) ||
            (item.nomor && item.nomor.toString().toLowerCase().includes(lowerTerm)) ||
            (item.nama && item.nama.toLowerCase().includes(lowerTerm)) ||
            (item.nik && item.nik.toLowerCase().includes(lowerTerm)) ||
            (item.nidn && item.nidn.toLowerCase().includes(lowerTerm)) ||
            (item.status && item.status.toLowerCase().includes(lowerTerm)) ||
            (item.kategori && item.kategori.toLowerCase().includes(lowerTerm)) ||
            (item.prodi && item.prodi.toLowerCase().includes(lowerTerm))
        );
    });
}

// Helper parsing CSV sederhana (dengan dukungan quotes)
function parseCSVLine(line) {
    // Deprecated for the new specific parsers below, but kept if needed
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else if (char !== '\r') {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

// Import SDM master (kolom: No;Nik;Status (Dosen/Tendik);Nama;Kategori Dosen/Karyawan;NIDN;Jenis Kelamin)
function importSDM(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length <= 1) return [];

    // Deteksi separator (semicolon atau comma)
    const firstLine = lines[0];
    const separator = firstLine.includes(';') ? ';' : ',';

    const parseLine = (line) => {
        if (!line) return [];
        return line.split(separator).map(s => s.trim());
    };

    const headers = parseLine(lines[0]);

    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const v = parseLine(lines[i]);
        if (v.length < headers.length) continue;

        result.push({
            no: v[0],
            nik: v[1],
            status: v[2],
            nama: v[3],
            kategori: v[4],
            nidn: v[5],
            jenisKelamin: v[6]
        });
    }

    return result;
}

// Import FES/FST/FIK (kolom: NIK, DOSEN, PRODI)
function importFaculty(text, fakultas) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length <= 1) return [];

    // Deteksi separator
    const firstLine = lines[0];
    const separator = firstLine.includes(';') ? ';' : ',';

    const parseLine = (line) => {
        if (!line) return [];
        // Handle quotes for names with commas e.g. "Name, Title"
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === separator && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    // Header mapping (case insensitive)
    const headerLine = lines[0].toLowerCase();
    const headers = parseLine(headerLine);

    // Find column indices
    const idxNik = headers.findIndex(h => h === 'nik');
    const idxNama = headers.findIndex(h => h.includes('dosen') || h.includes('nama'));
    const idxProdi = headers.findIndex(h => h.includes('prodi'));

    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const v = parseLine(lines[i]);

        // Skip header if re-read inside loop (not happening here due to starting at i=1)

        const nama = idxNama >= 0 ? v[idxNama] || '' : '';
        // Clean up quotes from name if present - logic already handled by parseLine loosely but let's be sure
        const cleanNama = nama.replace(/^"|"$/g, '').trim();

        if (!cleanNama) continue;

        result.push({
            nomor: i,
            nik: idxNik >= 0 ? v[idxNik] || '-' : '-',
            nama: cleanNama,
            prodi: idxProdi >= 0 ? v[idxProdi] || '-' : '-',
            fakultas
        });
    }
    return result;
}

// triggerImport and handleImportFile legacy
window.triggerImport = (tab) => {
    console.log('Use auto-load instead.');
};

window.handleImportFile = (event) => {
    console.log('Use auto-load instead.');
};

const views = {
    home: () => {

        const rooms = ['6.3.A', '6.3.B', '6.3.C', '6.3.D', '6.3.E', '6.3.F', '6.3.G', '6.3.H'];

        // Current selection state
        const currentDate = selectedDate || '2026-02-16';
        const dateObj = DATES.find(d => d.value === currentDate);
        const selectedDay = dateObj.label;

        // Filter waktu: Jumat tidak ada jam 11:30
        const times = selectedDay === 'Jumat'
            ? TIMES.filter(t => t !== '11:30')
            : TIMES;

        return `
            <header style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h1>Jadwal Sidang Pendadaran</h1>
                    <p class="subtitle">Manajemen slot ruangan berdasarkan tanggal pelaksanaan.</p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${MOCK_DATA.clipboard ? `
                        <div class="card" style="margin: 0; padding: 0.5rem 1rem; background: var(--primary-subtle); border: 1px dashed var(--primary); display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary);">📋 Clipboard: ${MOCK_DATA.clipboard.student}</span>
                            <button onclick="window.moveSlotToClipboard(null)" style="padding: 2px 8px; font-size: 0.7rem; background: var(--danger);">Batal</button>
                        </div>
                    ` : ''}
                    <button onclick="window.generateSchedule()" style="background: var(--secondary); border: none; padding: 0.75rem 1.25rem; border-radius: 10px; font-weight: 600; box-shadow: 0 4px 12px rgba(94, 92, 230, 0.3);">
                        ⚡ Proses Jadwal Otomatis
                    </button>
                </div>
            </header>
            
            <!-- Date Selector Tabs -->
            <div class="tabs-container" style="overflow-x: auto; margin-bottom: 1.5rem; padding-bottom: 5px;">
                <div class="tabs" style="display: flex; flex-wrap: nowrap; width: max-content;">
                    ${DATES.map(item => {
            const hasSchedule = MOCK_DATA.slots.some(s => s.date === item.value);
            return `
                        <div class="tab-item ${currentDate === item.value ? 'active' : ''}" 
                             onclick="window.selectScheduleDate('${item.value}')"
                             style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 80px; padding: 0.5rem 0.75rem; gap: 2px; height: 55px;">
                            <span style="font-weight: 700; font-size: 0.95rem; line-height: 1;">${item.display}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); line-height: 1;">${item.label}</span>
                            ${hasSchedule ? `<span style="position: absolute; top: 6px; right: 6px; width: 6px; height: 6px; background-color: var(--success); border-radius: 50%;"></span>` : ''}
                        </div>
                    `}).join('')}
                </div>
            </div>

            <div class="card">
                <div class="schedule-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 0.75rem; background: var(--bg); border-radius: 8px;">
                    <div>
                        <strong>${dateObj.display} (${selectedDay})</strong>
                        <span style="margin-left: 1.5rem; color: var(--text-muted);">
                            ${ROOMS.length} Ruangan × ${times.length} Sesi
                        </span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">
                        <span style="display: inline-block; width: 12px; height: 12px; background: var(--success); border-radius: 2px; margin-right: 4px;"></span> Terisi
                        <span style="display: inline-block; width: 12px; height: 12px; background: var(--border); border-radius: 2px; margin: 0 4px 0 12px;"></span> Kosong
                    </div>
                </div>

                <!-- Room-based Grid (Times as columns, Rooms as rows) -->
                <div class="room-schedule-grid" style="display: grid; grid-template-columns: 100px repeat(${times.length}, 1fr); gap: 8px; overflow-x: auto;">
                    <!-- Header Row -->
                    <div style="font-weight: 600; padding: 0.75rem 0.5rem; text-align: center; background: var(--card-bg); border-radius: 6px;">Ruangan</div>
                    ${times.map(time => `
                        <div style="font-weight: 600; padding: 0.75rem 0.5rem; text-align: center; background: var(--card-bg); border-radius: 6px; font-size: 0.9rem;">
                            ${time}
                        </div>
                    `).join('')}
                    
                    <!-- Room Rows -->
                    ${rooms.map(room => `
                        <div style="font-weight: 600; padding: 0.75rem 0.5rem; display: flex; align-items: center; justify-content: center; background: var(--card-bg); border-radius: 6px;">
                            ${room}
                        </div>
                        ${times.map(time => {
                const slot = MOCK_DATA.slots.find(s =>
                    s.date === currentDate &&
                    s.time === time &&
                    s.room === room
                );

                return `
                                <div class="room-slot ${slot ? 'slot-filled' : 'slot-empty'}" 
                                     draggable="${slot ? 'true' : 'false'}"
                                     ondragstart="window.onDragStart(event, '${slot?.student || ''}', '${currentDate}', '${time}', '${room}')"
                                     ondragover="window.onDragOver(event)"
                                     ondragleave="window.onDragLeave(event)"
                                     ondrop="window.onDrop(event, '${currentDate}', '${time}', '${room}')"
                                     style="padding: 0.6rem; border-radius: 8px; min-height: 100px; 
                                            background: ${slot ? '#ffffff' : 'var(--card-bg)'};
                                            border: 1px solid ${slot ? 'var(--border)' : 'transparent'};
                                            ${slot ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-left: 4px solid var(--success);' : 'background: var(--bg-subtle);'}
                                            transition: all 0.2s; cursor: ${slot ? 'pointer' : 'default'}; position: relative;"
                                     ${slot ? `onclick="window.viewSlotDetails('${currentDate}', '${time}', '${room}')"` : ''}
                                     onmouseover="if(this.classList.contains('slot-filled')) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; }"
                                     onmouseout="if(this.classList.contains('slot-filled')) { this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'; }">
                                    ${slot ? `
                                        <div style="display: flex; flex-direction: column; height: 100%;">
                                            <div style="position: absolute; top: 4px; right: 4px; display: flex; gap: 4px; z-index: 10;">
                                                <button onclick="event.stopPropagation(); window.moveSlotToClipboard('${slot.student}')" 
                                                        style="background: rgba(0,113,227,0.1); border: none; width: 18px; height: 18px; border-radius: 50%; color: var(--primary); font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;"
                                                        class="delete-slot-btn" title="Pindah Jadwal (Antar Hari)">📍</button>
                                                <button onclick="event.stopPropagation(); window.deleteSlot('${currentDate}', '${time}', '${room}')" 
                                                        style="background: rgba(255,59,48,0.1); border: none; width: 18px; height: 18px; border-radius: 50%; color: var(--danger); font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;"
                                                        class="delete-slot-btn" title="Hapus Jadwal">✕</button>
                                            </div>
                                            <div style="margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px dashed var(--border);">
                                                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">${slot.student || 'Mahasiswa'}</div>
                                            </div>
                                            
                                            <div style="font-size: 0.75rem; flex-grow: 1; display: flex; flex-direction: column; gap: 3px;">
                                                ${slot.examiners && slot.examiners.length >= 3 ? `
                                                    <div style="display: flex; gap: 6px; align-items: baseline;">
                                                        <span style="color: var(--text-muted); font-size: 0.65rem; font-weight: 600; min-width: 14px;">P1</span>
                                                        <span style="color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${slot.examiners[0]}</span>
                                                    </div>
                                                    <div style="display: flex; gap: 6px; align-items: baseline;">
                                                        <span style="color: var(--text-muted); font-size: 0.65rem; font-weight: 600; min-width: 14px;">P2</span>
                                                        <span style="color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${slot.examiners[1]}</span>
                                                    </div>
                                                    <div style="margin-top: 2px; display: flex; gap: 6px; align-items: baseline; color: var(--primary);">
                                                        <span style="font-size: 0.65rem; font-weight: 700; min-width: 14px;">Pb</span>
                                                        <span style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${slot.examiners[2]}</span>
                                                    </div>
                                                ` : '<div style="color: var(--text-muted); font-style: italic;">Data dosen tidak lengkap</div>'}
                                            </div>
                                        </div>
                                    ` : `
                                        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border: 2px dashed ${MOCK_DATA.clipboard ? 'var(--primary)' : 'var(--border)'}; border-radius: 6px; background: ${MOCK_DATA.clipboard ? 'var(--primary-subtle)' : 'rgba(255,255,255,0.4)'}; color: ${MOCK_DATA.clipboard ? 'var(--primary)' : 'var(--text-muted)'}; transition: all 0.2s; cursor: ${MOCK_DATA.clipboard ? 'pointer' : 'default'};"
                                             ${MOCK_DATA.clipboard ? `onclick="window.pasteSlotFromClipboard('${currentDate}', '${time}', '${room}')"` : ''}>
                                             <span style="font-size: 1.2rem; opacity: 0.8;">${MOCK_DATA.clipboard ? '📋' : '+'}</span>
                                             <span style="font-size: 0.75rem; font-weight: 500; opacity: 1;">${MOCK_DATA.clipboard ? 'Tempel Di Sini' : 'Tersedia'}</span>
                                        </div>
                                    `}
                                </div>
                            `;
            }).join('')}
                    `).join('')}
                </div>
            </div>
        `;
    },
    dosen: () => {
        // Tab Navigation Helper
        const renderTab = (tabId, label) => `
            <div class="tab-item ${currentDosenTab === tabId ? 'active' : ''}" onclick="window.switchDosenTab('${tabId}')">
                ${label}
            </div>
        `;

        // Table Helper dengan Sorting
        // headersDef: Array of { label: 'Header', key: 'propertyKey' } or string 'Header'
        const renderTable = (headersDef, rows) => `
            <div class="dosen-list-container">
                <table>
                    <thead>
                        <tr>
                            ${headersDef.map(h => {
            const label = typeof h === 'object' ? h.label : h;
            const key = typeof h === 'object' ? h.key : null;
            const sortIcon = sortColumn === key ? (sortDirection === 'asc' ? '↑' : '↓') : '';
            const cursorStyle = key ? 'cursor:pointer; user-select:none;' : '';
            const clickAttr = key ? `onclick="window.sortTable('${key}')"` : '';
            const widthStyle = typeof h === 'object' && h.width ? `width: ${h.width};` : '';
            return `<th style="${cursorStyle} ${widthStyle}" ${clickAttr} title="${key ? 'Klik untuk urutkan' : ''}">${label} ${sortIcon}</th>`;
        }).join('')}
        </tr>
                    </thead>
                    <tbody>
                        ${rows.length > 0 ? rows.map(rowData => {
            // Support for complex row with custom style
            // Format: { content: [...], style: '...' } OR just [...]
            const isComplex = !Array.isArray(rowData) && rowData.content;
            const cells = isComplex ? rowData.content : rowData;
            const rowStyle = isComplex && rowData.style ? `style="${rowData.style}"` : '';
            const rowClass = isComplex && rowData.className ? `class="${rowData.className}"` : '';

            return `
                            <tr ${rowClass} ${rowStyle}>
                                ${cells.map(cell => `<td>${cell}</td>`).join('')}
                            </tr>
                            `;
        }).join('') : `<tr><td colspan="${headersDef.length}" style="text-align:center; color:var(--text-muted); padding:2rem;">Tidak ada data yang cocok</td></tr>`}
                    </tbody>
                </table>
            </div>
        `;

        let content = '';

        if (currentDosenTab === 'sdm') {
            const data = MOCK_DATA.masterDosen || [];
            if (data.length > 0) {
                const filtered = filterData(data, searchTerm);
                // Default sort by nama if null
                const sorted = sortData(filtered, sortColumn || 'nama');

                const rows = sorted.map(d => [
                    d.nik, d.status, `<strong>${d.nama}</strong>`, d.kategori, d.nidn, d.jenisKelamin
                ]);

                const headers = [
                    // No column removed

                    { label: 'NIK', key: 'nik' },
                    { label: 'Status', key: 'status' },
                    { label: 'Nama', key: 'nama' },
                    { label: 'Kategori', key: 'kategori' },
                    { label: 'NIDN', key: 'nidn' },
                    { label: 'JK', key: 'jenisKelamin' }
                ];

                content = `
                    <div class="controls-area" style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0;">
                        <input type="text" id="searchInput" class="search-input" placeholder="Cari..." value="${searchTerm}" oninput="window.handleSearchInput(event)" style="width: 300px;">
                        <div style="font-size:0.8rem; color:var(--text-muted); display:flex; gap:8px; align-items:center;">
                            <button onclick="window.exportSDMData()" style="padding: 4px 10px; font-size: 0.75rem; cursor:pointer; background: var(--secondary);">Export CSV</button>
                            <button onclick="window.triggerImportSDM()" style="padding: 4px 10px; font-size: 0.75rem; cursor:pointer;">Import CSV</button>
                            <input type="file" id="importSDMInput" accept=".csv" style="display:none;" onchange="window.handleImportSDM(event)">
                            <span style="margin-left:8px;">Total: <strong>${filtered.length}</strong> data</span>
                        </div>
                    </div>
                    ${renderTable(headers, rows)}
                `;
            } else {
                content = `<div class="empty-state"><h3>Memuat Data SDM...</h3></div>`;
            }
        } else {
            const faculty = currentDosenTab.toUpperCase();
            const data = MOCK_DATA.facultyData[faculty] || [];

            if (data.length > 0) {
                const filtered = filterData(data, searchTerm);
                const sorted = sortData(filtered, sortColumn || 'nomor');

                const rows = sorted.map(d => {
                    const m = d.matchResult || { matched: false };
                    let statusBadge = '<span class="badge badge-danger">Unmatched</span>';
                    // Use text-truncate with title for full name on hover
                    let nameDisplay = `<div class="text-truncate" title="${d.nama}"><strong>${d.nama}</strong></div>`;

                    if (m.matched) {
                        statusBadge = `<span class="badge badge-success">✓ Valid SDM</span>`;
                        // if (d.originalNama && d.originalNama !== d.nama) {
                        //     // User request: Don't show original name details
                        // }
                    }

                    // Logic Toggle Jadwal
                    // Default: include (exclude = false/undefined) -> Switch ON
                    const isIncluded = !d.exclude;

                    const toggleSwitch = `
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <label style="position:relative; display:inline-block; width:36px; height:20px;">
                                <input type="checkbox" ${isIncluded ? 'checked' : ''} 
                                    onchange="window.toggleDosenScheduling('${faculty}', '${d.nik}')"
                                    style="opacity:0; width:0; height:0;">
                                <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:${isIncluded ? 'var(--success)' : '#e5e5ea'}; transition:.4s; border-radius:34px;">
                                    <span style="position:absolute; content:''; height:16px; width:16px; left:${isIncluded ? '18px' : '2px'}; bottom:2px; background-color:white; transition:.4s; border-radius:50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></span>
                                </span>
                            </label>
                            <span style="font-size:0.7rem; color:${isIncluded ? 'var(--success)' : 'var(--text-muted)'}; font-weight:600;">
                                ${isIncluded ? 'ON' : 'OFF'}
                            </span>
                        </div>
                    `;

                    const rowCells = [
                        // d.nomor removed
                        `<div>${d.nik}</div>`,
                        nameDisplay,
                        d.prodi,
                        `<div>${statusBadge}</div>`,
                        toggleSwitch
                    ];

                    // Jika OFF (isIncluded == false), beri class khusus
                    if (!isIncluded) {
                        return {
                            content: rowCells,
                            className: 'excluded-row'
                        };
                    }

                    return rowCells;
                });

                const headers = [
                    // { label: 'No', key: 'nomor', width: '60px' },

                    { label: 'NIK', key: 'nik', width: '120px' },
                    { label: 'Nama Dosen', key: 'nama', width: '30%' },
                    { label: 'Prodi', key: 'prodi', width: '20%' },
                    { label: 'Status Validasi', key: null, width: '150px' },
                    { label: 'Jadwalkan', width: '80px', key: null }
                ];

                content = `
                    <div class="controls-area" style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0;">
                        <input type="text" id="searchInput" class="search-input" placeholder="Cari dosen ${faculty}..." value="${searchTerm}" oninput="window.handleSearchInput(event)" style="width: 300px;">
                        <div style="font-size:0.8rem; color:var(--text-muted);">
                           <button onclick="window.toggleAddDosenModal(true)" style="margin-left:10px; padding: 4px 10px; font-size: 0.75rem; cursor:pointer; background: var(--secondary); margin-right: 5px;">+ Tambah Dosen</button>
                           <button onclick="processMatching(); window.switchDosenTab('${currentDosenTab}')" style="margin-left:5px; padding: 4px 10px; font-size: 0.75rem; cursor:pointer;">🔄 Force Re-Match</button>
                           Total: <strong>${filtered.length}</strong> dosen
                        </div>
                    </div>
                    ${renderTable(headers, rows)}
                `;
            } else {
                content = `
                    <div class="empty-state">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                        <h3>Memuat Data ${faculty}...</h3>
                        <p style="color: var(--text-muted);">Sedang sinkronisasi file CSV.</p>
                    </div>
                `;
            }
        }

        return `
            <header>
                <h1>Data Dosen</h1>
                <p class="subtitle">Manajemen data dosen per fakultas dan master data SDM.</p>
            </header>
            <div class="tabs">
                ${renderTab('sdm', 'Data SDM (Acuan)')}
                ${renderTab('fik', 'Dosen FIK')}
                ${renderTab('fes', 'Dosen FES')}
                ${renderTab('fst', 'Dosen FST')}
            </div>
            <div class="content-area">
                ${content}
            </div>
        `;
    },
    mahasiswa: () => {
        // Sort by NIM ascending
        const sortedMahasiswa = [...MOCK_DATA.mahasiswa].sort((a, b) => a.nim.localeCompare(b.nim));

        return `
        <header style="display: flex; justify-content: space-between; align-items: center; padding-left: 3.5rem;">
            <div>
                <h1>Data Mahasiswa</h1>
                <p class="subtitle">Pendaftar ujian pendadaran periode aktif.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="window.generateSchedule()" style="background: var(--secondary); white-space: nowrap;">⚡ Proses Jadwal</button>
                <button onclick="window.toggleAddMahasiswaModal(true)" style="white-space: nowrap;">+ Tambah Mahasiswa</button>
            </div>
        </header>

        <div class="card" style="margin-bottom: 2rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: center;">
                <div class="stat-item">
                    <div style="font-size: 0.9rem; color: var(--text-muted);">Total Pendaftar</div>
                    <div style="font-size: 1.5rem; font-weight: 700;">${sortedMahasiswa.length}</div>
                </div>
            </div>
        </div>

        <div class="table-container">
            ${sortedMahasiswa.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th style="width: 120px;">NIM</th>
                        <th>Nama Lengkap</th>
                        <th style="width: 200px;">Program Studi</th>
                        <th>Dosen Pembimbing</th>
                        <th style="width: 150px;">Status Penjadwalan</th>
                        <th style="width: 80px; text-align: center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedMahasiswa.map(m => {
            const schedule = MOCK_DATA.slots.find(s => s.student === m.nama);
            return `
                        <tr>
                            <td class="text-truncate" style="font-family: monospace; font-size: 0.95rem;">${m.nim}</td>
                            <td><div style="font-weight: 600;">${m.nama}</div></td>
                            <td><span class="badge text-truncate" style="background: var(--bg); border: 1px solid var(--border); color: var(--text-secondary); max-width: 180px; display: inline-block; vertical-align: middle;" title="${m.prodi}">${m.prodi}</span></td>
                            <td>${m.pembimbing || '<span style="color:var(--text-muted); font-style:italic;">-</span>'}</td>
                            <td>
                                ${schedule ? `
                                    <div onclick="window.viewAndHighlightSchedule('${m.nama}')" 
                                         style="cursor: pointer; padding: 0.5rem; border-radius: 6px; background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05)); border: 1px solid rgba(34, 197, 94, 0.3); transition: all 0.2s;"
                                         onmouseover="this.style.background='linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1))'; this.style.borderColor='rgba(34, 197, 94, 0.5)';"
                                         onmouseout="this.style.background='linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05))'; this.style.borderColor='rgba(34, 197, 94, 0.3)';">
                                        <div style="font-weight: 600; font-size: 0.85rem; color: var(--success); display: flex; align-items: center; gap: 4px;">
                                            📅 ${DATES.find(d => d.value === schedule.date)?.display || schedule.date} (${DATES.find(d => d.value === schedule.date)?.label || '-'})
                                        </div>
                                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
                                            ⏰ ${schedule.time} • 🏢 ${schedule.room}
                                        </div>
                                        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            👥 ${schedule.examiners?.slice(0, 2).join(', ')}${schedule.examiners?.length > 2 ? '...' : ''}
                                        </div>
                                    </div>
                                ` : `
                                    <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                                        <span class="badge badge-warning" style="opacity: 0.7;">Belum Terjadwal</span>
                                        <button onclick="window.scheduleIndividualStudent('${m.nim}')" 
                                                style="padding: 4px 10px; font-size: 0.75rem; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s;"
                                                onmouseover="this.style.background='var(--primary-dark)'; this.style.transform='translateY(-1px)';"
                                                onmouseout="this.style.background='var(--primary)'; this.style.transform='translateY(0)';"
                                                title="Jadwalkan mahasiswa ini secara otomatis">
                                            ⚡ Jadwalkan Otomatis
                                        </button>
                                    </div>
                                `}
                            </td>
                            <td style="text-align: center;">
                                <button onclick="window.deleteMahasiswa('${m.nim}')" style="background: none; border: none; padding: 4px; color: var(--text-muted); cursor: pointer;" title="Hapus">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
            ` : `
            <div class="empty-state">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🎓</div>
                <h3 style="margin-bottom: 0.5rem; color: var(--text-main);">Belum ada data mahasiswa</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Tambahkan data mahasiswa secara manual.</p>
                <button onclick="window.toggleAddMahasiswaModal(true)" class="btn-secondary">Tambah Data</button>
            </div>
            `}
        </div>
        `;
    },
    libur: () => `
        <header>
            <h1>Dosen Libur / Berhalangan</h1>
            <p class="subtitle">Input tanggal ketidakhadiran dosen untuk kendala (constraint) penjadwalan.</p>
        </header>
        <div class="table-container">
            ${MOCK_DATA.libur.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Dosen</th>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${MOCK_DATA.libur.map(l => {
        const d = MOCK_DATA.masterDosen.find(ds => ds.nik === l.dosenId);
        return `
                            <tr>
                                <td><strong>${d ? d.nama : 'Tidak Diketahui'}</strong></td>
                                <td>${l.date}</td>
                                <td>${l.reason}</td>
                                <td>❌</td>
                            </tr>
                        `;
    }).join('')}
                </tbody>
            </table>
            ` : '<p style="text-align:center; color:var(--text-muted); padding:3rem;">Belum ada jadwal libur dosen</p>'}
        </div>
    `,
    logic: () => `
        <header>
            <h1>Eksplorasi Logika</h1>
            <p class="subtitle">Kendalikan algoritma penjadwalan otomatis secara presisi.</p>
        </header>
        <div class="grid-container">
            <div class="card">
                <h3>Aturan Aktif (Hard Constraints)</h3>
                <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">
                    Algoritma saat ini memverifikasi aturan berikut secara ketat:
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-success">WAJIB</span>
                        <span><strong>Ruangan Kosong:</strong> Tidak ada jadwal ganda di ruangan & waktu yang sama.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-success">WAJIB</span>
                        <span><strong>Dosen Available:</strong> Pembimbing & Penguji tidak sedang menguji di tempat lain.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-success">WAJIB</span>
                        <span><strong>Status Dosen:</strong> Dosen yang di-set "OFF" (Jadwalkan: OFF) diabaikan sepenuhnya.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-success">WAJIB</span>
                        <span><strong>Komposisi Tim:</strong> 1 Pembimbing + 2 Penguji Pendamping (unik, tidak boleh sama).</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-success">WAJIB</span>
                        <span><strong>Jam Operasional:</strong> 08:30, 10:00, 11:30, 13:30 (Jumat: skip 11:30).</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge badge-warning">OPSIONAL</span>
                        <span><strong>Distribusi Merata:</strong> Maksimal ${MAX_EXAMINER_ASSIGNMENTS} tugas per dosen (kecuali pembimbing wajib).</span>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3>Metode Algoritma</h3>
                <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
                    <strong>Sequential Greedy Search</strong>
                </p>
                <p style="font-size: 0.9rem; line-height: 1.6;">
                    Sistem melakukan iterasi pada setiap mahasiswa antrian, lalu melakukan <em>brute-force search</em> untuk mencari slot waktu & ruangan pertama yang memenuhi <strong>SEMUA</strong> aturan di samping.
                </p>
                <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 10px;">
                    Jika slot ditemukan, jadwal langsung dikunci (booked). Jika tidak, mahasiswa akan dilaporkan GAGAL dijadwalkan.
                </p>
            </div>

            <div class="card stat-card" style="grid-column: span 2; background: linear-gradient(90deg, var(--card-bg), var(--primary-glow));">
                <span class="stat-label">Algoritma Aktif</span>
                <span class="stat-value">Genetic Algorithm v2.4</span>
                <p style="font-size: 0.875rem; margin-top: 1rem;">
                    Status: <span style="color: #4ade80;">Siap untuk optimasi</span>
                </p>
                <button onclick="window.generateSchedule()" style="margin-top: 1rem; padding: 0.75rem; border-radius: 8px; border: none; background: var(--secondary); color: white; font-weight: 600; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(94, 92, 230, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(94, 92, 230, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(94, 92, 230, 0.3)';">GENERATE ULANG JADWAL</button>
            </div>
            
            <div class="card" style="grid-column: span 2; display: none;" id="logCard">
                <h3>Log Proses Algoritma</h3>
                <div id="logicLog" style="margin-top: 0.5rem; padding: 1rem; background: #1e1e1e; color: #4ade80; font-family: 'JetBrains Mono', monospace; height: 300px; overflow-y: auto; border-radius: 8px; font-size: 0.8rem; white-space: pre-wrap;"></div>
            </div>
        </div>
    `,
};

function navigate(page) {
    currentView = page;
    // Reset searching and sorting when navigating away from dosen page
    if (page !== 'dosen') {
        sortColumn = null;
        sortDirection = 'asc';
        searchTerm = '';
    }

    // Update Active Link
    navItems.forEach(item => {
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Render Content
    if (views[page]) {
        mainContent.innerHTML = views[page]();
    }
}

// Global function for tab switching
window.switchDosenTab = (tabId) => {
    currentDosenTab = tabId;
    sortColumn = null;  // Reset sorting when switching tabs
    sortDirection = 'asc';
    searchTerm = ''; // Reset search when switching tabs
    if (currentView === 'dosen') {
        mainContent.innerHTML = views.dosen();
    }
};

// Global function for sorting table
window.sortTable = (column) => {
    if (sortColumn === column) {
        // Toggle direction if same column
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // New column, default to ascending
        sortColumn = column;
        sortDirection = 'asc';
    }

    // Re-render the dosen view with sorted data
    if (currentView === 'dosen') {
        mainContent.innerHTML = views.dosen();
    }
};

// Global search function
window.performSearch = () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchTerm = searchInput.value;
        if (currentView === 'dosen') {
            mainContent.innerHTML = views.dosen();
        }
    }
};

// Real-time search saat mengetik
window.handleSearchInput = (e) => {
    searchTerm = e.target.value;
    // Debounce untuk performa lebih baik
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        if (currentView === 'dosen') {
            mainContent.innerHTML = views.dosen();
        }
    }, 300); // Wait 300ms after user stops typing
};

// Schedule day selection
// Schedule composite selection (Week + Day)
// Schedule date selection
window.selectScheduleDate = (date) => {
    selectedDate = date;
    if (currentView === 'home') {
        mainContent.innerHTML = views.home();
    }
};

/* DEPRECATED: Old handlers, kept to avoid immediate breakage if clicked before refresh */
window.selectScheduleDay = () => { };
window.selectScheduleWeek = () => { };

// View slot details
window.viewSlotDetails = (day, time, room) => {
    const slot = MOCK_DATA.slots.find(s =>
        s.day === day &&
        s.time === time &&
        s.room === room
    );

    if (!slot) {
        alert('Slot tidak ditemukan');
        return;
    }

    const details = `
📅 Hari: ${day}
⏰ Waktu: ${time}
🏢 Ruangan: ${room}
👤 Mahasiswa: ${slot.student || '-'}
👨‍🏫 Penguji: ${slot.examiners ? slot.examiners.join(', ') : '-'}
    `.trim();

    alert(details);
};

// Clear search function
window.clearSearch = () => {
    searchTerm = '';
    if (currentView === 'dosen') {
        mainContent.innerHTML = views.dosen();
    }
};

// --- Fitur Tambah Dosen ---

// --- Fitur Tambah Dosen (Hybrid: SDM & Manual) ---

// Helper: Get SDM candidates that are not yet in current faculty
function getSDMCandidates(searchTerm = '') {
    const sdmData = MOCK_DATA.masterDosen || [];
    const currentFaculty = currentDosenTab.toUpperCase();
    const existingDosen = MOCK_DATA.facultyData[currentFaculty] || [];

    // Get NIKs that already exist in current faculty
    const existingNIKs = new Set(existingDosen.map(d => d.nik));

    // Filter SDM data: only Dosen status, not already in faculty
    let candidates = sdmData.filter(sdm =>
        sdm.status && sdm.status.toLowerCase().includes('dosen') &&
        !existingNIKs.has(sdm.nik)
    );

    // Apply search filter if provided
    if (searchTerm && searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        candidates = candidates.filter(sdm =>
            (sdm.nama && sdm.nama.toLowerCase().includes(term)) ||
            (sdm.nik && sdm.nik.toLowerCase().includes(term)) ||
            (sdm.nidn && sdm.nidn.toLowerCase().includes(term))
        );
    }

    return candidates;
}

// Helper: Render candidate rows for SDM search
function renderCandidateRows(candidates) {
    if (!candidates || candidates.length === 0) {
        return '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Tidak ada kandidat ditemukan</div>';
    }

    return candidates.map(sdm => `
        <div class="candidate-row" style="padding: 0.75rem; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: background 0.2s;" 
             onmouseover="this.style.background='var(--hover-bg)'" 
             onmouseout="this.style.background='transparent'"
             onclick="window.addDosenFromSDM('${sdm.nik}')">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${sdm.nama}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        NIK: ${sdm.nik} ${sdm.nidn ? '| NIDN: ' + sdm.nidn : ''}
                    </div>
                </div>
                <button type="button" style="padding: 4px 12px; font-size: 0.75rem; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">
                    + Tambah
                </button>
            </div>
        </div>
    `).join('');
}

// Handle search in modal
window.handleSDMSearchInModal = (event) => {
    const searchTerm = event.target.value;
    const candidates = getSDMCandidates(searchTerm).slice(0, 10);
    const listContainer = document.getElementById('sdmCandidatesList');
    if (listContainer) {
        listContainer.innerHTML = renderCandidateRows(candidates);
    }
};

// Add dosen from SDM database
window.addDosenFromSDM = (nik) => {
    const sdmData = MOCK_DATA.masterDosen || [];
    const selectedDosen = sdmData.find(s => s.nik === nik);

    if (!selectedDosen) {
        alert('Dosen tidak ditemukan di database SDM');
        return;
    }

    const currentFaculty = currentDosenTab.toUpperCase();
    const newDosen = {
        nomor: MOCK_DATA.facultyData[currentFaculty].length + 1,
        nama: selectedDosen.nama,
        nik: selectedDosen.nik,
        prodi: '-', // User can edit this later
        fakultas: currentFaculty,
        matchResult: {
            matched: true,
            type: 'manual_sdm',
            score: 100,
            sdm: selectedDosen
        }
    };

    // Add to data
    MOCK_DATA.facultyData[currentFaculty].unshift(newDosen);

    // Refresh view
    mainContent.innerHTML = views.dosen();

    // Close modal
    window.toggleAddDosenModal(false);

    // Show feedback
    alert(`Dosen ${newDosen.nama} berhasil ditambahkan ke ${currentFaculty}!`);
};

window.toggleAddDosenModal = (show) => {
    const modal = document.getElementById('addDosenModal');
    if (show) {
        // Reset modal content
        if (modal) modal.remove();

        const modalContainer = document.createElement('div');
        modalContainer.id = 'addDosenModal';
        modalContainer.className = 'modal-overlay';

        // Initial View: Search SDM
        renderModalContent(modalContainer, 'search');

        document.body.appendChild(modalContainer);
        setTimeout(() => modalContainer.classList.add('active'), 10);
    } else {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }
};

function renderModalContent(container, mode) {
    if (mode === 'search') {
        const candidates = getSDMCandidates().slice(0, 10);
        container.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <h2 style="margin-bottom: 1rem;">Tambah Dosen ke ${currentDosenTab.toUpperCase()}</h2>
                <div style="margin-bottom: 1.5rem; display:flex; justify-content:space-between; align-items:center;">
                    <p class="subtitle" style="margin:0;">Cari dari Database SDM (Disarankan)</p>
                    <button class="btn-secondary" style="font-size:0.75rem; padding:4px 8px;" onclick="switchModalMode('manual')">Input Manual ➝</button>
                </div>
                
                <div class="form-group">
                    <input type="text" id="sdmSearchInput" class="form-input" placeholder="Cari nama atau NIK..." oninput="window.handleSDMSearchInModal(event)">
                </div>

                <div id="sdmCandidatesList" style="max-height: 250px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 8px;">
                    ${renderCandidateRows(candidates)}
                </div>

                <div class="modal-footer">
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-right:auto;">
                        Dosen tidak ditemukan? Gunakan <b>Input Manual</b>.
                    </div>
                    <button type="button" class="btn-secondary" onclick="window.toggleAddDosenModal(false)">Batal</button>
                </div>
            </div>`;
    } else if (mode === 'manual') {
        container.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <h2 style="margin-bottom: 1rem;">Input Manual Dosen (${currentDosenTab.toUpperCase()})</h2>
                <div style="margin-bottom: 1.5rem; background: var(--bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border);">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">
                        ⚠️ <b>Perhatian:</b> Data yang diinput manual akan berstatus <span style="color:#ef4444;">Unmatched</span> sampai data SDM diperbarui oleh admin.
                    </p>
                </div>

                <form onsubmit="window.saveNewDosen(event)">
                    <div class="form-group">
                        <label class="form-label">Nama Lengkap (Termasuk Gelar)</label>
                        <input type="text" name="nama" class="form-input" required placeholder="Contoh: Dr. Budi Santoso, M.Kom">
                    </div>
                    <div class="form-group">
                        <label class="form-label">NIK (Nomor Induk Karyawan)</label>
                        <input type="text" name="nik" class="form-input" required placeholder="Contoh: 190.12.3456">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Program Studi</label>
                        <select name="prodi" class="form-input" required>
                             <option value="" disabled selected>Pilih Prodi...</option>
                             <option value="Informatika">Informatika</option>
                             <option value="Sistem Informasi">Sistem Informasi</option>
                             <option value="Teknologi Informasi">Teknologi Informasi</option>
                             <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                             <option value="Geografi">Geografi</option>
                             <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="switchModalMode('search')">⬅ Kembali ke Cari</button>
                        <button type="submit">Simpan Manual</button>
                    </div>
                </form>
            </div>`;
    }
}

window.switchModalMode = (mode) => {
    const container = document.getElementById('addDosenModal');
    renderModalContent(container, mode);
};


window.saveNewDosen = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDosen = {
        nomor: MOCK_DATA.facultyData[currentDosenTab.toUpperCase()].length + 1,
        nama: formData.get('nama'),
        nik: formData.get('nik'),
        prodi: formData.get('prodi'),
        fakultas: currentDosenTab.toUpperCase(),
        matchResult: { matched: false } // Default state
    };

    // Add to data
    MOCK_DATA.facultyData[currentDosenTab.toUpperCase()].unshift(newDosen); // Add to top

    // Re-run matching for this new guy (in case he matches existing SDM data)
    processMatching();

    // Refresh view
    mainContent.innerHTML = views.dosen();

    // Close modal
    window.toggleAddDosenModal(false);

    // Show quick feedback
    alert(`Dosen ${newDosen.nama} berhasil ditambahkan!`);
};

// --- Fitur Data Mahasiswa ---

window.toggleAddMahasiswaModal = (show) => {
    const modalId = 'addMahasiswaModal';
    let modal = document.getElementById(modalId);

    if (show) {
        if (modal) modal.remove();

        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal-overlay';

        // Ambil daftar dosen dari semua fakultas untuk opsi pembimbing
        const allDosen = [
            ...(MOCK_DATA.facultyData.FIK || []),
            ...(MOCK_DATA.facultyData.FES || []),
            ...(MOCK_DATA.facultyData.FST || [])
        ].sort((a, b) => a.nama.localeCompare(b.nama));

        const dosenOptions = allDosen.map(d => `<option value="${d.nama}">${d.nama}</option>`).join('');

        modalContainer.innerHTML = `
            <div class="modal-content">
                <h2 style="margin-bottom: 1rem;">Tambah Data Mahasiswa</h2>
                <form onsubmit="window.saveNewMahasiswa(event)">
                    <div class="form-group">
                        <label class="form-label">NIM</label>
                        <input type="text" name="nim" class="form-input" required placeholder="Contoh: 22.11.1234">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nama Mahasiswa</label>
                        <input type="text" name="nama" class="form-input" required placeholder="Nama Lengkap">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Program Studi</label>
                        <select name="prodi" class="form-input" required style="width:100%; padding: 0.75rem; border:1px solid var(--border); border-radius:10px;">
                             <option value="" disabled selected>Pilih Prodi...</option>
                             <option value="Informatika">Informatika</option>
                             <option value="Sistem Informasi">Sistem Informasi</option>
                             <option value="Teknologi Informasi">Teknologi Informasi</option>
                             <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                             <option value="Geografi">Geografi</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Dosen Pembimbing</label>
                         <select name="pembimbing" class="form-input" style="width:100%; padding: 0.75rem; border:1px solid var(--border); border-radius:10px;">
                             <option value="">-- Pilih Pembimbing (Opsional) --</option>
                             ${dosenOptions}
                        </select>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Pastikan data dosen sudah diinput di menu Data Dosen.</p>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="window.toggleAddMahasiswaModal(false)">Batal</button>
                        <button type="submit">Simpan</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modalContainer);
        setTimeout(() => modalContainer.classList.add('active'), 10);
    } else {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }
};

window.saveNewMahasiswa = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validasi NIM unik
    const newNim = formData.get('nim');
    if (MOCK_DATA.mahasiswa.some(m => m.nim === newNim)) {
        alert('NIM sudah terdaftar!');
        return;
    }

    const newMahasiswa = {
        nim: newNim,
        nama: formData.get('nama'),
        prodi: formData.get('prodi'),
        pembimbing: formData.get('pembimbing')
    };

    MOCK_DATA.mahasiswa.push(newMahasiswa);

    // Refresh view
    if (currentView === 'mahasiswa') {
        mainContent.innerHTML = views.mahasiswa();
    }

    window.toggleAddMahasiswaModal(false);
    // Optional: alert('Mahasiswa berhasil ditambahkan');
};

window.deleteMahasiswa = (nim) => {
    if (confirm('Yakin ingin menghapus data mahasiswa ini?')) {
        MOCK_DATA.mahasiswa = MOCK_DATA.mahasiswa.filter(m => m.nim !== nim);
        if (currentView === 'mahasiswa') {
            mainContent.innerHTML = views.mahasiswa();
        }
    }
};

window.toggleDosenScheduling = (faculty, nik) => {
    const data = MOCK_DATA.facultyData[faculty];
    if (!data) return;

    const dosen = data.find(d => d.nik === nik);
    if (dosen) {
        // Toggle status exclude
        // Jika exclude undefined/false -> jadi true (OFF)
        // Jika exclude true -> jadi false (ON)
        dosen.exclude = !dosen.exclude;

        // Refresh view without full reload context
        // Kita hanya perlu update tabel, tapi re-render full view paling aman
        if (currentView === 'dosen') {
            mainContent.innerHTML = views.dosen();
        }
    }
};

window.clearSearch = () => {
    searchTerm = '';
    if (currentView === 'dosen') {
        mainContent.innerHTML = views.dosen();
    }
};

window.deleteSlot = (date, time, room) => {
    if (confirm('Hapus jadwal ini?')) {
        MOCK_DATA.slots = MOCK_DATA.slots.filter(s =>
            !(s.date === date && s.time === time && s.room === room)
        );
        if (currentView === 'home') {
            mainContent.innerHTML = views.home();
        }
    }
};

window.viewAndHighlightSchedule = (studentName) => {
    const slot = MOCK_DATA.slots.find(s => s.student === studentName);
    if (!slot) {
        alert('Jadwal belum tersedia untuk mahasiswa ini.');
        return;
    }

    // Navigate to the date
    selectedDate = slot.date;
    navigate('home');

    // Wait for render, then highlight the specific slot
    setTimeout(() => {
        // Find all room slots
        const allSlots = document.querySelectorAll('.room-slot');

        allSlots.forEach(slotEl => {
            // Check if this is the matching slot by examining the onclick attribute
            const onclickAttr = slotEl.getAttribute('onclick');
            if (onclickAttr &&
                onclickAttr.includes(slot.date) &&
                onclickAttr.includes(slot.time) &&
                onclickAttr.includes(slot.room)) {

                // Add highlight animation
                slotEl.classList.add('highlight-blink');

                // Scroll into view
                slotEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });

                // Remove highlight after animation completes
                setTimeout(() => {
                    slotEl.classList.remove('highlight-blink');
                }, 3000);
            }
        });
    }, 400);
};

window.moveSlotToClipboard = (studentName) => {
    if (!studentName) {
        MOCK_DATA.clipboard = null;
    } else {
        const slot = MOCK_DATA.slots.find(s => s.student === studentName);
        if (slot) {
            MOCK_DATA.clipboard = { ...slot };
            // Jangan hapus rujukan lama dulu, hapus saat paste berhasil atau biarkan jika ingin 'copy'
            // Tapi untuk 'move', kita hapus yang lama
            MOCK_DATA.slots = MOCK_DATA.slots.filter(s => s.student !== studentName);
        }
    }
    mainContent.innerHTML = views.home();
};

// Individual Student Scheduling Function
window.scheduleIndividualStudent = async (nim) => {
    const mahasiswa = MOCK_DATA.mahasiswa.find(m => m.nim === nim);
    if (!mahasiswa) {
        alert('Data mahasiswa tidak ditemukan!');
        return;
    }

    // Check if already scheduled
    if (MOCK_DATA.slots.some(s => s.student === mahasiswa.nama)) {
        alert(`${mahasiswa.nama} sudah memiliki jadwal!`);
        return;
    }

    // Use the same scheduling logic
    const allDosen = getAllDosen();
    const examinerCounts = {}; // Fresh counter for this individual

    // Count existing assignments
    MOCK_DATA.slots.forEach(slot => {
        slot.examiners.forEach(examiner => {
            examinerCounts[examiner] = (examinerCounts[examiner] || 0) + 1;
        });
    });

    // Helper function to find examiners
    const findExaminers = (pembimbing, date, time) => {
        let candidates = [];
        for (const d of allDosen) {
            if (candidates.length >= 2) break;
            if (d.nama !== pembimbing) {
                if (!isDosenAvailable(d.nama, date, time)) continue;
                const currentCount = examinerCounts[d.nama] || 0;
                if (currentCount >= MAX_EXAMINER_ASSIGNMENTS) continue;
                candidates.push(d.nama);
            }
        }
        return candidates.length < 2 ? null : candidates;
    };

    // Try to find a suitable slot
    for (const dateObj of DATES) {
        const date = dateObj.value;
        const day = dateObj.label;

        for (const time of TIMES) {
            if (day === 'Jumat' && time === '11:30') continue;

            for (const room of ROOMS) {
                // Check if slot is occupied
                if (MOCK_DATA.slots.some(s => s.date === date && s.time === time && s.room === room)) {
                    continue;
                }

                // Check pembimbing availability
                if (!mahasiswa.pembimbing) continue;
                const pbData = allDosen.find(d => d.nama === mahasiswa.pembimbing);
                if (!pbData || pbData.exclude) continue;
                if (!isDosenAvailable(mahasiswa.pembimbing, date, time)) continue;

                // Find examiners
                const examiners = findExaminers(mahasiswa.pembimbing, date, time);
                if (!examiners) continue;

                // SUCCESS! Book the slot
                const finalExaminers = [...examiners, mahasiswa.pembimbing];
                MOCK_DATA.slots.push({
                    date: date,
                    time: time,
                    room: room,
                    student: mahasiswa.nama,
                    examiners: finalExaminers
                });

                alert(`✅ Berhasil!\n\n${mahasiswa.nama} dijadwalkan di:\n📅 ${dateObj.display} (${day})\n⏰ ${time}\n🏢 ${room}`);

                // Refresh view
                if (currentView === 'mahasiswa') {
                    mainContent.innerHTML = views.mahasiswa();
                }
                return;
            }
        }
    }

    // Failed to schedule
    alert(`❌ Gagal menjadwalkan ${mahasiswa.nama}\n\nTidak ada slot yang tersedia atau bentrok jadwal dosen.`);
};


window.pasteSlotFromClipboard = (toDate, toTime, toRoom) => {
    if (!MOCK_DATA.clipboard) return;

    const studentName = MOCK_DATA.clipboard.student;
    const oldSlot = MOCK_DATA.clipboard;

    // VALIDASI
    const conflicts = [];
    oldSlot.examiners.forEach(dosen => {
        if (!isDosenAvailable(dosen, toDate, toTime)) {
            conflicts.push(dosen);
        }
    });

    if (conflicts.length > 0) {
        alert(`Gagal Tempel: Bentrok Jadwal!\n\nDosen berikut tidak tersedia di slot ini:\n- ${conflicts.join('\n- ')}`);
        return;
    }

    // Eksekusi
    MOCK_DATA.slots.push({
        ...oldSlot,
        date: toDate,
        time: toTime,
        room: toRoom
    });

    MOCK_DATA.clipboard = null;
    logToLogic(`📋 Clipboard Paste: ${studentName} dipindah ke [${toDate} ${toTime} ${toRoom}]`);
    mainContent.innerHTML = views.home();
};

// --- DRAG AND DROP HANDLERS ---
window.onDragStart = (e, studentName, fromDate, fromTime, fromRoom) => {
    e.dataTransfer.setData('studentName', studentName);
    e.dataTransfer.setData('fromDate', fromDate);
    e.dataTransfer.setData('fromTime', fromTime);
    e.dataTransfer.setData('fromRoom', fromRoom);
    e.target.style.opacity = '0.5';
};

window.onDragOver = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    if (target.classList.contains('slot-empty')) {
        target.style.background = 'var(--primary-subtle)';
        target.style.border = '2px dashed var(--primary)';
    }
};

window.onDragLeave = (e) => {
    const target = e.currentTarget;
    if (target.classList.contains('slot-empty')) {
        target.style.background = 'var(--bg-subtle)';
        target.style.border = '2px dashed var(--border)';
    }
};

window.onDrop = (e, toDate, toTime, toRoom) => {
    e.preventDefault();
    const studentName = e.dataTransfer.getData('studentName');
    const fromDate = e.dataTransfer.getData('fromDate');
    const fromTime = e.dataTransfer.getData('fromTime');
    const fromRoom = e.dataTransfer.getData('fromRoom');

    // 1. Cari data slot lama
    const oldSlotIndex = MOCK_DATA.slots.findIndex(s =>
        s.student === studentName && s.date === fromDate && s.time === fromTime && s.room === fromRoom
    );

    if (oldSlotIndex === -1) return;
    const oldSlot = MOCK_DATA.slots[oldSlotIndex];

    // 2. VALIDASI ATURAN
    // A. Cek apakah target sudah terisi
    const targetOccupied = MOCK_DATA.slots.some(s =>
        s.date === toDate && s.time === toTime && s.room === toRoom
    );
    if (targetOccupied) {
        alert('Gagal: Slot tujuan sudah terisi mahasiswa lain!');
        navigate('home');
        return;
    }

    // B. Cek ketersediaan semua tim (Pb + Penguji) di slot baru
    const conflicts = [];
    oldSlot.examiners.forEach(dosen => {
        if (!isDosenAvailable(dosen, toDate, toTime, studentName)) {
            conflicts.push(dosen);
        }
    });

    if (conflicts.length > 0) {
        alert(`Gagal: Bentrok Jadwal!\n\nDosen berikut tidak tersedia di slot baru:\n- ${conflicts.join('\n- ')}`);
        navigate('home');
        return;
    }

    // 3. Eksekusi Perpindahan
    MOCK_DATA.slots[oldSlotIndex] = {
        ...oldSlot,
        date: toDate,
        time: toTime,
        room: toRoom
    };

    logToLogic(`📍 Manual Move: ${studentName} pindah ke [${toDate} ${toTime} ${toRoom}]`);
    navigate('home');
};

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        navigate(page);
    });
});

// Attach functions to window explicitly to prevent scope issues
window.toggleAddDosenModal = window.toggleAddDosenModal;
window.saveNewDosen = window.saveNewDosen;
window.exportSDMData = window.exportSDMData;
window.triggerImportSDM = window.triggerImportSDM;
window.handleImportSDM = window.handleImportSDM;
window.switchModalMode = window.switchModalMode;
window.handleSDMSearchInModal = window.handleSDMSearchInModal;
window.addDosenFromSDM = window.addDosenFromSDM;




// --- LOGIKA PENJADWALAN OTOMATIS (ALGORITMA LOOPING KETAT) ---

// Log helper
function logToLogic(message) {
    const logEl = document.getElementById('logicLog');
    const card = document.getElementById('logCard');
    if (logEl && card) {
        card.style.display = 'block';
        const time = new Date().toLocaleTimeString();
        logEl.innerHTML += `[${time}] ${message}\n`;
        logEl.scrollTop = logEl.scrollHeight;
    }
    console.log(message);
}

window.generateSchedule = async () => {
    // 1. Persiapan
    const logEl = document.getElementById('logicLog');
    if (logEl) logEl.innerHTML = ''; // Clear log

    logToLogic("🚀 MEMULAI PROSES PENJADWALAN OTOMATIS...");
    logToLogic("----------------------------------------");

    // Ambil data dan URUTKAN agar deterministik (A-Z / NIM)
    const mahasiswaList = [...MOCK_DATA.mahasiswa].sort((a, b) => a.nim.localeCompare(b.nim));

    if (mahasiswaList.length === 0) {
        logToLogic("❌ ERROR: Data mahasiswa kosong. Silakan input data mahasiswa terlebih dahulu.");
        return;
    }

    logToLogic(`📦 Ditemukan ${mahasiswaList.length} mahasiswa (Diurutkan NIM).`);

    // Reset Slot
    logToLogic("🧹 Membersihkan slot jadwal lama...");
    MOCK_DATA.slots = [];

    // Resource Constraint
    const allDosen = getAllDosen();
    logToLogic(`👥 Mengindeks ${allDosen.length} data dosen...`);

    // Tracking beban penguji untuk distribusi merata
    const examinerCounts = {};
    logToLogic(`⚖️ Soft Constraint Aktif: Maksimal ${MAX_EXAMINER_ASSIGNMENTS} tugas per dosen (kecuali pembimbing wajib).`);

    // Helper: Cari Penguji Pendamping (STRATEGI: SEQUENTIAL / FIRST-FIT + LOAD BALANCING)
    const findExaminers = (pembimbing, date, time) => {
        let candidates = [];
        for (const d of allDosen) {
            if (candidates.length >= 2) break;
            if (d.nama !== pembimbing) {
                // Check availability
                if (!isDosenAvailable(d.nama, date, time)) continue;

                // Check assignment limit (soft constraint)
                const currentCount = examinerCounts[d.nama] || 0;
                if (currentCount >= MAX_EXAMINER_ASSIGNMENTS) continue;

                candidates.push(d.nama);
            }
        }
        if (candidates.length < 2) return null;
        return candidates;
    };

    // --- CORE LOOP (SLOT-CENTRIC APPROACH) ---
    // Strategi: "Isi slot kosong dulu sampai penuh, jangan loncat"

    // 1. Generate semua kemungkinan slot secara urut (Flattened berdasarkan TANGGAL)
    const allPossibleSlots = [];
    for (const dateObj of DATES) {
        const date = dateObj.value;
        const day = dateObj.label;

        for (const time of TIMES) {
            // CONSTRAINT KHUSUS: Jumat tidak ada 11:30
            if (day === 'Jumat' && time === '11:30') continue;

            for (const room of ROOMS) {
                allPossibleSlots.push({ date, day, time, room });
            }
        }
    }

    logToLogic(`⚙️ Generate ${allPossibleSlots.length} slot potensial.`);

    let successCount = 0;
    const scheduledMahasiswaIds = new Set(); // Track NIM yang sudah dijadwal

    // 2. Loop Slot Satu per Satu
    slotLoop:
    for (const slot of allPossibleSlots) {
        const { date, day, time, room } = slot;

        // Cek apakah mahasiswa semua sudah habis?
        if (scheduledMahasiswaIds.size >= mahasiswaList.length) {
            logToLogic("✅ Semua mahasiswa sudah dijadwalkan.");
            break;
        }

        // Cari mahasiswa yang cocok untuk slot ini
        let candidateFound = null;
        let finalExaminers = null;

        for (const mhs of mahasiswaList) {
            // Skip jika sudah dijadwalkan
            if (scheduledMahasiswaIds.has(mhs.nim)) continue;

            // 1. Cek Pembimbing Available di (date, time)
            if (!mhs.pembimbing) continue;
            const pbData = allDosen.find(d => d.nama === mhs.pembimbing);
            if (!pbData || pbData.exclude) continue; // Dosen OFF
            if (!isDosenAvailable(mhs.pembimbing, date, time)) continue; // Dosen Sibuk

            // 2. Cek Penguji Pendamping
            const examiners = findExaminers(mhs.pembimbing, date, time);
            if (!examiners) continue; // Tidak dapat penguji

            candidateFound = mhs;
            finalExaminers = [...examiners, mhs.pembimbing];
            break;
        }

        if (candidateFound) {
            // Booking Slot
            MOCK_DATA.slots.push({
                date: date,
                time: time,
                room: room,
                student: candidateFound.nama,
                examiners: finalExaminers
            });

            scheduledMahasiswaIds.add(candidateFound.nim);
            successCount++;

            // Update examiner counts untuk load balancing
            finalExaminers.forEach(examiner => {
                examinerCounts[examiner] = (examinerCounts[examiner] || 0) + 1;
            });

            logToLogic(`   [${date} ${time} ${room}] ✅ Terisi: ${candidateFound.nama}`);

            // Simulasi delay visual
            await new Promise(r => setTimeout(r, 10));
        }
    }

    logToLogic("\n----------------------------------------");

    // Log distribusi beban penguji
    logToLogic("📊 DISTRIBUSI BEBAN PENGUJI:");
    const sortedExaminers = Object.entries(examinerCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Top 10

    sortedExaminers.forEach(([name, count]) => {
        const warning = count > MAX_EXAMINER_ASSIGNMENTS ? ' ⚠️ (Melebihi limit - kemungkinan pembimbing)' : '';
        logToLogic(`   ${name}: ${count} tugas${warning}`);
    });

    const sisa = mahasiswaList.length - successCount;
    if (sisa > 0) {
        logToLogic(`\n⚠️ PERINGATAN: Ada ${sisa} mahasiswa yang TIDAK BISA dijadwalkan (Konflik/Kehabisan Slot).`);
    }
    logToLogic(`🏁 SELESAI. Berhasil menjadwalkan ${successCount} dari ${mahasiswaList.length} mahasiswa.`);

    // Auto switch to Home after short delay
    setTimeout(() => {
        if (confirm("Penjadwalan Selesai! Lihat hasil di Beranda?")) {
            navigate('home');
        }
    }, 500);
};

// Call initializeApp (defined earlier at line 214)
initializeApp();
