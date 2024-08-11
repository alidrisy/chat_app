import { Request, Response } from 'express';


export const signup = async (_req: Request, res: Response) => {
    res.send('Sign up seccessful');
}

export const login = async (_req: Request, res: Response) => {
    res.send('Logging in seccessful');
}

export const logout = async (_req: Request, res: Response) => {
    res.send('Logging out seccessful');
}
