#!/bin/bash
# Jarvis In - Pull work from GitHub

echo "🤖 Jarvis: Retrieving your work..."
echo ""

# Fetch semua perubahan dari GitHub
git fetch origin

# Checkout ke branch update (buat tracking jika belum ada lokal)
if git show-ref --verify --quiet refs/heads/update; then
  git checkout update
else
  if git show-ref --verify --quiet refs/remotes/origin/update; then
    echo "📥 Branch 'update' ditemukan di GitHub. Membuat tracking lokal..."
    git checkout -b update origin/update
    echo "✅ Branch 'update' berhasil di-track dari GitHub!"
  else
    echo "⚠️  Branch 'update' tidak ditemukan. Membuat branch baru..."
    git checkout -b update
    git push -u origin update
    echo "✅ Branch 'update' berhasil dibuat dan di-push ke GitHub!"
  fi
fi

# Pull perubahan terbaru
git pull origin update 2>/dev/null || echo "Branch baru dibuat, tidak ada yang perlu di-pull"

# Tampilkan status
echo ""
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
