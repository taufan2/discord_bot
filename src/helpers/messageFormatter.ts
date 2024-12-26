import { IMessage } from '../services/qroqService';
import dayjs from 'dayjs';

export function formatMessage(message: IMessage): string {
    const timestamp = dayjs(message.createdAt).unix(); // Convert to Unix timestamp (seconds)
    return JSON.stringify({
        id: message.id,
        timestamp,
        content: message.content,
        replyId: message.replyId,
        role: message.role,
    })
}

export function sanitizeContent(content: string): string {
    return content
        .replace(/\|/g, '&#124;') // Mengganti karakter pipe dengan entitas HTML-nya
        .replace(/\n/g, '<br>') // Mengganti baris baru dengan <br> tag
        .replace(/\s+/g, ' ') // Menghapus spasi berlebih
        .trim();
}
