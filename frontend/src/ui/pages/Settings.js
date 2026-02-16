import { settingsAPI, authAPI, logsAPI } from '../../services/api.js';
import { ROOMS, DISABLED_ROOMS, TIMES, DATES, appState } from '../../data/store.js';
import { showConfirm } from '../components/ConfirmationModal.js';
import { LogicView } from './Logic.js';

export const SettingsView = () => {
    // Default tab state if not set
    if (!appState.settingsTab) appState.settingsTab = 'config';

    const renderTabs = () => `
        <div class="tabs-container" style="margin-bottom: 2rem;">
             <div class="tabs" style="display: flex; gap: 4px; padding: 4px; background: rgba(118, 118, 128, 0.08); border-radius: 14px; width: fit-content;">
                <div class="tab-item ${appState.settingsTab === 'config' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('config')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'config' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'config' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    ⚙️ Konfigurasi
                </div>
                <div class="tab-item ${appState.settingsTab === 'logic' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('logic')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'logic' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'logic' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    🧠 Logika
                </div>
                <div class="tab-item ${appState.settingsTab === 'about' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('about')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'about' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'about' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    ℹ️ About
                </div>
                <div class="tab-item ${appState.settingsTab === 'account' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('account')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'account' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'account' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    🔒 Akun
                </div>
                <div class="tab-item ${appState.settingsTab === 'logs' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('logs')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'logs' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'logs' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    📜 Log Aktivitas
                </div>
                <div class="tab-item ${appState.settingsTab === 'backup' ? 'active' : ''}"
                     onclick="window.switchSettingsTab('backup')"
                     style="padding: 8px 24px; min-width: 120px; text-align: center; cursor: pointer; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s, color 0.2s; background: ${appState.settingsTab === 'backup' ? 'var(--bg)' : 'transparent'}; box-shadow: ${appState.settingsTab === 'backup' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};">
                    💾 Backup
                </div>
             </div>
        </div>
    `;

    // Render Account content
    if (appState.settingsTab === 'account') {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        setTimeout(() => {
            const form = document.getElementById('account-update-form');
            if (form) {
                form.addEventListener('submit', handleUpdateAccount);
            }
        }, 0);

        return `
            <div class="container">
                <header class="page-header" style="margin-bottom: 1.5rem;">
                     <div class="header-info">
                        <h1>Pengaturan Akun</h1>
                        <p class="subtitle">Kelola keamanan dan akses akun Anda.</p>
                    </div>
                </header>
                ${renderTabs()}
                
                <div class="card" style="max-width: 800px; margin: 0 auto;">
                    <div class="card-header">
                        <h3>👤 Update Akun</h3>
                    </div>
                    <form id="account-update-form" style="padding: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                            
                            <!-- Left Column: Identity -->
                            <div>
                                <h4 style="margin-bottom: 1rem; color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">Identitas</h4>
                                <div class="form-group">
                                    <label class="form-label">Username</label>
                                    <input type="text" name="username" class="form-input" required value="${user.username || ''}">
                                    <p class="form-hint">Ganti username jika diperlukan</p>
                                </div>
                            </div>

                            <!-- Right Column: Security -->
                            <div>
                                <h4 style="margin-bottom: 1rem; color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">Keamanan</h4>
                                <div class="form-group">
                                    <label class="form-label">Password Baru (Opsional)</label>
                                    <input type="password" name="newPassword" class="form-input" placeholder="••••••" minlength="6">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Konfirmasi Password Baru</label>
                                    <input type="password" name="confirmNewPassword" class="form-input" placeholder="••••••">
                                </div>
                            </div>

                        </div>

                        <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border);">

                        <div style="display: flex; align-items: flex-end; gap: 1.5rem;">
                            <div class="form-group" style="flex: 1; margin-bottom: 0;">
                                <label class="form-label" style="color: var(--danger);">Password Lama (Konfirmasi)</label>
                                <input type="password" name="currentPassword" class="form-input" required placeholder="••••••">
                            </div>

                            <button type="submit" class="btn-primary" style="flex: 0 0 200px;">
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // Render Logs content
    if (appState.settingsTab === 'logs') {
        const mapAction = (type) => {
            switch (type) {
                case 'CREATE': return '<span class="badge" style="background:var(--success-bg); color:var(--success);">✨ Baru</span>';
                case 'CREATE MANUAL': return '<span class="badge" style="background:var(--success-bg); color:var(--success);">✨ Manual</span>';
                case 'DELETE': return '<span class="badge" style="background:var(--danger-bg); color:var(--danger);">🗑️ Hapus</span>';
                case 'DELETE ALL': return '<span class="badge" style="background:var(--danger-bg); color:var(--danger);">🔥 Reset</span>';
                case 'UPDATE': return '<span class="badge" style="background:var(--primary-bg); color:var(--primary);">📝 Edit</span>';
                case 'GENERATE': return '<span class="badge" style="background:var(--warning-bg); color:var(--warning);">⚙️ Auto</span>';
                case 'MOVE': return '<span class="badge" style="background:var(--info-bg); color:var(--info);">🚚 Pindah</span>';
                case 'IMPORT': return '<span class="badge" style="background:var(--primary-bg); color:var(--primary);">📥 Import</span>';
                default: return `<span class="badge" style="background:var(--secondary-bg); color:var(--text-secondary);">${type}</span>`;
            }
        };

        setTimeout(async () => {
            const container = document.getElementById('logs-container');
            if (container) {
                try {
                    container.innerHTML = '<div style="padding: 2rem; text-align: center;">Loading logs...</div>';
                    const res = await logsAPI.getAll();
                    const logs = res.data || [];

                    if (logs.length === 0) {
                        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">Belum ada aktivitas tercatat.</div>';
                        return;
                    }

                    container.innerHTML = `
                        <div class="table-container" style="max-height: 60vh; overflow-y: auto;">
                            <table class="data-table">
                                <thead style="position: sticky; top: 0; z-index: 10;">
                                    <tr>
                                        <th style="width: 180px;">Waktu</th>
                                        <th style="width: 120px;">Aksi</th>
                                        <th style="width: 150px;">Kategori</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${logs.map(log => `
                                        <tr>
                                            <td style="color:var(--text-secondary); font-size:0.9rem;">
                                                ${new Date(log.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td>${mapAction(log.action_type)}</td>
                                            <td><span style="font-weight:600; color:var(--text-secondary); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.5px;">${log.target}</span></td>
                                            <td style="line-height:1.5;">${log.description}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                } catch (error) {
                    container.innerHTML = '<div style="padding: 1rem; color: var(--danger);">Gagal memuat log aktivitas.</div>';
                }
            }
        }, 0);

        return `
            <div class="container" style="max-width: 100%;">
                <header class="page-header" style="margin-bottom: 1.5rem;">
                     <div class="header-info">
                        <h1>Log Aktivitas</h1>
                        <p class="subtitle">Riwayat tindakan yang dilakukan dalam sistem.</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn-secondary" onclick="window.clearLogs()">Bersihkan Log</button>
                    </div>
                </header>
                ${renderTabs()}
                
                <div class="card">
                    <div id="logs-container"></div>
                </div>
            </div>
        `;
    }

    // Render Backup & Restore content (Already done, keeping as is)
    if (appState.settingsTab === 'backup') {
        setTimeout(() => {
            const exportBtn = document.getElementById('btn-export-backup');
            const importBtn = document.getElementById('btn-import-backup');
            const fileInput = document.getElementById('backup-file-input');

            if (exportBtn) {
                exportBtn.addEventListener('click', window.handleExportBackup);
            }

            if (importBtn && fileInput) {
                importBtn.addEventListener('click', () => fileInput.click());
                fileInput.addEventListener('change', window.handleImportBackup);
            }
        }, 0);

        return `
            <div class="container">
                <header class="page-header" style="margin-bottom: 1.5rem;">
                     <div class="header-info">
                        <h1>Backup & Restore</h1>
                        <p class="subtitle">Export dan import data untuk migrasi antar environment.</p>
                    </div>
                </header>
                ${renderTabs()}
                
                <div style="max-width: 100%; margin: 0 auto;">
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <!-- Export Section -->
                        <div class="card" style="height: 100%; display: flex; flex-direction: column;">
                            <div class="card-header">
                                <h3>📤 Export Backup</h3>
                            </div>
                            <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                                <p style="margin-bottom: 1rem; line-height: 1.6;">
                                    Export seluruh data aplikasi (mahasiswa, dosen, libur, jadwal, settings, users) 
                                    ke file SQL untuk backup atau migrasi ke PC lain.
                                </p>
                                
                                <div style="background: var(--info-bg); border-left: 4px solid var(--info); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; flex: 1;">
                                    <strong style="color: var(--info);">💡 Tip:</strong>
                                    <ul style="margin: 0.5rem 0 0 1.5rem; color: var(--text-secondary);">
                                        <li>File backup berisi <strong>semua data</strong> yang sudah terjadwal</li>
                                        <li>Simpan file di lokasi aman (USB/cloud storage)</li>
                                        <li>Gunakan untuk migrasi antar PC development</li>
                                    </ul>
                                </div>

                                <button id="btn-export-backup" class="btn-primary" style="width: 100%; margin-top: auto;">
                                    <span style="font-size: 1.1rem;">📥</span> Download Backup SQL
                                </button>
                            </div>
                        </div>

                        <!-- Import Section -->
                        <div class="card" style="height: 100%; display: flex; flex-direction: column;">
                            <div class="card-header">
                                <h3>📥 Import Backup</h3>
                            </div>
                            <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                                <p style="margin-bottom: 1rem; line-height: 1.6;">
                                    Restore data dari file backup SQL. Semua data saat ini akan <strong>ditimpa</strong> 
                                    dengan data dari backup.
                                </p>

                                <div style="background: var(--warning-bg); border-left: 4px solid var(--warning); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; flex: 1;">
                                    <strong style="color: var(--warning);">⚠️ Peringatan:</strong>
                                    <ul style="margin: 0.5rem 0 0 1.5rem; color: var(--text-secondary);">
                                        <li>Proses ini akan <strong>menghapus semua data</strong> yang ada</li>
                                        <li>Pastikan file backup valid dan tidak corrupt</li>
                                        <li>Backup data saat ini terlebih dahulu jika diperlukan</li>
                                    </ul>
                                </div>

                                <input type="file" id="backup-file-input" accept=".sql" style="display: none;">
                                <button id="btn-import-backup" class="btn-secondary" style="width: 100%; margin-top: auto;">
                                    <span style="font-size: 1.1rem;">📤</span> Pilih File Backup (.sql)
                                </button>

                                <div id="import-progress" style="display: none; margin-top: 1rem;">
                                    <div style="background: var(--bg); padding: 1rem; border-radius: 8px;">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div class="spinner" style="width: 24px; height: 24px; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                                            <span id="import-status">Mengimport data...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Info Section -->
                    <div style="padding: 1rem 1.5rem; background: var(--bg); border-radius: 12px; border: 1px solid var(--border-subtle);">
                        <h4 style="margin-bottom: 0.5rem; color: var(--primary); font-size: 1rem;">📋 Workflow Migrasi</h4>
                        <ol style="margin-left: 1.5rem; line-height: 1.6; color: var(--text-secondary); display: flex; gap: 2rem; flex-wrap: wrap;">
                            <li><strong>Export:</strong> Download SQL</li>
                            <li><strong>Transfer:</strong> Copy ke lokasi tujuan</li>
                            <li><strong>Import:</strong> Upload & Restore</li>
                            <li><strong>Selesai!</strong></li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }

    // Render logic content if tab is logic
    if (appState.settingsTab === 'logic') {
        return `
            <div class="container" style="max-width: 100%;">
                <header class="page-header" style="margin-bottom: 1.5rem;">
                     <div class="header-info">
                        <h1>Logika Penjadwalan</h1>
                        <p class="subtitle">Konfigurasi jadwal dan dokumentasi logika.</p>
                    </div>
                </header>
                ${renderTabs()}
                <div style="margin-top: -1rem;">
                    ${LogicView().replace('class="container"', 'class=""').replace(/padding: 3rem 2rem 6rem;/, 'padding: 0;').replace(/max-width: 900px;/, 'max-width: 100%;')}
                </div>
            </div>
        `;
    }

    // Render About content
    if (appState.settingsTab === 'about') {
        return `
            <div class="container">
                <header class="page-header" style="margin-bottom: 1.5rem;">
                     <div class="header-info">
                        <h1>Tentang Aplikasi</h1>
                        <p class="subtitle">Informasi pengembang dan teknologi yang digunakan.</p>
                    </div>
                </header>
                ${renderTabs()}
                
                <div class="card" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
                    <div style="text-align: center; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                        <div>
                             <h2 style="font-size: 1.8rem; margin-bottom: 0; color: var(--primary);">Jadwal Pendadaran AI</h2>
                             <p style="color: var(--text-muted); margin: 0;">Sistem Penjadwalan Cerdas Berbasis Web v1.0</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h3 style="margin-bottom: 1rem; border-bottom: 2px solid var(--primary-subtle); padding-bottom: 0.5rem;">💻 Tech Stack</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-bottom: 8px;"><strong>Frontend:</strong> Javascript (Vanilla + Vite)</li>
                                <li style="margin-bottom: 8px;"><strong>Backend:</strong> Node.js + Express</li>
                                <li style="margin-bottom: 8px;"><strong>Database:</strong> PostgreSQL</li>
                                <li style="margin-bottom: 8px;"><strong>Library:</strong> XLSX (Excel Processing)</li>
                                <li style="margin-bottom: 8px;"><strong>Infrastructure:</strong> Debian (Proxmox Virtualization)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 style="margin-bottom: 1rem; border-bottom: 2px solid var(--primary-subtle); padding-bottom: 0.5rem;">👥 Credits</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin-bottom: 12px;">
                                    <strong>Diproduksi Oleh:</strong><br>
                                    Staf DAAK (Direktorat Administrasi Akademik & Kemahasiswaan)
                                </li>
                                <li style="margin-bottom: 12px;">
                                    <strong>Developed by:</strong><br>
                                    <a href="#" style="color: var(--primary); text-decoration: none;">Agus_Intelligence</a>
                                </li>
                                <li style="margin-bottom: 12px;">
                                    <strong>Supported by:</strong><br>
                                    ilhamstu() & meansrev
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style="text-align: center; padding-top: 1rem; border-top: 1px solid var(--border-subtle); font-size: 0.85rem; color: var(--text-muted); margin-top: 2rem;">
                        &copy; 2026 Jadwal Pendadaran AI. All rights reserved.
                    </div>
                </div>
            </div>
        `;
    }

    // Helper to format array to newline separated string
    const formatList = (arr) => arr.join('\n');

    // Helper to parse dates for display
    const currentDates = DATES;

    // Attach event handlers
    setTimeout(() => {
        const form = document.getElementById('settings-form');
        if (form) {
            form.addEventListener('submit', handleSettingsSubmit);
        }
    }, 0);

    return `
        <div class="container" style="max-width: 100%;">
            <header class="page-header" style="margin-bottom: 1.5rem;">
                <div class="header-info">
                    <h1>Pengaturan</h1>
                    <p class="subtitle">Konfigurasi jadwal, ruangan, dan waktu pelaksanaan.</p>
                </div>
            </header>
            
            ${renderTabs()}

            <form id="settings-form" style="position: relative; height: calc(100vh - 250px); display: flex; flex-direction: column;">
                
                <div style="display: grid; grid-template-columns: 280px 200px 1fr; gap: 1.5rem; flex: 1; min-height: 0;">
                    
                    <!-- COLUMN 1: ROOMS -->
                    <div class="card" style="display: flex; flex-direction: column; overflow: hidden;">
                        <div class="card-header" style="padding: 1rem;">
                            <h3 style="font-size: 1rem;">🏫 Ruangan</h3>
                        </div>
                        <div style="padding: 1rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem;">
                            <div class="form-group" style="flex-shrink: 0;">
                                <label class="form-label" style="font-size: 0.85rem;">Daftar Ruangan</label>
                                <textarea id="setting-rooms" class="form-input" style="font-family: monospace; height: 150px; resize: vertical;">${ROOMS.join('\n')}</textarea>
                                <p class="form-hint">Satu ruangan per baris</p>
                            </div>

                            <div style="padding: 0.8rem; background: var(--bg); border-radius: 8px; border: 1px solid var(--border-subtle);">
                                <label class="form-label" style="margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-secondary);">Nonaktifkan Ruangan</label>
                                <div style="display: flex; flex-direction: column; gap: 6px;">
                                    ${ROOMS.map(room => `
                                        <label style="display: flex; align-items: center; gap: 8px; padding: 4px; cursor: pointer; font-size: 0.85rem; user-select: none;">
                                            <input type="checkbox" name="disabled_room" value="${room}" ${DISABLED_ROOMS.includes(room) ? 'checked' : ''} style="accent-color: var(--danger);">
                                            <span style="color: ${DISABLED_ROOMS.includes(room) ? 'var(--text-muted)' : 'var(--text-main)'}; text-decoration: ${DISABLED_ROOMS.includes(room) ? 'line-through' : 'none'};">${room}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- COLUMN 2: TIMES -->
                    <div class="card" style="display: flex; flex-direction: column; overflow: hidden;">
                        <div class="card-header" style="padding: 1rem;">
                            <h3 style="font-size: 1rem;">⏰ Sesi</h3>
                        </div>
                        <div style="padding: 1rem; flex: 1; overflow-y: auto;">
                            <div class="form-group" style="height: 100%; display: flex; flex-direction: column;">
                                <label class="form-label" style="font-size: 0.85rem;">Jam Mulai</label>
                                <textarea id="setting-times" class="form-input" style="font-family: monospace; flex: 1; resize: none;">${TIMES.join('\n')}</textarea>
                                <p class="form-hint" style="margin-top: 0.5rem;">Format: HH:MM</p>
                            </div>
                        </div>
                    </div>

                    <!-- COLUMN 3: DATES & GENERATOR -->
                    <div class="card" style="display: flex; flex-direction: column; overflow: hidden;">
                        <div class="card-header" style="padding: 1rem; background: var(--bg); border-bottom: 1px solid var(--border-subtle);">
                            <h3 style="font-size: 1rem; color: var(--primary);">📅 Tanggal Pelaksanaan</h3>
                        </div>
                        
                        <div style="padding: 1.5rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem;">
                            
                            <!-- Generator Section -->
                            <div style="background: rgba(var(--primary-rgb), 0.05); border: 1px solid var(--primary-subtle); border-radius: 10px; padding: 1.2rem;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                                    <strong style="color: var(--primary); font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">
                                        ✨ Generator Otomatis
                                    </strong>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 100px auto; gap: 1rem; align-items: end;">
                                    
                                    <div>
                                        <label class="form-label" style="font-size: 0.8rem; margin-bottom: 4px;">Tanggal Mulai</label>
                                        <input type="date" id="gen-start-date" class="form-input" style="height: 38px;">
                                    </div>

                                    <div>
                                        <label class="form-label" style="font-size: 0.8rem; margin-bottom: 4px;">Durasi (Hari)</label>
                                        <input type="number" id="gen-days" class="form-input" value="10" min="1" style="height: 38px;">
                                    </div>

                                    <button type="button" id="btn-generate-dates" class="btn-primary" onclick="window.generateDateList()" style="height: 38px; padding: 0 1.5rem;">
                                        Generate
                                    </button>
                                </div>
                                
                                <div style="margin-top: 0.8rem;">
                                    <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                                        <input type="checkbox" id="gen-skip-weekend" checked style="accent-color: var(--primary);">
                                        Lewati Sabtu & Minggu
                                    </label>
                                </div>
                            </div>

                            <!-- JSON Editor -->
                            <div class="form-group" style="flex: 1; display: flex; flex-direction: column; min-height: 200px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <label class="form-label" style="margin: 0; font-size: 0.85rem;">Editor JSON</label>
                                    <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">read-only preview</span>
                                </div>
                                <textarea id="setting-dates" class="form-input" style="font-family: monospace; font-size: 0.85rem; line-height: 1.5; flex: 1; resize: none; background: var(--bg); color: var(--text-main);">${JSON.stringify(DATES, null, 4)}</textarea>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="form-actions" style="margin-top: 1.5rem; padding: 1rem; background: white; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end; align-items: center; gap: 1rem; position: sticky; bottom: 0; z-index: 20;">
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Perubahan akan diterapkan setelah reload.</span>
                    <button type="submit" class="btn-primary" style="padding: 0.8rem 2rem; font-weight: 600; box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);">
                        Simpan Perubahan
                    </button>
                </div>

            </form>
        </div>
    `;

};

// Handle tab switching
window.switchSettingsTab = (tab) => {
    appState.settingsTab = tab;
    window.navigate('settings');
};

window.clearLogs = async () => {
    if (!(await showConfirm('Hapus semua log aktivitas?'))) return;
    try {
        await logsAPI.clear();
        showToast('Log aktivitas berhasil dibersihkan', 'success');
        window.navigate('settings'); // Refresh
    } catch (error) {
        showToast('Gagal membersihkan log: ' + error.message, 'error');
    }
};

// Global handlers
window.generateDateList = () => {
    const startDateInput = document.getElementById('gen-start-date').value;
    const daysCount = parseInt(document.getElementById('gen-days').value) || 5;
    const skipWeekend = document.getElementById('gen-skip-weekend').checked;

    if (!startDateInput) {
        showToast('Pilih tanggal mulai terlebih dahulu', 'warning');
        return;
    }

    const result = [];
    let currentDate = new Date(startDateInput);
    let added = 0;

    const indonesianDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const indonesianMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agust', 'Sep', 'Okt', 'Nov', 'Des'];

    while (added < daysCount) {
        const dayIdx = currentDate.getDay();

        // Skip weekend if requested (0 = Sun, 6 = Sat)
        if (skipWeekend && (dayIdx === 0 || dayIdx === 6)) {
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }

        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const label = indonesianDays[dayIdx];
        const display = `${currentDate.getDate()} ${indonesianMonths[currentDate.getMonth()]}`;

        result.push({
            value: dateStr,
            label: label,
            display: display
        });

        added++;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const textarea = document.getElementById('setting-dates');
    textarea.value = JSON.stringify(result, null, 4);
};

async function handleSettingsSubmit(e) {
    e.preventDefault();

    if (!(await showConfirm('Simpan perubahan? Aplikasi akan dimuat ulang.', 'Simpan Pengaturan', { text: 'Simpan', variant: 'primary' }))) return;

    try {
        const roomsText = document.getElementById('setting-rooms').value;
        const timesText = document.getElementById('setting-times').value;
        const datesText = document.getElementById('setting-dates').value;

        // Parse inputs
        const schedule_rooms = roomsText.split('\n').map(s => s.trim()).filter(s => s);
        const schedule_times = timesText.split('\n').map(s => s.trim()).filter(s => s);
        let schedule_dates;

        try {
            schedule_dates = JSON.parse(datesText);
        } catch (jsonErr) {
            showToast('Format JSON Tanggal tidak valid!', 'error');
            return;
        }

        // Send to API
        const response = await settingsAPI.update({
            schedule_rooms,
            schedule_disabled_rooms: Array.from(document.querySelectorAll('input[name="disabled_room"]:checked')).map(cb => cb.value),
            schedule_times,
            schedule_dates
        });

        if (response.success) {
            showToast('Pengaturan berhasil disimpan!', 'success');
            window.location.reload();
        }

    } catch (error) {
        console.error('Save failed:', error);
        showToast('Gagal menyimpan pengaturan: ' + error.message, 'error');
    }
}


async function handleUpdateAccount(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newUsername = formData.get('username');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');

    if (newPassword && newPassword !== confirmNewPassword) {
        showToast('Konfirmasi password baru tidak cocok!', 'error');
        return;
    }

    if (!(await showConfirm('Simpan perubahan akun?', 'Update Akun', { text: 'Simpan', variant: 'primary' }))) return;

    try {
        const response = await authAPI.updateAccount({
            currentPassword,
            newUsername,
            newPassword: newPassword || undefined
        });

        if (response.success) {
            showToast('Akun berhasil diperbarui! Silakan login ulang.', 'success');

            // Update local storage user if username changed
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.username = newUsername;
            localStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            }, 1500);
        } else {
            showToast(response.error || 'Gagal memperbarui akun', 'error');
        }
    } catch (error) {
        console.error('Update account error:', error);
        showToast('Terjadi kesalahan saat memperbarui akun', 'error');
    }
}

// Backup & Restore Handlers
window.handleExportBackup = async () => {
    try {
        showToast('Membuat backup...', 'info');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/backup/export`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to export backup');
        }

        // Get filename from Content-Disposition header or generate one
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'backup.sql';
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/);
            if (filenameMatch) filename = filenameMatch[1];
        }

        // Download file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showToast('Backup berhasil didownload!', 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Gagal export backup: ' + error.message, 'error');
    }
};

