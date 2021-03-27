import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
export const startServer = async (): Promise<void> => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    createConnection().then(() => {
        app.listen(4000, () => console.log(`Live on http://localhost:4000${apolloServer.graphqlPath}`));
    });
};
