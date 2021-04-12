import { gql } from '@apollo/client';
import { ErrorFragments } from '@graphql/fragments';

export const LOGIN_MUTATION = gql`
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
