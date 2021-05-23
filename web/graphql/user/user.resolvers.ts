import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { User } from '@entity/User';
import { isBaseError } from '@graphql/shared/errorMessages';
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
            if (!userId) return null;
            const user = await User.findOne(userId);
            return user ? user : null;
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
