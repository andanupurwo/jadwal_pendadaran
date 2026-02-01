#!/bin/bash

echo "================================================"
echo "🚀 Setup Jadwal Pendadaran Full Stack"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js tidak ditemukan. Silakan install Node.js terlebih dahulu.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js ditemukan: $(node --version)${NC}"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}⚠️  MySQL command tidak ditemukan. Pastikan MySQL sudah terinstall.${NC}"
else
    echo -e "${GREEN}✅ MySQL ditemukan${NC}"
fi

echo ""
echo "================================================"
echo "📦 Installing Backend Dependencies..."
echo "================================================"

cd backend
if [ ! -f ".env" ]; then
    echo -e "${BLUE}📝 Membuat file .env dari .env.example${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️  MOHON EDIT backend/.env dan sesuaikan kredensial MySQL Anda!${NC}"
fi

npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Gagal install backend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend dependencies installed${NC}"

echo ""
echo "================================================"
echo "📦 Installing Frontend Dependencies..."
echo "================================================"

cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Gagal install frontend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend dependencies installed${NC}"

cd ..

echo ""
echo "================================================"
echo "✅ Setup Selesai!"
echo "================================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. Edit backend/.env dan sesuaikan kredensial MySQL:"
echo "   ${BLUE}nano backend/.env${NC}"
echo ""
echo "2. Inisialisasi database:"
echo "   ${BLUE}cd backend && npm run init-db${NC}"
echo ""
echo "3. Jalankan backend (terminal 1):"
echo "   ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "4. Jalankan frontend (terminal 2):"
echo "   ${BLUE}cd frontend && npm run dev${NC}"
echo ""
echo "5. Buka browser: ${BLUE}http://localhost:5173${NC}"
echo ""
echo "================================================"
