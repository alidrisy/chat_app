import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

export const sendMassege = async (req: Request, res: Response) => {
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
                    participantsIds:{ 
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
        res.status(201).json(newMessage);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Internal server erorr" });
    }
};
