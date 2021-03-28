import { gql } from 'apollo-server-core';

export const typeDefs = gql`
    type User {
        id: Int!
        email: String!
        bookmarks: [Bookmark]!
    }

    type Bookmark {
        id: Int!
        title: String!
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
    }

    type Mutation {
        signUp(email: String!, name: String!): User!
        createBookmark(data: CreateBookmarkInput!): Bookmark!
    }
`;
