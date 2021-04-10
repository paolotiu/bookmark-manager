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

const Fragments = {
    BaseErrorFragment,
    FolderFragment,
};
export default Fragments;
