import {Message} from 'discord.js';
import {handleHello} from './helloHandler';
import {generateResponse as generateGroqResponse} from '../services/qroqService';
import {generateResponse as generateGeminiResponse} from '../services/geminiService';
import {generateResponse as generateDeepseekResponse} from '../services/deepseekService';
import {generateResponse as generateOpenRouterResponse} from '../services/openRouterService';
import {generateResponse as generateTogetherResponse} from '../services/togetherService';
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

    // Get previous messages
    const previousMessages = await getChats({
        channelId: message.channelId,
        userId: message.author.id,
        limit: 12 // Optional: you can adjust this number based on how many previous messages you want to retrieve
    });
    const sanitizedContent = sanitizeContent(message.content);

    let response: string;
    try {
        // Create current message object that matches the structure from database
        const currentMessage = {
            messageId: message.id,
            content: sanitizedContent,
            createdAt: message.createdAt,
            role: "user" as const,
            replyTo: message.reference ? {
                messageId: message.reference.messageId
            } : null
        };

        // Add current message to previous messages
        const allMessages = [...previousMessages, currentMessage];

        switch (PROVIDER.toUpperCase()) {
            case 'GROQ':
                response = await generateGroqResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                break;
            case 'GEMINI':
                response = await generateGeminiResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                break;
            case 'DEEPSEEK':
                response = await generateDeepseekResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                break;
            case 'OPENROUTER':
                response = await generateOpenRouterResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                break;
            case 'TOGETHER':
                response = await generateTogetherResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                break;
            default:
                response = "Provider tidak valid. Silakan periksa konfigurasi PROVIDER di .env";
                saveChat = false;
        }
    } catch (error) {
        console.error('Error generating response:', error);
        response = "Maaf, terjadi kesalahan saat memproses pesan Anda.";
        saveChat = false;
    }

    await replyMessage(message, response, saveChat);
}

export {handleHello};
