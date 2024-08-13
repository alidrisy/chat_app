import prisma from '../db/prisma.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMassege = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        // Check if we have a conversation
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId],
                    }
                },
            });
        }
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversation.id,
                body: message,
            },
        });
        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: { id: conversation.id },
                data: {
                    messages: {
                        connect: { id: newMessage.id },
                    },
                },
            });
        }
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server erorr" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server erorr" });
    }
};
export const getConversations = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                profilePic: true,
            },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server erorr" });
    }
};
