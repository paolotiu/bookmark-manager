import { Bookmark } from '@entity/Bookmark';
import { Category } from '@entity/Category';
import { User } from '@entity/User';
import { Resolvers, BaseError } from '@gql/types';

export const userResolvers: Resolvers = {
    UserResult: {
        __resolveType: (obj) => {
            if (isBaseError(obj)) return 'BaseError';
            return 'User';
        },
    },
    User: {
        bookmarks: (parent) => Bookmark.find({ where: { userId: parent.id } }),
        categories: (parent) => Category.find({ where: { userId: parent.id } }),
    },
    Query: {
        me: (_, _a, { req }) => {
            if (!req.userId) return null;
            return User.findOne(req.userId);
        },
    },
};

function isBaseError(obj: unknown): obj is BaseError {
    return (obj as BaseError).message !== undefined && (obj as BaseError).path !== undefined;
}
