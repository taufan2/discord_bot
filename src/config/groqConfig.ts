import Groq from "groq-sdk";
import {GROQ_API_KEY} from "./environment";

const groq = new Groq({apiKey: GROQ_API_KEY});
export default groq;
