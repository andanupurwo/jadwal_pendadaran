---
description: Pull pekerjaan dari GitHub (untuk saat memulai di workstation lain)
---

# Jarvis In - Ambil Pekerjaan dari GitHub

Workflow ini akan:
1. Mengambil perubahan terbaru dari branch `update`
2. Memastikan Anda melanjutkan pekerjaan dari titik terakhir

## Langkah-langkah:

// turbo-all

1. Fetch semua perubahan dari GitHub
```bash
git fetch origin
```

2. Checkout ke branch `update` (buat tracking jika belum ada lokal)
```bash
# Cek apakah branch update ada di lokal
if git show-ref --verify --quiet refs/heads/update; then
  # Branch sudah ada di lokal
  git checkout update
else
  # Branch belum ada di lokal, tapi mungkin ada di remote
  if git show-ref --verify --quiet refs/remotes/origin/update; then
    # Ada di remote, checkout dan track
    echo "📥 Branch 'update' ditemukan di GitHub. Membuat tracking lokal..."
    git checkout -b update origin/update
    echo "✅ Branch 'update' berhasil di-track dari GitHub!"
  else
    # Tidak ada di mana-mana, buat baru
    echo "⚠️  Branch 'update' tidak ditemukan. Membuat branch baru..."
    git checkout -b update
    git push -u origin update
    echo "✅ Branch 'update' berhasil dibuat dan di-push ke GitHub!"
  fi
fi
```

3. Pull perubahan terbaru (jika branch sudah ada di remote)
```bash
git pull origin update 2>/dev/null || echo "Branch baru dibuat, tidak ada yang perlu di-pull"
```

4. Tampilkan status dan commit terakhir
```bash
echo "✅ Pekerjaan berhasil diambil dari GitHub!"
echo "📦 Branch: update"
echo "⏰ Waktu: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "📝 Commit terakhir:"
git log -1 --pretty=format:"%h - %s (%cr)" --abbrev-commit
echo ""
echo ""
echo "📊 Status:"
git status
```
