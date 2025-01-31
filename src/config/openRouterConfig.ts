import { OPENROUTER_API_KEY, OPENROUTER_MODEL } from "./environment";

export const OPENROUTER_CONFIG = {
	apiKey: OPENROUTER_API_KEY,
	model: OPENROUTER_MODEL,
	temperature: 0.7,
	max_tokens: 1024
};

interface Message {
	role: string;
	content: string;
}

export async function createChatCompletion(messages: Message[]) {
	const response = await fetch(
		"https://openrouter.ai/api/v1/chat/completions",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${OPENROUTER_CONFIG.apiKey}`,
				"Content-Type": "application/json",
				"HTTP-Referer": "https://github.com/taufanbudi/discord-bot",
				"X-Title": "Discord Bot",
			},
			body: JSON.stringify({
				model: OPENROUTER_CONFIG.model,
				messages: messages,
				temperature: OPENROUTER_CONFIG.temperature,
				max_tokens: OPENROUTER_CONFIG.max_tokens
			}),
		}
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(`OpenRouter API error: ${JSON.stringify(error)}`);
	}

	return response.json();
}
