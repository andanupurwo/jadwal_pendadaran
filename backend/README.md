# Backend API - Jadwal Pendadaran AI

Backend RESTful API untuk sistem manajemen dan penjadwalan otomatis ujian pendadaran.

## 🚀 Fitur

- **RESTful API** dengan Express.js
- **MySQL Database** untuk data persistence
- **Scheduling Engine** dengan algoritma Sequential Greedy Search
- **CORS Support** untuk frontend integration
- **Error Handling** yang comprehensive

## 📦 Instalasi

### Prerequisites

- Node.js (v18 atau lebih baru)
- MySQL (v8 atau lebih baru)

### Setup

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Konfigurasi Database**

Buat file `.env` dari template:
```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan konfigurasi database Anda:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=jadwal_pendadaran
DB_PORT=3306

PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. **Inisialisasi Database**
```bash
npm run init-db
```

Script ini akan:
- Membuat database `jadwal_pendadaran`
- Membuat semua tabel yang diperlukan
- Setup indexes dan foreign keys

4. **Jalankan Server**
```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📚 API Endpoints

### Health Check
```
GET /health
```

### Mahasiswa
```
GET    /api/mahasiswa              - Get all mahasiswa
GET    /api/mahasiswa/:nim         - Get mahasiswa by NIM
POST   /api/mahasiswa              - Create new mahasiswa
PUT    /api/mahasiswa/:nim         - Update mahasiswa
DELETE /api/mahasiswa/:nim         - Delete mahasiswa
POST   /api/mahasiswa/bulk         - Bulk create mahasiswa
```

### Dosen
```
GET    /api/dosen                       - Get all dosen (grouped by fakultas)
GET    /api/dosen/fakultas/:fakultas   - Get dosen by fakultas
PATCH  /api/dosen/:nik/exclude          - Toggle exclude dosen
POST   /api/dosen/bulk                  - Bulk insert dosen
GET    /api/dosen/master                - Get master dosen (SDM)
POST   /api/dosen/master/bulk           - Bulk insert master dosen
```

### Libur
```
GET    /api/libur                  - Get all libur entries
POST   /api/libur                  - Create libur entry
DELETE /api/libur/:id              - Delete libur entry
POST   /api/libur/bulk             - Bulk create libur entries
```

### Slots (Jadwal)
```
GET    /api/slots                  - Get all slots
GET    /api/slots/date/:date       - Get slots by date
DELETE /api/slots                  - Delete all slots
DELETE /api/slots/:id              - Delete single slot
POST   /api/slots/bulk             - Bulk create slots
```

### Schedule Generation
```
POST   /api/schedule/generate      - Generate schedule
```

Request body:
```json
{
  "targetProdi": "all",           // atau nama prodi spesifik
  "isIncremental": false          // true untuk mode incremental
}
```

Response:
```json
{
  "success": true,
  "logs": ["..."],
  "scheduled": 150,
  "total": 200,
  "slots": [...]
}
```

## 🗄️ Database Schema

### Tabel Utama

1. **master_dosen** - Data master dosen dari SDM
   - id, nik, nama, status, kategori, nidn, jenis_kelamin

2. **dosen** - Data dosen per fakultas
   - id, nik, nama, prodi, fakultas, excluded

3. **mahasiswa** - Data mahasiswa
   - id, nim, nama, prodi, pembimbing

4. **libur** - Hari libur dan ketidaktersediaan
   - id, date, time, room, reason

5. **slots** - Jadwal yang sudah digenerate
   - id, date, time, room, student, mahasiswa_nim

6. **slot_examiners** - Penguji untuk setiap slot
   - id, slot_id, examiner_name, examiner_order

7. **app_settings** - Application settings
   - setting_key, setting_value

## 🔧 Development

### Testing API

Gunakan tools seperti:
- **Postman** 
- **Thunder Client** (VS Code extension)
- **curl**

Contoh:
```bash
# Health check
curl http://localhost:3000/health

# Get all mahasiswa
curl http://localhost:3000/api/mahasiswa

# Create mahasiswa
curl -X POST http://localhost:3000/api/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"A11.2020.12345","nama":"John Doe","prodi":"Informatika","pembimbing":"Dr. Jane"}'
```

### Database Management

Untuk reset database:
```sql
DROP DATABASE jadwal_pendadaran;
```

Lalu jalankan ulang:
```bash
npm run init-db
```

## 🛡️ Error Handling

Semua response menggunakan format konsisten:

Success:
```json
{
  "success": true,
  "data": {...}
}
```

Error:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 📝 License

Private - Internal Use Only

## 👥 Developer

Universitas Dian Nuswantoro
