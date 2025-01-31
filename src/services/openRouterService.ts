import {SYSTEM_PROMPT} from '../config/environment';
import {createChatCompletion} from '../config/openRouterConfig';
import {IMessage} from './qroqService';
import {formatMessage} from '../helpers/messageFormatter';

export async function generateResponse(allMessages: IMessage[] | string): Promise<string> {
    const messages = [
        {role: "system", content: SYSTEM_PROMPT}
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
        console.error('Error in OpenRouter service:', error);
        throw error;
    }
} 