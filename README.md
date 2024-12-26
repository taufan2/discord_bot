# Discord Bot dengan GROQ AI

Bot Discord yang menggunakan GROQ AI untuk menghasilkan respons terhadap pesan pengguna. Ditulis dalam TypeScript dan menggunakan library discord.js.

## Fitur

- Integrasi dengan GROQ AI untuk menghasilkan respons
- Konfigurasi mudah menggunakan file .env
- Penanganan pesan yang efisien
- Penyimpanan riwayat chat menggunakan MongoDB

## Prasyarat

- Node.js (versi 14.0.0 atau lebih baru)
- npm
- Akun Discord Developer
- Akun GROQ AI
- MongoDB

## Memulai

1. Clone repositori:
   ```
   git clone https://github.com/username/discord-bot-groq.git
   ```

2. Masuk ke direktori proyek:
   ```
   cd discord-bot-groq
   ```

3. Install dependensi:
   ```
   npm install
   ```

4. Salin file .env.example menjadi .env:
   ```
   cp .env.example .env
   ```

5. Edit file .env dan tambahkan token Discord dan kunci API GROQ Anda:
   ```
   DISCORD_TOKEN=your_discord_token_here
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_uri_here
   ```

6. Jalankan bot:
   ```
   npm start
   ```

## Pengembangan

Untuk menjalankan bot dalam mode pengembangan dengan restart otomatis saat ada perubahan file:

```
npm run dev
```

## Pengujian

Jalankan suite pengujian dengan perintah:

```
npm test
```

## Konfigurasi

Anda dapat mengubah perilaku dan pengaturan bot dengan memodifikasi file `src/config/environment.ts`.

## Struktur Proyek

- `src/`: Kode sumber utama
  - `bot/`: Kode spesifik bot
  - `config/`: File konfigurasi
  - `handlers/`: Logika penanganan event dan pesan
  - `helpers/`: Fungsi utilitas
  - `models/`: Struktur data dan kelas
  - `services/`: Kelas layanan untuk interaksi dengan sistem eksternal
- `test/`: File pengujian
- `config/`: File konfigurasi tambahan

## Kontribusi

Kontribusi sangat diterima. Silakan fork repositori, buat branch fitur baru, commit perubahan Anda, push ke branch, dan buka Pull Request.

## Kontak

Jika Anda memiliki pertanyaan atau masukan, silakan buka issue di repositori GitHub ini.
