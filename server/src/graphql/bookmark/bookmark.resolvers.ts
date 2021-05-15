import { Bookmark } from '@entity/Bookmark';
import { Resolvers } from '@gql/types';
import { unNullifyObj } from '@utils/unNullifyObj';
import {
    createBaseError,
    createEntityIdNotFoundError,
    createUnexpectedError,
    createValidationError,
    isBaseError,
    isValidationError,
} from '@gql/shared/errorMessages';
import { Folder } from '@entity/Folder';
import { bookmarkSchema } from './yupSchema';
import { scrapeMetadata } from '@utils/scrapeMetadata';

export const resolvers: Resolvers = {
    BookmarkResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },
    BookmarkResultWithInput: {
        __resolveType: (parent) =>
            isBaseError(parent) ? 'BaseError' : isValidationError(parent) ? 'InputValidationError' : 'Bookmark',
    },
    BookmarksResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmarks'),
    },

    Query: {
        bookmark: async (_, { id }, { userId }) => {
            const bookmark = await Bookmark.findOne({ id, userId });
            if (!bookmark) return createEntityIdNotFoundError('bookmark', 'bookmark');
            return bookmark;
        },

        bookmarks: async (_, { deleted }, { userId }) => {
            const withDeleted = deleted || false;

            if (deleted) {
                const bookmarks = await Bookmark.createQueryBuilder()
                    .select()
                    .where('"deletedDate" IS NOT NULL')
                    .andWhere('"userId" = :userId', { userId })
                    .withDeleted()
                    .getMany();
                return { bookmarks };
            }

            const bookmarks = await Bookmark.find({ where: { userId }, withDeleted });
            return { bookmarks };
        },
    },
    Mutation: {
        createBookmark: async (_, { data: { title, description, url, folderId } }, { userId }) => {
            try {
                const x = await bookmarkSchema
                    .validate({ title, description, url }, { abortEarly: false })
                    .catch((e) => e);
                if (x.errors) {
                    return createValidationError('createBookmark', x);
                }

                const res = await scrapeMetadata(url);

                const data = {
                    title: res?.ogTitle || title || url,
                    description: res?.ogDescription || description || '',
                    url,
                    folderId,
                };

                // Put bookmark in a folder
                if (folderId) {
                    const folder = await Folder.findOne(folderId, { where: { userId } });
                    // TODO: Decide if it should error out if a folder isn't found
                    // or just dont add the folder id to the bookmark
                    if (!folder) return createEntityIdNotFoundError('createBookmark', 'folder');
                    data.folderId = folder.id;
                }

                // Create bookmark
                const bookmark = Bookmark.create({
                    ...data,
                    userId,
                });

                return bookmark.save();
            } catch (err) {
                return createBaseError('createBookmark', err.message);
            }
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
        hardDeleteBookmark: async (_, { id }, { userId }) => {
            const bookmark = await Bookmark.findOne(id, { where: { userId }, withDeleted: true });
            if (!bookmark) return createEntityIdNotFoundError('softDelete', 'bookmark');

            await Bookmark.delete({ id: bookmark.id, userId });

            return bookmark;
        },

        softDeleteBookmarks: async (_, { ids }, { userId }) => {
            const { raw: bookmarks } = await Bookmark.createQueryBuilder()
                .softDelete()
                .where('id in (:...ids)', { ids })
                .andWhere('userId = :userId', { userId })
                .returning('*')
                .execute();
            return { bookmarks };
        },
        hardDeleteBookmarks: async (_, { ids }, { userId }) => {
            const { raw: bookmarks } = await Bookmark.createQueryBuilder()
                .delete()
                .where('id in (:...ids)', { ids })
                .andWhere('userId = :userId', { userId })
                .returning('*')
                .execute();
            return { bookmarks };
        },
    },
};
