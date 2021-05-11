import gql from 'graphql-tag';

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
};

export const ErrorFragments = {
    base: gql`
        fragment BaseError on BaseError {
            path
            message
        }
    `,
};
