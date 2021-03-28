import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type User {
        id: Int!
        email: String!
        name: String!
        bookmarks: [Bookmark]!
    }

    type Bookmark {
        id: Int!
        title: String!
        url: String!
        description: String
        categories: [Category]!
    }

    type Category {
        id: Int!
        name: String!
        bookmarks: [Bookmark]!
    }

    input CreateBookmarkInput {
        title: String!
        url: String!
        description: String
    }

    type Query {
        helloWorld: String!
        bookmark(id: Int!): Bookmark!
        me: User
    }

    type Mutation {
        register(email: String!, name: String!, password: String!): Boolean!
        login(email: String!, password: String!): User
        createBookmark(data: CreateBookmarkInput!): Bookmark
        invalidateTokens: Boolean!
    }
`;
