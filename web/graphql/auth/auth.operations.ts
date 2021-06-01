import { gql } from '@apollo/client';

export const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export const REGISTER = gql`
    mutation register($email: String!, $password: String!, $name: String!) {
        register(email: $email, password: $password, name: $name) {
            ... on BaseError {
                message
            }
        }
    }
`;
