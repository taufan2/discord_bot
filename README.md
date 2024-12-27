# Discord Bot dengan GROQ AI

Bot Discord ini menggunakan GROQ AI untuk menghasilkan respons terhadap pesan pengguna. Bot ini ditulis dalam TypeScript dan menggunakan library discord.js untuk berinteraksi dengan Discord.

## Fitur

- **Integrasi dengan GROQ AI**: Menggunakan AI untuk menghasilkan respons yang cerdas dan relevan.
- **Konfigurasi Mudah**: Menggunakan file `.env` untuk menyimpan konfigurasi sensitif seperti token dan kunci API.
- **Penanganan Pesan Efisien**: Memproses dan merespons pesan dengan cepat.
- **Penyimpanan Riwayat Chat**: Menggunakan MongoDB untuk menyimpan riwayat percakapan.

## Tech Stack

- **Runtime**: Node.js (v14.0.0+)
- **Language**: TypeScript 5.7+
- **Framework**: discord.js v14
- **AI Integration**: GROQ AI SDK v0.9.1
- **Database**: MongoDB (via mongoose v8.9)
- **Development Tools**:
  - ESLint for code quality
  - Jest for testing
  - ts-node-dev for development
  - dayjs for date handling

## Prasyarat

Sebelum memulai, pastikan Anda memiliki:

- Node.js (versi 14.0.0 atau lebih baru)
- npm (Node Package Manager)
- Akun Discord Developer untuk mendapatkan token bot
- Akun GROQ AI untuk mendapatkan kunci API
- MongoDB untuk menyimpan data

## Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/taufan2/discord_bot.git
   cd discord_bot
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

## Konfigurasi

1. Buat file `.env` di direktori root proyek dan tambahkan konfigurasi berikut:
   ```
   DISCORD_TOKEN=your_discord_token
   GROQ_API_KEY=your_groq_api_key
   MONGODB_URI=your_mongodb_uri
   ```

## Cara Kerja

1. **Menjalankan Bot**: Untuk menjalankan bot, gunakan perintah berikut:
   ```bash
   npm start
   ```

2. **Mode Pengembangan**: Untuk menjalankan bot dalam mode pengembangan dengan restart otomatis saat ada perubahan file:
   ```bash
   npm run dev
   ```

3. **Interaksi dengan Bot**: Bot akan merespons pesan yang menyebutnya. Jika pesan berisi kata "hello", bot akan merespons dengan sapaan. Untuk pesan lainnya, bot akan menggunakan GROQ AI untuk menghasilkan respons yang relevan.

## Cara Aplikasi Bekerja

1. **Inisialisasi Bot**: Bot diinisialisasi dengan menghubungkan ke Discord menggunakan token yang disediakan di file `.env`.
2. **Mendengarkan Pesan**: Bot mendengarkan pesan yang dikirim di server Discord. Jika pesan menyebut bot, bot akan memproses pesan tersebut.
3. **Sanitasi Pesan**: Konten pesan dibersihkan dari mention menggunakan fungsi `sanitizeContent`.
4. **Penanganan Pesan**: Jika pesan berisi kata "hello", bot akan merespons dengan sapaan. Untuk pesan lainnya, bot akan mengirim pesan ke GROQ AI untuk mendapatkan respons yang relevan.
5. **Menghasilkan Respons**: GROQ AI menghasilkan respons berdasarkan pesan yang diterima dan mengembalikannya ke bot.
6. **Mengirim Respons**: Bot mengirim respons yang dihasilkan oleh GROQ AI kembali ke pengguna di Discord.

## Struktur Proyek

```
src/
├── main.ts                 # Application entry point, bot initialization
├── bot/
│   └── discordBot.ts      # Discord bot core implementation and event setup
├── config/
│   ├── environment.ts     # Environment variables and configuration management
│   ├── dbConfig.ts       # MongoDB connection configuration
│   └── groqConfig.ts     # GROQ AI client configuration
├── handlers/
│   ├── helloHandler.ts   # Basic greeting command handler
│   └── messageHandlers.ts # Main message processing and routing logic
├── helpers/
│   ├── messageFormatter.ts # Message formatting and transformation utilities
│   └── sanitizeContent.ts # Input sanitization and validation
├── models/
│   └── chatModel.ts      # MongoDB schema for chat history
├── services/
│   ├── chatServices.ts   # Chat processing and business logic
│   ├── dbServices.ts     # Database operations and queries
│   └── qroqService.ts    # GROQ AI integration service
└── test/
    └── dbServices.test.ts # Database service unit tests
```

