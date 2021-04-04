import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on User {
                __typename
                id
            }

            ... on BaseError {
                __typename
                path
                message
            }
        }
    }
`;
