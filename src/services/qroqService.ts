import Groq from 'groq-sdk';
import { GROQ_API_KEY, SYSTEM_PROMPT } from '../config/environment';

const groq = new Groq({ apiKey: GROQ_API_KEY });

export async function generateResponse(content: string): Promise<string> {
    const completion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: content }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
}