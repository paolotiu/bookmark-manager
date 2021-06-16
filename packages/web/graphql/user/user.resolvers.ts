import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { User } from '@entity/User';
import { createEntityIdNotFoundError, isBaseError } from '@graphql/shared/errorMessages';
import { Resolvers } from '@graphql/generated/graphql';

export const userResolvers: Resolvers = {
    UserResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'User'),
    },
    User: {
        bookmarks: (parent) => Bookmark.find({ where: { userId: parent.id } }),
        folders: (parent) => Folder.find({ where: { userId: parent.id } }),
    },
    Query: {
        me: async (_, _a, { userId }) => {
            if (!userId) return createEntityIdNotFoundError('me', 'user');
            const user = await User.findOne(userId);
            return user || createEntityIdNotFoundError('me', 'user');
        },
        ping: () => 'pong',
    },
    // Mutation: {
    //     import: async (_, { file }: { file: FileUpload }, { userId }) => {
    //         if (file.mimetype !== 'text/html')
    //             return createBaseError('import', 'Files with the mimetype of text/html only are allowed');
    //     },
    // },
};
