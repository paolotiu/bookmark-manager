import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { authResolvers } from './auth/auth.resolvers';
import { bookmarkResolvers } from './bookmark/bookmark.resolvers';
import { folderResolvers } from './folder/folder.resolvers';
import { AuthDirective } from './shared/authDirective';
import { sharedResolvers } from './shared/shared.resolvers';
import { userResolvers } from './user/user.resolvers';
import { Resolvers } from './generated/graphql';
import authSchema from './auth/auth.gql';
import bookmarkSchema from './bookmark/bookmark.gql';
import folderSchema from './folder/folder.gql';
import sharedSchema from './shared/shared.gql';
import userSchema from './user/user.gql';
export const genSchema = (): GraphQLSchema => {
    // Cant use this in prod
    // Related issue: https://github.com/vercel/next.js/issues/8251
    // const typesArray = loadFilesSync(path.join(process.cwd(), '**/*.gql'), { recursive: true, extensions: ['gql'] });

    const typesArray = [authSchema, bookmarkSchema, folderSchema, sharedSchema, userSchema];

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
