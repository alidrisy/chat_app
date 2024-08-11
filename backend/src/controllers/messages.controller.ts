import { Request, Response } from 'express';

export const getMessages = (req: Request, res: Response) => {
    try {
        res.send('Messages route');

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getConversations = (req: Request, res: Response) => {
    res.send('Conversation route');
};
