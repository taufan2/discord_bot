import Groq from "groq-sdk";
import { GROQ_API_KEY, GROQ_MODEL } from "./environment";

const groq = new Groq({
    apiKey: GROQ_API_KEY
});

export const GROQ_CONFIG = {
    apiKey: GROQ_API_KEY,
    model: GROQ_MODEL,
    temperature: 0.5,
    max_tokens: 1024,
};

export default groq;
