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

// Helper function to handle potential JSON responses
export function extractContent(response: string): string {
    try {
        // Check if the response is a JSON string
        if (response.trim().startsWith('{') && response.trim().endsWith('}')) {
            const parsed = JSON.parse(response);
            // If it's our expected format with content field
            if (parsed.content) {
                console.warn('Received JSON response from LLM when text was expected');
                return parsed.content;
            }
        }
        // If not JSON or doesn't match our format, return as is
        return response;
    } catch (error) {
        // If JSON parsing fails, it's probably not JSON, return as is
        return response;
    }
}

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

        let rawResponse: string;
        switch (PROVIDER.toUpperCase()) {
            case 'GROQ':
                rawResponse = await generateGroqResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                response = extractContent(rawResponse);
                break;
            case 'GEMINI':
                rawResponse = await generateGeminiResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                response = extractContent(rawResponse);
                break;
            case 'DEEPSEEK':
                rawResponse = await generateDeepseekResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                response = extractContent(rawResponse);
                break;
            case 'OPENROUTER':
                rawResponse = await generateOpenRouterResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                response = extractContent(rawResponse);
                break;
            case 'TOGETHER':
                rawResponse = await generateTogetherResponse(
                    allMessages.map(msg => ({
                        id: msg.messageId,
                        role: msg.role as "user" | "assistant",
                        content: msg.content,
                        replyId: msg.replyTo?.messageId || null,
                        createdAt: msg.createdAt
                    }))
                );
                response = extractContent(rawResponse);
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
