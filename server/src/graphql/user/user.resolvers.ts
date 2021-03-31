import { Bookmark } from '@entity/Bookmark';
import { Category } from '@entity/Category';
import { User } from '@entity/User';
import { isBaseError } from '@gql/shared/errorMessages';
import { Resolvers } from '@gql/types';

export const resolvers: Resolvers = {
    UserResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'User'),
    },
    User: {
        bookmarks: (parent) => Bookmark.find({ where: { userId: parent.id }, relations: ['category'] }),
        categories: (parent) => Category.find({ where: { userId: parent.id }, relations: ['bookmarks'] }),
    },
    Query: {
        me: async (_, _a, { userId }) => {
            if (!userId) return null;
            const user = await User.findOne(userId);
            return user ? user : null;
        },
        ping: () => 'pong',
    },
};
