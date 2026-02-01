# Deployment Guide - Debian Server

Panduan deployment aplikasi Jadwal Pendadaran ke server Debian 13 dengan Nginx dan PM2.

## 🖥️ Server Requirements

- **OS**: Debian 13 (atau Ubuntu 20.04+)
- **RAM**: Minimum 2GB
- **Storage**: Minimum 10GB
- **Software**:
  - Node.js v18+
  - MySQL 8+
  - Nginx
  - PM2 (process manager)

## 📦 Installation Steps

### 1. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### 3. Install MySQL

```bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure installation
sudo mysql_secure_installation

# Login to MySQL
sudo mysql -u root -p
```

Buat database dan user:
```sql
CREATE DATABASE jadwal_pendadaran;
CREATE USER 'jadwal_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON jadwal_pendadaran.* TO 'jadwal_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Install Nginx

```bash
sudo apt install -y nginx

# Start dan enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5. Install PM2

```bash
sudo npm install -g pm2
```

## 🚀 Deploy Application

### 1. Clone/Upload Project

```bash
# Buat direktori aplikasi
sudo mkdir -p /var/www/jadwal-pendadaran
sudo chown $USER:$USER /var/www/jadwal-pendadaran

# Clone repository atau upload files
cd /var/www/jadwal-pendadaran
# git clone <repository-url> .
# atau upload via SFTP
```

### 2. Setup Backend

```bash
cd /var/www/jadwal-pendadaran/backend

# Install dependencies
npm install --production

# Setup .env
cp .env.example .env
nano .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=jadwal_user
DB_PASSWORD=your_strong_password
DB_NAME=jadwal_pendadaran
DB_PORT=3306

PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

Inisialisasi database:
```bash
npm run init-db
```

### 3. Setup Frontend

```bash
cd /var/www/jadwal-pendadaran/frontend

# Install dependencies
npm install

# Setup .env untuk production
echo "VITE_API_URL=https://yourdomain.com/api" > .env

# Build production
npm run build
```

### 4. Configure PM2 untuk Backend

```bash
cd /var/www/jadwal-pendadaran/backend

# Start dengan PM2
pm2 start server.js --name jadwal-api

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
# Jalankan command yang muncul (akan diminta sudo)
```

Verifikasi:
```bash
pm2 list
pm2 logs jadwal-api
```

### 5. Configure Nginx

Buat file konfigurasi Nginx:

```bash
sudo nano /etc/nginx/sites-available/jadwal-pendadaran
```

Isi dengan:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (static files)
    root /var/www/jadwal-pendadaran/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site dan restart Nginx:
```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/jadwal-pendadaran /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 6. Setup SSL dengan Let's Encrypt (Optional tapi Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

Certbot akan otomatis update konfigurasi Nginx untuk HTTPS.

## 🔧 Maintenance

### Update Application

```bash
cd /var/www/jadwal-pendadaran

# Pull latest changes
git pull origin main

# Update backend
cd backend
npm install --production
pm2 restart jadwal-api

# Update frontend
cd ../frontend
npm install
npm run build

# No need to restart Nginx, static files will be updated
```

### Monitor Backend

```bash
# View logs
pm2 logs jadwal-api

# Monitor resources
pm2 monit

# Restart if needed
pm2 restart jadwal-api

# Stop
pm2 stop jadwal-api
```

### Database Backup

```bash
# Backup
mysqldump -u jadwal_user -p jadwal_pendadaran > backup_$(date +%Y%m%d).sql

# Restore
mysql -u jadwal_user -p jadwal_pendadaran < backup_20260201.sql
```

### View Logs

```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs jadwal-api

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

## 🔒 Security Recommendations

1. **Firewall (UFW)**
```bash
sudo apt install ufw
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

2. **Fail2ban**
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

3. **Regular Updates**
```bash
sudo apt update && sudo apt upgrade -y
```

4. **Strong Passwords**
- Gunakan password yang kuat untuk MySQL
- Gunakan SSH key authentication
- Disable root login via SSH

5. **Environment Variables**
- Jangan commit file `.env` ke repository
- Gunakan password yang berbeda untuk production

## 🐛 Troubleshooting

### Backend tidak starting
```bash
# Check logs
pm2 logs jadwal-api

# Check if port 3000 is already in use
sudo netstat -tlnp | grep 3000

# Restart
pm2 restart jadwal-api
```

### Nginx 502 Bad Gateway
```bash
# Check if backend is running
pm2 list

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart jadwal-api
sudo systemctl restart nginx
```

### Database connection error
```bash
# Test MySQL connection
mysql -u jadwal_user -p jadwal_pendadaran

# Check MySQL is running
sudo systemctl status mysql

# Restart MySQL if needed
sudo systemctl restart mysql
```

### Permission errors
```bash
# Fix ownership
sudo chown -R $USER:$USER /var/www/jadwal-pendadaran

# Fix Nginx permissions for static files
sudo chmod -R 755 /var/www/jadwal-pendadaran/frontend/dist
```

## 📊 Performance Optimization

### MySQL Optimization
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Tambahkan:
```ini
[mysqld]
innodb_buffer_pool_size = 1G
max_connections = 200
query_cache_size = 64M
```

Restart MySQL:
```bash
sudo systemctl restart mysql
```

### PM2 Cluster Mode (untuk high traffic)
```bash
pm2 delete jadwal-api
pm2 start server.js --name jadwal-api -i max
pm2 save
```

## 🎉 Done!

Aplikasi Anda sekarang sudah running di production!

- **Frontend**: https://yourdomain.com
- **Backend API**: https://yourdomain.com/api
- **Health Check**: https://yourdomain.com/health

Akses aplikasi dan test semua fitur.
