import { ErrorFragments, FolderFragments } from '@graphql/fragments';
import gql from 'graphql-tag';

export const ROOT_FOLDERS_QUERY = gql`
    query rootFolders {
        foldersByDepth(depth: 0) {
            ...FoldersArray
            ...BaseError
        }
    }

    ${FolderFragments.folders}
    ${ErrorFragments.base}
`;
