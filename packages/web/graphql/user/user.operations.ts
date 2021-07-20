import { gql } from '@apollo/client';

export const USERNAME = gql`
    query userName {
        me {
            ... on User {
                id
                name
            }
        }
    }
`;

export const ME = gql`
    query me {
        me {
            ... on User {
                email
                name
            }
        }
    }
`;
