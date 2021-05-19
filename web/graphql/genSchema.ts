import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import path from 'path';
import { authResolvers } from './auth/auth.resolvers';
import { bookmarkResolvers } from './bookmark/bookmark.resolvers';
import { folderResolvers } from './folder/folder.resolvers';
import { AuthDirective } from './shared/authDirective';
import { sharedResolvers } from './shared/shared.resolvers';
import { userResolvers } from './user/user.resolvers';
export const genSchema = (): GraphQLSchema => {
    const typesArray = loadFilesSync(path.join(process.cwd(), '.'), { recursive: true, extensions: ['gql'] });
    const resolversArray = [folderResolvers, authResolvers, bookmarkResolvers, sharedResolvers, userResolvers];

    const typeDefs = mergeTypeDefs(typesArray);
    const resolvers = mergeResolvers(resolversArray);

    return makeExecutableSchema({
        typeDefs,
        resolvers,
        schemaDirectives: {
            auth: AuthDirective,
        },
    });
};
