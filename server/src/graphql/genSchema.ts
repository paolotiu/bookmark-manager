import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import path from 'path';

export const genSchema = (): GraphQLSchema => {
    const typesArray = loadFilesSync(path.join(__dirname, '.'), { recursive: true, extensions: ['gql'] });
    const resolversArray = loadFilesSync(path.join(__dirname, './**/*.resolvers.ts'));

    const typeDefs = mergeTypeDefs(typesArray);
    const resolvers = mergeResolvers(resolversArray);

    return makeExecutableSchema({
        typeDefs,
        resolvers,
    });
};
