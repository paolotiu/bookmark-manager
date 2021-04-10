import { gql } from 'apollo-server-express';

export const BaseErrorFragment = gql`
    fragment BaseError on BaseError {
        path
        message
    }
`;

export const FolderFragment = gql`
    fragment Folder on Folder {
        id
        parentId
        depth
        name
    }
`;
export const FolderFragments = {
    withChildren: gql`
        fragment FolderWithChildren on Folder {
            id
            parentId
            depth
            name
            children {
                id
                name
            }
        }
    `,
    withBookmarks: gql`
        fragment FolderWithBookmarks on Folder {
            id
            parentId
            depth
            name
            bookmarks {
                id
                title
                url
                description
            }
        }
    `,
    base: gql`
        fragment Folder on Folder {
            id
            parentId
            depth
            name
        }
    `,
};

const Fragments = {
    BaseErrorFragment,
    FolderFragment,
};
export default Fragments;
