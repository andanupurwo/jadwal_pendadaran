import { APP_DATA } from '../../data/store.js';

export const LogicView = () => `
    <div class="container" style="max-width: 900px; margin: 0 auto; padding: 3rem 2rem 6rem; font-family: 'Inter', sans-serif; color: var(--text-main);">
        
        <!-- HEADER -->
        <div style="margin-bottom: 4rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 2rem;">
            <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem; color: var(--text-main);">Logika Penjadwalan</h1>
            <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.6;">Dokumentasi teknis alur kerja algoritma dan aturan batasan sistem.</p>
        </div>

        <!-- DOCUMENTATION CONTENT -->
        <div>
            
            <!-- SECTION 1: CORE WORKFLOW -->
            <section style="margin-bottom: 3.5rem;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800;">1</span>
                    Alur Kerja Utama
                </h2>
                <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
                    <p style="margin-bottom: 1.5rem;">Algoritma bekerja menggunakan pendekatan <em>Greedy Algorithm</em> dengan prioritas iterasi sebagai berikut:</p>
                    
                    <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; box-shadow: var(--shadow-sm);">
                        <ol style="margin: 0; padding-left: 1.2rem; display: flex; flex-direction: column; gap: 1rem;">
                            <li>
                                <strong style="color: var(--text-main);">Iterasi Slot Waktu (Time-First)</strong>
                                <div style="font-size: 0.9rem; margin-top: 4px;">Sistem mengunci <strong>Tanggal</strong> terlebih dahulu, kemudian menyisir setiap <strong>Sesi Jam</strong>, dan terakhir menyisir <strong>Ruangan</strong> yang tersedia.</div>
                            </li>
                            <li>
                                <strong style="color: var(--text-main);">Pencocokan Mahasiswa</strong>
                                <div style="font-size: 0.9rem; margin-top: 4px;">Sistem mengambil mahasiswa yang belum terjadwal (diurutkan berdasarkan NIM) dan mencoba memasukkannya ke slot tersebut.</div>
                            </li>
                            <li>
                                <strong style="color: var(--text-main);">Verifikasi Pembimbing (CRITICAL)</strong>
                                <div style="font-size: 0.9rem; margin-top: 4px;">Sistem mengecek apakah <strong>Pembimbing Utama</strong> mahasiswa tersebut tersedia di jam & tanggal ini. Jika pembimbing sibuk/libur, slot dilewati.</div>
                            </li>
                            <li>
                                <strong style="color: var(--text-main);">Pencarian Tim Penguji</strong>
                                <div style="font-size: 0.9rem; margin-top: 4px;">Sistem mencari 2 orang dosen penguji tambahan yang memenuhi syarat (Prodi sama, Available, dan Load terendah).</div>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>

            <!-- SECTION 2: CONSTRAINTS -->
             <section style="margin-bottom: 3.5rem;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800;">2</span>
                    Aturan & Batasan Wajib (Hard Constraints)
                </h2>
                <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
                    <p style="margin-bottom: 1.5rem;">Jadwal yang valid harus mematuhi aturan berikut. Pelanggaran terhadap salah satu aturan akan menyebabkan slot tersebut <strong>dibatalkan</strong>.</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                        <!-- Constraint Item -->
                        <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 4px solid var(--danger); border-radius: 8px; padding: 1rem;">
                            <strong style="display: block; color: var(--text-main); margin-bottom: 4px; font-size: 0.9rem;">🚫 Anti-Bentrok Waktu</strong>
                            <span style="font-size: 0.85rem;">Dosen (baik Pembimbing maupun Penguji) tidak boleh memiliki jadwal lain di waktu yang persis sama.</span>
                        </div>
                        <!-- Constraint Item -->
                        <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 4px solid var(--danger); border-radius: 8px; padding: 1rem;">
                            <strong style="display: block; color: var(--text-main); margin-bottom: 4px; font-size: 0.9rem;">🕌 Aturan Hari Jumat</strong>
                            <span style="font-size: 0.85rem;">Khusus hari Jumat, sesi jam <strong>11:30</strong> secara otomatis <strong>DITIADAKAN</strong> oleh sistem untuk mengakomodasi waktu ibadah Sholat Jumat.</span>
                        </div>
                        <!-- Constraint Item -->
                        <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 4px solid var(--warning); border-radius: 8px; padding: 1rem;">
                            <strong style="display: block; color: var(--text-main); margin-bottom: 4px; font-size: 0.9rem;">🎓 Kesesuaian Prodi (Strict)</strong>
                            <span style="font-size: 0.85rem;">Penguji harus berasal dari <strong>Prodi yang sama persis</strong> dengan mahasiswa. Lintas prodi tidak diperbolehkan dalam sistem ini.</span>
                        </div>
                        <!-- Constraint Item -->
                         <div style="background: #fff; border: 1px solid var(--border-subtle); border-left: 4px solid var(--success); border-radius: 8px; padding: 1rem;">
                            <strong style="display: block; color: var(--text-main); margin-bottom: 4px; font-size: 0.9rem;">📅 Prioritas Data "Libur"</strong>
                            <span style="font-size: 0.85rem;">Jika dosen ditandai "Libur" (Merah) di menu Dosen, sistem akan 100% melewati mereka untuk slot tersebut.</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SECTION 3: FAIRNESS -->
             <section>
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;">
                    <span style="background: var(--primary-subtle); color: var(--primary); width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800;">3</span>
                    Pemerataan & Komposisi Tim
                </h2>
                <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-secondary);">
                    
                     <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Komposisi Tim Penguji</h3>
                     <p style="margin-bottom: 1rem;">Setiap slot Sidang/Pendadaran terdiri dari 3 orang:</p>
                     <ul style="margin-bottom: 1.5rem; padding-left: 1.2rem;">
                        <li><strong>Penguji 1 & 2</strong>: Dipilih oleh sistem secara acak-terstruktur.</li>
                        <li><strong>Pembimbing</strong>: Otomatis dimasukkan sebagai anggota ke-3 dalam tim.</li>
                     </ul>

                     <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Algoritma Pemerataan (Fairness)</h3>
                     <div style="background: var(--bg); padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                        <code style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--primary); margin-bottom: 0.8rem; background: rgba(255,255,255,0.5); padding: 8px; border-radius: 6px;">
                            candidates.sort((a, b) => count[a] - count[b])
                        </code>
                        <p style="margin: 0; font-size: 0.9rem;">
                            Sistem mencatat berapa kali setiap dosen sudah dijadwalkan menguji. Saat memilih kandidat, sistem <strong>selalu memprioritaskan dosen dengan jumlah jam terbang TERENDAH</strong> terlebih dahulu. Ini menjamin distribusi beban kerja yang merata di akhir jadwal.
                        </p>
                     </div>
                </div>
            </section>

        </div>
    </div>
`;
