import {Message, TextChannel} from "discord.js";
import ChatModel from "../models/chatModel";
import {sanitizeContent} from "../helpers/sanitizeContent";

async function replyMessage(message: Message, response: string, save: boolean = true): Promise<void> {
    const sanitizedContent = sanitizeContent(message.content);

    const textChannel = message.channel as TextChannel;

    if(save) {
        await ChatModel.create({
            channel: {
                id: textChannel.id,
                name: textChannel.name,
            },
            messageId: message.id,
            content: sanitizedContent,
            originalContent: message.content,
            createdAt: message.createdAt,
            role: 'user',
            user: {
                id: message.author.id,
                globalName: message.author.tag,
                username: message.author.username,
                nickname: message.member?.nickname || '',
            },
            replyTo: message.reference?.messageId ? {
                messageId: message.reference.messageId,
            } : null,
            direction: 'in',
        });
    }

    const reply = await message.reply(response);

    if(save) {
        await ChatModel.create({
            channel: {
                id: textChannel.id,
                name: textChannel.name,
            },
            messageId: reply.id,
            content: response,
            originalContent: response,
            createdAt: reply.createdAt,
            role: 'assistant',
            user: {
                id: message.author.id,
                globalName: message.author.tag,
                username: message.author.username,
                nickname: message.member?.nickname || '',
            },
            replyTo: {
                messageId: message.id,
            },
            direction: 'out',
        })
    }
}

export {replyMessage};
