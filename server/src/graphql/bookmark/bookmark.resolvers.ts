import { Bookmark } from '@entity/Bookmark';
import { Resolvers } from '@gql/types';
import { unNullifyObj } from '@utils/unNullifyObj';
import { createEntityIdNotFoundError, createUnexpectedError, isBaseError } from '@gql/shared/errorMessages';
import { Folder } from '@entity/Folder';

export const resolvers: Resolvers = {
    BookmarkResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },

    Query: {
        bookmark: async (_, { id }, { userId }) => {
            const bookmark = await Bookmark.findOne({ id, userId });
            if (!bookmark) return createEntityIdNotFoundError('bookmark', 'bookmark');
            return bookmark;
        },
    },
    Mutation: {
        createBookmark: async (_, { data: { title, description, url, folderId } }, { userId }) => {
            // Get unNullified object
            const cleaned = unNullifyObj({ title, description, url });

            // Put bookmark in a folder
            if (folderId) {
                const folder = await Folder.findOne(folderId, { where: { userId } });
                // TODO: Decide if it should error out if a folder isn't found
                // or just dont add the folder id to the bookmark
                if (!folder) return createEntityIdNotFoundError('createBookmark', 'folder');
                cleaned.folderId = folder.id;
            }

            // Create bookmark
            const bookmark = Bookmark.create({
                ...cleaned,
                userId,
            });

            return bookmark.save();
        },

        updateBookmark: async (_, { data: { id, description, title, url, folderId } }, { userId }) => {
            // Get unullified object
            const updateObj: {
                [key: string]: string | number | Date | null;
            } = unNullifyObj({ description, title, url });

            // Find bookmark
            const bookmark = await Bookmark.findOne(id, { where: { userId } });

            // No bookmark found
            if (!bookmark) return createEntityIdNotFoundError('updateBookmark', 'bookmark');

            // Client requested to change folders
            if (typeof folderId !== 'undefined') {
                if (folderId) {
                    // Check if folder exists then save
                    const folder = await Folder.findOne(folderId, { where: { userId } });

                    folder ? (bookmark.folderId = folderId) : '';
                } else {
                    // Bookmark to root
                    bookmark.folderId = null;
                }
            }

            // Update bookmark obj properties
            Object.assign(bookmark, updateObj);
            const newBookmark = await bookmark.save();

            return newBookmark || createUnexpectedError('updateBookmark');
        },
        softDeleteBookmark: async (_, { id }, { userId }) => {
            const bookmark = await Bookmark.findOne(id, { where: { userId } });
            if (!bookmark) return createEntityIdNotFoundError('softDelete', 'bookmark');

            await bookmark.softRemove();

            return bookmark;
        },
    },
};
