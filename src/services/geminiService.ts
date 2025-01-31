import {GEMINI_API_KEY, SYSTEM_PROMPT} from '../config/environment';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {IMessage} from "./qroqService";
import {formatMessage} from "../helpers/messageFormatter";

export async function generateResponse(prompt: IMessage[] | string) {
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-8b",
        systemInstruction: SYSTEM_PROMPT,
    });

    if (Array.isArray(prompt)) {
        const lastPrompt = prompt[prompt.length - 1];
        const history = prompt.slice(0, -1);

        console.log(history);
        console.log(lastPrompt);

        const chat = model.startChat({
            history: history.map(
                message => {
                    return {
                        role: message.role === "user" ? "user" : "model",
                        parts: [
                            {
                                text: formatMessage(message),
                            }
                        ]
                    }
                }
            )
        });

        const result = await chat.sendMessage(formatMessage(lastPrompt));
        return result.response.text();
    } else {
        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }
}
