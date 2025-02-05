import { SlashCommandBuilder } from 'discord.js';

export const imageCommand = new SlashCommandBuilder()
    .setName('image')
    .setDescription('Generate image')
    .addStringOption(option =>
        option
            .setName('prompt')
            .setDescription('Description of the image you want to generate')
            .setRequired(true)
    );