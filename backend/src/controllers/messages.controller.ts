import { Request, Response } from 'express';

export const getMessages = (_req: Request, res: Response) => {
    res.send('Message route');
};

export const getConversations = (_req: Request, res: Response) => {
    res.send('Conversation route');
};
