# API Documentation

Base URL: `http://localhost:3000/api`

## Table of Contents
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Mahasiswa Endpoints](#mahasiswa-endpoints)
- [Dosen Endpoints](#dosen-endpoints)
- [Libur Endpoints](#libur-endpoints)
- [Slots Endpoints](#slots-endpoints)
- [Schedule Endpoints](#schedule-endpoints)
- [Error Codes](#error-codes)

## Authentication

Currently no authentication required. In production, consider adding JWT or similar.

## Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Mahasiswa Endpoints

### Get All Mahasiswa

**GET** `/mahasiswa`

Get list of all mahasiswa.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nim": "A11.2020.12345",
      "nama": "John Doe",
      "prodi": "Informatika",
      "pembimbing": "Dr. Jane Smith",
      "created_at": "2026-01-31T10:00:00.000Z",
      "updated_at": "2026-01-31T10:00:00.000Z"
    }
  ]
}
```

---

### Get Mahasiswa by NIM

**GET** `/mahasiswa/:nim`

Get specific mahasiswa by NIM.

**Parameters:**
- `nim` (path) - Student's NIM

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nim": "A11.2020.12345",
    "nama": "John Doe",
    "prodi": "Informatika",
    "pembimbing": "Dr. Jane Smith"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Mahasiswa not found"
}
```

---

### Create Mahasiswa

**POST** `/mahasiswa`

Create new mahasiswa.

**Request Body:**
```json
{
  "nim": "A11.2020.12345",
  "nama": "John Doe",
  "prodi": "Informatika",
  "pembimbing": "Dr. Jane Smith"
}
```

**Required Fields:**
- `nim` (string)
- `nama` (string)
- `prodi` (string)

**Optional Fields:**
- `pembimbing` (string)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nim": "A11.2020.12345",
    "nama": "John Doe",
    "prodi": "Informatika",
    "pembimbing": "Dr. Jane Smith"
  }
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": "NIM already exists"
}
```

---

### Update Mahasiswa

**PUT** `/mahasiswa/:nim`

Update existing mahasiswa.

**Parameters:**
- `nim` (path) - Student's NIM

**Request Body:**
```json
{
  "nama": "John Doe Updated",
  "prodi": "Informatika",
  "pembimbing": "Dr. Jane Smith"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nim": "A11.2020.12345",
    "nama": "John Doe Updated",
    "prodi": "Informatika",
    "pembimbing": "Dr. Jane Smith"
  }
}
```

---

### Delete Mahasiswa

**DELETE** `/mahasiswa/:nim`

Delete mahasiswa by NIM.

**Parameters:**
- `nim` (path) - Student's NIM

**Response:**
```json
{
  "success": true,
  "message": "Mahasiswa deleted successfully"
}
```

---

### Bulk Create Mahasiswa

**POST** `/mahasiswa/bulk`

Create multiple mahasiswa at once.

**Request Body:**
```json
{
  "mahasiswa": [
    {
      "nim": "A11.2020.12345",
      "nama": "John Doe",
      "prodi": "Informatika",
      "pembimbing": "Dr. Jane Smith"
    },
    {
      "nim": "A11.2020.12346",
      "nama": "Jane Doe",
      "prodi": "Sistem Informasi",
      "pembimbing": "Dr. John Smith"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inserted/Updated: 2, Skipped: 0",
  "inserted": 2,
  "skipped": 0
}
```

---

## Dosen Endpoints

### Get All Dosen

**GET** `/dosen`

Get all dosen grouped by fakultas.

**Response:**
```json
{
  "success": true,
  "data": {
    "FIK": [
      {
        "id": 1,
        "nik": "12345678",
        "nama": "Dr. John Doe",
        "prodi": "Informatika",
        "fakultas": "FIK",
        "exclude": false
      }
    ],
    "FES": [],
    "FST": []
  }
}
```

---

### Get Dosen by Fakultas

**GET** `/dosen/fakultas/:fakultas`

Get dosen by specific fakultas.

**Parameters:**
- `fakultas` (path) - Faculty code (FIK, FES, FST)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nik": "12345678",
      "nama": "Dr. John Doe",
      "prodi": "Informatika",
      "fakultas": "FIK",
      "excluded": 0
    }
  ]
}
```

---

### Toggle Exclude Dosen

**PATCH** `/dosen/:nik/exclude`

Toggle exclude status for a dosen.

**Parameters:**
- `nik` (path) - Lecturer's NIK

**Request Body:**
```json
{
  "exclude": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Dosen exclusion status updated"
}
```

---

### Bulk Insert Dosen

**POST** `/dosen/bulk`

Insert multiple dosen at once.

**Request Body:**
```json
{
  "dosen": [
    {
      "nik": "12345678",
      "nama": "Dr. John Doe",
      "prodi": "Informatika",
      "fakultas": "FIK"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inserted/Updated: 1 dosen",
  "inserted": 1
}
```

---

### Get Master Dosen

**GET** `/dosen/master`

Get master dosen from SDM data.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nik": "12345678",
      "nama": "Dr. John Doe",
      "status": "DOSEN",
      "kategori": "Dosen Tetap",
      "nidn": "0123456789",
      "jenis_kelamin": "L"
    }
  ]
}
```

---

## Libur Endpoints

### Get All Libur

**GET** `/libur`

Get all libur/unavailability entries.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2026-02-16",
      "time": "08:30",
      "room": "6.3.A",
      "reason": "Hari Libur Nasional"
    }
  ]
}
```

