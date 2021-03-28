import jwt from 'jsonwebtoken';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { typeDefs } from '@gql/typeDefs';
import { resolvers } from '@gql/resolvers';
import cookieParser from 'cookie-parser';
export const startServer = async (): Promise<void> => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        tracing: true,
        context: ({ req, res }) => {
            return { req, res };
        },
    });
    app.use(cookieParser());
    app.use((req, res, next) => {
        const accessToken = req.cookies['access-token'];
        if (!accessToken) return next();
        const data = jwt.verify(accessToken, process.env.JWT_SECRET as string) as any;
        req.userId = data.userId;

        next();
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    createConnection().then(async () => {
        app.listen(4000, () => console.log(`Live on http://localhost:4000${apolloServer.graphqlPath}`));
    });
};