window.handleImportBackup = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.sql')) {
        showToast('File harus berformat .sql', 'error');
        event.target.value = '';
        return;
    }

    const confirmed = await showConfirm(
        `Import backup dari "${file.name}"? Semua data saat ini akan dihapus dan diganti dengan data dari backup.`,
        'Konfirmasi Import',
        { text: 'Import', variant: 'danger' }
    );

    if (!confirmed) {
        event.target.value = '';
        return;
    }

    try {
        const progressDiv = document.getElementById('import-progress');
        const statusSpan = document.getElementById('import-status');

        if (progressDiv) progressDiv.style.display = 'block';
        if (statusSpan) statusSpan.textContent = 'Mengupload file...';

        const formData = new FormData();
        formData.append('backup', file);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/backup/import`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const result = await response.json();

        if (progressDiv) progressDiv.style.display = 'none';

        if (result.success) {
            showToast(`Backup berhasil diimport! ${result.stats?.statements || 0} statements dieksekusi.`, 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            throw new Error(result.error || 'Import failed');
        }
    } catch (error) {
        console.error('Import error:', error);
        const progressDiv = document.getElementById('import-progress');
        if (progressDiv) progressDiv.style.display = 'none';
        showToast('Gagal import backup: ' + error.message, 'error');
    } finally {
        event.target.value = '';
    }
};