---

### Create Libur

**POST** `/libur`

Create new libur entry.

**Request Body:**
```json
{
  "date": "2026-02-16",
  "time": "08:30",
  "room": "6.3.A",
  "reason": "Hari Libur Nasional"
}
```

**Required Fields:**
- `date` (string) - Date in YYYY-MM-DD format

**Optional Fields:**
- `time` (string)
- `room` (string)
- `reason` (string)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "date": "2026-02-16",
    "time": "08:30",
    "room": "6.3.A",
    "reason": "Hari Libur Nasional"
  }
}
```

---

### Delete Libur

**DELETE** `/libur/:id`

Delete libur entry.

**Parameters:**
- `id` (path) - Libur entry ID

**Response:**
```json
{
  "success": true,
  "message": "Libur entry deleted successfully"
}
```

---

### Bulk Create Libur

**POST** `/libur/bulk`

Create multiple libur entries.

**Request Body:**
```json
{
  "libur": [
    {
      "date": "2026-02-16",
      "time": null,
      "room": null,
      "reason": "Hari Libur"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inserted: 1 libur entries",
  "inserted": 1
}
```

---

## Slots Endpoints

### Get All Slots

**GET** `/slots`

Get all scheduled slots with examiners.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2026-02-16",
      "time": "08:30",
      "room": "6.3.A",
      "student": "John Doe",
      "examiners": [
        "Dr. Examiner 1",
        "Dr. Examiner 2",
        "Dr. Supervisor"
      ]
    }
  ]
}
```

---

### Get Slots by Date

**GET** `/slots/date/:date`

Get slots for specific date.

**Parameters:**
- `date` (path) - Date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "date": "2026-02-16",
      "time": "08:30",
      "room": "6.3.A",
      "student": "John Doe",
      "examiners": ["Dr. A", "Dr. B", "Dr. C"]
    }
  ]
}
```

---

### Delete All Slots

**DELETE** `/slots`

Delete all slots (reset schedule).

**Response:**
```json
{
  "success": true,
  "message": "All slots deleted successfully",
  "deletedCount": 150
}
```

---

### Delete Single Slot

**DELETE** `/slots/:id`

Delete specific slot.

**Parameters:**
- `id` (path) - Slot ID

**Response:**
```json
{
  "success": true,
  "message": "Slot deleted successfully"
}
```

---

## Schedule Endpoints

### Generate Schedule

**POST** `/schedule/generate`

Generate exam schedule using AI algorithm.

**Request Body:**
```json
{
  "targetProdi": "all",
  "isIncremental": false
}
```

**Parameters:**
- `targetProdi` (string) - Target study program or "all"
- `isIncremental` (boolean) - Incremental mode (keep existing) or reset mode

**Response:**
```json
{
  "success": true,
  "logs": [
    "[10:00:00] 🚀 MEMULAI PROSES PENJADWALAN OTOMATIS...",
    "[10:00:01] ✅ [2026-02-16 08:30] John Doe",
    "[10:00:05] 🏁 Selesai. Terjadwal: 150/200"
  ],
  "scheduled": 150,
  "total": 200,
  "slots": [
    {
      "date": "2026-02-16",
      "time": "08:30",
      "room": "6.3.A",
      "student": "John Doe",
      "examiners": ["Dr. A", "Dr. B", "Dr. C"]
    }
  ]
}
```

---

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate entry |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production:
- `express-rate-limit` middleware
- Redis-based rate limiting for distributed systems

---

## CORS Configuration

Default CORS origin: `http://localhost:5173`

Configure in backend `.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

For production, set to your domain:
```env
CORS_ORIGIN=https://yourdomain.com
```

---

## Examples

### cURL Examples

**Get all mahasiswa:**
```bash
curl http://localhost:3000/api/mahasiswa
```

**Create mahasiswa:**
```bash
curl -X POST http://localhost:3000/api/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{
    "nim": "A11.2020.12345",
    "nama": "John Doe",
    "prodi": "Informatika",
    "pembimbing": "Dr. Jane"
  }'
```

**Generate schedule:**
```bash
curl -X POST http://localhost:3000/api/schedule/generate \
  -H "Content-Type: application/json" \
  -d '{
    "targetProdi": "all",
    "isIncremental": false
  }'
```

### JavaScript (Fetch) Examples

**Get all mahasiswa:**
```javascript
fetch('http://localhost:3000/api/mahasiswa')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Create mahasiswa:**
```javascript
fetch('http://localhost:3000/api/mahasiswa', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nim: 'A11.2020.12345',
    nama: 'John Doe',
    prodi: 'Informatika',
    pembimbing: 'Dr. Jane'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```
