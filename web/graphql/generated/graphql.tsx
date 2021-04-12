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


export type BaseError = {
  __typename?: 'BaseError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  createdDate: Scalars['Date'];
  folderId?: Maybe<Scalars['Int']>;
};

export type BookmarkResult = BaseError | Bookmark;

export type CreateBookmarkInput = {
  title: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['Int']>;
};

export type CreateFolderInput = {
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
};


export type Folder = {
  __typename?: 'Folder';
  id: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  children: Array<Maybe<Folder>>;
  bookmarks: Array<Maybe<Bookmark>>;
  depth: Scalars['Int'];
  name: Scalars['String'];
};

export type FolderResult = BaseError | Folder;

export type Mutation = {
  __typename?: 'Mutation';
  /** true => success | false => fail */
  register: UserResult;
  /** Returns null if login failed */
  login: UserResult;
  invalidateTokens: Scalars['Boolean'];
  createBookmark: BookmarkResult;
  updateBookmark: BookmarkResult;
  softDeleteBookmark: BookmarkResult;
  hardDeleteBookmark: BookmarkResult;
  createFolder: FolderResult;
  updateFolderName: FolderResult;
  softDeleteFolder: FolderResult;
  recoverFolder: FolderResult;
  moveFolder: FolderResult;
  deleteFolder: FolderResult;
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


export type MutationSoftDeleteBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationHardDeleteBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationUpdateFolderNameArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationSoftDeleteFolderArgs = {
  id: Scalars['Int'];
};


export type MutationRecoverFolderArgs = {
  id: Scalars['Int'];
};


export type MutationMoveFolderArgs = {
  folderId: Scalars['Int'];
  targetFolderId?: Maybe<Scalars['Int']>;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: BookmarkResult;
  folder: FolderResult;
  getTree: TreeResult;
  q?: Maybe<Folder>;
  me?: Maybe<UserResult>;
  ping: Scalars['String'];
};


export type QueryBookmarkArgs = {
  id: Scalars['Int'];
};


export type QueryFolderArgs = {
  id: Scalars['Int'];
};

export type Tree = {
  __typename?: 'Tree';
  tree?: Maybe<Scalars['String']>;
};

export type TreeResult = BaseError | Tree;

export type UpdateBookmarkInput = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['Int']>;
};

/** User */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  bookmarks: Array<Maybe<Bookmark>>;
  folders: Array<Maybe<Folder>>;
};

export type UserResult = BaseError | User;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type Tree_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Tree_QueryQuery = (
  { __typename?: 'Query' }
  & { getTree: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Tree' }
    & TreeFragment
  ) }
);

export type TreeFragment = (
  { __typename?: 'Tree' }
  & Pick<Tree, 'tree'>
);

export type BaseErrorFragment = (
  { __typename?: 'BaseError' }
  & Pick<BaseError, 'path' | 'message'>
);

export const TreeFragmentDoc = gql`
    fragment Tree on Tree {
  tree
}
    `;
export const BaseErrorFragmentDoc = gql`
    fragment BaseError on BaseError {
  path
  message
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on User {
      __typename
      id
    }
    ...BaseError
  }
}
    ${BaseErrorFragmentDoc}`;
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
export const Tree_QueryDocument = gql`
    query TREE_QUERY {
  getTree {
    ...Tree
    ...BaseError
  }
}
    ${TreeFragmentDoc}
${BaseErrorFragmentDoc}`;

/**
 * __useTree_QueryQuery__
 *
 * To run a query within a React component, call `useTree_QueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTree_QueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTree_QueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTree_QueryQuery(baseOptions?: Apollo.QueryHookOptions<Tree_QueryQuery, Tree_QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Tree_QueryQuery, Tree_QueryQueryVariables>(Tree_QueryDocument, options);
      }
export function useTree_QueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Tree_QueryQuery, Tree_QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Tree_QueryQuery, Tree_QueryQueryVariables>(Tree_QueryDocument, options);
        }
export type Tree_QueryQueryHookResult = ReturnType<typeof useTree_QueryQuery>;
export type Tree_QueryLazyQueryHookResult = ReturnType<typeof useTree_QueryLazyQuery>;
export type Tree_QueryQueryResult = Apollo.QueryResult<Tree_QueryQuery, Tree_QueryQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BookmarkResult": [
      "BaseError",
      "Bookmark"
    ],
    "FolderResult": [
      "BaseError",
      "Folder"
    ],
    "TreeResult": [
      "BaseError",
      "Tree"
    ],
    "UserResult": [
      "BaseError",
      "User"
    ]
  }
};
      export default result;
    