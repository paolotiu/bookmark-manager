import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import path from 'path';
import { GraphQLUpload } from 'graphql-upload';
import { authResolvers } from './auth/auth.resolvers';
import { bookmarkResolvers } from './bookmark/bookmark.resolvers';
import { folderResolvers } from './folder/folder.resolvers';
import { AuthDirective } from './shared/authDirective';
import { sharedResolvers } from './shared/shared.resolvers';
import { userResolvers } from './user/user.resolvers';
import { Resolvers } from './generated/graphql';
export const genSchema = (): GraphQLSchema => {
    const typesArray = loadFilesSync(path.join(process.cwd(), '.'), { recursive: true, extensions: ['gql'] });
    const resolversArray: Resolvers[] = [
        folderResolvers,
        authResolvers,
        bookmarkResolvers,
        sharedResolvers,
        userResolvers,
        {
            Upload: GraphQLUpload,
        },
    ];

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

export const schema = genSchema();
