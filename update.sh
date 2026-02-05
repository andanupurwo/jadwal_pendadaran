#!/bin/bash

# Pastikan script berhenti jika ada error
set -e

echo "==========================================="
echo "🚀  UPDATE JADWAL PENDADARAN AI           "
echo "==========================================="
echo ""

# 1. Tarik kode terbaru
echo "📥 [1/4] Mengambil update dari GitHub (Git Pull)..."
git pull origin main
echo "   ✅ Code updated."
echo ""

# 2. Build Frontend
echo "🏗️  [2/4] Build Frontend (Vite)..."
cd frontend
# Cek apakah ada perubahan di package.json, jika ya install dependencies
if [ -f "package-lock.json" ]; then
    npm ci --silent
else
    npm install --silent
fi
npm run build
cd ..
echo "   ✅ Frontend built."
echo ""

# 3. Update Backend Dependencies
echo "🔄 [3/4] Update Backend..."
cd backend
if [ -f "package-lock.json" ]; then
    npm ci --silent
else
    npm install --silent
fi
cd ..
echo "   ✅ Backend ready."
echo ""

# 4. Restart Service
echo "🚀 [4/4] Restarting PM2 Service..."
# Reload agar downtime minimal (0-downtime reload jika cluster mode, atau restart biasa)
pm2 reload all || pm2 restart all
echo "   ✅ Services restarted."

echo ""
echo "==========================================="
echo "✅  UPDATE SUKSES! APLIKASI SUDAH LIVE.   "
echo "==========================================="
