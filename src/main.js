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
    mahasiswa: [],
    libur: [],
    slots: []
};

// Hapus selectedWeek, kita gabungkan logicnya ke selectedDayComposite
let currentView = 'home';
// Format selectedDayComposite: "Minggu 1 - Senin"
let selectedDayComposite = 'Minggu 1 - Senin';
let currentDosenTab = 'sdm';
let sortColumn = null;
let sortDirection = 'asc';
let searchTerm = '';

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

        // Daftar Hari Lengkap (2 Minggu Terakhir Februari 2026)
        // Minggu 1: 16-20 Feb, Minggu 2: 23-27 Feb
        const navigationDays = [
            { label: 'Senin', dateDisplay: '16 Feb', week: 1, id: 'Minggu 1 - Senin' },
            { label: 'Selasa', dateDisplay: '17 Feb', week: 1, id: 'Minggu 1 - Selasa' },
            { label: 'Rabu', dateDisplay: '18 Feb', week: 1, id: 'Minggu 1 - Rabu' },
            { label: 'Kamis', dateDisplay: '19 Feb', week: 1, id: 'Minggu 1 - Kamis' },
            { label: 'Jumat', dateDisplay: '20 Feb', week: 1, id: 'Minggu 1 - Jumat' },

            { label: 'Senin', dateDisplay: '23 Feb', week: 2, id: 'Minggu 2 - Senin' },
            { label: 'Selasa', dateDisplay: '24 Feb', week: 2, id: 'Minggu 2 - Selasa' },
            { label: 'Rabu', dateDisplay: '25 Feb', week: 2, id: 'Minggu 2 - Rabu' },
            { label: 'Kamis', dateDisplay: '26 Feb', week: 2, id: 'Minggu 2 - Kamis' },
            { label: 'Jumat', dateDisplay: '27 Feb', week: 2, id: 'Minggu 2 - Jumat' }
        ];

        // Current selection state
        const currentComposite = window.selectedDayComposite || 'Minggu 1 - Senin';

        // Parse current selection to get real day and week
        // Format: "Minggu X - Hari"
        const [weekStr, dayStr] = currentComposite.split(' - ');
        const selectedDay = dayStr;
        const currentWeek = parseInt(weekStr.replace('Minggu ', ''));
        const allTimes = ['08:30', '10:00', '11:30', '13:30'];

        // Filter waktu: Jumat tidak ada jam 11:30
        const times = selectedDay === 'Jumat'
            ? allTimes.filter(t => t !== '11:30')
            : allTimes;

        return `
            <header>
                <h1>Slot Jadwal Pendadaran</h1>
                <p class="subtitle">Visualisasi slot ruangan aktif berdasarkan jam dan hari.</p>
            </header>
            
            <!-- Combined Day Selector Tabs (Scrollable) -->
            <div class="tabs-container" style="overflow-x: auto; margin-bottom: 1.5rem; padding-bottom: 5px;">
                <div class="tabs" style="display: flex; flex-wrap: nowrap; width: max-content;">
                    ${navigationDays.map(item => {
            // Cek schedule existence
            const hasSchedule = MOCK_DATA.slots.some(s =>
                s.day === item.label && (s.week || 1) === item.week
            );

            // Tampilan Tab: Tanggal Besar, Hari Kecil
            return `
                        <div class="tab-item ${currentComposite === item.id ? 'active' : ''}" 
                             onclick="window.selectScheduleDayComposite('${item.id}')"
                             style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 80px; padding: 0.5rem 0.75rem; gap: 2px; height: 55px;">
                            <span style="font-weight: 700; font-size: 0.95rem; line-height: 1;">${item.dateDisplay}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted); line-height: 1;">${item.label}</span>
                            ${hasSchedule ? `<span style="position: absolute; top: 6px; right: 6px; width: 6px; height: 6px; background-color: var(--success); border-radius: 50%;"></span>` : ''}
                        </div>
                    `}).join('')}
                </div>
            </div>

            <div class="card">
                <div class="schedule-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 0.75rem; background: var(--bg); border-radius: 8px;">
                    <div>
                        <strong>${navigationDays.find(d => d.id === currentComposite).dateDisplay} (${selectedDay})</strong>
                        <span style="margin-left: 1.5rem; color: var(--text-muted);">
                            ${rooms.length} Ruangan × ${times.length} Sesi
                        </span>
                        ${selectedDay === 'Jumat' ? '<span style="margin-left: 1rem; color: #f59e0b; font-size: 0.85rem;">⚠️ Tidak ada sesi 11:30</span>' : ''}
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
                    s.day === selectedDay &&
                    s.time === time &&
                    s.room === room &&
                    (s.week || 1) === currentWeek
                );

                return `
                                <div class="room-slot ${slot ? 'slot-filled' : 'slot-empty'}" 
                                     style="padding: 0.6rem; border-radius: 8px; min-height: 100px; 
                                            background: ${slot ? '#ffffff' : 'var(--card-bg)'};
                                            border: 1px solid ${slot ? 'var(--border)' : 'transparent'};
                                            ${slot ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-left: 4px solid var(--success);' : 'background: var(--bg-subtle);'}
                                            transition: all 0.2s; cursor: ${slot ? 'pointer' : 'default'}; position: relative;"
                                     ${slot ? `onclick="window.viewSlotDetails('${selectedDay}', '${time}', '${room}')"` : ''}
                                     onmouseover="if(this.classList.contains('slot-filled')) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; }"
                                     onmouseout="if(this.classList.contains('slot-filled')) { this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'; }">
                                    ${slot ? `
                                        <div style="display: flex; flex-direction: column; height: 100%;">
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
                                        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border: 2px dashed var(--border); border-radius: 6px; background: rgba(255,255,255,0.4); color: var(--text-muted); transition: all 0.2s;">
                                            <span style="font-size: 1.2rem; opacity: 0.3;">+</span>
                                            <span style="font-size: 0.75rem; font-weight: 500; opacity: 0.6;">Tersedia</span>
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
            <button onclick="window.toggleAddMahasiswaModal(true)">+ Tambah Mahasiswa</button>
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
                        <th style="width: 80px; text-align: center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedMahasiswa.map(m => `
                        <tr>
                            <td class="text-truncate" style="font-family: monospace; font-size: 0.95rem;">${m.nim}</td>
                            <td><div style="font-weight: 600;">${m.nama}</div></td>
                            <td><span class="badge" style="background: var(--bg); border: 1px solid var(--border); color: var(--text-secondary);">${m.prodi}</span></td>
                            <td>${m.pembimbing || '<span style="color:var(--text-muted); font-style:italic;">-</span>'}</td>
                            <td style="text-align: center;">
                                <button onclick="window.deleteMahasiswa('${m.nim}')" style="background: none; border: none; padding: 4px; color: var(--text-muted); cursor: pointer;" title="Hapus">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    `).join('')}
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
                <button onclick="window.generateSchedule()" style="margin-top: 1rem; padding: 0.75rem; border-radius: 8px; border: none; background: white; color: var(--bg); font-weight: 600; cursor: pointer; width: 100%;">GENERATE ULANG JADWAL</button>
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
window.selectScheduleDayComposite = (compositeId) => {
    window.selectedDayComposite = compositeId;
    // We also update legacy simple states just in case
    const [weekStr, dayStr] = compositeId.split(' - ');
    window.selectedScheduleDay = dayStr;

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
    // Sesuai request: "Utamakan pemenuhan a ke b ke c, jangan acak"
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
    const ROOMS = ['6.3.A', '6.3.B', '6.3.C', '6.3.D', '6.3.E', '6.3.F', '6.3.G', '6.3.H'];
    const TIMES = ['08:30', '10:00', '11:30', '13:30'];
    const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']; // Asumsi 1 minggu dulu untuk tes

    // Gabungan dosen dari semua fakultas
    // Sort dosen by Nama agar pemilihan penguji juga urut A-Z (deterministik)
    const allDosen = [
        ...(MOCK_DATA.facultyData.FIK || []),
        ...(MOCK_DATA.facultyData.FES || []),
        ...(MOCK_DATA.facultyData.FST || [])
    ].sort((a, b) => a.nama.localeCompare(b.nama));

    logToLogic(`👥 Mengindeks ${allDosen.length} data dosen...`);

    // Helper: Cek ketersediaan dosen
    const isDosenAvailable = (namaDosen, day, time) => {
        // 1. Cek Exclude Status
        const dosenData = allDosen.find(d => d.nama === namaDosen);
        if (dosenData && dosenData.exclude) {
            return false;
        }

        // 2. Cek Bentrok Jadwal Lain
        const bentrok = MOCK_DATA.slots.some(slot =>
            slot.day === day &&
            slot.time === time &&
            slot.examiners.includes(namaDosen)
        );

        return !bentrok;
    };

    // Helper: Cari Penguji Pendamping (STRATEGI: SEQUENTIAL / FIRST-FIT)
    const findExaminers = (pembimbing, day, time) => {
        // Cari 2 penguji lain yang available
        // KARENA allDosen SUDAH DISORTZ A-Z, maka filter ini akan menghasilkan kandidat urut A-Z.
        // Kita ambil 2 pertama yang valid -> Pola "a ke b ke c" terpenuhi.

        let candidates = [];

        // Optimasi: Loop manual biar bisa break cepat setelah dapat 2
        for (const d of allDosen) {
            if (candidates.length >= 2) break;

            if (d.nama !== pembimbing && !d.exclude) {
                if (isDosenAvailable(d.nama, day, time)) {
                    candidates.push(d.nama);
                }
            }
        }

        if (candidates.length < 2) return null;

        return candidates; // [Penguji A, Penguji B] (Urut abjad)
    };

    // --- CORE LOOP (SLOT-CENTRIC APPROACH) ---
    // Strategi: "Isi slot kosong dulu sampai penuh, jangan loncat"
    // Kita iterasi SLOT-nya (Waktu & Ruang), lalu cari mahasiswa yang cocok.

    // 1. Generate semua kemungkinan slot secara urut (Flattened)
    const allPossibleSlots = [];
    for (const day of DAYS) {
        for (const time of TIMES) {
            // CONSTRAINT KHUSUS: Jumat tidak ada 11:30
            if (day === 'Jumat' && time === '11:30') continue;

            for (const room of ROOMS) {
                allPossibleSlots.push({ day, time, room });
            }
        }
    }

    logToLogic(`⚙️ Generate ${allPossibleSlots.length} slot potensial.`);

    let successCount = 0;
    const scheduledMahasiswaIds = new Set(); // Track NIM yang sudah dijadwal

    // 2. Loop Slot Satu per Satu
    slotLoop:
    for (const slot of allPossibleSlots) {
        const { day, time, room } = slot;

        // Cek apakah mahasiswa semua sudah habis?
        if (scheduledMahasiswaIds.size >= mahasiswaList.length) {
            logToLogic("✅ Semua mahasiswa sudah dijadwalkan.");
            break;
        }

        // Cari mahasiswa yang cocok untuk slot ini
        // Prioritaskan urutan NIM/Nama yang sudah disort di awal
        let candidateFound = null;
        let finalExaminers = null;

        for (const mhs of mahasiswaList) {
            // Skip jika sudah dijadwalkan
            if (scheduledMahasiswaIds.has(mhs.nim)) continue;

            // Validasi: Apakah slot ini 'available' untuk mhs & tim dosennya?

            // 1. Cek Pembimbing Available di (day, time)
            if (!mhs.pembimbing) continue;
            const pbData = allDosen.find(d => d.nama === mhs.pembimbing);
            if (!pbData || pbData.exclude) continue; // Dosen OFF
            if (!isDosenAvailable(mhs.pembimbing, day, time)) continue; // Dosen Sibuk

            // 2. Cek Penguji Pendamping
            const examiners = findExaminers(mhs.pembimbing, day, time);
            if (!examiners) continue; // Tidak dapat penguji

            // MATCH! Mahasiswa ini bisa masuk slot ini.
            candidateFound = mhs;
            finalExaminers = [...examiners, mhs.pembimbing];
            break; // Ambil yang pertama cocok, langsung isi slot ini.
        }

        if (candidateFound) {
            // Booking Slot
            MOCK_DATA.slots.push({
                week: 1,
                day: day,
                time: time,
                room: room,
                student: candidateFound.nama,
                examiners: finalExaminers
            });

            scheduledMahasiswaIds.add(candidateFound.nim);
            successCount++;

            logToLogic(`   [${day} ${time} ${room}] ✅ Terisi oleh: ${candidateFound.nama}`);

            // Simulasi delay visual
            await new Promise(r => setTimeout(r, 20));
        } else {
            // Slot ini kosong karena tidak ada mahasiswa/dosen yang cocok
            // logToLogic(`   [${day} ${time} ${room}] 💨 Kosong (Tidak ada match)`);
        }
    }

    logToLogic("\n----------------------------------------");
    const sisa = mahasiswaList.length - successCount;
    if (sisa > 0) {
        logToLogic(`⚠️ PERINGATAN: Ada ${sisa} mahasiswa yang TIDAK BISA dijadwalkan (Konflik/Kehabisan Slot).`);
    }
    logToLogic(`🏁 SELESAI. Berhasil menjadwalkan ${successCount} dari ${mahasiswaList.length} mahasiswa.`);

    // Auto switch to Home after short delay
    setTimeout(() => {
        if (confirm("Penjadwalan Selesai (Metode Padat)! Lihat hasil di Beranda?")) {
            navigate('home');
        }
    }, 1000);
};

// Call initializeApp (defined earlier at line 214)
initializeApp();
