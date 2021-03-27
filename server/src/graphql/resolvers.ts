import { Bookmark } from '@entity/Bookmark';
import { User } from '@entity/User';
import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from './types';
export const resolvers: Resolvers = {
    Query: {
        helloWorld: () => `Hello world`,
        bookmark: async (_, { id }) => {
            const bookmark = await Bookmark.findOne(id);
            if (!bookmark) throw new UserInputError('No bookmark with that id');
            return bookmark;
        },
    },
    Mutation: {
        signUp: (_, args) => User.create(args).save(),
        createBookmark: (_, { data }) => Bookmark.create(data).save(),
    },
};
