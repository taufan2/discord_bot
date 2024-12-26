import ChatModel from "../models/chatModel";

export async function getChats(params: {
    channelId: string;
    userId: string;
    limit?: number;
}) {
    const {channelId, userId, limit = 100} = params;
    try {
        return await ChatModel
            .find({
                "channel.id": channelId,
                "user.id": userId
            })
            .sort({createdAt: "ascending"})
            .limit(limit)
            .exec();
    } catch (error) {
        console.error('Error in getChats:', error);
        throw error;
    }
}
