import {Client, GatewayIntentBits, Message} from 'discord.js';
import {handleHello, handleMessage} from '../handlers/messageHandlers';
import {sanitizeContent} from "../helpers/sanitizeContent";

function createBot(): Client {
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
            const content = sanitizeContent(message.content);
            if (content.toLowerCase() === 'hello') {
                await handleHello(message);
            } else {
                await handleMessage(message);
            }
        }
    });

    return client;
}

const discordBot = createBot();

export default discordBot;
