---
description: Simpan dan push pekerjaan ke GitHub (untuk saat meninggalkan workstation)
---

# Jarvis Out - Simpan Pekerjaan ke GitHub

Workflow ini akan:
1. Menyimpan semua perubahan ke branch `update` (bukan `main`)
2. Commit dengan timestamp otomatis
3. Push ke GitHub

## Langkah-langkah:

// turbo-all

1. Pastikan berada di branch `update` (atau buat jika belum ada)
```bash
# Cek apakah branch update sudah ada
if git show-ref --verify --quiet refs/heads/update; then
  # Branch sudah ada, checkout
  git checkout update
else
  # Branch belum ada, buat baru
  echo "⚠️  Branch 'update' belum ada. Membuat branch baru..."
  git checkout -b update
  echo "✅ Branch 'update' berhasil dibuat!"
fi
```

2. Tambahkan semua perubahan
```bash
git add .
```

3. Commit dengan pesan otomatis (timestamp + lokasi)
```bash
git commit -m "WIP: Auto-save $(date '+%Y-%m-%d %H:%M:%S') - leaving workstation"
```

4. Push ke GitHub
```bash
git push -u origin update
```

5. Tampilkan status
```bash
echo "✅ Pekerjaan berhasil disimpan ke GitHub!"
echo "📦 Branch: update"
echo "⏰ Waktu: $(date '+%Y-%m-%d %H:%M:%S')"
git log -1 --oneline
```
