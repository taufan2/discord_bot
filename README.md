# Discord Bot dengan GROQ AI

Bot Discord ini menggunakan GROQ AI untuk menghasilkan respons terhadap pesan pengguna. Bot ini ditulis dalam TypeScript dan menggunakan library discord.js untuk berinteraksi dengan Discord.

## Fitur

- **Integrasi dengan GROQ AI**: Menggunakan AI untuk menghasilkan respons yang cerdas dan relevan.
- **Konfigurasi Mudah**: Menggunakan file .env untuk menyimpan konfigurasi sensitif seperti token dan kunci API.
- **Penanganan Pesan Efisien**: Memproses dan merespons pesan dengan cepat.
- **Penyimpanan Riwayat Chat**: Menggunakan MongoDB untuk menyimpan riwayat percakapan.

## Prasyarat

Sebelum memulai, pastikan Anda memiliki:

- Node.js (versi 14.0.0 atau lebih baru)
- npm (Node Package Manager)
- Akun Discord Developer untuk mendapatkan token bot
- Akun GROQ AI untuk mendapatkan kunci API
- MongoDB untuk menyimpan data

## Memulai

Ikuti langkah-langkah berikut untuk menjalankan bot:

1. **Clone repositori**:
   ```bash
   git clone https://github.com/taufan2/discord_bot.git
   ```

2. **Masuk ke direktori proyek**:
   ```bash
   cd discord_bot
   ```

3. **Install dependensi**:
   ```bash
   npm install
   ```

4. **Salin file .env.example menjadi .env**:
   ```bash
   cp .env.example .env
   ```

5. **Edit file .env** dan tambahkan token Discord, kunci API GROQ, dan URI MongoDB Anda:
   ```bash
   DISCORD_TOKEN=your_discord_token_here
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_uri_here
   ```

6. **Jalankan bot**:
   ```bash
   npm start
   ```

## Pengembangan

Untuk menjalankan bot dalam mode pengembangan dengan restart otomatis saat ada perubahan file:

```bash
npm run dev
```

## Pengujian

Jalankan suite pengujian dengan perintah:

```bash
npm test
```

## Konfigurasi

Anda dapat mengubah perilaku dan pengaturan bot dengan memodifikasi file `src/config/environment.ts`.

## Alur dan Cara Kerja

1. **Inisialisasi**: Bot dimulai dengan membaca konfigurasi dari file .env dan menginisialisasi koneksi ke Discord dan MongoDB.

2. **Mendengarkan Pesan**: Bot mendengarkan pesan yang masuk di server Discord tempat bot diundang.

3. **Proses Pesan**: Ketika pesan diterima, bot memeriksa apakah pesan tersebut memerlukan respons dari AI.

4. **Interaksi dengan GROQ AI**: Jika diperlukan, bot mengirimkan konten pesan ke GROQ AI untuk mendapatkan respons yang sesuai.

5. **Mengirim Respons**: Bot mengirimkan respons yang dihasilkan oleh GROQ AI kembali ke saluran Discord.

6. **Menyimpan Riwayat**: Setiap percakapan disimpan dalam MongoDB untuk referensi di masa mendatang.

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

## Kontak

Jika Anda memiliki pertanyaan atau masukan, silakan buka issue di repositori GitHub ini.
