#!/bin/bash
# jarvis-update.sh - Auto update script for Debian Server

# Configuration
APP_DIR="/var/www/jadwal-pendadaran"  # Sesuaikan dengan path server Anda
PM2_APP_NAME="jadwal-pendadaran-preview" # Sesuaikan jika ada nama app PM2

echo "🤖 Jarvis: Starting update process on $(hostname)..."
echo "📅 Date: $(date)"
echo "📂 Directory: $APP_DIR"
echo ""

# 1. Masuk ke direktori
if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
else
    echo "❌ Error: Directory $APP_DIR not found!"
    exit 1
fi

# 2. Reset dan Pull dari main
echo "⬇️  Pulling latest code from GitHub..."
git fetch origin main
git reset --hard origin/main
git pull origin main

# 3. Install Dependencies
echo "📦 Installing/Updating dependencies..."
npm install

# 4. Build Project
echo "🏗️  Building project..."
npm run build

# 5. Fix Permissions (Opsional, sesuaikan user nginx/www-data)
echo "🔑 Fixing permissions..."
chown -R www-data:www-data dist
chmod -R 755 dist

# 6. Restart Services
echo "🔄 Restarting services..."

# Jika pakai PM2 untuk backend/preview
if pm2 list | grep -q "$PM2_APP_NAME"; then
    pm2 restart "$PM2_APP_NAME"
    echo "✅ PM2 restarted."
fi

# Jika pakai Nginx untuk static files
systemctl reload nginx
echo "✅ Nginx reloaded."

echo ""
echo "✨ Update completed successfully at $(date)!"
