---
description: Setup awal branch update (hanya sekali di awal)
---

# Jarvis Setup - Inisialisasi Branch Update

Workflow ini untuk **setup awal** saja. Hanya dijalankan **SEKALI** saat pertama kali menggunakan sistem Jarvis.

## Apa yang dilakukan:
1. Membuat branch `update` dari branch saat ini
2. Push branch `update` ke GitHub
3. Set tracking agar bisa sync otomatis

## Langkah-langkah:

// turbo-all

1. Cek branch saat ini dan status
```bash
echo "📍 Branch saat ini:"
git branch --show-current
echo ""
echo "📊 Status:"
git status --short
```

2. Buat branch `update` dari branch saat ini
```bash
git checkout -b update
```

3. Push branch `update` ke GitHub
```bash
git push -u origin update
```

4. Tampilkan konfirmasi
```bash
echo ""
echo "✅ Setup selesai!"
echo "📦 Branch 'update' berhasil dibuat dan di-push ke GitHub"
echo ""
echo "🎯 Langkah selanjutnya:"
echo "1. Gunakan /jarvis-out saat selesai kerja"
echo "2. Gunakan /jarvis-in saat mulai kerja di workstation lain"
echo "3. Gunakan /jarvis-merge saat fitur selesai (buat PR)"
echo ""
echo "📚 Baca JARVIS_GUIDE.md untuk panduan lengkap"
```
