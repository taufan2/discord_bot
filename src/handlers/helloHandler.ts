import { Message } from 'discord.js';

export async function handleHello(message: Message) {
    await message.reply('Hello! How can I help you today?');
}
