import { BookmarkToCategory } from '@entity/BookmarkToCategory';
import { Resolvers } from '@gql/types';
import { config } from 'dotenv';
import { Category } from '@entity/Category';

config();

export const categoryResolvers: Resolvers = {
    Category: {
        bookmarks: async (parent) => {
            const res = await BookmarkToCategory.find({ where: { categoryId: parent.id }, relations: ['bookmark'] });
            const bookmarks = res.map((x) => x.bookmark);
            return bookmarks;
        },
    },

    Mutation: {
        createCategory: async (_, { data: { name, bookmarks } }, { userId }) => {
            if (!userId) return null;
            const category = await Category.create({ name, userId }).save();

            if (bookmarks?.length) {
                await Promise.allSettled(
                    bookmarks.map((id) => BookmarkToCategory.create({ categoryId: category.id, bookmarkId: id })),
                );
            }
            return category;
        },
    },
};
