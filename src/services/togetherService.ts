import Together from 'together-ai';
import { TOGETHER_CONFIG } from '../config/togetherConfig';
import { IMessage } from './qroqService';
import { formatMessage } from '../helpers/messageFormatter';
import { SYSTEM_PROMPT, SYSTEM_PROMPT_GENERATE_IMAGE } from '../config/environment';

export async function generateResponse(allMessages: (IMessage[] | string), options?: {
    generateImagePrompt?: boolean;
}): Promise<string> {
    if (!TOGETHER_CONFIG.apiKey) {
        throw new Error('TOGETHER API KEY is not set');
    }

    const together = new Together({
        apiKey: TOGETHER_CONFIG.apiKey,
    });

    let systemPrompt = SYSTEM_PROMPT;
    if(options?.generateImagePrompt) {
        systemPrompt = SYSTEM_PROMPT_GENERATE_IMAGE;
    }

    const messages: Together.Chat.Completions.CompletionCreateParams.Message[] = [
        { role: "system", content: systemPrompt }
    ];

    if (Array.isArray(allMessages)) {
        const formattedMessages = allMessages.map(message => ({
            role: message.role,
            content: formatMessage(message)
        }));
        messages.push(...formattedMessages);
    } else {
        messages.push({
            role: "user",
            content: allMessages
        });
    }

    try {
        const response = await together.chat.completions.create({
            messages: messages,
            model: TOGETHER_CONFIG.model,
            temperature: TOGETHER_CONFIG.temperature,
        });

        return response.choices[0]?.message?.content || "Maaf, saya tidak bisa menghasilkan respons.";
    } catch (error) {
        console.error('Error in Together service:', error);
        throw error;
    }
} 