/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTestClient, TestQuery, TestSetOptions } from 'apollo-server-integration-testing';
import { createApolloServer } from './createApolloServer';

type ApolloTestClient = {
    query: TestQuery;
    mutate: TestQuery;
    setOptions: TestSetOptions;
};
export const createApolloTestClient = (): ApolloTestClient => {
    return createTestClient({ apolloServer: createApolloServer() as any });
};
