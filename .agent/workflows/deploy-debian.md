---
description: Deploy aplikasi ke server Debian 13 dengan Nginx dan PM2
---

# Tutorial Deploy Aplikasi Jadwal Pendadaran ke Server Debian 13

Tutorial ini menjelaskan cara deploy aplikasi Vite ke server Debian 13 yang sudah memiliki Nginx, npm, dan PM2.

## Prerequisites

Server Debian 13 sudah terinstall:
- ✅ Nginx
- ✅ Node.js & npm
- ✅ PM2
- ✅ Git (untuk clone repository)

## Langkah 1: Persiapan di Server

SSH ke server Debian:
```bash
ssh user@your-server-ip
```

Buat direktori untuk aplikasi:
```bash
sudo mkdir -p /var/www/jadwal-pendadaran
sudo chown -R $USER:$USER /var/www/jadwal-pendadaran
cd /var/www/jadwal-pendadaran
```

## Langkah 2: Clone Repository

Clone repository dari GitHub:
```bash
git clone https://github.com/andanupurwo/Jadwal-Pendadaran.git .
```

Atau jika sudah ada repository lokal, upload menggunakan rsync/scp dari komputer lokal:
```bash
# Jalankan dari komputer lokal (Windows PowerShell)
scp -r "P:\Project Aplikasi\Jadwal Pendadaran" user@your-server-ip:/var/www/jadwal-pendadaran
```

## Langkah 3: Install Dependencies

Di server, install dependencies npm:
```bash
cd /var/www/jadwal-pendadaran
npm install
```

## Langkah 4: Build Aplikasi untuk Production

Build aplikasi Vite:
```bash
npm run build
```

Ini akan membuat folder `dist` yang berisi file-file static yang sudah di-optimize untuk production.

## Langkah 5: Konfigurasi Nginx

Buat file konfigurasi Nginx untuk aplikasi:
```bash
sudo nano /etc/nginx/sites-available/jadwal-pendadaran
```

Isi dengan konfigurasi berikut:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Ganti dengan domain Anda atau IP server

    root /var/www/jadwal-pendadaran/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Aktifkan konfigurasi:
```bash
sudo ln -s /etc/nginx/sites-available/jadwal-pendadaran /etc/nginx/sites-enabled/
```

Test konfigurasi Nginx:
```bash
sudo nginx -t
```

Jika tidak ada error, reload Nginx:
```bash
sudo systemctl reload nginx
```

## Langkah 6: Setup PM2 untuk Auto-Rebuild (Opsional)

Jika Anda ingin menggunakan PM2 untuk menjalankan development server (tidak direkomendasikan untuk production, tapi berguna untuk testing):

Buat file ecosystem PM2:
```bash
nano ecosystem.config.cjs
```

Isi dengan:
```javascript
module.exports = {
  apps: [{
    name: 'jadwal-pendadaran-preview',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/jadwal-pendadaran',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
};
```

Start dengan PM2:
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

**Note:** Untuk production, lebih baik serve file static dari `dist` menggunakan Nginx saja (Langkah 5), tanpa perlu PM2.

## Langkah 7: Setup Auto-Deploy dengan Git Hook (Opsional)

Untuk auto-deploy saat ada push ke repository:

Buat script deploy:
```bash
nano /var/www/jadwal-pendadaran/deploy.sh
```

Isi dengan:
```bash
#!/bin/bash
cd /var/www/jadwal-pendadaran
git pull origin main
npm install
npm run build
echo "Deploy completed at $(date)"
```

Buat executable:
```bash
chmod +x /var/www/jadwal-pendadaran/deploy.sh
```

## Langkah 8: Setup HTTPS dengan Let's Encrypt (Opsional tapi Direkomendasikan)

Install Certbot:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

Dapatkan SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

Certbot akan otomatis mengkonfigurasi Nginx untuk HTTPS.

## Langkah 9: Firewall Configuration

Pastikan port 80 dan 443 terbuka:
```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## Maintenance & Update

### Update Aplikasi
Untuk update aplikasi setelah ada perubahan:
```bash
cd /var/www/jadwal-pendadaran
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

Atau jalankan script deploy:
```bash
/var/www/jadwal-pendadaran/deploy.sh
```

### Monitor Logs Nginx
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart Nginx
sudo systemctl restart nginx

# Restart PM2 (jika digunakan)
pm2 restart jadwal-pendadaran-preview
```

## Troubleshooting

### 403 Forbidden Error
Periksa permission folder:
```bash
sudo chown -R www-data:www-data /var/www/jadwal-pendadaran/dist
sudo chmod -R 755 /var/www/jadwal-pendadaran/dist
```

### 404 Not Found untuk Routes
Pastikan `try_files $uri $uri/ /index.html;` ada di konfigurasi Nginx.

### Build Gagal
Periksa versi Node.js:
```bash
node --version  # Minimal v18 atau lebih baru
npm --version
```

Update Node.js jika perlu:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Data Dosen Tidak Muncul / CSV Error
Pastikan file CSV ada di folder `public/assets/data/`:
```bash
ls -la /var/www/jadwal-pendadaran/dist/assets/data/
```

Seharusnya ada 2 file:
- `Data pegawai - DAAK.csv`
- `Dosen Prodi.csv`

Jika tidak ada, pastikan file CSV ada di folder `public` sebelum build:
```bash
# Di local, sebelum push ke GitHub
mkdir -p public/assets/data
cp src/assets/data/*.csv public/assets/data/
git add public/assets/data/
git commit -m "Add CSV data to public folder"
git push
```

Kemudian di server:
```bash
git pull
npm run build
```


## Arsitektur Deployment

```
Internet
    ↓
Nginx (Port 80/443)
    ↓
Static Files (/var/www/jadwal-pendadaran/dist)
    ↓
Browser (Client-side Vite App)
```

Aplikasi ini adalah Single Page Application (SPA) yang berjalan sepenuhnya di browser. Nginx hanya serve file static HTML, CSS, dan JavaScript.

## Checklist Deployment

- [ ] Server sudah terinstall Nginx, Node.js, npm
- [ ] Repository di-clone atau di-upload ke `/var/www/jadwal-pendadaran`
- [ ] Dependencies terinstall (`npm install`)
- [ ] Build production selesai (`npm run build`)
- [ ] Konfigurasi Nginx dibuat dan diaktifkan
- [ ] Nginx di-reload
- [ ] Aplikasi bisa diakses via browser
- [ ] (Opsional) SSL certificate terinstall
- [ ] (Opsional) Firewall dikonfigurasi
- [ ] (Opsional) Auto-deploy script dibuat

## Selesai! 🎉

Aplikasi Anda sekarang sudah live di server Debian 13 dan bisa diakses melalui domain atau IP server Anda.
