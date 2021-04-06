import { Folder } from '@entity/Folder';
import { isBaseError, unauthorizedError } from '@gql/shared/errorMessages';
import { Resolvers } from '@gql/types';

export const resolvers: Resolvers = {
    FolderResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Folder'),
    },
    Query: {
        folder: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('folder');
            //TODO: ADD USER CHECK
            return (
                (await Folder.findOne(id, { relations: ['parent', 'children'] })) || {
                    path: 'folder',
                    message: 'No folder with that id',
                }
            );
        },
    },
    Mutation: {
        createFolder: async (_, { data: { name, parentId } }) => {
            //TODO: ADD USER CHECK

            const folder = Folder.create({ name, userId: 1 });

            // default depth is 0 meaning no parent folder
            let depth = 0;
            if (parentId) {
                // Check if parent id exists
                const parent = await Folder.findOne(parentId);
                if (parent) {
                    depth = parent.depth + 1;
                    folder.parentId = parent.id;
                }
            }
            folder.depth = depth;
            return folder.save();
        },
    },
};
