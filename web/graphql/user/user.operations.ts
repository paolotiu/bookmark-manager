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
