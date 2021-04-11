/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bookmark } from '@entity/Bookmark';
import { Folder } from '@entity/Folder';
import { User } from '@entity/User';
import { BaseErrorFragment, FolderFragments } from '@gql/shared/fragments';
import { CreateFolderInput, FolderResult } from '@gql/types';
import { createApolloTestClient } from '@utils/createApolloTestClient';
import { gql } from 'apollo-server-express';

const testUser = { email: 'tommy@2bob.com', password: 'password', name: 'bob', id: 0 };
const testClient = createApolloTestClient();
const { mutate, query } = testClient;
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

const TREE_QUERY = gql`
    query TREE_QUERY {
        getTree {
            ...Tree
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.tree}
`;

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

const WITH_CHILDREN_QUERY = gql`
    query WITH_CHILDREN_QUERY($id: Int!) {
        folder(id: $id) {
            ...FolderWithChildren
            ...BaseError
        }
    }

    ${BaseErrorFragment}
    ${FolderFragments.withChildren}
`;

const CREATE_FOLDER_MUTATION = gql`
    mutation CREATE_FOLDER_MUTATION($createFolderData: CreateFolderInput!) {
        createFolder(data: $createFolderData) {
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

type DataWithFolder = {
    data: {
        [key: string]: Folder;
    };
};
type FolderRes<T extends string> = {
    data: {
        [key in T]: FolderResult;
    };
};
const createFolderMutation = (variables: CreateFolderInput) =>
    mutate<FolderRes<'createFolder'>>(CREATE_FOLDER_MUTATION, { variables: { createFolderData: variables } });

const updateFolderMutation = (variables: any) =>
    mutate<FolderRes<'updateFolderName'>>(UPDATE_FOLDER_NAME_MUTATION, { variables });

const moveFolderMutation = (variables: any) => mutate<FolderRes<'moveFolder'>>(MOVE_FOLDER_MUTATION, { variables });

const withChildrenQuery = (variables: { id: number }) =>
    mutate<FolderRes<'folder'>>(WITH_CHILDREN_QUERY, { variables });

const withBookmarksQuery = (variables: any) => query<FolderRes<'folder'>>(WITH_BOOKMARKS_QUERY, { variables });
const deleteFolderMutation = (variables: any) =>
    mutate<FolderRes<'deleteFolder'>>(DELETE_BOOKMARK_MUTATION, { variables });

const treeQuery = () => query<{ data: any }>(TREE_QUERY);

interface TestFolder extends Partial<Folder> {
    name: string;
}

describe('Happy Path :)', () => {
    const testFolder: TestFolder = { name: 'TestFolder' };
    const testChildFolder: TestFolder = { name: 'Child' };
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
        } = (await withBookmarksQuery(testChildFolder)) as DataWithFolder;

        expect(folder.bookmarks.length).toBe(1);
        expect(folder.bookmarks[0]).toEqual({
            description: bookmark.description,
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
        });
    });

    test('Gives back folder children', async () => {
        const {
            data: { folder },
        } = (await withChildrenQuery({ id: testFolder.id! })) as DataWithFolder;
        expect(folder.children).toEqual(expect.arrayContaining([expect.objectContaining(testChildFolder)]));
    });

    // test('test', async () => {
    //     const res = await getFolderStructure(testUser.id);
    //     console.log(res);
    // });

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

describe('Tree ', () => {
    const parentFolder1: TestFolder = {
        name: 'parent1',
    };

    const parentFolder2: TestFolder = {
        name: 'parent2',
    };

    const child1: TestFolder = {
        name: 'child1',
    };

    const child2: TestFolder = {
        name: 'child2',
    };

    const grandChild1: TestFolder = {
        name: 'grandChild1',
    };
    const folders = [parentFolder1, parentFolder2, child1, child2, grandChild1];

    test('Creating', async () => {
        // Reset folders
        await Folder.delete({ userId: testUser.id });

        const {
            data: { createFolder: res1 },
        } = (await createFolderMutation(parentFolder1)) as DataWithFolder;
        Object.assign(parentFolder1, res1);
        const {
            data: { createFolder: res2 },
        } = await createFolderMutation(parentFolder2);
        Object.assign(parentFolder2, res2);
        const {
            data: { createFolder: res3 },
        } = await createFolderMutation({ ...child1, parentId: res1.id });
        Object.assign(child1, res3);

        const {
            data: { createFolder: res4 },
        } = await createFolderMutation({ ...child2, parentId: res1.id });
        Object.assign(child2, res4);

        const {
            data: { createFolder: res5 },
        } = await createFolderMutation({ ...grandChild1, parentId: child1.id });
        Object.assign(grandChild1, res5);

        const {
            data: {
                getTree: { tree: tree },
            },
        } = await treeQuery();

        // delte;
        parentFolder1.children = [child1 as Folder];
        parentFolder1.children?.push(child2 as Folder);
        child1.children = [grandChild1 as Folder];
        folders.forEach((folder) => (folder.children = folder.children || []));
        const sampleTree = [parentFolder1, parentFolder2];
        expect(JSON.parse(tree)).toEqual(sampleTree);
    });
});
