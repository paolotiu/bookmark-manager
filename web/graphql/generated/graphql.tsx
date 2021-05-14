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

export type BookmarkResultWithInput = BaseError | Bookmark | InputValidationError;

export type Bookmarks = {
  __typename?: 'Bookmarks';
  bookmarks: Array<Maybe<Bookmark>>;
};

export type BookmarksResult = BaseError | Bookmarks;

export type CreateBookmarkInput = {
  title?: Maybe<Scalars['String']>;
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
  type: Scalars['String'];
};

export type FolderArrayResult = BaseError | Folders;

export type FolderResult = BaseError | Folder;

export type Folders = {
  __typename?: 'Folders';
  folders: Array<Maybe<Folder>>;
};

export type InputValidationError = {
  __typename?: 'InputValidationError';
  path: Scalars['String'];
  errors: Array<Maybe<BaseError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** true => success | false => fail */
  register: UserResult;
  /** Returns null if login failed */
  login: UserResult;
  invalidateTokens: Scalars['Boolean'];
  createBookmark: BookmarkResultWithInput;
  updateBookmark: BookmarkResultWithInput;
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
  bookmarks: BookmarksResult;
  folder: FolderResult;
  getTree: TreeResult;
  q?: Maybe<Folder>;
  me?: Maybe<UserResult>;
  ping: Scalars['String'];
};


export type QueryBookmarkArgs = {
  id: Scalars['Int'];
  deleted?: Maybe<Scalars['Boolean']>;
};


export type QueryBookmarksArgs = {
  deleted?: Maybe<Scalars['Boolean']>;
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

export type CreateBookmarkMutationVariables = Exact<{
  url: Scalars['String'];
  folderId?: Maybe<Scalars['Int']>;
}>;


export type CreateBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { createBookmark: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  ) | (
    { __typename?: 'InputValidationError' }
    & ValidationErrorFragment
  ) }
);

export type SoftDeleteBookmarkMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SoftDeleteBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { softDeleteBookmark: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  ) }
);

export type HardDeleteBookmarkMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HardDeleteBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { hardDeleteBookmark: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  ) }
);

export type DeletedBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type DeletedBookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Bookmarks' }
    & BookmarksFragment
  ) }
);

export type FolderBookmarksQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FolderBookmarksQuery = (
  { __typename?: 'Query' }
  & { folder: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Folder' }
    & FolderBookmarksFragment
  ) }
);

