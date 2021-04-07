import { Bookmark } from '@entity/Bookmark';
import { Resolvers } from '@gql/types';
import { unNullifyObj } from '@utils/unNullifyObj';
import { unauthorizedError, isBaseError } from '@gql/shared/errorMessages';
import { Folder } from '@entity/Folder';

export const resolvers: Resolvers = {
    BookmarkResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },

    Query: {
        bookmark: async (_, { id }, { userId }) => {
            const bookmark = await Bookmark.findOne({ id, userId }, { relations: ['category'] });
            if (!bookmark)
                return {
                    path: 'bookmark',
                    message: 'No bookmark with that id',
                };
            return bookmark;
        },
    },
    Mutation: {
        createBookmark: async (_, { data: { title, description, url, folderId } }, { userId }) => {
            if (!userId) return unauthorizedError('createBookmark');
            const cleaned = unNullifyObj({ title, description, url });
            if (folderId) {
                const folder = await Folder.findOne(folderId, { where: { userId } });
                if (!folder) return { path: 'createBookmark', message: 'No folder with that id' };
                cleaned.folderId = folder.id;
            }

            const bookmark = Bookmark.create({
                ...cleaned,
                userId,
            });

            return bookmark.save();
        },

        updateBookmark: async (_, { data: { id, description, title, url } }, { userId }) => {
            if (!userId) return unauthorizedError('updateBookmark');
            const updateObj: {
                [key: string]: string | number | Date | null;
            } = unNullifyObj({ description, title, url });

            const bookmark = await Bookmark.findOne(id, { where: { userId }, relations: ['category'] });
            if (!bookmark) {
                return {
                    path: 'updateBookmark',
                    message: 'No bookmark with that id',
                };
            }

            Object.assign(bookmark, updateObj);
            await bookmark.save();

            const newBookmark = await Bookmark.findOne(id, { where: { userId }, relations: ['category'] });

            return (
                newBookmark || {
                    path: 'updateBookmark',
                    message: "Somehting wrong happened. You shouldn't be recieving this error",
                }
            );
        },
    },
};
