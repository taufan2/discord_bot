import discordBot from './bot/discordBot';
import {DISCORD_TOKEN} from './config/environment';
import {connectDB} from "./config/dbConfig";

async function main() {
    await connectDB();
    await discordBot.login(DISCORD_TOKEN);
}

main()
    .catch(console.error);
