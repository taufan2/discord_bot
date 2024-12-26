import {Message} from 'discord.js';
import {replyMessage} from "../services/chatServices";

export async function handleHello(message: Message): Promise<void> {
    const name = message.member?.nickname || message.member?.user.globalName || 'teman';
    const response = `Halo, ${name}! Ada yang bisa saya bantu hari ini?`;
    console.log(response)
    await replyMessage(message, response);
}
