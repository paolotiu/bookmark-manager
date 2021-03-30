import { Bookmark } from '@entity/Bookmark';
import { BookmarkToCategory } from '@entity/BookmarkToCategory';
import { Resolvers } from '@gql/types';
import { UserInputError } from 'apollo-server-express';
import { unNullifyObj } from '@utils/unNullifyObj';
export const bookmarkResolvers: Resolvers = {
    Bookmark: {
        categories: async (parent) => {
            const res = await BookmarkToCategory.find({
                where: { bookmarkId: parent.id },
                relations: ['category'],
            });
            const categories = res.map((item) => item.category);
            return categories;
        },
    },
    Query: {
        bookmark: async (_, { id }) => {
            const bookmark = await Bookmark.findOne(id);
            if (!bookmark) throw new UserInputError('No bookmark with that id');
            return bookmark;
        },
    },
    Mutation: {
        createBookmark: async (_, { data: { title, description, url, categories } }, { userId }) => {
            if (!userId) return null;
            const cleaned = unNullifyObj({ title, description, url });

            const bookmark = await Bookmark.create({
                ...cleaned,
                userId,
            }).save();

            await Promise.allSettled(
                categories?.map((cat) =>
                    BookmarkToCategory.create({ bookmarkId: bookmark.id, categoryId: cat }).save(),
                ) || [],
            );

            return bookmark;
        },
    },
};
