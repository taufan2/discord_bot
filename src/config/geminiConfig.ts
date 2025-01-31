import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, GEMINI_MODEL } from "./environment";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

export const GEMINI_CONFIG = {
    apiKey: GEMINI_API_KEY,
    model: GEMINI_MODEL,
    temperature: 0.7,
    maxOutputTokens: 2048,
    topP: 0.8,
    topK: 40
};

export const model = genAI.getGenerativeModel({ 
    model: GEMINI_CONFIG.model,
    generationConfig: {
        temperature: GEMINI_CONFIG.temperature,
        maxOutputTokens: GEMINI_CONFIG.maxOutputTokens,
        topP: GEMINI_CONFIG.topP,
        topK: GEMINI_CONFIG.topK
    }
});

export default genAI;