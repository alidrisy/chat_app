import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';

interface DecodedToken extends jwt.JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            };
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'You need to be logged in' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        
        next();
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;