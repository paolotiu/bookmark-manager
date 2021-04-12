import gql from 'graphql-tag';

export const FolderFragments = {
    tree: gql`
        fragment Tree on Tree {
            tree
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
