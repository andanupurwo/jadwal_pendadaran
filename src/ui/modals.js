import { MOCK_DATA, appState, DATES, saveMahasiswaToStorage, saveLiburToStorage } from '../data/store.js';
import { getAllDosen } from '../utils/helpers.js';
import * as views from './pages/index.js';

export function toggleAddMahasiswaModal(show) {
    const modalId = 'addMahasiswaModal';
    let modal = document.getElementById(modalId);
    if (show) {
        if (modal) modal.remove();
        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal-overlay';
        const dosenOptions = getAllDosen().map(d => `<option value="${d.nama}">${d.nama}</option>`).join('');

        modalContainer.innerHTML = `
            <div class="modal-content">
                <h2>Tambah Mahasiswa</h2>
                <form onsubmit="window.saveNewMahasiswa(event)">
                    <div class="form-group"><label>NIM</label><input type="text" name="nim" class="form-input" required></div>
                    <div class="form-group"><label>Nama</label><input type="text" name="nama" class="form-input" required></div>
                    <div class="form-group"><label>Prodi</label><select name="prodi" class="form-input" required><option value="Informatika">Informatika</option><option value="Sistem Informasi">Sistem Informasi</option><option value="Teknologi Informasi">Teknologi Informasi</option><option value="Ilmu Komunikasi">Ilmu Komunikasi</option><option value="Geografi">Geografi</option></select></div>
                    <div class="form-group"><label>Pembimbing</label><select name="pembimbing" class="form-input"><option value="">-- Pilih --</option>${dosenOptions}</select></div>
                    <div class="modal-footer"><button type="button" class="btn-secondary" onclick="window.toggleAddMahasiswaModal(false)">Batal</button><button type="submit">Simpan</button></div>
                </form>
            </div>
        `;
        document.body.appendChild(modalContainer);
        setTimeout(() => modalContainer.classList.add('active'), 10);
    } else if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

export function saveNewMahasiswa(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nim = formData.get('nim');
    if (MOCK_DATA.mahasiswa.some(m => m.nim === nim)) return alert('NIM sudah terdaftar!');

    MOCK_DATA.mahasiswa.push({ nim, nama: formData.get('nama'), prodi: formData.get('prodi'), pembimbing: formData.get('pembimbing') });
    saveMahasiswaToStorage();
    if (appState.currentView === 'mahasiswa') document.getElementById('main-content').innerHTML = views.mahasiswa();
    toggleAddMahasiswaModal(false);
}

export function toggleAddLiburModal(show, editIndex = null) {
    const modalId = 'addLiburModal';
    let modal = document.getElementById(modalId);
    if (!show) {
        if (modal) { modal.classList.remove('active'); setTimeout(() => modal.remove(), 300); }
        return;
    }

    if (modal) modal.remove();
    const isEdit = editIndex !== null;
    const data = isEdit ? MOCK_DATA.libur[editIndex] : { type: 'date', days: [], times: [] };
    const modalContainer = document.createElement('div');
    modalContainer.id = modalId;
    modalContainer.className = 'modal-overlay';

    const dosenOpts = getAllDosen().map(d => `<option value="${d.nik}" ${d.nik === data.dosenId ? 'selected' : ''}>${d.nama}</option>`).join('');

    const dateChecklist = DATES.map(d => `
        <label style="display:flex; align-items:center; gap:10px; background:white; padding:10px 14px; border-radius:12px; border:1px solid var(--border); cursor:pointer; transition: all 0.2s;" class="date-checkbox-item">
            <input type="checkbox" name="dates" value="${d.value}" ${data.dates?.includes(d.value) ? 'checked' : ''} style="width:18px; height:18px;">
            <div style="display:flex; flex-direction:column;">
                <span style="font-weight:700; font-size:0.95rem;">${d.display}</span>
                <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${d.label}</span>
            </div>
        </label>
    `).join('');

    modalContainer.innerHTML = `
        <div class="modal-content" style="max-width:650px;">
            <div style="margin-bottom:1.5rem; text-align:center;">
                <h2 style="margin-bottom:0.5rem;">${isEdit ? '✏️ Edit Jadwal Blokir' : '🚫 Blokir Jadwal Dosen'}</h2>
                <p style="color:var(--text-secondary); font-size:0.9rem;">Pilih tanggal-tanggal di mana dosen <b>tidak bisa</b> dijadwalkan.</p>
            </div>
            
            <form onsubmit="window.saveNewLibur(event)">
                <input type="hidden" name="editIndex" value="${isEdit ? editIndex : -1}">
                
                <div class="form-group">
                    <label style="font-weight:700;">1. Pilih Nama Dosen</label>
                    <select name="dosenId" class="form-input" style="font-size:1rem; padding:12px; border-radius:12px; font-weight:600; background:#f8f9fa;" required>${dosenOpts}</select>
                </div>

                <div class="form-group">
                    <label style="font-weight:700;">2. Centang Tanggal Libur/Berhalangan</label>
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:12px; padding:15px; background:rgba(0,0,0,0.02); border-radius:16px; border:1px dashed var(--border);">
                        ${dateChecklist}
                    </div>
                </div>

                <div class="form-group">
                    <label style="font-weight:700;">3. Alasan (Opsional)</label>
                    <input type="text" name="reason" class="form-input" placeholder="Misal: Umroh, Sakit, atau Ada Kelas" value="${data.reason || ''}" style="padding:12px; border-radius:12px;">
                </div>

                <div class="modal-footer" style="margin-top:2rem; gap:12px;">
                    <button type="button" class="btn-secondary" onclick="window.toggleAddLiburModal(false)" style="flex:1; padding:12px;">Batal</button>
                    <button type="submit" class="btn-primary" style="flex:2; padding:12px; font-weight:800; background:var(--danger); box-shadow:0 4px 12px rgba(255,59,48,0.2);">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modalContainer);
    setTimeout(() => modalContainer.classList.add('active'), 10);
}

export function saveNewLibur(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const idx = parseInt(f.get('editIndex'));

    const entry = {
        dosenId: f.get('dosenId'),
        dates: f.getAll('dates'), // Collects all checked date values
        reason: f.get('reason')
    };

    if (idx >= 0) MOCK_DATA.libur[idx] = entry;
    else MOCK_DATA.libur.push(entry);

    saveLiburToStorage();
    if (appState.currentView === 'libur') document.getElementById('main-content').innerHTML = views.libur();
    toggleAddLiburModal(false);
}

export function toggleAddDosenModal(show) {
    const modalId = 'addDosenModal';
    let modal = document.getElementById(modalId);

    if (show) {
        if (modal) modal.remove();

        const currentFaculty = appState.currentDosenTab.toUpperCase();
        const modalContainer = document.createElement('div');
        modalContainer.id = modalId;
        modalContainer.className = 'modal-overlay';

        modalContainer.innerHTML = `
            <div class="modal-content" style="max-width:600px;">
                <h2>➕ Tambah Dosen ${currentFaculty}</h2>
                <p class="subtitle" style="margin-bottom:1.5rem;">Tambahkan dosen baru ke fakultas ${currentFaculty}</p>
                
                <div style="margin-bottom:1.5rem;">
                    <div style="display:flex; gap:10px; background:rgba(0,0,0,0.03); padding:4px; border-radius:12px;">
                        <button type="button" class="tab-btn active" onclick="window.switchDosenInputMode('csv')" data-mode="csv" style="flex:1; padding:10px; border:none; background:white; border-radius:10px; cursor:pointer; font-weight:700;">Import CSV</button>
                        <button type="button" class="tab-btn" onclick="window.switchDosenInputMode('manual')" data-mode="manual" style="flex:1; padding:10px; border:none; background:transparent; border-radius:10px; cursor:pointer; font-weight:700;">Input Manual</button>
                    </div>
                </div>

                <div id="csvInputSection">
                    <div style="text-align:center; padding:2rem; background:rgba(0,0,0,0.02); border-radius:12px; border:2px dashed var(--border);">
                        <div style="font-size:3rem; margin-bottom:1rem;">📄</div>
                        <p style="margin-bottom:1rem; font-weight:600;">Upload file CSV dengan format:</p>
                        <code style="display:block; background:white; padding:10px; border-radius:8px; margin-bottom:1rem; font-size:0.85rem;">No,Nama,NIK,Prodi,Fakultas</code>
                        <button type="button" onclick="document.getElementById('csvDosenInput').click()" class="btn-primary">Pilih File CSV</button>
                        <input type="file" id="csvDosenInput" accept=".csv" style="display:none;" onchange="window.handleDosenCSVUpload(event)">
                    </div>
                </div>

                <div id="manualInputSection" style="display:none;">
                    <form onsubmit="window.saveNewDosen(event)">
                        <input type="hidden" name="fakultas" value="${currentFaculty}">
                        <div class="form-group">
                            <label>NIK</label>
                            <input type="text" name="nik" class="form-input" required placeholder="Contoh: 12345678">
                        </div>
                        <div class="form-group">
                            <label>Nama Lengkap</label>
                            <input type="text" name="nama" class="form-input" required placeholder="Contoh: Dr. John Doe, M.Kom">
                        </div>
                        <div class="form-group">
                            <label>Program Studi</label>
                            <input type="text" name="prodi" class="form-input" required placeholder="Contoh: Informatika">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="window.toggleAddDosenModal(false)">Batal</button>
                            <button type="submit" class="btn-primary">Simpan Dosen</button>
                        </div>
                    </form>
                </div>

                <div style="text-align:center; margin-top:1rem;">
                    <button type="button" class="btn-secondary" onclick="window.toggleAddDosenModal(false)">Tutup</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalContainer);
        setTimeout(() => modalContainer.classList.add('active'), 10);
    } else if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

