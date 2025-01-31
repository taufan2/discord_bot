import { DEEPSEEK_API_KEY, DEEPSEEK_MODEL } from './environment';

const BASE_URL = 'https://api.deepseek.com';

export const DEEPSEEK_CONFIG = {
    apiKey: DEEPSEEK_API_KEY,
    model: DEEPSEEK_MODEL,
    temperature: 1,
    max_tokens: 2048,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 1
};

export async function createChatCompletion(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            messages,
            model: DEEPSEEK_CONFIG.model,
            frequency_penalty: DEEPSEEK_CONFIG.frequency_penalty,
            max_tokens: DEEPSEEK_CONFIG.max_tokens,
            presence_penalty: DEEPSEEK_CONFIG.presence_penalty,
            response_format: { type: "text" },
            temperature: DEEPSEEK_CONFIG.temperature,
            top_p: DEEPSEEK_CONFIG.top_p
        })
    });

    if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    return response.json();
} 
