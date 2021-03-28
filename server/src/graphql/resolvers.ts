import { BookmarkToCategory } from '@entity/BookmarkToCategory';
import { Bookmark } from '@entity/Bookmark';
import { User } from '@entity/User';
import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from '@gql/types';
export const resolvers: Resolvers = {
    Category: {
        bookmarks: async (parent) => {
            const res = await BookmarkToCategory.find({ where: { categoryId: parent.id }, relations: ['bookmark'] });
            const bookmarks = res.map((x) => x.bookmark);
            return bookmarks;
        },
    },
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
        helloWorld: () => `Hello world`,
        bookmark: async (_, { id }) => {
            const bookmark = await Bookmark.findOne(id);
            if (!bookmark) throw new UserInputError('No bookmark with that id');
            return bookmark;
        },
    },
    Mutation: {
        signUp: async (_, args) => {
            const user = await User.create(args).save();

            return user;
        },
        createBookmark: (_, { data }) => Bookmark.create(data).save(),
    },
};
