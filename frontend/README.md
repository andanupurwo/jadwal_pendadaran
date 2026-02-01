# Frontend - Jadwal Pendadaran AI

Frontend web application untuk sistem manajemen dan penjadwalan otomatis ujian pendadaran.

## 🚀 Teknologi

- **Vite** - Build tool & dev server
- **Vanilla JavaScript (ES6+)** - Modular architecture
- **CSS3** - Modern styling dengan custom properties
- **REST API** - Komunikasi dengan backend

## 📦 Instalasi

### Prerequisites

- Node.js (v18 atau lebih baru)
- Backend API sudah berjalan di `http://localhost:3000`

### Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Konfigurasi**

File `.env` sudah tersedia dengan konfigurasi default:
```env
VITE_API_URL=http://localhost:3000/api
```

Jika backend Anda berjalan di port lain, sesuaikan URL-nya.

3. **Jalankan Development Server**
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

4. **Build untuk Production**
```bash
npm run build
```

Output akan ada di folder `dist/`

## 🎯 Fitur Utama

- **Dashboard Ruangan** - Visualisasi jadwal per ruangan dan tanggal
- **Manajemen Dosen** - Import dan kelola data dosen dari berbagai fakultas
- **Manajemen Mahasiswa** - Kelola data mahasiswa dan pembimbing
- **Aturan Ketersediaan** - Atur jadwal libur dan ketidaktersediaan dosen
- **Penjadwalan Otomatis** - AI-powered scheduling dengan Sequential Greedy Search
- **Responsive UI** - Modern interface dengan dark mode support

## 📁 Struktur Project

```
frontend/
├── src/
│   ├── assets/
│   │   └── data/              # CSV data files
│   ├── config/
│   │   └── constants.js       # Application constants
│   ├── data/
│   │   └── store.js          # State management
│   ├── logic/
│   │   ├── availability.js   # Lecturer availability logic
│   │   ├── matching.js       # Data matching algorithms
│   │   └── schedulingEngine.js # Schedule generation (API client)
│   ├── services/
│   │   ├── api.js            # API service layer
│   │   ├── loadDosenData.js   # CSV data loader
│   │   └── loadFacultyData.js # Faculty data loader
│   ├── ui/
│   │   ├── pages/            # Page components
│   │   ├── modals.js         # Modal dialogs
│   │   ├── router.js         # Client-side routing
│   │   └── components.js     # UI components
│   ├── handlers/
│   │   └── actionHandlers.js # Event handlers
│   ├── utils/
│   │   └── helpers.js        # Utility functions
│   ├── styles/
│   │   ├── style.css         # Main styles
│   │   └── modal.css         # Modal styles
│   └── main.js               # Application entry point
├── public/                    # Static assets
├── index.html                # HTML entry point
└── package.json              # Dependencies
```

## 🔧 Cara Penggunaan

1. **Pastikan Backend Running**
   - Backend API harus sudah berjalan di `http://localhost:3000`
   - Cek dengan mengakses `http://localhost:3000/health`

2. **Akses Frontend**
   - Buka `http://localhost:5173` di browser

3. **Import Data Dosen**
   - Data dosen akan otomatis dimuat dari backend
   - Jika kosong, akan dimuat dari CSV dan disinkronkan

4. **Tambah Mahasiswa**
   - Navigasi ke halaman Mahasiswa
   - Tambah data mahasiswa yang akan ujian

5. **Atur Ketersediaan**
   - Navigasi ke halaman Libur
   - Set jadwal libur atau ketidaktersediaan dosen

6. **Generate Jadwal**
   - Navigasi ke halaman Logika
   - Pilih scope (All atau per Prodi)
   - Pilih mode (Reset atau Incremental)
   - Klik "Proses Jadwal Otomatis"

7. **Review Hasil**
   - Navigasi ke halaman Ruangan
   - Filter berdasarkan tanggal
   - Export jika diperlukan

## 🔌 API Integration

Frontend berkomunikasi dengan backend menggunakan REST API. Semua operasi data (CRUD) dilakukan melalui API:

- **Mahasiswa**: `/api/mahasiswa`
- **Dosen**: `/api/dosen`
- **Libur**: `/api/libur`
- **Slots**: `/api/slots`
- **Schedule Generation**: `/api/schedule/generate`

Lihat `src/services/api.js` untuk detail implementasi.

## 🎨 Customization

### Mengubah Konstanta

Edit `src/config/constants.js` untuk mengubah:
- Ruangan yang tersedia
- Waktu sesi ujian
- Tanggal pelaksanaan

### Styling

Edit `src/styles/style.css` untuk mengubah tema dan styling.

## 🐛 Troubleshooting

### Cannot connect to backend
```
Error: Failed to fetch
```
**Solusi**: Pastikan backend sudah running di `http://localhost:3000`

### CORS Error
```
Access to fetch has been blocked by CORS policy
```
**Solusi**: Pastikan backend sudah mengkonfigurasi CORS dengan benar di `.env`:
```
CORS_ORIGIN=http://localhost:5173
```

### Data tidak muncul
**Solusi**: 
1. Cek koneksi backend
2. Lihat console log untuk error
3. Pastikan database sudah diinisialisasi

## 📝 Development Notes

- Frontend murni Vanilla JS tanpa framework
- Menggunakan ES6 modules
- State management sederhana dengan object exports
- API calls menggunakan modern Fetch API
- Error handling dengan try-catch dan user-friendly messages

## 📝 License

Private - Internal Use Only

## 👥 Developer

Universitas Dian Nuswantoro
