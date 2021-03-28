import jwt from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { typeDefs } from '@gql/typeDefs';
import { resolvers } from '@gql/resolvers';
import cookieParser from 'cookie-parser';

interface AccessTokenPayload {
    userId: string;
    iat: number;
    exp: number;
}
export const startServer = async (): Promise<void> => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        tracing: true,
        context: ({ req, res }) => {
            return { req, res, userId: req.userId ? parseInt(req.userId) : undefined };
        },
    });
    app.use(cookieParser());
    app.use((req, _, next) => {
        const accessToken = req.cookies['access-token'];
        try {
            const data = jwt.verify(accessToken, process.env.JWT_SECRET as string) as AccessTokenPayload;
            req.userId = data.userId;
        } catch {}

        next();
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    createConnection().then(async () => {
        app.listen(4000, () => console.log(`Live on http://localhost:4000${apolloServer.graphqlPath}`));
    });
};
