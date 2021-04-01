import { Bookmark } from '@entity/Bookmark';
import { Resolvers } from '@gql/types';
import { unNullifyObj } from '@utils/unNullifyObj';
import { unauthorizedError, isBaseError } from '@gql/shared/errorMessages';
import { Category } from '@entity/Category';

export const resolvers: Resolvers = {
    BookmarkResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },
    AddBookmarkToCategoriesResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },
    CreateBookmarkResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Bookmark'),
    },
    UpdateBookmarkResult: {
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
        createBookmark: async (_, { data: { title, description, url } }, { userId }) => {
            if (!userId) return unauthorizedError('createBookmark');
            const cleaned = unNullifyObj({ title, description, url });

            const bookmark = Bookmark.create({
                ...cleaned,
                userId,
            });

            return bookmark.save();
        },
        addBookmarkToCategories: async (_, { data: { bookmarkId, categoryId } }, { userId }) => {
            if (!userId) return unauthorizedError('addBookmarkToCategories');
            const bookmark = await Bookmark.findOne({ where: { id: bookmarkId, userId } });
            const category = await Category.findOne({ where: { id: categoryId, userId } });
            if (!bookmark)
                return {
                    path: 'add',
                    message: 'No bookmark with that ID',
                };

            if (!category)
                return {
                    path: 'add',
                    message: 'No category with that ID',
                };

            bookmark.categoryId = categoryId;

            return bookmark.save();
        },
        updateBookmark: async (_, { data: { id, categoryId, description, title, url } }) => {
            // if (!userId) return unauthorizedError('updateBookmark');
            const userId = 1;
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

            Object.assign(updateObj, bookmark);
            await bookmark.save();

            // TODO: Make logic less messy
            if (typeof categoryId !== 'undefined') {
                if (categoryId === null) {
                    if (bookmark.categoryId !== null) {
                        const category = await Category.findOne(bookmark.categoryId, {
                            where: { userId },
                            relations: ['bookmarks'],
                        });
                        if (category) {
                            category.bookmarks = category.bookmarks.filter((val) => {
                                console.log(bookmark.id !== val.id);
                                return val.id !== bookmark.id;
                            });
                            await category.save();
                        }
                    }
                } else {
                    // Check if user owns the category
                    const category = await Category.findOne({ where: { id: categoryId, userId } });
                    if (category) {
                        category.bookmarks ? category.bookmarks.push(bookmark) : (category.bookmarks = [bookmark]);
                        await category.save();
                    }
                }
            }

            return Bookmark.findOne(id, { where: { userId }, relations: ['category'] });
        },
    },
};

// async function checkIfUserOwnsCategories(ids: number[], userId: number) {
//     // Check if use rincluded a category that's not their's
//     const cats = await Category.createQueryBuilder('c')
//         .select()
//         .where('c.userId != :userId', { userId })
//         .andWhereInIds(ids)
//         .execute();
//     if (cats.length) return false;
//     return true;
// }
