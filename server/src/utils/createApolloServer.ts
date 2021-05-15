import { genSchema } from '@gql/genSchema';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

export const createApolloServer = (app?: Express): ApolloServer => {
    const schema = genSchema();
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => {
            return { req, res, userId: req.userId || undefined };
        },

        tracing: true,
    });

    if (app) {
        apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });
    }

    return apolloServer;
};
