import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import {
    createEntityIdNotFoundError,
    createUnexpectedError,
    isBaseError,
    unauthorizedError,
} from '@gql/shared/errorMessages';
import { Resolvers } from '@gql/types';

export const resolvers: Resolvers = {
    Folder: {
        bookmarks: (parent) => {
            if (parent.bookmarks) return parent.bookmarks;
            return Bookmark.find({ where: { folderId: parent.id } });
        },
        children: async (parent) => {
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
            return (await Folder.findOne(id)) || createEntityIdNotFoundError('folder', 'folder');
        },
        q: async () => {
            const parent = await Folder.findOne(2);
            if (!parent) return null;
            return parent.getDescendantsTree();
        },
    },
    Mutation: {
        createFolder: async (_, { data: { name, parentId } }, { userId }) => {
            if (!userId) return unauthorizedError('createFolder');

            const folder = Folder.create({ name, userId });

            // default depth is 0 meaning no parent folder
            let depth = 0;
            // Initialize path
            let path = '';
            if (parentId) {
                // Check if parent id exists
                const parent = await Folder.findOne(parentId);
                if (parent) {
                    depth = parent.depth + 1;
                    // Parent path + '.'
                    // We'll insert the folder id later
                    path = parent.path + '.';
                }
            }
            folder.depth = depth;
            // save the folder without the path to generate an id
            const prePathFolder = await folder.save();

            // Append the id to the path
            prePathFolder.path = path + prePathFolder.id;

            return prePathFolder.save();
        },
        moveFolder: async (_, { folderId, targetFolderId }, { userId }) => {
            if (!userId) return unauthorizedError('moveFolder');

            // Get both target and source folder
            const foldersArr = await Folder.findByIds([folderId, targetFolderId], { where: { userId } });

            // Check if folders exists
            if (foldersArr.length < 2) return createEntityIdNotFoundError('moveFolder', 'folder');

            // Map folders by id
            const folders = foldersArr.reduce<{ [key: string]: Folder }>(
                (prev, curr) => ({ ...prev, [curr.id]: curr }),
                {},
            );

            // Move folder
            const res = await folders[folderId].move(folders[targetFolderId].path);

            // Get updated folder from query
            const updatedFolder = res[0].find((f) => f.id === folderId);

            // This should not happen!!!
            if (!updatedFolder) return createUnexpectedError('moveFolder');

            // Update folder path
            folders[folderId].path = updatedFolder.path;

            // Return updated folder
            return folders[folderId];
        },
        updateFolderName: async (_, { name, id }, { userId }) => {
            if (!userId) return unauthorizedError('updateFolderName');

            // Get folder
            const folder = await Folder.findOne(id, { where: { userId: userId } });

            // No folder found
            if (!folder) return createEntityIdNotFoundError('updateFolderName', 'folder');

            // Change folder name
            folder.name = name;

            // Save then return
            return folder.save();
        },
        softDeleteFolder: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('deleteFolder');

            // Get folder
            const folder = await Folder.findOne(id, { where: { userId } });

            // No folder found
            if (!folder) return createEntityIdNotFoundError('softDeleteFolder', 'folder');

            // Find find descendant folders
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
            const folder = await Folder.update({ id, userId }, { deleted: false });

            if (folder.raw.length < 1) return createEntityIdNotFoundError('recoverFolder', 'folder');
            return folder.raw[0];
        },
    },
};