### Key Components

#### 1. Bot Core (`bot/`)
- `discordBot.ts`: Manages bot lifecycle, event registration, and Discord client setup
  - Implements connection handling
  - Sets up event listeners
  - Manages bot state

#### 2. Configuration (`config/`)
- `environment.ts`: Centralizes environment variable management
  - Validates required environment variables
  - Provides typed configuration access
- `dbConfig.ts`: MongoDB connection setup
- `groqConfig.ts`: GROQ AI client initialization

#### 3. Event Handlers (`handlers/`)
- `messageHandlers.ts`: 
  - Processes incoming Discord messages
  - Routes messages to appropriate services
  - Implements command parsing
- `helloHandler.ts`: Example command implementation

#### 4. Utilities (`helpers/`)
- `messageFormatter.ts`: Message processing utilities
  - Text formatting
  - Response templating
- `sanitizeContent.ts`: Input validation and sanitization

#### 5. Data Models (`models/`)
- `chatModel.ts`: MongoDB schema definitions
  - Chat history structure
  - Message metadata
  - Timestamp management

#### 6. Business Logic (`services/`)
- `chatServices.ts`: Core chat processing
  - Message queue management
  - Response generation logic
- `dbServices.ts`: Database operations
  - CRUD operations for chat history
  - Query optimizations
- `qroqService.ts`: AI integration
  - GROQ AI API interaction
  - Response processing

#### 7. Tests (`test/`)
- Unit tests for core functionality
- Integration tests for database operations
- Mock implementations for external services

### Development Workflow

1. **Message Processing Flow**:
   ```
   Discord Message → messageHandlers.ts → chatServices.ts → qroqService.ts → MongoDB
   ```

2. **Command Handling**:
   ```
   User Command → messageHandlers.ts → Specific Handler → Response
   ```

3. **AI Integration Flow**:
   ```
   User Input → sanitizeContent.ts → qroqService.ts → GROQ AI → messageFormatter.ts → Discord
   ```

## Penyimpanan Data

Bot ini menggunakan MongoDB untuk menyimpan riwayat percakapan. Pastikan MongoDB terkonfigurasi dengan benar di file `.env`.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

### AI Prompt System

Bot ini menggunakan system prompt yang terstruktur untuk memastikan respons AI konsisten dan sesuai dengan kebutuhan. Prompt disimpan dalam `src/config/environment.ts`.

#### Format Input
Bot menerima riwayat percakapan dalam format JSON dengan struktur:
```typescript
{
  "id": string,        // ID unik pesan
  "timestamp": number, // Unix timestamp (detik)
  "content": string,   // Isi pesan
  "replyId": string | null, // ID pesan yang dibalas
  "role": "user" | "assistant" // Peran pengirim
}
```

#### Panduan Respons AI
1. **Format**: Selalu menggunakan bahasa natural, tidak pernah dalam format JSON
2. **Panjang**: Maksimal 2000 karakter per respons
3. **Konteks**: Memperhatikan timestamp dan replyId untuk alur percakapan
4. **Fokus**: Prioritas pada pesan terbaru dan relevan dengan konteks

#### Gaya Komunikasi
- Ramah dan sopan
- Adaptif terhadap konteks percakapan
- Proaktif dalam menawarkan bantuan
- Mendorong interaksi lanjutan

#### Contoh Alur Percakapan
```
User    : "Halo, bagaimana kabarmu?"
Bot     : "Halo! Saya baik-baik saja, terima kasih. Bagaimana dengan Anda?"
User    : "Saya juga baik. Bisakah kamu menjelaskan tentang [topik]?"
Bot     : [Memberikan penjelasan yang relevan dan mengundang diskusi lebih lanjut]
