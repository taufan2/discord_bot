import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
    channel: {
        id: string;
        name: string;
    };
    messageId: string;
    content: string;
    originalContent: string;
    createdAt: Date;
    role: 'user' | 'assistant';
    user: {
        id: string;
        globalName: string;
        username: string;
        nickname: string;
    };
    replyTo: {
        messageId: string;
    } | null;
    direction: "in" | "out";
}

const ChatSchema: Schema = new Schema({
    channel: {
        id: { type: String, required: true, index: true },
        name: String,
    },
    messageId: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    originalContent: String,
    createdAt: { type: Date, default: Date.now, index: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    user: {
        id: { type: String, required: true, index: true },
        globalName: String,
        username: String,
        nickname: String,
    },
    replyTo: {
        messageId: String,
    },
    direction: { type: String, enum: ['in', 'out'], default: 'out' },
});

export default mongoose.model<IChat>('Chat', ChatSchema);