export function switchDosenInputMode(mode) {
    const csvSection = document.getElementById('csvInputSection');
    const manualSection = document.getElementById('manualInputSection');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        if (tab.dataset.mode === mode) {
            tab.classList.add('active');
            tab.style.background = 'white';
        } else {
            tab.classList.remove('active');
            tab.style.background = 'transparent';
        }
    });

    if (mode === 'csv') {
        csvSection.style.display = 'block';
        manualSection.style.display = 'none';
    } else {
        csvSection.style.display = 'none';
        manualSection.style.display = 'block';
    }
}

export function saveNewDosen(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fakultas = formData.get('fakultas');
    const nik = formData.get('nik').trim();
    const nama = formData.get('nama').trim();
    const prodi = formData.get('prodi').trim();

    // Check if NIK already exists
    if (MOCK_DATA.facultyData[fakultas]?.some(d => d.nik === nik)) {
        alert('NIK sudah terdaftar di fakultas ini!');
        return;
    }

    // Add new dosen
    const newDosen = {
        nomor: (MOCK_DATA.facultyData[fakultas]?.length || 0) + 1,
        nama,
        nik,
        prodi,
        fakultas,
        matchResult: { matched: false, type: 'manual_entry', score: 0 }
    };

    if (!MOCK_DATA.facultyData[fakultas]) {
        MOCK_DATA.facultyData[fakultas] = [];
    }

    MOCK_DATA.facultyData[fakultas].push(newDosen);

    // Refresh view
    if (appState.currentView === 'dosen') {
        document.getElementById('main-content').innerHTML = views.dosen();
    }

    toggleAddDosenModal(false);
    alert(`✅ Dosen "${nama}" berhasil ditambahkan ke ${fakultas}!`);
}

