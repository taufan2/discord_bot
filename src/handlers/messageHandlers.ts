import { Message } from 'discord.js';
import { handleHello } from './helloHandler';
import { generateResponse } from '../services/qroqService';

export async function handleMessage(message: Message, content: string) {
    const channel = message.channel;
    if ('sendTyping' in channel) {
        await channel.sendTyping();
    }

    try {
        const response = await generateResponse(content);
        console.log('Generated response:', response);
        await message.reply(response);
    } catch (error) {
        console.error('Error calling Groq API:', error);
        await message.reply("Maaf, saya mengalami kesalahan saat memproses permintaan Anda.");
    }
}

export { handleHello };