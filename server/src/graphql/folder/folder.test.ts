/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { User } from '@entity/User';
import { BaseErrorFragment, FolderFragments } from '@gql/shared/fragments';
import { createApolloTestClient } from '@utils/createApolloTestClient';
import { gql } from 'apollo-server-express';

const testUser = { email: 'tommy@2bob.com', password: 'password', name: 'bob', id: 0 };

beforeAll(async () => {
    // Setup user
    const user = await User.create(testUser).save();
    testUser.id = user.id;
    testClient.setOptions({
        request: {
            userId: user.id,
        },
    });
});

const testClient = createApolloTestClient();
const { mutate, query } = testClient;

const WITH_BOOKMARKS_QUERY = gql`
    query WITH_BOOKMARKS_QUERY($id: Int!) {
        folder(id: $id) {
            ...FolderWithBookmarks
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.withBookmarks}
`;

const CREATE_FOLDER_MUTATION = gql`
    mutation CREATE_FOLDER_MUTATION($name: String!, $parentId: Int) {
        createFolder(data: { name: $name, parentId: $parentId }) {
            ...Folder
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.base}
`;

const UPDATE_FOLDER_NAME_MUTATION = gql`
    mutation UPDATE_FOLDER_NAME_MUTATION($id: Int!, $name: String!) {
        updateFolderName(id: $id, name: $name) {
            ...Folder
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.base}
`;

const MOVE_FOLDER_MUTATION = gql`
    mutation MOVE_FOLDER_MUTATION($folderId: Int!, $targetFolderId: Int) {
        moveFolder(folderId: $folderId, targetFolderId: $targetFolderId) {
            ...BaseError
            ...Folder
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.base}
`;

const DELETE_BOOKMARK_MUTATION = gql`
    mutation DELETE_BOOKMARK_MUTATION($id: Int!) {
        deleteFolder(id: $id) {
            ...Folder
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.base}
`;

type FolderRes<T extends string> = {
    data: {
        [key in T]: any;
    };
};
const createFolderMutation = (variables: any) =>
    mutate<FolderRes<'createFolder'>>(CREATE_FOLDER_MUTATION, { variables });

const updateFolderMutation = (variables: any) =>
    mutate<FolderRes<'updateFolderName'>>(UPDATE_FOLDER_NAME_MUTATION, { variables });

const moveFolderMutation = (variables: any) => mutate<FolderRes<'moveFolder'>>(MOVE_FOLDER_MUTATION, { variables });

const withBookmarksQuery = (variables: any) => query<FolderRes<'folder'>>(WITH_BOOKMARKS_QUERY, { variables });
const deleteFolderMutation = (variables: any) =>
    mutate<FolderRes<'deleteFolder'>>(DELETE_BOOKMARK_MUTATION, { variables });

describe('Happy Path :)', () => {
    const testFolder: Partial<Folder> = { name: 'TestFolder' };
    const testChildFolder: Partial<Folder> = { name: 'Child' };
    test('Creates folder', async () => {
        const {
            data: { createFolder },
        } = await createFolderMutation(testFolder);
        expect(createFolder).toMatchObject(testFolder);

        // Update testFolder
        Object.assign(testFolder, createFolder);
    });

    test('Created folder exists in db', async () => {
        const folder = await Folder.findOne(testFolder.id, { where: { userId: testUser.id } });
        expect(folder).toEqual(expect.objectContaining(testFolder));
    });

    test('Updates name', async () => {
        // Update testFolder name
        testFolder.name = 'Parent';
        const {
            data: { updateFolderName },
        } = await updateFolderMutation(testFolder);
        expect(updateFolderName).toEqual(expect.objectContaining(testFolder));
    });

    test('Creates child folder under parent', async () => {
        // Add testFolder id to child parentId
        testChildFolder.parentId = testFolder.id;

        const {
            data: { createFolder },
        } = await createFolderMutation(testChildFolder);
        expect(createFolder).toEqual(expect.objectContaining(testChildFolder));

        // Update child folder values
        Object.assign(testChildFolder, createFolder);
    });

    test('Moves child folder to root', async () => {
        // Assert values
        testChildFolder.parentId = null;
        testChildFolder.depth = 0;

        const {
            data: { moveFolder },
        } = await moveFolderMutation({ folderId: testChildFolder.id });
        expect(moveFolder).toEqual(expect.objectContaining(testChildFolder));
    });

    test('Moves child folder back', async () => {
        // Assert values
        testChildFolder.parentId = testFolder.id;
        testChildFolder.depth = 1;
        const {
            data: { moveFolder },
        } = await moveFolderMutation({ folderId: testChildFolder.id, targetFolderId: testFolder.id });
        expect(moveFolder).toEqual(expect.objectContaining(testChildFolder));
    });

    let bookmarkId: number;
    test('bookmark works', async () => {
        // Create bookmark
        const bookmark = await Bookmark.create({
            title: 'HI!',
            description: 'A test bookmark!',
            url: 'http://SOMEURL.com',
            folderId: testChildFolder.id,
            userId: testUser.id,
        }).save();

        // initialize bookmarkId
        bookmarkId = bookmark.id;

        const {
            data: { folder },
        } = await withBookmarksQuery(testChildFolder);
        expect(folder.bookmarks.length).toBe(1);
        expect(folder.bookmarks[0]).toEqual({
            description: bookmark.description,
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
        });
    });

    test('Folder deletion ', async () => {
        const {
            data: { deleteFolder },
        } = await deleteFolderMutation(testChildFolder);
        expect(deleteFolder).toEqual(expect.objectContaining(testChildFolder));

        // Check if folder not in db
        const folder = await Folder.findOne(testChildFolder.id);
        expect(folder).toBeUndefined();
    });

    test('Bookmarks of deleted folder gets soft deleted', async () => {
        const bookmark = await Bookmark.findOne(bookmarkId);
        expect(bookmark).toBeUndefined();
    });
});
