/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bookmark } from 'entity/Bookmark';
import { Folder } from 'entity/Folder';
import { User } from 'entity/User';
import { createApolloTestClient } from '@lib/server/createApolloTestClient';
import { gql } from 'apollo-server-express';
import { BaseErrorFragment, BookmarkFragments } from '@graphql/shared/test.fragments';
import { BookmarkResult, CreateBookmarkInput, UpdateBookmarkInput } from '@graphql/generated/graphql';

jest.setTimeout(30000);

// Initialize user
const testUser = { email: 'tomtom@tom.com', password: 'passwreodd', name: 'tom', id: 0 };

const testClient = createApolloTestClient();
const { mutate, query } = testClient;
beforeAll(async () => {
    // Setup user
    const user = await User.create(testUser).save();
    Object.assign(testUser, user);
    // Set user id
    testClient.setOptions({
        request: {
            userId: user.id,
        },
    });
});

const BOOKMARK_QUERY = gql`
    query BOOKMARK_QUERY($id: Int!) {
        bookmark(id: $id) {
            ...Bookmark
            ...BaseError
        }
    }
    ${BookmarkFragments.base}
    ${BaseErrorFragment}
`;

const BOOKMARKS_QUERY = gql`
    query BOOKMARKS_QUERY($deleted: Boolean!) {
        bookmarks(deleted: $deleted) {
            ...Bookmarks
            ...BaseError
        }
    }

    ${BookmarkFragments.bookmarks}
    ${BaseErrorFragment}
`;

const CREATE_BOOKMARK_MUTATION = gql`
    mutation CREATE_BOOKMARK_MUTATION($createBookmarkData: CreateBookmarkInput!) {
        createBookmark(data: $createBookmarkData) {
            ...Bookmark
            ...BaseError
        }
    }

    ${BookmarkFragments.base}
    ${BaseErrorFragment}
`;

const UPDATE_BOOKMARK_MUTATION = gql`
    mutation UPDATE_BOOKMARK_MUTATION($updateBookmarkData: UpdateBookmarkInput!) {
        updateBookmark(data: $updateBookmarkData) {
            ...Bookmark
            ...BaseError
        }
    }
    ${BookmarkFragments.base}
    ${BaseErrorFragment}
`;

const SOFT_DELETE_BOOKMARK_MUTATION = gql`
    mutation SOFT_DELETE_BOOKMARK_MUTATION($id: Int!) {
        softDeleteBookmark(id: $id) {
            ...Bookmark
            ...BaseError
        }
    }

    ${BookmarkFragments.base}
    ${BaseErrorFragment}
`;
const HARD_DELETE_BOOKMARK_MUTATION = gql`
    mutation HARD_DELETE_BOOKMARK_MUTATION($id: Int!) {
        hardDeleteBookmark(id: $id) {
            ...Bookmark
            ...BaseError
        }
    }

    ${BookmarkFragments.base}
    ${BaseErrorFragment}
`;

const SOFT_DELETE_BOOKMARKS_MUTATION = gql`
    mutation SOFT_DELETE_BOOKMARKS_MUTATION($ids: [Int!]!) {
        softDeleteBookmarks(ids: $ids) {
            ...Bookmarks
            ...BaseError
        }
    }
    ${BookmarkFragments.bookmarks}
    ${BaseErrorFragment}
`;

const HARD_DELETE_BOOKMARKS_MUTATION = gql`
    mutation HARD_DELETE_BOOKMARKS_MUTATION($ids: [Int!]!) {
        hardDeleteBookmarks(ids: $ids) {
            ...Bookmarks
            ...BaseError
        }
    }
    ${BookmarkFragments.bookmarks}
    ${BaseErrorFragment}
`;

type BookmarkRes<T extends string> = {
    data: {
        [key in T]: BookmarkResult;
    };
};

type BookmarksRes<T extends string> = {
    data: {
        [key in T]: {
            bookmarks: Bookmark[];
        };
    };
};

const createBookmarkMutation = (variables: CreateBookmarkInput) =>
    mutate<BookmarkRes<'createBookmark'>>(CREATE_BOOKMARK_MUTATION, { variables: { createBookmarkData: variables } });
const bookmarkQuery = (variables: { id: number }) => query<BookmarkRes<'bookmark'>>(BOOKMARK_QUERY, { variables });
const updateBookmarkMutation = (variables: UpdateBookmarkInput) =>
    mutate<BookmarkRes<'updateBookmark'>>(UPDATE_BOOKMARK_MUTATION, { variables: { updateBookmarkData: variables } });
const softDeleteBookmarkMuatation = (variables: { id: number }) =>
    mutate<BookmarkRes<'softDeleteBookmark'>>(SOFT_DELETE_BOOKMARK_MUTATION, { variables });
