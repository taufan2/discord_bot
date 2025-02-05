import Together from "together-ai";
import { TOGETHER_IMAGE_GEN_CONFIG } from "../config/togetherImageGenConfig";

// Inisialisasi Together AI client dengan API key
const together = new Together({
	apiKey: TOGETHER_IMAGE_GEN_CONFIG.apiKey,
});

/**
 * Generate gambar menggunakan Together AI
 * @returns URL gambar atau null jika gagal
 */
const generateImage = async (prompt: string): Promise<string | null> => {
	// Konfigurasi untuk generate gambar menggunakan Together AI API
	const image = await together.images.create({
		model: TOGETHER_IMAGE_GEN_CONFIG.model, // Model AI yang digunakan untuk generate
		prompt, // Prompt yang akan digunakan untuk menghasilkan gambar
		n: 1, // Jumlah gambar yang dihasilkan dalam sekali generate
		steps: 4, // Jumlah iterasi/langkah dalam proses generate (mempengaruhi detail gambar)
	});

	// Mengembalikan URL gambar atau null jika tidak ada hasil
	return image.data[0].url || null;
};

export default generateImage;