export type FolderQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FolderQuery = (
  { __typename?: 'Query' }
  & { folder: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Folder' }
    & FolderFragment
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

export type BookmarkFragment = (
  { __typename?: 'Bookmark' }
  & Pick<Bookmark, 'id' | 'title' | 'url' | 'description' | 'createdDate' | 'folderId'>
);

export type BookmarksFragment = (
  { __typename?: 'Bookmarks' }
  & { bookmarks: Array<Maybe<(
    { __typename?: 'Bookmark' }
    & Pick<Bookmark, 'id' | 'title' | 'url' | 'description' | 'createdDate' | 'folderId'>
  )>> }
);

export type TreeFragment = (
  { __typename?: 'Tree' }
  & Pick<Tree, 'tree'>
);

export type FoldersArrayFragment = (
  { __typename?: 'Folders' }
  & { folders: Array<Maybe<(
    { __typename?: 'Folder' }
    & Pick<Folder, 'id'>
  )>> }
);

export type FolderFragment = (
  { __typename?: 'Folder' }
  & Pick<Folder, 'id' | 'name'>
  & { children: Array<Maybe<(
    { __typename?: 'Folder' }
    & Pick<Folder, 'id' | 'name'>
  )>>, bookmarks: Array<Maybe<(
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  )>> }
);

export type FolderBookmarksFragment = (
  { __typename?: 'Folder' }
  & { bookmarks: Array<Maybe<(
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  )>> }
);

export type BaseErrorFragment = (
  { __typename?: 'BaseError' }
  & Pick<BaseError, 'path' | 'message'>
);

export type ValidationErrorFragment = (
  { __typename?: 'InputValidationError' }
  & Pick<InputValidationError, 'path'>
  & { errors: Array<Maybe<(
    { __typename?: 'BaseError' }
    & Pick<BaseError, 'message' | 'path'>
  )>> }
);

export const BookmarksFragmentDoc = gql`
    fragment Bookmarks on Bookmarks {
  bookmarks {
    id
    title
    url
    description
    createdDate
    folderId
  }
}
    `;
export const TreeFragmentDoc = gql`
    fragment Tree on Tree {
  tree
}
    `;
export const FoldersArrayFragmentDoc = gql`
    fragment FoldersArray on Folders {
  folders {
    id
  }
}
    `;
export const BookmarkFragmentDoc = gql`
    fragment Bookmark on Bookmark {
  id
  title
  url
  description
  createdDate
  folderId
}
    `;
export const FolderFragmentDoc = gql`
    fragment Folder on Folder {
  id
  name
  children {
    id
    name
  }
  bookmarks {
    ...Bookmark
  }
}
    ${BookmarkFragmentDoc}`;
export const FolderBookmarksFragmentDoc = gql`
    fragment FolderBookmarks on Folder {
  bookmarks {
    ...Bookmark
  }
}
    ${BookmarkFragmentDoc}`;
export const BaseErrorFragmentDoc = gql`
    fragment BaseError on BaseError {
  path
  message
}
    `;
export const ValidationErrorFragmentDoc = gql`
    fragment ValidationError on InputValidationError {
  path
  errors {
    message
    path
  }
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
export const CreateBookmarkDocument = gql`
    mutation createBookmark($url: String!, $folderId: Int) {
  createBookmark(data: {url: $url, folderId: $folderId}) {
    ...Bookmark
    ...BaseError
    ...ValidationError
  }
}
    ${BookmarkFragmentDoc}
${BaseErrorFragmentDoc}
${ValidationErrorFragmentDoc}`;
export type CreateBookmarkMutationFn = Apollo.MutationFunction<CreateBookmarkMutation, CreateBookmarkMutationVariables>;

/**
 * __useCreateBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutation, { data, loading, error }] = useCreateBookmarkMutation({
 *   variables: {
 *      url: // value for 'url'
 *      folderId: // value for 'folderId'
 *   },
 * });
 */
export function useCreateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookmarkMutation, CreateBookmarkMutationVariables>(CreateBookmarkDocument, options);
      }
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<CreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const SoftDeleteBookmarkDocument = gql`
    mutation softDeleteBookmark($id: Int!) {
  softDeleteBookmark(id: $id) {
    ...Bookmark
    ...BaseError
  }
}
    ${BookmarkFragmentDoc}
${BaseErrorFragmentDoc}`;
export type SoftDeleteBookmarkMutationFn = Apollo.MutationFunction<SoftDeleteBookmarkMutation, SoftDeleteBookmarkMutationVariables>;

/**
 * __useSoftDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useSoftDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteBookmarkMutation, { data, loading, error }] = useSoftDeleteBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteBookmarkMutation, SoftDeleteBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteBookmarkMutation, SoftDeleteBookmarkMutationVariables>(SoftDeleteBookmarkDocument, options);
      }
export type SoftDeleteBookmarkMutationHookResult = ReturnType<typeof useSoftDeleteBookmarkMutation>;
export type SoftDeleteBookmarkMutationResult = Apollo.MutationResult<SoftDeleteBookmarkMutation>;
export type SoftDeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<SoftDeleteBookmarkMutation, SoftDeleteBookmarkMutationVariables>;
export const HardDeleteBookmarkDocument = gql`
    mutation hardDeleteBookmark($id: Int!) {
  hardDeleteBookmark(id: $id) {
    ...Bookmark
    ...BaseError
  }
}
    ${BookmarkFragmentDoc}
${BaseErrorFragmentDoc}`;
export type HardDeleteBookmarkMutationFn = Apollo.MutationFunction<HardDeleteBookmarkMutation, HardDeleteBookmarkMutationVariables>;

/**
 * __useHardDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useHardDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteBookmarkMutation, { data, loading, error }] = useHardDeleteBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteBookmarkMutation, HardDeleteBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteBookmarkMutation, HardDeleteBookmarkMutationVariables>(HardDeleteBookmarkDocument, options);
      }
export type HardDeleteBookmarkMutationHookResult = ReturnType<typeof useHardDeleteBookmarkMutation>;
export type HardDeleteBookmarkMutationResult = Apollo.MutationResult<HardDeleteBookmarkMutation>;
export type HardDeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<HardDeleteBookmarkMutation, HardDeleteBookmarkMutationVariables>;
export const DeletedBookmarksDocument = gql`
    query deletedBookmarks {
  bookmarks(deleted: true) {
    ...Bookmarks
    ...BaseError
  }
}
    ${BookmarksFragmentDoc}
${BaseErrorFragmentDoc}`;

/**
 * __useDeletedBookmarksQuery__
 *
 * To run a query within a React component, call `useDeletedBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeletedBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeletedBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<DeletedBookmarksQuery, DeletedBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeletedBookmarksQuery, DeletedBookmarksQueryVariables>(DeletedBookmarksDocument, options);
      }
export function useDeletedBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeletedBookmarksQuery, DeletedBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeletedBookmarksQuery, DeletedBookmarksQueryVariables>(DeletedBookmarksDocument, options);
        }
