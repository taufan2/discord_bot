# Discord Bot dengan GROQ & Gemini AI

Bot Discord ini menggunakan GROQ AI dan Gemini AI untuk menghasilkan respons terhadap pesan pengguna. Bot ini ditulis dalam TypeScript dan menggunakan library discord.js untuk berinteraksi dengan Discord.

## Fitur

- **Multi AI Integration**:
    - GROQ AI untuk respons cepat dan efisien
    - Gemini AI untuk kemampuan pemahaman konteks yang lebih baik
    - DEEPSEEK AI untuk pemrosesan bahasa yang lebih canggih
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
    - DEEPSEEK AI SDK
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

Bot ini mendukung tiga provider AI yang dapat dikonfigurasi:

### Provider yang Tersedia

1. **GROQ AI**
   ```env
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=mixtral-8x7b-32768  # default
   ```

2. **Gemini AI**
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-1.5-flash-8b  # default
   ```

3. **DeepSeek AI**
   ```env
   DEEPSEEK_API_KEY=your_deepseek_api_key
   DEEPSEEK_MODEL=deepseek-chat  # default
   ```

4. **OpenRouter**
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=google/gemini-pro-1.5-exp  # default
   ```

5. **Together AI**
   ```env
   TOGETHER_API_KEY=your_together_api_key
   TOGETHER_MODEL=meta-llama/Llama-3.3-70B-Instruct-Turbo-Free  # default
   ```

### Konfigurasi Model

Setiap provider memiliki model default yang dapat diubah melalui environment variables. Untuk mengubah model, cukup sesuaikan variabel MODEL yang sesuai di file .env Anda.

### Parameter Konfigurasi

Setiap provider memiliki parameter konfigurasi berikut:
- `temperature`: Mengontrol kreativitas output (0.0 - 1.0)
- `max_tokens`: Jumlah maksimum token dalam respons
- `top_p`: Mengontrol diversity output (0.0 - 1.0)
- `frequency_penalty`: Mengurangi pengulangan kata (0.0 - 2.0)
- `presence_penalty`: Mendorong topik baru (0.0 - 2.0)

### Contoh File .env Lengkap
```
# Bot Configuration
DISCORD_TOKEN=your_discord_token
MONGODB_URI=your_mongodb_uri

# AI Provider Selection
PROVIDER=GROQ  # atau GEMINI atau DEEPSEEK

# AI Provider Keys
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
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

3. **DEEPSEEK AI**
    - Pemahaman bahasa yang sangat baik
    - Optimal untuk tugas-tugas spesifik
    - Cocok untuk analisis mendalam

## Cara Kerja

1. **Menjalankan Bot**:
   ``` bash
   npm start
   ```

2. **Mode Pengembangan**:
   ``` bash
   npm run dev
   ```

3. **Interaksi dengan Bot**: Bot akan merespons pesan yang menyebutnya menggunakan salah satu dari tiga AI engine:
    - GROQ AI untuk respons cepat dan umum
    - Gemini AI untuk respons yang membutuhkan pemahaman konteks lebih dalam
    - DEEPSEEK AI untuk pemrosesan bahasa yang lebih canggih

## Struktur Proyek

```
src/
├── main.ts
├── bot/
│   ��── discordBot.ts
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
│   ├── geminiService.ts
│   └── deepseekService.ts
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
- `deepseekService.ts`: DEEPSEEK AI integration
    - Pemahaman bahasa yang mendalam
    - Optimasi untuk tugas spesifik
    - Dukungan multi-bahasa

### Development Workflow

1. **Message Processing Flow**:
   ```
   Discord Message → messageHandlers.ts → chatServices.ts → qroqService.ts/geminiService.ts/deepseekService.ts → MongoDB
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

Bot ini menggunakan system prompt yang terstruktur untuk ketiga AI engine:

#### GROQ AI
- Optimized for quick responses
- General knowledge queries
- Basic conversation flow

#### Gemini AI
- Context-aware conversations
- Advanced reasoning capabilities
- Support for chat history
- Uses Gemini 1.5 Flash model for faster response times

#### DEEPSEEK AI
- Deep language understanding
- Advanced context analysis
- Support for multiple languages
- Optimized for specific tasks

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

### System Prompt Details

Bot ini menggunakan SYSTEM_PROMPT yang didefinisikan di `environment.ts` sebagai panduan utama untuk AI dalam berkomunikasi. SYSTEM_PROMPT ini berlaku untuk ketiga provider AI (GROQ, Gemini, dan DEEPSEEK) dengan spesifikasi berikut:

#### Format Riwayat Percakapan
Setiap pesan dalam riwayat percakapan diformat dalam JSON dengan struktur:
```
{
  "id": "string",
  "timestamp": number,
  "content": "string",
  "replyId": "string" | null,
  "role": "user" | "assistant"
}
```

#### Aturan Respons AI
1. **Batasan Format**:
    - Tidak boleh merespons dalam format JSON
    - Tidak menggunakan format terstruktur lainnya
    - Maksimal 2000 karakter per respons

2. **Alur Percakapan**:
    - Memperhatikan urutan timestamp
    - Menggunakan replyId untuk konteks
    - Fokus pada pesan terbaru
    - Membedakan peran pengirim (user/assistant)

3. **Karakteristik Komunikasi**:
    - Menggunakan bahasa natural dan mengalir
    - Bersahabat dan informatif
    - Proaktif menawarkan bantuan
    - Memberikan ruang untuk pertanyaan lanjutan

#### Contoh Implementasi
Bot akan memproses input seperti:
```
{"id":"45890","timestamp":1621234567,"content":"Halo, bagaimana kabarmu?","replyId":null,"role":"user"}
{"id":"45891","timestamp":1621234570,"content":"Halo! Saya baik-baik saja, terima kasih. Bagaimana dengan Anda?","replyId":"45890","role":"assistant"}
```

Dan memberikan respons natural yang sesuai dengan konteks percakapan, sambil tetap mempertahankan gaya komunikasi yang ramah dan informatif.

#### Keuntungan Implementasi
- Konsistensi respons antar provider AI
- Pemahaman konteks yang lebih baik
- Alur percakapan yang natural
- Kemudahan dalam debugging dan pemantauan

## Lisensi

Proyek ini dilisensikan di bawah MIT License.


