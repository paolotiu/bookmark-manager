import { Bookmark } from '@entity/Bookmark';
import { Resolvers } from '@gql/types';
import { config } from 'dotenv';
import { Category } from '@entity/Category';
import { isBaseError, unauthorizedError } from '@gql/shared/errorMessages';

config();

export const resolvers: Resolvers = {
    DeleteCategoryResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'NoErrorCategoryDeletion'),
    },
    CreateCategoryResult: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Category'),
    },
    Category: {
        bookmarks: (parent, _, { userId }) => {
            if (parent.bookmarks) return parent.bookmarks;
            return Bookmark.find({ where: { categoryId: parent.id, userId } });
        },
    },
    Mutation: {
        createCategory: async (_, { data: { name, bookmarks } }, { userId }) => {
            if (!userId) return unauthorizedError('createCategory');
            const category = await Category.create({ name, userId }).save();
            if (bookmarks?.length) {
                const bookmarkArray = await Bookmark.createQueryBuilder()
                    .select()
                    .where('"userId" = :userId', { userId })
                    .andWhereInIds(bookmarks)
                    .getMany();
                category.bookmarks = bookmarkArray;
                await category.save();
            }
            return category;
        },
        deleteCategory: async (_, { id }, { userId }) => {
            if (!userId) return unauthorizedError('deleteCategory');
            await Bookmark.update({ userId, categoryId: id }, { categoryId: undefined });
            const res = await Category.delete({ id, userId });

            return { success: !!res.affected };
        },
    },
};
