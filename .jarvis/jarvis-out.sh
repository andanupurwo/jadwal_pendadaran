#!/bin/bash
# Jarvis Out - Save and push work to GitHub

echo "🤖 Jarvis: Saving your work..."
echo ""

# Pastikan berada di branch update (atau buat jika belum ada)
if git show-ref --verify --quiet refs/heads/update; then
  git checkout update
else
  echo "⚠️  Branch 'update' belum ada. Membuat branch baru..."
  git checkout -b update
  echo "✅ Branch 'update' berhasil dibuat!"
fi

# Tambahkan semua perubahan
git add .

# Ambil daftar file yang berubah
CHANGED_FILES=$(git diff --name-only --cached)
FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')

# Buat pesan commit dengan daftar file
COMMIT_MSG="WIP: Auto-save $(date '+%Y-%m-%d %H:%M:%S') - $FILE_COUNT files changed

Files modified:
$CHANGED_FILES"

# Commit dengan pesan detail
git commit -m "$COMMIT_MSG"

# Push ke GitHub
git push -u origin update

# Tampilkan status
echo ""
echo "✅ Pekerjaan berhasil disimpan ke GitHub!"
echo "📦 Branch: update"
echo "⏰ Waktu: $(date '+%Y-%m-%d %H:%M:%S')"
git log -1 --oneline
