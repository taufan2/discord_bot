import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js";
import generateImage from "../services/togetherService.imageGen";
import axios from "axios";
import { generateResponse as generateDeepseekResponse } from "../services/deepseekService";

/**
 * Handler untuk perintah generate gambar Discord
 */
export async function handleImageCommand(
	interaction: ChatInputCommandInteraction
) {
	// Memberi waktu proses generate
	await interaction.deferReply();

	try {
		const prompt = interaction.options.getString("prompt", true);

		// Optimasi prompt menggunakan Deepseek AI
		const generateImagePrompt = await generateDeepseekResponse(prompt, {
			generateImagePrompt: true,
		});
		const imagePrompt = generateImagePrompt.trim();

		const imageUrl = await generateImage(imagePrompt);

		if (!imageUrl) {
			throw new Error("Gagal mendapatkan URL gambar");
		}

		// Download gambar dari URL
		const get = await axios.get(imageUrl, {
			responseType: "arraybuffer",
		});

		const buffer = Buffer.from(get.data, "binary");
		const attachment = new AttachmentBuilder(buffer, {
			name: "generated-image.jpg",
		});

		// Kirim hasil ke channel
		await interaction.editReply({
			files: [attachment],
			content: `Ini adalah gambar yang dihasilkan untuk prompt: ${prompt}`,
		});
	} catch (error) {
		console.error("Error generating image:", error);
		await interaction.editReply(
			"Maaf, terjadi kesalahan saat menghasilkan gambar."
		);
	}
}
