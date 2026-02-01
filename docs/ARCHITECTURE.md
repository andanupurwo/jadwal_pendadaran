# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                     │
│                     http://localhost:5173                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      FRONTEND (Vite)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  UI Components (Vanilla JS)                            │ │
│  │  - Pages: Home, Dosen, Mahasiswa, Libur, Logic         │ │
│  │  - Modals: Forms, Confirmations                        │ │
│  │  - Router: Client-side navigation                      │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Services                                               │ │
│  │  - API Client (fetch)                                   │ │
│  │  - CSV Loaders                                          │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Logic (Client-side)                                    │ │
│  │  - Data Matching                                        │ │
│  │  - Availability Checking (display only)                │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ REST API
                            │ (JSON)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  BACKEND (Node.js + Express)                 │
│                     http://localhost:3000                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Routes                                             │ │
│  │  /api/mahasiswa  /api/dosen  /api/libur               │ │
│  │  /api/slots      /api/schedule                         │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Controllers                                            │ │
│  │  - mahasiswaController                                  │ │
│  │  - dosenController                                      │ │
│  │  - liburController                                      │ │
│  │  - slotsController                                      │ │
│  │  - scheduleController (AI Engine)                       │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Business Logic                                         │ │
│  │  - Sequential Greedy Search Algorithm                  │ │
│  │  - Availability Checking                               │ │
│  │  - Examiner Selection Rules                            │ │
│  │  - Faculty-specific Rules (FIK, FES, FST)              │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ SQL Queries
                            │ (mysql2)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    DATABASE (MySQL 8)                        │
│                   Database: jadwal_pendadaran                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Tables:                                                │ │
│  │  • master_dosen      - SDM master data                  │ │
│  │  • dosen             - Faculty lecturer data            │ │
│  │  • mahasiswa         - Student data                     │ │
│  │  • libur             - Holidays/unavailability          │ │
│  │  • slots             - Generated schedule slots         │ │
│  │  • slot_examiners    - Examiners per slot              │ │
│  │  • app_settings      - Application settings             │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Schedule Generation Flow

```
User clicks "Generate Schedule"
        │
        ▼
Frontend: schedulingEngine.js
        │
        │ POST /api/schedule/generate
        │ { targetProdi: "all", isIncremental: false }
        │
        ▼
Backend: scheduleController.js
        │
        ├─► Load mahasiswa from DB
        ├─► Load dosen from DB
        ├─► Load libur from DB
        ├─► Load existing slots from DB
        │
        ├─► Apply Sequential Greedy Search Algorithm
        │   ├─► For each date, time, room:
        │   │   ├─► For each unscheduled student:
        │   │   │   ├─► Check supervisor availability
        │   │   │   ├─► Find 2 suitable examiners
        │   │   │   │   ├─► Check faculty rules
        │   │   │   │   ├─► Check study program rules
        │   │   │   │   ├─► Check availability
        │   │   │   │   └─► Sort by workload (fairness)
        │   │   │   └─► Create slot if found
        │   │   └─► Continue until all students scheduled
        │
        ├─► Save slots to DB
        │   ├─► Insert into slots table
        │   └─► Insert into slot_examiners table
        │
        │ Response: { success, logs, scheduled, total }
        │
        ▼
Frontend: Update UI
        │
        └─► Display results
            └─► Refresh slots from API
```

### 2. CRUD Operations Flow

```
User Action (Create/Update/Delete)
        │
        ▼
Frontend: action handler
        │
        │ API Call (POST/PUT/DELETE)
        │
        ▼
Backend: Controller
        │
        ├─► Validate input
        ├─► Execute SQL query
        └─► Return response
        │
        ▼
Frontend: Update local state
        │
        └─► Refresh UI
```

## Technology Stack Details

### Frontend Stack
- **Build Tool**: Vite 7.2.4
- **Language**: ES6+ JavaScript (Vanilla)
- **Styling**: CSS3 with CSS Variables
- **HTTP Client**: Fetch API
- **State Management**: Module-based (store.js)
- **Routing**: Custom SPA router

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Database Driver**: mysql2 3.6
- **Middleware**: 
  - cors (CORS handling)
  - express.json (JSON parsing)
  - dotenv (environment variables)

### Database Stack
- **RDBMS**: MySQL 8.0
- **Storage Engine**: InnoDB
- **Character Set**: utf8mb4
- **Collation**: utf8mb4_unicode_ci

## Security Layers

```
┌─────────────────────────────────────────────┐
│  1. HTTPS/TLS (in production)               │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│  2. CORS Policy                             │
│     - Whitelist frontend origin             │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│  3. Input Validation                        │
│     - Type checking                         │
│     - Required field validation             │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│  4. SQL Injection Prevention                │
│     - Prepared statements (mysql2)          │
│     - Parameterized queries                 │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│  5. Database Access Control                 │
│     - Dedicated user with limited privileges│
│     - Connection pooling                    │
└─────────────────────────────────────────────┘
```

## Scalability Considerations

### Horizontal Scaling
- **Backend**: Can run multiple instances with load balancer
- **Database**: Can use replication (master-slave)
- **Frontend**: Serve static files via CDN

### Vertical Scaling
- **MySQL**: Increase buffer pool size, connections
- **Node.js**: Use PM2 cluster mode
- **Nginx**: Tune worker processes

### Caching Strategy (Future)
- **Redis**: Cache frequently accessed data
- **Browser**: Cache static assets with proper headers
- **Database**: Query result caching

## Monitoring & Logging

```
Frontend Logs
    │
    ├─► Browser Console (development)
    └─► Error tracking service (production)

Backend Logs
    │
    ├─► PM2 logs
    ├─► Application logs (console)
    └─► Error tracking service (production)

Database Logs
    │
    └─► MySQL slow query log
```

## Development Workflow

```
1. Local Development
   ├─► Frontend: npm run dev (port 5173)
   └─► Backend: npm run dev (port 3000)

2. Testing
   ├─► Manual testing
   └─► API testing (Postman/curl)

3. Build
   ├─► Frontend: npm run build → dist/
   └─► Backend: No build needed (production npm install)

4. Deployment
   ├─► Upload to server
   ├─► Install dependencies
   ├─► Configure environment
   ├─► Setup PM2 + Nginx
   └─► Start services
```

## Database Schema Relationships

```
master_dosen
    │
    │ (reference by NIK)
    ▼
  dosen ─────────────┐
                     │
mahasiswa            │
    │                │
    │ (FK: nim)      │
    ▼                │
  slots ◄────────────┘ (examiners come from dosen)
    │
    │ (FK: slot_id, CASCADE)
    ▼
slot_examiners

libur (independent table)
app_settings (independent table)
```

## API Response Format

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
  "error": "Error message"
}
```

### Paginated Response (Future)
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 200
  }
}
```
