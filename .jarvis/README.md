# 🤖 Jarvis Terminal Setup

Untuk menggunakan `jarvis-out`, `jarvis-in`, dan `jarvis-merge` langsung di terminal, ikuti langkah berikut:

## Setup (Hanya Sekali)

1. Tambahkan aliases ke file `~/.zshrc`:

```bash
echo 'source /Users/purwo/VibeCoding/jadwal_pendadaran/.jarvis/aliases.zsh' >> ~/.zshrc
```

2. Reload terminal:

```bash
source ~/.zshrc
```

## Selesai! Sekarang Anda Bisa:

```bash
# Di terminal mana saja
jarvis-out    # Save dan push ke GitHub
jarvis-in     # Pull dari GitHub
jarvis-merge  # Buat Pull Request
```

---

## Alternatif: Tanpa Setup Alias

Jika tidak mau setup alias, bisa langsung jalankan script:

```bash
bash .jarvis/jarvis-out.sh
bash .jarvis/jarvis-in.sh
bash .jarvis/jarvis-merge.sh
```

---

## Catatan Penting

- Script ini **hanya bekerja di dalam folder project** `/Users/purwo/VibeCoding/jadwal_pendadaran`
- Jika ingin pakai di project lain, copy folder `.jarvis` ke project tersebut dan update path di `aliases.zsh`
