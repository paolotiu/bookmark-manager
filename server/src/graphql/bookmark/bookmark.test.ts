/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { User } from '@entity/User';
import { BaseErrorFragment, BookmarkFragments } from '@gql/shared/fragments';
import { BookmarkResult, CreateBookmarkInput, UpdateBookmarkInput } from '@gql/types';
import { createApolloTestClient } from '@utils/createApolloTestClient';
import { gql } from 'apollo-server-express';

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

type BookmarkRes<T extends string> = {
    data: {
        [key in T]: BookmarkResult;
    };
};

const createBookmarkMutation = (variables: CreateBookmarkInput) =>
    mutate<BookmarkRes<'createBookmark'>>(CREATE_BOOKMARK_MUTATION, { variables: { createBookmarkData: variables } });
const bookmarkQuery = (variables: { id: number }) => query<BookmarkRes<'bookmark'>>(BOOKMARK_QUERY, { variables });
const updateBookmarkMutation = (variables: UpdateBookmarkInput) =>
    mutate<BookmarkRes<'updateBookmark'>>(UPDATE_BOOKMARK_MUTATION, { variables: { updateBookmarkData: variables } });

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
});
