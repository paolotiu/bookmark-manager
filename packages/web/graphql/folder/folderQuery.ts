import { ErrorFragments, FolderFragments } from '@graphql/fragments';
import { gql } from '@apollo/client';

export const FOLDER = gql`
    query folder($id: Int!) {
        folder(id: $id) {
            ...Folder
            ...BaseError
        }
    }

    ${FolderFragments.folder}
    ${ErrorFragments.base}
`;
