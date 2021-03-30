import { ApolloServer } from 'apollo-server-express';
import { schema } from '@utils/schema';
import { Express } from 'express';

export const createApolloServer = (app?: Express): ApolloServer => {
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => {
            return { req, res, userId: req.userId || undefined };
        },
    });

    if (app) {
        apolloServer.applyMiddleware({ app, path: '/graphql' });
    }

    return apolloServer;
};
