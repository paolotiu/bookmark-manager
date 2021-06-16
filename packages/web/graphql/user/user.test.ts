/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@entity/User';
import { createApolloTestClient } from '@lib/server/createApolloTestClient';
import { gql } from 'apollo-server-micro';

const testUser = { email: 'bob@2bob.com', password: 'password', name: 'bob', id: 0 };
const testClient = createApolloTestClient();
const { query } = testClient;

beforeAll(async () => {
    // Setup user
    const user = await User.create(testUser).save();
    testUser.id = user.id;
    testClient.setOptions({
        request: {
            userId: user.id,
        },
    });
});

const ME_QUERY = gql`
    query ME_QUERY {
        me {
            ... on BaseError {
                path
                message
            }

            ... on User {
                id
                name
                email
            }
        }
    }
`;

const meQuery = () => query<{ data: { me: any } }>(ME_QUERY);

test('test', async () => {
    const res = await meQuery();
    expect(res.data.me).toEqual({ email: testUser.email, id: testUser.id.toString(), name: testUser.name });
});
