import {Message} from 'discord.js';
import {handleHello} from './helloHandler';
import {generateResponse as generateGroqResponse, IMessage} from '../services/qroqService';
import {generateResponse as generateGeminiResponse} from '../services/geminiService';
import {replyMessage} from "../services/chatServices";
import {sanitizeContent} from '../helpers/sanitizeContent';
import {getChats} from '../services/dbServices';
import {PROVIDER} from '../config/environment';

export async function handleMessage(message: Message) {
    let saveChat = true;
    const channel = message.channel;
    if ('sendTyping' in channel) {
        await channel.sendTyping();
    }

    // Mendapatkan pesan-pesan sebelumnya
    const previousChats = await getChats({
        channelId: channel.id,
        userId: message.author.id,
        limit: 50 // Anda bisa menyesuaikan jumlah pesan yang ingin diambil
    });

    let allMessages: IMessage[] = []
    allMessages = allMessages.concat(
        previousChats.map(chat => ({
            id: chat.messageId,
            role: chat.role,
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
        // Pilih antara Groq dan Gemini berdasarkan nilai PROVIDER
        if (PROVIDER === 'GEMINI') {
            response = await generateGeminiResponse(allMessages);
        } else {
            response = await generateGroqResponse(allMessages);
        }
    } catch (error) {
        console.error(`Error calling ${PROVIDER} API:`, error);
        response = "Maaf, saya mengalami kesalahan saat memproses permintaan Anda.";
        saveChat = false;
    }

    try {
        await replyMessage(message, response, saveChat);
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}

export {handleHello};
