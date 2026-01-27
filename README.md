# Sistem Jadwal Pendadaran AI

Aplikasi web modern untuk manajemen dan penjadwalan otomatis ujian pendadaran menggunakan algoritma AI.

## 🚀 Fitur Utama

- **Penjadwalan Otomatis**: Algoritma Sequential Greedy Search untuk mengalokasikan slot ujian
- **Manajemen Dosen**: Import dan kelola data dosen dari berbagai fakultas (FIK, FES, FST)
- **Manajemen Mahasiswa**: Kelola data mahasiswa dan pembimbing
- **Aturan Ketersediaan**: Atur jadwal libur dan ketidaktersediaan dosen
- **Validasi Data**: Matching otomatis dengan master data SDM
- **Responsive UI**: Antarmuka modern dengan dark mode support

## 📁 Struktur Project

```
jadwal-pendadaran/
├── src/
│   ├── assets/
│   │   └── data/              # CSV data files
│   ├── config/
│   │   └── constants.js       # Application constants
│   ├── data/
│   │   └── store.js          # State management & persistence
│   ├── logic/
│   │   ├── availability.js   # Lecturer availability logic
│   │   └── matching.js       # Data matching algorithms
│   ├── utils/
│   │   └── helpers.js        # Utility functions
│   ├── loadDosenData.js      # SDM data loader
│   ├── loadFacultyData.js    # Faculty data loader
│   ├── main.js               # Main application
│   └── style.css             # Styles
├── public/                    # Static assets
├── index.html                # Entry point
└── package.json              # Dependencies
```

## 🛠️ Teknologi

- **Vite** - Build tool & dev server
- **Vanilla JavaScript** - ES6+ modules
- **LocalStorage** - Data persistence
- **CSS3** - Modern styling with custom properties

## 📦 Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎯 Cara Penggunaan

1. **Import Data Dosen**: Data dosen akan otomatis dimuat dari CSV
2. **Tambah Mahasiswa**: Input data mahasiswa yang akan ujian
3. **Atur Ketersediaan**: Set jadwal libur atau ketidaktersediaan dosen
4. **Generate Jadwal**: Klik tombol "Proses Jadwal Otomatis"
5. **Review & Export**: Periksa hasil dan export jika diperlukan

## 🔧 Konfigurasi

Edit `src/config/constants.js` untuk mengubah:
- Ruangan yang tersedia
- Waktu sesi ujian
- Tanggal pelaksanaan
- Batas maksimal tugas penguji per dosen

## 📊 Data Format

### CSV Dosen Prodi
```csv
Nomor,NIK,Nama,Prodi,Fakultas
1,12345678,Dr. John Doe,S1 Informatika,FIK
```

### CSV Data SDM
```csv
No,Nik,Status,Nama,Kategori Dosen/Karyawan,NIDN,Jenis Kelamin
1,12345678,DOSEN,Dr. John Doe,Dosen Tetap,0123456789,L
```

## 🤝 Kontribusi

Project ini menggunakan modular architecture untuk memudahkan pengembangan:
- Pisahkan logic di `src/logic/`
- Tambah utility di `src/utils/`
- Update constants di `src/config/`

## 📝 License

Private - Internal Use Only

## 👥 Tim Pengembang

Developed for Universitas Dian Nuswantoro
