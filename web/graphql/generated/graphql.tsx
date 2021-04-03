import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date */
  Date: any;
};

export type AddBookmarkToCategoriesInput = {
  bookmarkId: Scalars['Int'];
  /** Category id */
  categoryId: Scalars['Int'];
};

export type AddBookmarkToCategoriesResult = BaseError | Bookmark;

export type BaseError = {
  __typename?: 'BaseError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  createdDate: Scalars['Date'];
};

export type BookmarkResult = BaseError | Bookmark;

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  bookmarks: Array<Maybe<Bookmark>>;
};

export type CreateBookmarkInput = {
  title: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type CreateBookmarkResult = BaseError | Bookmark;

export type CreateCategoryInput = {
  name: Scalars['String'];
  bookmarks?: Maybe<Array<Scalars['Int']>>;
};

export type CreateCategoryResult = BaseError | Category;


export type DeleteCategoryResult = BaseError | NoErrorCategoryDeletion;

export type Mutation = {
  __typename?: 'Mutation';
  /** true => success | false => fail */
  register: Scalars['Boolean'];
  /** Returns null if login failed */
  login?: Maybe<UserResult>;
  invalidateTokens: Scalars['Boolean'];
  /** Returns null if bookmark wasn't created */
  createBookmark: CreateBookmarkResult;
  updateBookmark: UpdateBookmarkResult;
  addBookmarkToCategories: AddBookmarkToCategoriesResult;
  createCategory: CreateCategoryResult;
  /** Pass in category id */
  deleteCategory: DeleteCategoryResult;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateBookmarkArgs = {
  data: CreateBookmarkInput;
};


export type MutationUpdateBookmarkArgs = {
  data: UpdateBookmarkInput;
};


export type MutationAddBookmarkToCategoriesArgs = {
  data: AddBookmarkToCategoriesInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};

export type NoErrorCategoryDeletion = {
  __typename?: 'NoErrorCategoryDeletion';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: BookmarkResult;
  me?: Maybe<User>;
  ping: Scalars['String'];
};


export type QueryBookmarkArgs = {
  id: Scalars['Int'];
};

export type UpdateBookmarkInput = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Int']>;
};

export type UpdateBookmarkResult = BaseError | Bookmark;

/** User */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  bookmarks: Array<Maybe<Bookmark>>;
  categories: Array<Maybe<Category>>;
};

export type UserResult = BaseError | User;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'BaseError' }
    & Pick<BaseError, 'path' | 'message'>
  ) | (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on User {
      id
    }
    ... on BaseError {
      path
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AddBookmarkToCategoriesResult": [
      "BaseError",
      "Bookmark"
    ],
    "BookmarkResult": [
      "BaseError",
      "Bookmark"
    ],
    "CreateBookmarkResult": [
      "BaseError",
      "Bookmark"
    ],
    "CreateCategoryResult": [
      "BaseError",
      "Category"
    ],
    "DeleteCategoryResult": [
      "BaseError",
      "NoErrorCategoryDeletion"
    ],
    "UpdateBookmarkResult": [
      "BaseError",
      "Bookmark"
    ],
    "UserResult": [
      "BaseError",
      "User"
    ]
  }
};
      export default result;
    