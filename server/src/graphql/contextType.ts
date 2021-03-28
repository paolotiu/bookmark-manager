import { Request, Response } from 'express';
export interface MyContext {
    req: Request;
    res: Response;
    userId: number | undefined;
}
