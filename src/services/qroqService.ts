import {SYSTEM_PROMPT} from '../config/environment';
import groq from "../config/groqConfig";
import {formatMessage} from "../helpers/messageFormatter";

export interface IMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    replyId: string | null;
    createdAt: Date;
}

export async function generateResponse(allMessages: IMessage[] | string): Promise<string> {
    let _formattedMessages;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        {role: "system", content: SYSTEM_PROMPT},
    ];

    if (Array.isArray(allMessages)) {
        _formattedMessages = allMessages.map(message => ({
            role: message.role as "user" | "assistant",
            content: formatMessage(message)
        }));
        messages.push(..._formattedMessages);
    } else {
        _formattedMessages = {
            role: "user" as const,
            content: allMessages
        };
        messages.push(_formattedMessages);
    }

    const completion = await groq.chat.completions.create({
        messages: messages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Maaf, saya tidak bisa menghasilkan respons.";
}
