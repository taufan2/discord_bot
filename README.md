# Discord Bot dengan GROQ & Gemini AI

Bot Discord ini menggunakan GROQ AI dan Gemini AI untuk menghasilkan respons terhadap pesan pengguna. Bot ini ditulis dalam TypeScript dan menggunakan library discord.js untuk berinteraksi dengan Discord.

## Fitur

- **Multi AI Integration**:
    - GROQ AI untuk respons cepat dan efisien
    - Gemini AI untuk kemampuan pemahaman konteks yang lebih baik
- **Konfigurasi Mudah**: Menggunakan file `.env` untuk menyimpan konfigurasi sensitif seperti token dan kunci API
- **Penanganan Pesan Efisien**: Memproses dan merespons pesan dengan cepat
- **Penyimpanan Riwayat Chat**: Menggunakan MongoDB untuk menyimpan riwayat percakapan

## Tech Stack

- **Runtime**: Node.js (v14.0.0+)
- **Language**: TypeScript 5.7+
- **Framework**: discord.js v14
- **AI Integration**:
    - GROQ AI SDK v0.9.1
    - Google Generative AI (Gemini)
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
- Akun Google Cloud dengan akses Gemini AI
- MongoDB untuk menyimpan data

## Instalasi

1. Clone repositori:
   ``` bash
   git clone https://github.com/taufan2/discord_bot.git
   cd discord_bot
   ```

2. Instal dependensi:
   ``` bash
   npm install
   ```

## Konfigurasi Provider AI

Bot ini mendukung dua provider AI yang dapat dikonfigurasi:

### 1. Pemilihan Provider
Atur provider yang diinginkan melalui environment variable PROVIDER:
```
PROVIDER=GROQ    # Untuk menggunakan GROQ AI (default)
PROVIDER=GEMINI  # Untuk menggunakan Gemini AI
```

### 2. Konfigurasi Gemini
Untuk menggunakan Gemini AI, tambahkan konfigurasi berikut di file `.env`:
```
GEMINI_API_KEY=your_gemini_api_key  # Dapatkan dari Google Cloud Console
```

Gemini menggunakan model `gemini-1.5-flash` yang menawarkan:
- Respons cepat
- Pemahaman konteks yang baik
- Dukungan chat history
- System prompt customization

### 3. Konfigurasi GROQ
Untuk menggunakan GROQ AI, tambahkan konfigurasi berikut di file `.env`:
```
GROQ_API_KEY=your_groq_api_key  # Dapatkan dari GROQ AI Dashboard
```

### Contoh File .env Lengkap
```
# Bot Configuration
DISCORD_TOKEN=your_discord_token
MONGODB_URI=your_mongodb_uri

# AI Provider Selection
PROVIDER=GROQ  # atau GEMINI

# AI Provider Keys
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Rekomendasi Penggunaan

1. **GROQ AI**
    - Respons cepat untuk pertanyaan umum
    - Hemat resource
    - Cocok untuk deployment skala besar

2. **Gemini AI**
    - Pemahaman konteks lebih dalam
    - Dukungan percakapan multi-turn yang lebih baik
    - Cocok untuk interaksi kompleks

## Cara Kerja

1. **Menjalankan Bot**:
   ``` bash
   npm start
   ```

2. **Mode Pengembangan**:
   ``` bash
   npm run dev
   ```

3. **Interaksi dengan Bot**: Bot akan merespons pesan yang menyebutnya menggunakan salah satu dari dua AI engine:
    - GROQ AI untuk respons cepat dan umum
    - Gemini AI untuk respons yang membutuhkan pemahaman konteks lebih dalam

## Struktur Proyek

```
src/
├── main.ts
├── bot/
│   └── discordBot.ts
├── config/
│   ├── environment.ts
│   ├── dbConfig.ts
│   └── groqConfig.ts
├── handlers/
│   ├── helloHandler.ts
│   └── messageHandlers.ts
├── helpers/
│   ├── messageFormatter.ts
│   └── sanitizeContent.ts
├── models/
│   └── chatModel.ts
├── services/
│   ├── chatServices.ts
│   ├── dbServices.ts
│   ├── qroqService.ts
│   └── geminiService.ts
└── test/
    ├── dbServices.test.ts
    └── geminiService.test.ts
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
- `dbServices.ts`: Database operations
- `qroqService.ts`: GROQ AI integration
- `geminiService.ts`: Gemini AI integration
    - Handles context-aware conversations
    - Supports chat history
    - Uses Gemini 1.5 Flash model

### Development Workflow

1. **Message Processing Flow**:
   ```
   Discord Message → messageHandlers.ts → chatServices.ts → qroqService.ts/geminiService.ts → MongoDB
   ```

2. **Command Handling**:
   ```
   User Command → messageHandlers.ts → Specific Handler → Response
   ```

3. **AI Integration Flow**:
   ```
   User Input → sanitizeContent.ts → Selected AI Service → AI Provider → messageFormatter.ts → Discord
   ```

### AI Prompt System

Bot ini menggunakan system prompt yang terstruktur untuk kedua AI engine:

#### GROQ AI
- Optimized for quick responses
- General knowledge queries
- Basic conversation flow

#### Gemini AI
- Context-aware conversations
- Advanced reasoning capabilities
- Support for chat history
- Uses Gemini 1.5 Flash model for faster response times

#### Format Input
Bot menerima riwayat percakapan dalam format JSON dengan struktur:
``` typescript
{
  "id": string,
  "timestamp": number,
  "content": string,
  "replyId": string | null,
  "role": "user" | "assistant"
}
```

## Lisensi

Proyek ini dilisensikan di bawah MIT License.
