---
description: Siapkan Pull Request untuk merge update ke main
---

# Jarvis PR - Buat Pull Request ke Main

Workflow ini akan:
1. Commit dan push semua perubahan di branch `update`
2. Memberikan link untuk membuat Pull Request di GitHub
3. Main branch HANYA diupdate via PR (best practice!)

## Langkah-langkah:

// turbo-all

1. Pastikan berada di branch `update`
```bash
git checkout update
```

2. Commit semua perubahan
```bash
git add .
git commit -m "Ready for PR: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
```

3. Push ke GitHub
```bash
git push -u origin update
```

4. Tampilkan informasi dan link PR
```bash
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
```
