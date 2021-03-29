import { resolvers } from '@gql/resolvers/index';
import { typeDefs } from '@gql/schema/typeDefs';
import { makeExecutableSchema } from 'apollo-server-express';

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});
