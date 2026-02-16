import { APP_DATA } from '../../data/store.js';

export const LogicView = () => `
    <div class="inner-container" style="font-family: 'Inter', sans-serif; color: var(--text-main);">
        
        <!-- HEADER (Hidden in Settings tab, shown if standalone) -->
        <div style="margin-bottom: 2rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; display: none;">
            <h1 style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem; color: var(--text-main);">Logika Penjadwalan</h1>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Dokumentasi teknis alur kerja algoritma.</p>
        </div>

        <!-- DOCUMENTATION CONTENT -->
        <div>
            
            <!-- SECTION 1: CORE WORKFLOW -->
            <section style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;">1</span>
                    Alur Kerja Utama
                </h2>
                <div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
                    
                    <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem; box-shadow: var(--shadow-sm);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <strong style="color: var(--text-main); display: block; margin-bottom: 4px;">1. Prioritas Mahasiswa</strong>
                                <div style="font-size: 0.85rem;">Mahasiswa dengan pembimbing tersibuk dijadwalkan duluan (Student-First).</div>
                            </div>
                            <div>
                                <strong style="color: var(--text-main); display: block; margin-bottom: 4px;">2. Global Search</strong>
                                <div style="font-size: 0.85rem;">Menyisir seluruh Tanggal, Jam, dan Ruangan untuk mencari slot kosong.</div>
                            </div>
                            <div>
                                <strong style="color: var(--text-main); display: block; margin-bottom: 4px;">3. Proteksi Pembimbing</strong>
                                <div style="font-size: 0.85rem;">Mengamankan slot untuk bimbingan sendiri sebelum menguji orang lain.</div>
                            </div>
                            <div>
                                <strong style="color: var(--text-main); display: block; margin-bottom: 4px;">4. Tim Penguji</strong>
                                <div style="font-size: 0.85rem;">Mencari 2 dosen penguji lain dengan beban kerja terendah (fairness).</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SECTION 2: CONSTRAINTS -->
             <section style="margin-bottom: 2rem;">
                <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;">2</span>
                    Aturan & Batasan Wajib
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <!-- Constraint Item -->
                     <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--primary); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">🛡️ Proteksi Pembimbing</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Dahulukan mahasiswa bimbingan sendiri sebelum menguji yang lain.</span>
                    </div>
                    <!-- Constraint Item -->
                     <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--primary); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">⚧️ Kesesuaian Gender</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Mencocokkan gender dengan preferensi dosen (opsional).</span>
                    </div>
                    <!-- Constraint Item -->
                    <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--danger); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">🚫 Anti-Bentrok Waktu</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Dosen tidak boleh memiliki 2 jadwal di waktu yang sama.</span>
                    </div>
                    <!-- Constraint Item -->
                    <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--danger); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">🕌 Aturan Hari Jumat</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Sesi jam <strong>11:30</strong> ditiadakan untuk Sholat Jumat.</span>
                    </div>
                    <!-- Constraint Item -->
                    <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--warning); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">🎓 Kesesuaian Prodi</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Penguji harus berasal dari <strong>Prodi yang sama</strong>.</span>
                    </div>
                     <!-- Constraint Item -->
                     <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 3px solid var(--success); border-radius: 8px; padding: 0.8rem;">
                        <strong style="display: block; color: var(--text-main); margin-bottom: 2px; font-size: 0.85rem;">📅 Data Libur/Sibuk</strong>
                        <span style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">Jadwal tidak akan menabrak data libur dosen.</span>
                    </div>
                </div>
            </section>

            <!-- SECTION 3: FAIRNESS -->
             <section>
                <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;">3</span>
                    Pemerataan & Komposisi
                </h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
                    <div>
                        <h3 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Komposisi Tim</h3>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                            <li><strong>2 Penguji:</strong> Dipilih acak-terstruktur.</li>
                            <li><strong>1 Pembimbing:</strong> Otomatis masuk tim.</li>
                            <li>Total: 3 Dosen per sidang.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Algoritma Fairness</h3>
                        <div style="background: var(--bg); padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                            <code style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--primary); margin-bottom: 0.5rem;">
                                candidates.sort((a,b) => count[a]-count[b])
                            </code>
                            <p style="margin: 0; font-size: 0.85rem; line-height: 1.4; color: var(--text-secondary);">
                                Prioritas dosen dengan jam terbang <strong>terendah</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
`;
