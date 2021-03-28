import { BookmarkToCategory } from '@entity/BookmarkToCategory';
import { Bookmark } from '@entity/Bookmark';
import { User } from '@entity/User';
import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from '@gql/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { unNullifyObj } from 'util/unNullifyObj';

config();

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
    User: {
        bookmarks: (parent) => Bookmark.find({ where: { userId: parent.id } }),
    },
    Query: {
        helloWorld: () => `Hello world`,
        bookmark: async (_, { id }) => {
            const bookmark = await Bookmark.findOne(id);
            if (!bookmark) throw new UserInputError('No bookmark with that id');
            return bookmark;
        },
        me: (_, _a, { req }) => {
            if (!req.userId) return null;
            return User.findOne(req.userId);
        },
    },
    Mutation: {
        register: async (_, { email, password, name }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                await User.create({ email, name, password: hashedPassword }).save();
            } catch {
                return false;
            }
            return true;
        },
        login: async (_, { email, password }, { res }) => {
            const user = await User.findOne({ where: { email } });
            if (!user) return null;
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return null;
            const refreshToken = jwt.sign({ userId: user.id, count: user.count }, process.env.JWT_SECRET as string, {
                expiresIn: '7d',
            });
            const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '15min' });

            res.cookie('refresh-token', refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
            res.cookie('access-token', accessToken, { maxAge: 1000 * 60 * 15 }); //15 minutes

            return user;
        },
        createBookmark: (_, { data }, { req }) => {
            if (!req.userId) return null;
            const userId = parseInt(req.userId);
            const cleaned = unNullifyObj(data);
            return Bookmark.create({
                ...cleaned,
                userId,
            }).save();
        },
    },
};
