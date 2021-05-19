/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApolloTestClient } from '@lib/server/createApolloTestClient';
import { gql } from 'apollo-server-express';

// Get test client
const testClient = createApolloTestClient();
const { mutate } = testClient;

const REGISTER_MUTATION = gql`
    mutation REGISTER_MUTATION($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            ... on User {
                email
                name
            }

            ... on BaseError {
                path
                message
            }
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on User {
                email
                name
            }

            ... on BaseError {
                path
                message
            }
        }
    }
`;

const registerMutation = (variables: any) => mutate<{ data: { register: any } }>(REGISTER_MUTATION, { variables });
const loginMutation = (variables: any) => mutate<{ data: { login: any } }>(LOGIN_MUTATION, { variables });

describe('Happy Path', () => {
    const testUser = { name: 'bob', email: 'bob@bob.com', password: 'password' };

    test('Register User', async () => {
        const res = await registerMutation(testUser);
        expect(res.data.register).toEqual({ name: testUser.name, email: testUser.email });
    });

    test('Login user', async () => {
        const res = await loginMutation(testUser);

        expect(res.data.login).toEqual({ email: testUser.email, name: testUser.name });
    });
});

describe('Catches errors', () => {
    const testUser = { name: 'badBob', email: 'bob@bob.com', password: 'password' };

    test('Rejects duplciate email', async () => {
        const res = (await registerMutation(testUser)) as any;
        expect(res.data.register).toEqual({
            path: 'register',
            message: 'A user with that email already exists',
        });
    });

    test('Rejects invalid email', async () => {
        // Mutate testUser
        testUser.email = 'notanemail.com';

        const res = (await registerMutation(testUser)) as any;
        expect(res.data.register).toEqual({
            path: 'register',
            message: 'The email is invalid',
        });
    });

    test('Rejects short password', async () => {
        // Mutate password property
        testUser.password = 's';
        const res = (await registerMutation(testUser)) as any;
        expect(res.data.register).toEqual({
            path: 'register',
            message: 'The password is too short - Minimum of 8 characters required',
        });
    });
});
