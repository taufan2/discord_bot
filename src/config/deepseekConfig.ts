import {DEEPSEEK_API_KEY} from './environment';

const BASE_URL = 'https://api.deepseek.com';

export async function createChatCompletion(messages: Array<{ role: string; content: string }>) {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            messages,
            model: "deepseek-chat",
            frequency_penalty: 0,
            max_tokens: 2048,
            presence_penalty: 0,
            response_format: {
                type: "text"
            },
            temperature: 1,
            top_p: 1
        })
    });

    if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    return response.json();
} 