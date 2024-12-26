import {Message} from 'discord.js';
import {handleHello} from './helloHandler';
import {generateResponse, IMessage} from '../services/qroqService';
import {replyMessage} from "../services/chatServices";
import {sanitizeContent} from '../helpers/sanitizeContent';
import {getChats} from '../services/dbServices';

export async function handleMessage(message: Message) {
    const channel = message.channel;
    if ('sendTyping' in channel) {
        await channel.sendTyping();
    }

    // Mendapatkan pesan-pesan sebelumnya
    const previousChats = await getChats({
        channelId: channel.id,
        userId: message.author.id,
        limit: 100 // Anda bisa menyesuaikan jumlah pesan yang ingin diambil
    });

    let allMessages: IMessage[] = []
    allMessages = allMessages.concat(
        previousChats.map(chat => ({
            id: chat.messageId,
            role: chat.role === 'user' ? 'assistant' : 'user',
            content: chat.content,
            createdAt: chat.createdAt,
            replyId: chat.replyTo?.messageId || null,
        }))
    )
    allMessages.push({
        id: message.id,
        role: 'user',
        content: sanitizeContent(message.content),
        createdAt: message.createdAt,
        replyId: message.reference?.messageId || null,
    })

    let response: string;
    try {
        response = await generateResponse(allMessages);
    } catch (error) {
        console.error('Error calling Groq API:', error);
        response = "Maaf, saya mengalami kesalahan saat memproses permintaan Anda.";
    }

    try {
        await replyMessage(message, response);
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}

export {handleHello};
