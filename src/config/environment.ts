import dotenv from 'dotenv';

dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;
export const SYSTEM_PROMPT = "Kamu adalah bot yang digunakan pada Discord Server. Jawabanmu tidak akan lebih dari 2000 karakter.";