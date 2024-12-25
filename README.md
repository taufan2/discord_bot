# Discord Bot dengan GROQ AI

Bot Discord yang menggunakan GROQ AI untuk menghasilkan respons.

## Deskripsi

Proyek ini adalah sebuah bot Discord yang memanfaatkan kemampuan AI dari GROQ untuk menghasilkan respons terhadap pesan pengguna. Bot ini ditulis dalam TypeScript dan menggunakan library discord.js.

## Fitur

- Integrasi dengan GROQ AI untuk menghasilkan respons
- Konfigurasi mudah menggunakan file .env
- Penanganan pesan Discord yang efisien

## Prasyarat

Sebelum Anda memulai, pastikan Anda telah menginstal:

- Node.js (versi 14.0.0 atau lebih baru)
- npm (biasanya terinstal bersama Node.js)

## Instalasi

1. Clone repositori ini:
   ```
   git clone https://github.com/username/discord-bot-groq.git
   ```

2. Masuk ke direktori proyek:
   ```
   cd discord-bot-groq
   ```

3. Instal dependensi:
   ```
   npm install
   ```

4. Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda:
   ```
   cp .env.example .env
   ```

5. Edit file `.env` dan tambahkan token Discord dan API key GROQ Anda:
   ```
   DISCORD_TOKEN=your_discord_token_here
   GROQ_API_KEY=your_groq_api_key_here
   ```

## Penggunaan

Untuk menjalankan bot:

```
npm start
```

## Konfigurasi

Anda dapat mengubah perilaku bot dengan memodifikasi file `src/config/environment.ts`. Di sini Anda dapat mengubah prompt sistem dan pengaturan lainnya.

## Kontribusi

Kontribusi selalu diterima dengan baik. Jika Anda ingin berkontribusi:

1. Fork repositori
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request