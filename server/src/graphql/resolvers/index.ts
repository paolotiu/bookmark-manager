import { userResolvers } from './userResolvers';
import { authResolvers } from './auth';
import { bookmarkResolvers } from './bookmarkResolvers';
import { categoryResolvers } from './categoryResolvers';
import { mergeResolvers } from '@graphql-tools/merge';

const resolversArray = [authResolvers, userResolvers, categoryResolvers, bookmarkResolvers];

export const resolvers = mergeResolvers(resolversArray);
