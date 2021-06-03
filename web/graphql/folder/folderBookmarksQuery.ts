import { ErrorFragments, FolderFragments } from '@graphql/fragments';
import { gql } from '@apollo/client';

export const FOLDER_BOOKMARKS = gql`
    query folderBookmarks($id: Int!) {
        folder(id: $id) {
            ...FolderBookmarks
            ...BaseError
        }
    }
    ${FolderFragments.folderBookmarks}
    ${ErrorFragments.base}
`;
