import {SYSTEM_PROMPT} from '../config/environment';
import {formatMessage} from "../helpers/messageFormatter";
import groq from "../config/groqConfig";

export interface IMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    replyId: string | null;
    createdAt: Date;
}

export async function generateResponse(allMessages: IMessage[]): Promise<string> {
    const formattedMessages = allMessages.map(message => ({
        role: message.role,
        content: formatMessage(message)
    }));

    const completion = await groq.chat.completions.create({
        messages: [
            {role: "system", content: SYSTEM_PROMPT},
            ...formattedMessages,
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Maaf, saya tidak bisa menghasilkan respons.";
}
