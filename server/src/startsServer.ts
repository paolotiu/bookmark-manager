import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { typeDefs } from '@gql/typeDefs';
import { resolvers } from '@gql/resolvers';
export const startServer = async (): Promise<void> => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        tracing: true,
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    createConnection().then(async () => {
        app.listen(4000, () => console.log(`Live on http://localhost:4000${apolloServer.graphqlPath}`));
    });
};
