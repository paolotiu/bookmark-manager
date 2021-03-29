import { createTokens } from './auth';
import jwt from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { resolvers } from '@gql/resolvers/index';
import { typeDefs } from '@gql/schema/typeDefs';
import cookieParser from 'cookie-parser';
import { User } from '@entity/User';

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

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        tracing: true,
        context: ({ req, res }) => {
            return { req, res, userId: req.userId || undefined };
        },
    });
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
        res.cookie('refresh-token', tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
        res.cookie('access-token', tokens.accessToken, { maxAge: 1000 * 60 * 15 }); //15 minutes
        req.userId = user.id;
        next();
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    createConnection().then(async () => {
        app.listen(4000, () => console.log(`Live on http://localhost:4000${apolloServer.graphqlPath}`));
    });
};
