import { gql } from '@apollo/client';
import { ErrorFragments } from '@graphql/fragments';

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

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on User {
                __typename
                id
            }
            ...BaseError
        }
    }

    ${ErrorFragments.base}
`;

export const REQUEST_FORGOT = gql`
    mutation requestForgot($email: String!) {
        sendForgotPassword(email: $email)
    }
`;