const hardDeleteBookmarkMuatation = (variables: { id: number }) =>
    mutate<BookmarkRes<'hardDeleteBookmark'>>(HARD_DELETE_BOOKMARK_MUTATION, { variables });
const deleteBookmarksQuery = (variables: { deleted: boolean }) =>
    query<BookmarksRes<'bookmarks'>>(BOOKMARKS_QUERY, { variables });
const softDeleteBookmarksMutation = (variables: { ids: number[] }) =>
    mutate<BookmarksRes<'softDeleteBookmarks'>>(SOFT_DELETE_BOOKMARKS_MUTATION, { variables });

const hardDeleteBookmarksMutation = (variables: { ids: number[] }) =>
    mutate<BookmarksRes<'softDeleteBookmarks'>>(HARD_DELETE_BOOKMARKS_MUTATION, { variables });

interface TestBookmark extends Partial<Bookmark> {
    title: string;
    url: string;
}

describe('Happy Path :)', () => {
    const testFolder: Partial<Folder> = {
        name: 'HEYYY',
    };

    const testBookmark1: TestBookmark = {
        title: 'HEYO',
        url: 'https://someurl.com',
        description: 'A test bookmark',
    };

    const testBookmark2: TestBookmark = {
        title: 'Im in a folder',
        url: 'https://heuy.com',
        description: 'LUH',
    };

    test('Creates bookmark', async () => {
        const {
            data: { createBookmark },
        } = await createBookmarkMutation(testBookmark1);
        expect(createBookmark).toEqual(expect.objectContaining(testBookmark1));
        // Merge res to test bookmark
        Object.assign(testBookmark1, createBookmark);
        const {
            data: { bookmark },
        } = await bookmarkQuery({ id: testBookmark1.id || 0 });
        expect(bookmark).toEqual(testBookmark1);
    });

    test('Creates bookmark in a folder', async () => {
        // Create folder first
        const folder = await Folder.create({ ...testFolder, userId: testUser.id }).save();

        // Merge folder
        Object.assign(testFolder, folder);

        const {
            data: { createBookmark },
        } = await createBookmarkMutation({ ...testBookmark2, folderId: folder.id });

        // Merge bookmark
        Object.assign(testBookmark2, createBookmark);

        expect((createBookmark as Bookmark).folderId).toBe(testFolder.id);
    });

    test('Updates bookmark', async () => {
        // Assert values to be updated
        testBookmark2.folderId = null;
        testBookmark2.title = 'NEW TITLE';
        testBookmark2.description = 'NEW DESCRIPTIONNNN';
        testBookmark2.url = 'https://updated.com';

        const {
            data: { updateBookmark },
        } = await updateBookmarkMutation({
            id: testBookmark2.id!,
            title: testBookmark2.title,
            url: testBookmark2.url,
            description: testBookmark2.description,
            folderId: testBookmark2.folderId,
        });
        expect(updateBookmark).toEqual(expect.objectContaining(testBookmark2));
    });

    test('Soft deletes bookmark', async () => {
        const {
            data: { softDeleteBookmark },
        } = await softDeleteBookmarkMuatation({ id: testBookmark2.id! });
        expect(softDeleteBookmark).toEqual(expect.objectContaining(testBookmark2));

        const bookmark = await Bookmark.findOne(testBookmark2.id);
        expect(bookmark).toBeUndefined();
    });

    test('Query deleted bookmarks', async () => {
        const {
            data: { bookmarks },
        } = await deleteBookmarksQuery({ deleted: true });
        expect(bookmarks.bookmarks.length).toEqual(1);
    });

    test('Hard deletes bookmark', async () => {
        const {
            data: { hardDeleteBookmark },
        } = await hardDeleteBookmarkMuatation({ id: testBookmark2.id! });

        expect(hardDeleteBookmark).toEqual(expect.objectContaining(testBookmark2));

        const bookmark = await Bookmark.findOne(testBookmark2.id, { withDeleted: true });
        expect(bookmark).toBeUndefined();
    });

    test.only('Soft deletes bookmarks', async () => {
        const {
            data: { createBookmark: b1 },
        } = await createBookmarkMutation({ url: 'https://kasdksa.com', title: 'Hey' });
        const {
            data: { createBookmark: b2 },
        } = await createBookmarkMutation({ url: 'https://kasdksa.com', title: 'Hey' });
        const {
            data: { createBookmark: b3 },
        } = await createBookmarkMutation({ url: 'https://kasdksa.com', title: 'Hey' });

        const ids = [(b1 as Bookmark).id, (b2 as Bookmark).id, (b3 as Bookmark).id];
        const {
            data: { softDeleteBookmarks },
        } = await softDeleteBookmarksMutation({
            ids,
        });

        expect(softDeleteBookmarks.bookmarks).toEqual([b1, b2, b3]);

        await hardDeleteBookmarksMutation({ ids });
        const res = await Bookmark.find();
        expect(res.length).toEqual(0);
    });
});
