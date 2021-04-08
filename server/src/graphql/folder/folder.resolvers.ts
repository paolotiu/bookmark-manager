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
        children: async (parent) => {
            console.log(parent.id);
            if (parent.children) return parent.children;
            const tree = await parent.getDescendantsTree();
            return tree.children;
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
        q: async () => {
            const parent = await Folder.findOne(2);
            if (!parent) return null;
            return parent.getDescendantsTree();
        },
    },
    Mutation: {
        createFolder: async (_, { data: { name, parentId } }) => {
            //TODO: ADD USER CHECK

            const folder = Folder.create({ name, userId: 1 });

            // default depth is 0 meaning no parent folder
            let depth = 0;
            let path = '';
            if (parentId) {
                // Check if parent id exists
                const parent = await Folder.findOne(parentId);
                if (parent) {
                    depth = parent.depth + 1;
                    path = parent.path + '.';
                }
            }
            folder.depth = depth;
            const prePathFolder = await folder.save();
            prePathFolder.path = path + prePathFolder.id;
            return prePathFolder.save();
        },
        moveFolder: async (_, { folderId, targetFolderId }) => {
            const folders = await Folder.findByIds([folderId, targetFolderId]);
            console.log(folders);

            return folders[0];
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

            // TODO: FIGURE OUT DELETION!!!!!
            const folder = await Folder.findOne(id, { where: { userId } });
            // No folder found
            if (!folder)
                return {
                    path: 'deleteFolder',
                    message: 'No folder with that id',
                };

            await Folder.createQueryBuilder()
                .update()
                .set({
                    deleted: true,
                })
                .where('path <@ :path', { path: folder.path })
                .execute();

            return folder;
        },
        recoverFolder: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('recoverFolder');
            const folder = await Folder.findOne(id, { where: { userId }, withDeleted: true, relations: ['parent'] });

            if (!folder)
                return {
                    path: 'recoverFolder',
                    message: 'No folder with that id',
                };
            return folder;
        },
    },
};
