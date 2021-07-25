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

export const REQUEST_FORGOT = gql`
    mutation requestForgot($email: String!) {
        sendForgotPassword(email: $email)
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation changePassword($email: String!, $password: String!, $resetToken: String!) {
        changePassword(email: $email, password: $password, resetToken: $resetToken) {
            ... on BaseError {
                message
            }
        }
    }
`;
