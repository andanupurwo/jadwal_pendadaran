import { APP_DATA, appState } from '../../data/store.js';
import { getAllDosen } from '../../utils/helpers.js';

export const LiburView = () => {
    const searchTerm = appState.searchTerm || '';
    const renderConstraint = (l) => {
        const hasDates = l.dates && l.dates.length > 0;
        const hasTimes = l.times && l.times.length > 0;

        if (!hasDates && !hasTimes) {
            return `<span style="color:var(--text-muted); font-style:italic;">Tidak ada tanggal/jam terpilih</span>`;
        }

        let html = '<div style="display:flex; flex-direction:column; gap:8px;">';

        if (hasDates) {
            html += `<div style="display:flex; flex-wrap:wrap; gap:4px;">${l.dates.map(d => `<span class="badge" style="background:#fff1f0; color:#cf1322; border:1px solid #ffa39e; font-size:10px; font-weight:700;">📅 ${d}</span>`).join('')}</div>`;
        }

        if (hasTimes) {
            html += `<div style="display:flex; flex-wrap:wrap; gap:4px;">${l.times.map(t => `<span class="badge" style="background:#e6f7ff; color:#0050b3; border:1px solid #91d5ff; font-size:10px; font-weight:700;">⏰ ${t}</span>`).join('')}</div>`;
        }

        html += '</div>';
        return html;
    };

    const filteredLibur = APP_DATA.libur.filter(l => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const dosen = getAllDosen().find(d => d.nik === l.dosenId || d.nama === l.nama);
        const searchSource = `${l.nama || ''} ${l.dosenId || ''} ${dosen?.nama || ''} ${l.reason || ''}`.toLowerCase();
        return searchSource.includes(term);
    });

    return `
        <div class="container">
            <header class="page-header">
                <div class="header-info">
                    <h1>Ketersediaan Dosen</h1>
                    <p class="subtitle">Atur blokir waktu, cuti, atau jadwal rutin dosen agar tidak bentrok.</p>
                </div>
                <div style="display:flex; gap:10px;">
                    <button type="button" onclick="event.preventDefault(); window.wipeLiburData()" class="btn-secondary" style="color:var(--danger);">🗑️ Bersihkan Semua</button>
                    <button type="button" onclick="window.toggleAddLiburModal(true)" class="btn-primary">+ Aturan Baru</button>
                </div>
            </header>

            <div class="controls-bar" style="margin-bottom:1.5rem;">
                <div class="search-container" style="max-width:400px;">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="mainSearchInput" class="search-input" placeholder="Cari nama dosen atau alasan..." value="${searchTerm}" oninput="window.handleSearchInput(event)">
                </div>
                <div class="badge badge-primary">Total Aturan: ${filteredLibur.length}</div>
            </div>
            
            <div class="card">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Dosen</th>
                                <th>Jadwal Blokir (Dosen Tidak Bisa)</th>
                                <th>Keterangan</th>
                                <th style="text-align:center;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredLibur.length === 0
            ? `<tr><td colspan="4" style="text-align:center; padding:3rem; color:var(--text-muted);">Data tidak ditemukan.</td></tr>`
            : filteredLibur.map((l, i) => {
                const dosen = getAllDosen().find(d => d.nik === l.dosenId || d.nama === l.nama);
                let htmlNama = '';
                if (dosen) {
                    htmlNama = `<strong>${dosen.nama}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${dosen.prodi}</span>`;
                } else {
                    htmlNama = `<strong>${l.nama || l.dosenId}</strong><br><span style="font-size:0.75rem; color:var(--danger);">(Data Dosen Tidak Ditemukan)</span>`;
                }
                // Find actual index in APP_DATA.libur for actions
                const actualIdx = APP_DATA.libur.indexOf(l);
                return `<tr>
                                    <td>${htmlNama}</td>
                                    <td>${renderConstraint(l)}</td>
                                    <td style="color:var(--text-muted); font-size:0.9rem;">${l.reason || '-'}</td>
                                    <td style="text-align:center;">
                                        <button onclick="window.toggleAddLiburModal(true, ${actualIdx})" class="btn-icon" style="color:var(--primary); margin-right:8px;">✏️</button>
                                        <button onclick="window.deleteLibur('${l.dosenId}')" class="btn-icon" style="color:var(--danger);">🗑️</button>
                                    </td>
                                </tr>`;
            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
};
