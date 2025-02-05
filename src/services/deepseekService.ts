import {SYSTEM_PROMPT, SYSTEM_PROMPT_GENERATE_IMAGE} from '../config/environment';
import {createChatCompletion} from '../config/deepseekConfig';
import {IMessage} from './qroqService';
import {formatMessage} from '../helpers/messageFormatter';

export async function generateResponse(allMessages: IMessage[] | string, options?: {
    generateImagePrompt?: boolean;
}): Promise<string> {
    let prompt = SYSTEM_PROMPT;
    if (options?.generateImagePrompt) {
        prompt = SYSTEM_PROMPT_GENERATE_IMAGE;
    }
    const messages = [
        {role: "system", content: prompt}
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
        const completion = await createChatCompletion(messages);
        return completion.choices[0]?.message?.content || "Maaf, saya tidak bisa menghasilkan respons.";
    } catch (error) {
        console.error('Error in DeepSeek service:', error);
        throw error;
    }
} 