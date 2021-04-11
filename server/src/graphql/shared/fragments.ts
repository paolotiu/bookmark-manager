import { gql } from 'apollo-server-express';

export const BaseErrorFragment = gql`
    fragment BaseError on BaseError {
        path
        message
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
                depth
                name
                parentId
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
    tree: gql`
        fragment Tree on Tree {
            tree
        }
    `,
};

export const BookmarkFragments = {
    base: gql`
        fragment Bookmark on Bookmark {
            id
            title
            url
            description
            createdDate
            folderId
        }
    `,
};

const Fragments = {
    BaseErrorFragment,
};
export default Fragments;
