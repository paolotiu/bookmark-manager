import { createTypeormConn } from '@utils/createTypeormConn';
import { createTokens } from '@utils/createTokens';
import jwt from 'jsonwebtoken';
import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { User } from '@entity/User';
import { createApolloServer } from '@utils/createApolloServer';
import cors from 'cors';
import { setTokenCookies } from '@gql/auth/auth.resolvers';

interface AccessTokenPayload {
    userId: number;
    iat: number;
    exp: number;
}

interface RefreshTokenPayload extends AccessTokenPayload {
    count: number;
}

export const startServer = async (): Promise<void> => {
    const app = express();

    app.use(cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'], credentials: true }));
    app.use(cookieParser());
    app.use(async (req, res, next) => {
        const accessToken = req.cookies['access-token'];
        const refreshToken = req.cookies['refresh-token'];

        // User not logged in
        if (!refreshToken && !accessToken) return next();

        try {
            const data = jwt.verify(accessToken, process.env.JWT_SECRET as string) as AccessTokenPayload;
            // Put user id on request...to be put in apollo server context
            req.userId = data.userId;
            return next();
        } catch {}

        if (!refreshToken) return next();

        let data;
        try {
            data = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as RefreshTokenPayload;
        } catch {
            return next();
        }

        // Refresh token is valid
        const user = await User.findOne(data.userId);

        // token is invalidated
        if (!user || user.count !== data.count) return next();

        const tokens = createTokens(user);
        setTokenCookies(res, tokens);
        req.userId = user.id;
        next();
    });

    const apolloServer = createApolloServer(app);
    await createTypeormConn();
    app.listen(4000, () => {
        console.log(`Listening on http://localhost:4000${apolloServer.graphqlPath}`);
    });
};
