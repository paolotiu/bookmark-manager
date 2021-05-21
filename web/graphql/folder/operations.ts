import { ErrorFragments, FolderFragments } from '@graphql/fragments';
import gql from 'graphql-tag';

export const CREATE_FOLDER_MUTATION = gql`
    mutation createFolder($name: String!) {
        createFolder(data: { name: $name }) {
            ...Folder
            ...BaseError
        }
    }
    ${FolderFragments.folder}
    ${ErrorFragments.base}
`;

export const DELETE_FOLDER_MUTATION = gql`
    mutation deleteFolder($id: Int!) {
        deleteFolder(id: $id) {
            ...BaseError
        }
    }

    ${FolderFragments.folder}
    ${ErrorFragments.base}
`;

export const MOVE_FOLDER_MUTATION = gql`
    mutation moveFolder(
        $targetId: Int!
        $folderId: Int!
        $targetFolderOrder: [Int!]!
        $sourceFolderOrder: [Int!]!
        $targetParentId: Int!
        $sourceParentId: Int!
    ) {
        moveFolder(targetFolderId: $targetId, folderId: $folderId) {
            ...BaseError
        }

        changeFolderOrder(id: $sourceParentId, order: $sourceFolderOrder)

        targetChangeOrder: changeFolderOrder(id: $targetParentId, order: $targetFolderOrder)
    }

    ${ErrorFragments.base}
`;

export const CHANGE_FOLDER_ORDER_MUTATION = gql`
    mutation changeFolderOrder(
        $targetFolderOrder: [Int!]!
        $sourceFolderOrder: [Int!]!
        $targetParentId: Int!
        $sourceParentId: Int!
    ) {
        changeFolderOrder(id: $sourceParentId, order: $sourceFolderOrder)

        targetChangeOrder: changeFolderOrder(id: $targetParentId, order: $targetFolderOrder)
    }

    ${ErrorFragments.base}
`;
