import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { isBaseError, unauthorizedError } from '@gql/shared/errorMessages';
import { Resolvers } from '@gql/types';

export const resolvers: Resolvers = {
    Folder: {
        bookmarks: (parent) => {
            if (parent.bookmarks) return parent.bookmarks;
            return Bookmark.find({ where: { folderId: parent.id } });
        },
        children: (parent) => {
            if (parent.children) return parent.children;
            return Folder.find({ where: { parentId: parent.id } });
        },
        parent: async (parent) => {
            if (parent.parent) return parent.parent;
            // Return null if folder has no parent
            return (await Folder.findOne(parent.parentId)) || null;
        },
    },
    FolderResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Folder'),
    },
    Query: {
        folder: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('folder');
            //TODO: ADD USER CHECK
            return (
                (await Folder.findOne(id)) || {
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
        updateFolderName: async (_, { name, id }, { userId }) => {
            if (!userId) return unauthorizedError('updateFolderName');

            const folder = await Folder.findOne(id, { where: { userId: userId } });

            // No folder found
            if (!folder)
                return {
                    path: 'updateFolderName',
                    message: 'No folder with that id',
                };

            // Folder found => Change folder name
            folder.name = name;

            return folder.save();
        },
        softDeleteFolder: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('deleteFolder');

            // Soft delete folder
            const folder = await Folder.createQueryBuilder()
                .softDelete()
                .where('id = :id', { id })
                .andWhere('userId = :userId', { userId })
                .returning(['id', 'name', 'depth'])
                .execute();

            // No folders found
            if (!folder)
                return {
                    path: 'deleteFolder',
                    message: 'No folder with that id',
                };

            return folder.raw[0];
        },
    },
};
