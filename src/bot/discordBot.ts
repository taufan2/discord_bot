import { Client, GatewayIntentBits, Message } from 'discord.js';
import { handleHello, handleMessage } from '../handlers/messageHandlers';

export function createBot(): Client {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user?.tag}!`);
    });

    client.on('messageCreate', async (message: Message) => {
        if (message.mentions.has(client.user!.id)) {
            const content = message.content.replace(/<@!?[\d]+>/g, '').trim();

            if (content.toLowerCase() === 'hello') {
                await handleHello(message);
            } else {
                await handleMessage(message, content);
            }
        }
    });

    return client;
}