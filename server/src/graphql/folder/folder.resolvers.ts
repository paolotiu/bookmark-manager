import { Bookmark } from '@entity/Bookmark';
import { Folder, getFolderStructure } from '@entity/Folder';
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

            // POJO given
            if (!parent.getDescendantsTree) {
                const _parent = await Folder.findOne(parent.id);

                if (!_parent) {
                    return [];
                }
                const tree = await _parent.getDescendantsTree();
                return tree.children;
            }

            const tree = await parent.getDescendantsTree();
            return tree.children;
        },
    },
    TreeResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Tree'),
    },
    FolderResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Folder'),
    },
    FolderArrayResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Folders'),
    },
    Query: {
        folder: async (_, { id }) => {
            return (await Folder.findOne(id)) || createEntityIdNotFoundError('folder', 'folder');
        },

        q: async (_, __, { dataSources: { iconsApi } }) => {
            const x = await iconsApi.getIconSets();
            const setId = x.iconsets[0].iconset_id;
            console.log(setId);
            const icons = await iconsApi.getIconSetIcons({ id: setId });
            console.log(icons.icons[0].raster_sizes);
            const parent = await Folder.findOne(2);
            if (!parent) return null;
            return parent.getDescendantsTree();
        },
        getTree: async (_, __, { userId }) => {
            if (!userId) return unauthorizedError('getTree');
            const res = await getFolderStructure(userId);

            return { tree: JSON.stringify(res) };
        },
    },
    Mutation: {
        createFolder: async (_, { data: { name, parentId } }, { userId }) => {
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

                    // Add parent id
                    folder.parentId = parentId;
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
            // Move folder to root
            if (!targetFolderId || targetFolderId < 0) {
                const folder = await Folder.findOne(folderId, { where: { userId } });
                const res = await folder?.moveToRoot();
                if (!res) return createEntityIdNotFoundError('moveFolder', 'folder');
                return res[0][0];
            }

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

            // Return updated folder
            return updatedFolder;
        },
        updateFolderName: async (_, { name, id }, { userId }) => {
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
            const folder = await Folder.update({ id, userId }, { deleted: false });

            if (folder.raw.length < 1) return createEntityIdNotFoundError('recoverFolder', 'folder');
            return folder.raw[0];
        },
        deleteFolder: async (_, { id }, { userId }) => {
            const folder = await Folder.findOne(id, { where: { userId } });

            if (!folder) return createEntityIdNotFoundError('deleteFolder', 'folder');

            // Soft delete
            await Bookmark.createQueryBuilder()
                .softDelete()
                .where('folderId = :fid', { fid: id })
                .andWhere('userId = :uid', { uid: userId })
                .execute();

            // Remove folder id
            await Bookmark.createQueryBuilder()
                .update()
                .set({
                    folderId: () => 'null',
                    deletedDate: new Date(),
                })
                .where('folderId = :fid', { fid: id })
                .andWhere('userId = :uid', { uid: userId })
                .execute();

            // Delete folder
            await Folder.delete({ id, userId });
            return folder;
        },
    },
};
