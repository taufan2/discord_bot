import {Message} from 'discord.js';
import {handleHello} from './helloHandler';
import {generateResponse as generateGroqResponse, IMessage} from '../services/qroqService';
import {generateResponse as generateGeminiResponse} from '../services/geminiService';
import {generateResponse as generateDeepseekResponse} from '../services/deepseekService';
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
        limit: 20 // Anda bisa menyesuaikan jumlah pesan yang ingin diambil
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
        // Choose between Groq, Gemini, and DeepSeek based on PROVIDER value
        switch (PROVIDER) {
            case 'GEMINI':
                response = await generateGeminiResponse(allMessages);
                break;
            case 'DEEPSEEK':
                response = await generateDeepseekResponse(allMessages);
                break;
            default:
                response = await generateGroqResponse(allMessages);
        }

        // Try to parse response as JSON and extract content if possible
        try {
            const jsonResponse = JSON.parse(response);
            if (jsonResponse && typeof jsonResponse === 'object' && 'content' in jsonResponse) {
                response = jsonResponse.content;
                console.debug('Successfully parsed JSON response and extracted content');
            } else {
                console.debug('Response is JSON but does not contain content property');
            }
        } catch (e) {
            console.debug('Response is not in JSON format, using raw response');
            // Non-JSON responses are acceptable, continue with original response
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
