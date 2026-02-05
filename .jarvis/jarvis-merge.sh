#!/bin/bash
# Jarvis Merge - Create Pull Request

echo "🤖 Jarvis: Preparing Pull Request..."
echo ""

# Pastikan berada di branch update
git checkout update

# Commit semua perubahan
git add .
git commit -m "Ready for PR: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push ke GitHub
git push -u origin update

# Tampilkan informasi dan link PR
echo ""
echo "✅ Branch update berhasil di-push ke GitHub!"
echo ""
echo "📝 Langkah selanjutnya:"
echo "1. Buka GitHub repository Anda"
echo "2. Klik tombol 'Compare & pull request'"
echo "3. Review perubahan"
echo "4. Klik 'Create pull request'"
echo "5. Merge PR di GitHub"
echo ""
echo "🔗 Link cepat (buka di browser):"
REPO_URL=$(git config --get remote.origin.url | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//')
echo "$REPO_URL/compare/main...update?expand=1"
echo ""
echo "⏰ Waktu: $(date '+%Y-%m-%d %H:%M:%S')"