export type DeletedBookmarksQueryHookResult = ReturnType<typeof useDeletedBookmarksQuery>;
export type DeletedBookmarksLazyQueryHookResult = ReturnType<typeof useDeletedBookmarksLazyQuery>;
export type DeletedBookmarksQueryResult = Apollo.QueryResult<DeletedBookmarksQuery, DeletedBookmarksQueryVariables>;
export const FolderBookmarksDocument = gql`
    query folderBookmarks($id: Int!) {
  folder(id: $id) {
    ...FolderBookmarks
    ...BaseError
  }
}
    ${FolderBookmarksFragmentDoc}
${BaseErrorFragmentDoc}`;

/**
 * __useFolderBookmarksQuery__
 *
 * To run a query within a React component, call `useFolderBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFolderBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFolderBookmarksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFolderBookmarksQuery(baseOptions: Apollo.QueryHookOptions<FolderBookmarksQuery, FolderBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderBookmarksQuery, FolderBookmarksQueryVariables>(FolderBookmarksDocument, options);
      }
export function useFolderBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderBookmarksQuery, FolderBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderBookmarksQuery, FolderBookmarksQueryVariables>(FolderBookmarksDocument, options);
        }
export type FolderBookmarksQueryHookResult = ReturnType<typeof useFolderBookmarksQuery>;
export type FolderBookmarksLazyQueryHookResult = ReturnType<typeof useFolderBookmarksLazyQuery>;
export type FolderBookmarksQueryResult = Apollo.QueryResult<FolderBookmarksQuery, FolderBookmarksQueryVariables>;
export const FolderDocument = gql`
    query folder($id: Int!) {
  folder(id: $id) {
    ...Folder
    ...BaseError
  }
}
    ${FolderFragmentDoc}
${BaseErrorFragmentDoc}`;

/**
 * __useFolderQuery__
 *
 * To run a query within a React component, call `useFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFolderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFolderQuery(baseOptions: Apollo.QueryHookOptions<FolderQuery, FolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
      }
export function useFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderQuery, FolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
        }
export type FolderQueryHookResult = ReturnType<typeof useFolderQuery>;
export type FolderLazyQueryHookResult = ReturnType<typeof useFolderLazyQuery>;
export type FolderQueryResult = Apollo.QueryResult<FolderQuery, FolderQueryVariables>;
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
    "BookmarkResultWithInput": [
      "BaseError",
      "Bookmark",
      "InputValidationError"
    ],
    "BookmarksResult": [
      "BaseError",
      "Bookmarks"
    ],
    "FolderArrayResult": [
      "BaseError",
      "Folders"
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
    