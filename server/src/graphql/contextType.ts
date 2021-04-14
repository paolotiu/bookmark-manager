import { Request, Response } from 'express';
import { IconsFinderAPI } from 'restDataSource';
export interface MyContext {
    req: Request;
    res: Response;
    userId: number | undefined;
    dataSources: {
        iconsApi: IconsFinderAPI;
    };
}
