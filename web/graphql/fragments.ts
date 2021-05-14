import gql from 'graphql-tag';

export const BookmarkFragments = {
    bookmark: gql`
        fragment Bookmark on Bookmark {
            id
            title
            url
            description
            createdDate
            folderId
        }
    `,
    bookmarks: gql`
        fragment Bookmarks on Bookmarks {
            bookmarks {
                id
                title
                url
                description
                createdDate
                folderId
            }
        }
    `,
};

export const FolderFragments = {
    tree: gql`
        fragment Tree on Tree {
            tree
        }
    `,

    folders: gql`
        fragment FoldersArray on Folders {
            folders {
                id
            }
        }
    `,
    folder: gql`
        fragment Folder on Folder {
            id
            name
            children {
                id
                name
            }
            bookmarks {
                ...Bookmark
            }
        }
        ${BookmarkFragments.bookmark}
    `,

    folderBookmarks: gql`
        fragment FolderBookmarks on Folder {
            bookmarks {
                ...Bookmark
            }
        }

        ${BookmarkFragments.bookmark}
    `,
};

export const ErrorFragments = {
    base: gql`
        fragment BaseError on BaseError {
            path
            message
        }
    `,
    validation: gql`
        fragment ValidationError on InputValidationError {
            path
            errors {
                message
                path
            }
        }
    `,
};