export function handleDosenCSVUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const csvText = event.target.result;
        const lines = csvText.split('\n');
        const currentFaculty = appState.currentDosenTab.toUpperCase();

        let added = 0;
        let skipped = 0;

        // Skip header, start from line 1
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const fields = line.split(',').map(f => f.trim().replace(/^"|"$/g, ''));
            if (fields.length < 4) continue;

            const [no, nama, nik, prodi, fakultas] = fields;
            const cleanNik = nik.replace(/^NIK\s+/, '').trim();

            // Only add if faculty matches or not specified
            if (fakultas && fakultas !== currentFaculty) {
                skipped++;
                continue;
            }

            // Check if already exists
            if (MOCK_DATA.facultyData[currentFaculty]?.some(d => d.nik === cleanNik)) {
                skipped++;
                continue;
            }

            const newDosen = {
                nomor: (MOCK_DATA.facultyData[currentFaculty]?.length || 0) + 1,
                nama: nama.trim(),
                nik: cleanNik,
                prodi: prodi.trim(),
                fakultas: currentFaculty,
                matchResult: { matched: false, type: 'csv_import', score: 0 }
            };

            if (!MOCK_DATA.facultyData[currentFaculty]) {
                MOCK_DATA.facultyData[currentFaculty] = [];
            }

            MOCK_DATA.facultyData[currentFaculty].push(newDosen);
            added++;
        }

        // Refresh view
        if (appState.currentView === 'dosen') {
            document.getElementById('main-content').innerHTML = views.dosen();
        }

        toggleAddDosenModal(false);
        alert(`✅ Import selesai!\n\nDitambahkan: ${added} dosen\nDilewati: ${skipped} (duplikat/fakultas berbeda)`);
    };

    reader.readAsText(file);
}

export function deleteDosen(faculty, nik) {
    if (!confirm('Hapus dosen ini dari daftar?')) return;

    MOCK_DATA.facultyData[faculty] = MOCK_DATA.facultyData[faculty].filter(d => d.nik !== nik);

    if (appState.currentView === 'dosen') {
        document.getElementById('main-content').innerHTML = views.dosen();
    }
}

