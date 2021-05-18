import { gql } from '@apollo/client';
import { ErrorFragments, FolderFragments } from '@graphql/fragments';

export const TREE_QUERY = gql`
    query getTree {
        getTree {
            ...Tree
            ...BaseError
        }
    }

    ${FolderFragments.tree}
    ${ErrorFragments.base}
`;
