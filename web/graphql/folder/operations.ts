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
    mutation moveFolder($targetId: Int!, $folderId: Int!) {
        moveFolder(targetFolderId: $targetId, folderId: $folderId) {
            ...BaseError
        }
    }

    ${ErrorFragments.base}
`;
