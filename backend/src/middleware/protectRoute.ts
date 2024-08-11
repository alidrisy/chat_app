import { Request, Response, NextFunction } from 'express';

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'You need to be logged in' });
        }

        next();
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;