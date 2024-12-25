import { createBot } from './bot/discordBot';
import { DISCORD_TOKEN } from './config/environment';

const client = createBot();
client.login(DISCORD_TOKEN);