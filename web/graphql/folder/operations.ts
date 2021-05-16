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
            ...Folder
            ...BaseError
        }
    }

    ${FolderFragments.folder}
    ${ErrorFragments.base}
`;
