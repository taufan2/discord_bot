import { Client, GatewayIntentBits, Message, REST, Routes } from 'discord.js';
import { handleHello, handleMessage } from '../handlers/messageHandlers';
import { handleImageCommand } from '../handlers/imageCommandHandler';
import { sanitizeContent } from "../helpers/sanitizeContent";
import { imageCommand } from '../commands/imageCommand';
import { DISCORD_TOKEN } from '../config/environment';

function createBot(): Client {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.on('ready', async () => {
        console.log(`Logged in as ${client.user?.tag}!`);
        
        // Register slash commands
        const rest = new REST().setToken(DISCORD_TOKEN!);
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(client.user!.id),
                { body: [imageCommand.toJSON()] },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'image') {
            await handleImageCommand(interaction);
        }
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
