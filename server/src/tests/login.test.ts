/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApolloServer } from '../utils/createApolloServer';
import { createTestClient } from 'apollo-server-integration-testing';

const { query } = createTestClient({
    apolloServer: createApolloServer() as any,
});

const pingQuery = `
    query {
        ping
    }
`;
describe('Login flow', () => {
    test('Pings server', async () => {
        const res = await query<{ data: any }>(pingQuery);
        expect(res.data.ping).toBe('pong');
    });
    test('1+1 = 2', () => {
        expect(1 + 1).toBe(2);
    });
});
