import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel } from '../../entity/User';
import { BookmarkModel } from '../../entity/Bookmark';
import { FolderModel } from '../../entity/Folder';
import { MyContext } from '../contextType';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Upload: any;
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
  updatedDate?: Maybe<Scalars['Date']>;
  folderId?: Maybe<Scalars['Int']>;
};

export type BookmarkResult = BaseError | Bookmark;

export type BookmarkResultWithInput = BaseError | Bookmark | InputValidationError;

export type Bookmarks = {
  __typename?: 'Bookmarks';
  bookmarks: Array<Maybe<Bookmark>>;
};

export type BookmarksResult = BaseError | Bookmarks;

export type BooleanOrError = BaseError | Success;

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

export type CreateFolderWithBookmarksInput = {
  folderName: Scalars['String'];
  bookmarks: Array<CreateBookmarkInput>;
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
  isOpen: Scalars['Boolean'];
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
  changeFolderOrder: Scalars['Boolean'];
  createBookmark: BookmarkResultWithInput;
  createFolder: FolderResult;
  createFolderWithBookmarks?: Maybe<Scalars['Boolean']>;
  deleteFolder: FolderResult;
  hardDeleteBookmark: BookmarkResult;
  hardDeleteBookmarks: BookmarksResult;
  invalidateTokens: Scalars['Boolean'];
  /** Returns null if login failed */
  login: UserResult;
  logout: Scalars['Boolean'];
  moveFolder: FolderResult;
  recoverFolder: FolderResult;
  /** true => success | false => fail */
  register: UserResult;
  resetPassword: BooleanOrError;
  sendForgotPassword: Scalars['Boolean'];
  softDeleteBookmark: BookmarkResult;
  softDeleteBookmarks: BookmarksResult;
  softDeleteFolder: FolderResult;
  updateBookmark: BookmarkResultWithInput;
  updateFolder: FolderResult;
  updateFolderName: FolderResult;
};


export type MutationChangeFolderOrderArgs = {
  id: Scalars['Int'];
  order: Array<Scalars['Int']>;
};


export type MutationCreateBookmarkArgs = {
  data: CreateBookmarkInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationCreateFolderWithBookmarksArgs = {
  data: CreateFolderWithBookmarksInput;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['Int'];
};


export type MutationHardDeleteBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationHardDeleteBookmarksArgs = {
  ids: Array<Maybe<Scalars['Int']>>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMoveFolderArgs = {
  folderId: Scalars['Int'];
  targetFolderId?: Maybe<Scalars['Int']>;
};


export type MutationRecoverFolderArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  resetToken: Scalars['String'];
};


export type MutationSendForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSoftDeleteBookmarkArgs = {
  id: Scalars['Int'];
};


export type MutationSoftDeleteBookmarksArgs = {
  ids: Array<Maybe<Scalars['Int']>>;
};


export type MutationSoftDeleteFolderArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBookmarkArgs = {
  data: UpdateBookmarkInput;
};


export type MutationUpdateFolderArgs = {
  data: UpdateFolderInput;
};


export type MutationUpdateFolderNameArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: BookmarkResult;
  bookmarks: BookmarksResult;
  folder: FolderResult;
  getTree: TreeResult;
  me?: Maybe<UserResult>;
  ping: Scalars['String'];
  q?: Maybe<Folder>;
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

export type Success = {
  __typename?: 'Success';
  success?: Maybe<Scalars['Boolean']>;
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
  restore?: Maybe<Scalars['Boolean']>;
};

export type UpdateFolderInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  isOpen?: Maybe<Scalars['Boolean']>;
};


/** User */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  bookmarks: Array<Bookmark>;
  folders: Array<Folder>;
};

export type UserResult = BaseError | User;

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'BaseError' }
    & Pick<BaseError, 'message'>
  ) | { __typename?: 'User' } }
);

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

export type RequestForgotMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestForgotMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendForgotPassword'>
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

export type HardDeleteBookmarksMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type HardDeleteBookmarksMutation = (
  { __typename?: 'Mutation' }
  & { hardDeleteBookmarks: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Bookmarks' }
    & BookmarksFragment
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

export type MoveBookmarkMutationVariables = Exact<{
  id: Scalars['Int'];
  folderId: Scalars['Int'];
}>;


export type MoveBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { updateBookmark: { __typename?: 'BaseError' } | (
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  ) | { __typename?: 'InputValidationError' } }
);

export type AllBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBookmarksQuery = (
  { __typename?: 'Query' }
  & { bookmarks: { __typename?: 'BaseError' } | (
    { __typename?: 'Bookmarks' }
    & BookmarksFragment
  ) }
);

export type UpdateBookmarkMutationVariables = Exact<{
  data: UpdateBookmarkInput;
}>;


export type UpdateBookmarkMutation = (
  { __typename?: 'Mutation' }
  & { updateBookmark: { __typename?: 'BaseError' } | (
    { __typename?: 'Bookmark' }
    & BookmarkFragment
  ) | { __typename?: 'InputValidationError' } }
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

export type CreateFolderMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateFolderMutation = (
  { __typename?: 'Mutation' }
  & { createFolder: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | (
    { __typename?: 'Folder' }
    & FolderFragment
  ) }
);

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteFolderMutation = (
  { __typename?: 'Mutation' }
  & { deleteFolder: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | { __typename?: 'Folder' } }
);

export type MoveFolderMutationVariables = Exact<{
  targetId: Scalars['Int'];
  folderId: Scalars['Int'];
  targetFolderOrder: Array<Scalars['Int']> | Scalars['Int'];
  sourceFolderOrder: Array<Scalars['Int']> | Scalars['Int'];
  targetParentId: Scalars['Int'];
  sourceParentId: Scalars['Int'];
}>;


export type MoveFolderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeFolderOrder'>
  & { targetChangeOrder: Mutation['changeFolderOrder'] }
  & { moveFolder: (
    { __typename?: 'BaseError' }
    & BaseErrorFragment
  ) | { __typename?: 'Folder' } }
);

export type ChangeFolderOrderMutationVariables = Exact<{
  targetFolderOrder: Array<Scalars['Int']> | Scalars['Int'];
  sourceFolderOrder: Array<Scalars['Int']> | Scalars['Int'];
  targetParentId: Scalars['Int'];
  sourceParentId: Scalars['Int'];
}>;


export type ChangeFolderOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeFolderOrder'>
  & { targetChangeOrder: Mutation['changeFolderOrder'] }
);

export type CreateFolderWithBookmarksMutationVariables = Exact<{
  folderName: Scalars['String'];
  bookmarks: Array<CreateBookmarkInput> | CreateBookmarkInput;
}>;


export type CreateFolderWithBookmarksMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createFolderWithBookmarks'>
);

export type UpdateFolderMutationVariables = Exact<{
  data: UpdateFolderInput;
}>;


export type UpdateFolderMutation = (
  { __typename?: 'Mutation' }
  & { updateFolder: { __typename?: 'BaseError' } | (
    { __typename?: 'Folder' }
    & Pick<Folder, 'id' | 'name'>
  ) }
);

export type AllFolderNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFolderNamesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<{ __typename?: 'BaseError' } | (
    { __typename?: 'User' }
    & { folders: Array<(
      { __typename?: 'Folder' }
      & Pick<Folder, 'id' | 'name'>
    )> }
  )> }
);

export type GetTreeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTreeQuery = (
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
  & Pick<Folder, 'id' | 'name' | 'isOpen'>
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

export type UserNameQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNameQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<{ __typename?: 'BaseError' } | (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BaseError: ResolverTypeWrapper<BaseError>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Bookmark: ResolverTypeWrapper<BookmarkModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BookmarkResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  BookmarkResultWithInput: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'] | ResolversTypes['InputValidationError'];
  Bookmarks: ResolverTypeWrapper<Omit<Bookmarks, 'bookmarks'> & { bookmarks: Array<Maybe<ResolversTypes['Bookmark']>> }>;
  BookmarksResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmarks'];
  BooleanOrError: ResolversTypes['BaseError'] | ResolversTypes['Success'];
  CreateBookmarkInput: CreateBookmarkInput;
  CreateFolderInput: CreateFolderInput;
  CreateFolderWithBookmarksInput: CreateFolderWithBookmarksInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Folder: ResolverTypeWrapper<FolderModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FolderArrayResult: ResolversTypes['BaseError'] | ResolversTypes['Folders'];
  FolderResult: ResolversTypes['BaseError'] | ResolversTypes['Folder'];
  Folders: ResolverTypeWrapper<Omit<Folders, 'folders'> & { folders: Array<Maybe<ResolversTypes['Folder']>> }>;
  InputValidationError: ResolverTypeWrapper<InputValidationError>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Success: ResolverTypeWrapper<Success>;
  Tree: ResolverTypeWrapper<Tree>;
  TreeResult: ResolversTypes['BaseError'] | ResolversTypes['Tree'];
  UpdateBookmarkInput: UpdateBookmarkInput;
  UpdateFolderInput: UpdateFolderInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<UserModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UserResult: ResolversTypes['BaseError'] | ResolversTypes['User'];
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BaseError: BaseError;
  String: Scalars['String'];
  Bookmark: BookmarkModel;
  Int: Scalars['Int'];
  BookmarkResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  BookmarkResultWithInput: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'] | ResolversParentTypes['InputValidationError'];
  Bookmarks: Omit<Bookmarks, 'bookmarks'> & { bookmarks: Array<Maybe<ResolversParentTypes['Bookmark']>> };
  BookmarksResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmarks'];
  BooleanOrError: ResolversParentTypes['BaseError'] | ResolversParentTypes['Success'];
  CreateBookmarkInput: CreateBookmarkInput;
  CreateFolderInput: CreateFolderInput;
  CreateFolderWithBookmarksInput: CreateFolderWithBookmarksInput;
  Date: Scalars['Date'];
  Folder: FolderModel;
  Boolean: Scalars['Boolean'];
  FolderArrayResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Folders'];
  FolderResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Folder'];
  Folders: Omit<Folders, 'folders'> & { folders: Array<Maybe<ResolversParentTypes['Folder']>> };
  InputValidationError: InputValidationError;
  Mutation: {};
  Query: {};
  Success: Success;
  Tree: Tree;
  TreeResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Tree'];
  UpdateBookmarkInput: UpdateBookmarkInput;
  UpdateFolderInput: UpdateFolderInput;
  Upload: Scalars['Upload'];
  User: UserModel;
  ID: Scalars['ID'];
  UserResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['User'];
}>;

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = MyContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BaseErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BaseError'] = ResolversParentTypes['BaseError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookmarkResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  folderId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookmarkResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BookmarkResult'] = ResolversParentTypes['BookmarkResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark', ParentType, ContextType>;
}>;

export type BookmarkResultWithInputResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BookmarkResultWithInput'] = ResolversParentTypes['BookmarkResultWithInput']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark' | 'InputValidationError', ParentType, ContextType>;
}>;

export type BookmarksResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Bookmarks'] = ResolversParentTypes['Bookmarks']> = ResolversObject<{
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookmarksResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BookmarksResult'] = ResolversParentTypes['BookmarksResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmarks', ParentType, ContextType>;
}>;

export type BooleanOrErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BooleanOrError'] = ResolversParentTypes['BooleanOrError']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Success', ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FolderResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  children?: Resolver<Array<Maybe<ResolversTypes['Folder']>>, ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  depth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FolderArrayResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FolderArrayResult'] = ResolversParentTypes['FolderArrayResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Folders', ParentType, ContextType>;
}>;

export type FolderResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FolderResult'] = ResolversParentTypes['FolderResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Folder', ParentType, ContextType>;
}>;

export type FoldersResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Folders'] = ResolversParentTypes['Folders']> = ResolversObject<{
  folders?: Resolver<Array<Maybe<ResolversTypes['Folder']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InputValidationErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['InputValidationError'] = ResolversParentTypes['InputValidationError']> = ResolversObject<{
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  errors?: Resolver<Array<Maybe<ResolversTypes['BaseError']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changeFolderOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeFolderOrderArgs, 'id' | 'order'>>;
  createBookmark?: Resolver<ResolversTypes['BookmarkResultWithInput'], ParentType, ContextType, RequireFields<MutationCreateBookmarkArgs, 'data'>>;
  createFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationCreateFolderArgs, 'data'>>;
  createFolderWithBookmarks?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateFolderWithBookmarksArgs, 'data'>>;
  deleteFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationDeleteFolderArgs, 'id'>>;
  hardDeleteBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationHardDeleteBookmarkArgs, 'id'>>;
  hardDeleteBookmarks?: Resolver<ResolversTypes['BookmarksResult'], ParentType, ContextType, RequireFields<MutationHardDeleteBookmarksArgs, 'ids'>>;
  invalidateTokens?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  moveFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationMoveFolderArgs, 'folderId'>>;
  recoverFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationRecoverFolderArgs, 'id'>>;
  register?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
  resetPassword?: Resolver<ResolversTypes['BooleanOrError'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email' | 'password' | 'resetToken'>>;
  sendForgotPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendForgotPasswordArgs, 'email'>>;
  softDeleteBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteBookmarkArgs, 'id'>>;
  softDeleteBookmarks?: Resolver<ResolversTypes['BookmarksResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteBookmarksArgs, 'ids'>>;
  softDeleteFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteFolderArgs, 'id'>>;
  updateBookmark?: Resolver<ResolversTypes['BookmarkResultWithInput'], ParentType, ContextType, RequireFields<MutationUpdateBookmarkArgs, 'data'>>;
  updateFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationUpdateFolderArgs, 'data'>>;
  updateFolderName?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationUpdateFolderNameArgs, 'id' | 'name'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<QueryBookmarkArgs, 'id'>>;
  bookmarks?: Resolver<ResolversTypes['BookmarksResult'], ParentType, ContextType, RequireFields<QueryBookmarksArgs, never>>;
  folder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<QueryFolderArgs, 'id'>>;
  getTree?: Resolver<ResolversTypes['TreeResult'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  q?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
}>;

export type SuccessResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TreeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Tree'] = ResolversParentTypes['Tree']> = ResolversObject<{
  tree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TreeResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TreeResult'] = ResolversParentTypes['TreeResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Tree', ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<ResolversTypes['Bookmark']>, ParentType, ContextType>;
  folders?: Resolver<Array<ResolversTypes['Folder']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'User', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  BaseError?: BaseErrorResolvers<ContextType>;
  Bookmark?: BookmarkResolvers<ContextType>;
  BookmarkResult?: BookmarkResultResolvers<ContextType>;
  BookmarkResultWithInput?: BookmarkResultWithInputResolvers<ContextType>;
  Bookmarks?: BookmarksResolvers<ContextType>;
  BookmarksResult?: BookmarksResultResolvers<ContextType>;
  BooleanOrError?: BooleanOrErrorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Folder?: FolderResolvers<ContextType>;
  FolderArrayResult?: FolderArrayResultResolvers<ContextType>;
  FolderResult?: FolderResultResolvers<ContextType>;
  Folders?: FoldersResolvers<ContextType>;
  InputValidationError?: InputValidationErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  Tree?: TreeResolvers<ContextType>;
  TreeResult?: TreeResultResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = MyContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = MyContext> = DirectiveResolvers<ContextType>;
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
  isOpen
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
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!, $name: String!) {
  register(email: $email, password: $password, name: $name) {
    ... on BaseError {
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export const RequestForgotDocument = gql`
    mutation requestForgot($email: String!) {
  sendForgotPassword(email: $email)
}
    `;
export type RequestForgotMutationFn = Apollo.MutationFunction<RequestForgotMutation, RequestForgotMutationVariables>;

/**
 * __useRequestForgotMutation__
 *
 * To run a mutation, you first call `useRequestForgotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestForgotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestForgotMutation, { data, loading, error }] = useRequestForgotMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestForgotMutation(baseOptions?: Apollo.MutationHookOptions<RequestForgotMutation, RequestForgotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestForgotMutation, RequestForgotMutationVariables>(RequestForgotDocument, options);
      }
export type RequestForgotMutationHookResult = ReturnType<typeof useRequestForgotMutation>;
export type RequestForgotMutationResult = Apollo.MutationResult<RequestForgotMutation>;
export type RequestForgotMutationOptions = Apollo.BaseMutationOptions<RequestForgotMutation, RequestForgotMutationVariables>;
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
export const HardDeleteBookmarksDocument = gql`
    mutation hardDeleteBookmarks($ids: [Int!]!) {
  hardDeleteBookmarks(ids: $ids) {
    ...Bookmarks
    ...BaseError
  }
}
    ${BookmarksFragmentDoc}
${BaseErrorFragmentDoc}`;
export type HardDeleteBookmarksMutationFn = Apollo.MutationFunction<HardDeleteBookmarksMutation, HardDeleteBookmarksMutationVariables>;

/**
 * __useHardDeleteBookmarksMutation__
 *
 * To run a mutation, you first call `useHardDeleteBookmarksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteBookmarksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteBookmarksMutation, { data, loading, error }] = useHardDeleteBookmarksMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useHardDeleteBookmarksMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteBookmarksMutation, HardDeleteBookmarksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteBookmarksMutation, HardDeleteBookmarksMutationVariables>(HardDeleteBookmarksDocument, options);
      }
export type HardDeleteBookmarksMutationHookResult = ReturnType<typeof useHardDeleteBookmarksMutation>;
export type HardDeleteBookmarksMutationResult = Apollo.MutationResult<HardDeleteBookmarksMutation>;
export type HardDeleteBookmarksMutationOptions = Apollo.BaseMutationOptions<HardDeleteBookmarksMutation, HardDeleteBookmarksMutationVariables>;
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
export const MoveBookmarkDocument = gql`
    mutation moveBookmark($id: Int!, $folderId: Int!) {
  updateBookmark(data: {id: $id, folderId: $folderId}) {
    ...Bookmark
  }
}
    ${BookmarkFragmentDoc}`;
export type MoveBookmarkMutationFn = Apollo.MutationFunction<MoveBookmarkMutation, MoveBookmarkMutationVariables>;

/**
 * __useMoveBookmarkMutation__
 *
 * To run a mutation, you first call `useMoveBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveBookmarkMutation, { data, loading, error }] = useMoveBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      folderId: // value for 'folderId'
 *   },
 * });
 */
export function useMoveBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<MoveBookmarkMutation, MoveBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveBookmarkMutation, MoveBookmarkMutationVariables>(MoveBookmarkDocument, options);
      }
export type MoveBookmarkMutationHookResult = ReturnType<typeof useMoveBookmarkMutation>;
export type MoveBookmarkMutationResult = Apollo.MutationResult<MoveBookmarkMutation>;
export type MoveBookmarkMutationOptions = Apollo.BaseMutationOptions<MoveBookmarkMutation, MoveBookmarkMutationVariables>;
export const AllBookmarksDocument = gql`
    query allBookmarks {
  bookmarks(deleted: false) {
    ...Bookmarks
  }
}
    ${BookmarksFragmentDoc}`;

/**
 * __useAllBookmarksQuery__
 *
 * To run a query within a React component, call `useAllBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<AllBookmarksQuery, AllBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBookmarksQuery, AllBookmarksQueryVariables>(AllBookmarksDocument, options);
      }
export function useAllBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBookmarksQuery, AllBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBookmarksQuery, AllBookmarksQueryVariables>(AllBookmarksDocument, options);
        }
export type AllBookmarksQueryHookResult = ReturnType<typeof useAllBookmarksQuery>;
export type AllBookmarksLazyQueryHookResult = ReturnType<typeof useAllBookmarksLazyQuery>;
export type AllBookmarksQueryResult = Apollo.QueryResult<AllBookmarksQuery, AllBookmarksQueryVariables>;
export const UpdateBookmarkDocument = gql`
    mutation updateBookmark($data: UpdateBookmarkInput!) {
  updateBookmark(data: $data) {
    ...Bookmark
  }
}
    ${BookmarkFragmentDoc}`;
export type UpdateBookmarkMutationFn = Apollo.MutationFunction<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;

/**
 * __useUpdateBookmarkMutation__
 *
 * To run a mutation, you first call `useUpdateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookmarkMutation, { data, loading, error }] = useUpdateBookmarkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>(UpdateBookmarkDocument, options);
      }
export type UpdateBookmarkMutationHookResult = ReturnType<typeof useUpdateBookmarkMutation>;
export type UpdateBookmarkMutationResult = Apollo.MutationResult<UpdateBookmarkMutation>;
export type UpdateBookmarkMutationOptions = Apollo.BaseMutationOptions<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
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
export const CreateFolderDocument = gql`
    mutation createFolder($name: String!) {
  createFolder(data: {name: $name}) {
    ...Folder
    ...BaseError
  }
}
    ${FolderFragmentDoc}
${BaseErrorFragmentDoc}`;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const DeleteFolderDocument = gql`
    mutation deleteFolder($id: Int!) {
  deleteFolder(id: $id) {
    ...BaseError
  }
}
    ${BaseErrorFragmentDoc}`;
export type DeleteFolderMutationFn = Apollo.MutationFunction<DeleteFolderMutation, DeleteFolderMutationVariables>;

/**
 * __useDeleteFolderMutation__
 *
 * To run a mutation, you first call `useDeleteFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFolderMutation, { data, loading, error }] = useDeleteFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFolderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFolderMutation, DeleteFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument, options);
      }
export type DeleteFolderMutationHookResult = ReturnType<typeof useDeleteFolderMutation>;
export type DeleteFolderMutationResult = Apollo.MutationResult<DeleteFolderMutation>;
export type DeleteFolderMutationOptions = Apollo.BaseMutationOptions<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const MoveFolderDocument = gql`
    mutation moveFolder($targetId: Int!, $folderId: Int!, $targetFolderOrder: [Int!]!, $sourceFolderOrder: [Int!]!, $targetParentId: Int!, $sourceParentId: Int!) {
  moveFolder(targetFolderId: $targetId, folderId: $folderId) {
    ...BaseError
  }
  changeFolderOrder(id: $sourceParentId, order: $sourceFolderOrder)
  targetChangeOrder: changeFolderOrder(
    id: $targetParentId
    order: $targetFolderOrder
  )
}
    ${BaseErrorFragmentDoc}`;
export type MoveFolderMutationFn = Apollo.MutationFunction<MoveFolderMutation, MoveFolderMutationVariables>;

/**
 * __useMoveFolderMutation__
 *
 * To run a mutation, you first call `useMoveFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFolderMutation, { data, loading, error }] = useMoveFolderMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      folderId: // value for 'folderId'
 *      targetFolderOrder: // value for 'targetFolderOrder'
 *      sourceFolderOrder: // value for 'sourceFolderOrder'
 *      targetParentId: // value for 'targetParentId'
 *      sourceParentId: // value for 'sourceParentId'
 *   },
 * });
 */
export function useMoveFolderMutation(baseOptions?: Apollo.MutationHookOptions<MoveFolderMutation, MoveFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveFolderMutation, MoveFolderMutationVariables>(MoveFolderDocument, options);
      }
export type MoveFolderMutationHookResult = ReturnType<typeof useMoveFolderMutation>;
export type MoveFolderMutationResult = Apollo.MutationResult<MoveFolderMutation>;
export type MoveFolderMutationOptions = Apollo.BaseMutationOptions<MoveFolderMutation, MoveFolderMutationVariables>;
export const ChangeFolderOrderDocument = gql`
    mutation changeFolderOrder($targetFolderOrder: [Int!]!, $sourceFolderOrder: [Int!]!, $targetParentId: Int!, $sourceParentId: Int!) {
  changeFolderOrder(id: $sourceParentId, order: $sourceFolderOrder)
  targetChangeOrder: changeFolderOrder(
    id: $targetParentId
    order: $targetFolderOrder
  )
}
    `;
export type ChangeFolderOrderMutationFn = Apollo.MutationFunction<ChangeFolderOrderMutation, ChangeFolderOrderMutationVariables>;

/**
 * __useChangeFolderOrderMutation__
 *
 * To run a mutation, you first call `useChangeFolderOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFolderOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFolderOrderMutation, { data, loading, error }] = useChangeFolderOrderMutation({
 *   variables: {
 *      targetFolderOrder: // value for 'targetFolderOrder'
 *      sourceFolderOrder: // value for 'sourceFolderOrder'
 *      targetParentId: // value for 'targetParentId'
 *      sourceParentId: // value for 'sourceParentId'
 *   },
 * });
 */
export function useChangeFolderOrderMutation(baseOptions?: Apollo.MutationHookOptions<ChangeFolderOrderMutation, ChangeFolderOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeFolderOrderMutation, ChangeFolderOrderMutationVariables>(ChangeFolderOrderDocument, options);
      }
export type ChangeFolderOrderMutationHookResult = ReturnType<typeof useChangeFolderOrderMutation>;
export type ChangeFolderOrderMutationResult = Apollo.MutationResult<ChangeFolderOrderMutation>;
export type ChangeFolderOrderMutationOptions = Apollo.BaseMutationOptions<ChangeFolderOrderMutation, ChangeFolderOrderMutationVariables>;
export const CreateFolderWithBookmarksDocument = gql`
    mutation createFolderWithBookmarks($folderName: String!, $bookmarks: [CreateBookmarkInput!]!) {
  createFolderWithBookmarks(
    data: {folderName: $folderName, bookmarks: $bookmarks}
  )
}
    `;
export type CreateFolderWithBookmarksMutationFn = Apollo.MutationFunction<CreateFolderWithBookmarksMutation, CreateFolderWithBookmarksMutationVariables>;

/**
 * __useCreateFolderWithBookmarksMutation__
 *
 * To run a mutation, you first call `useCreateFolderWithBookmarksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderWithBookmarksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderWithBookmarksMutation, { data, loading, error }] = useCreateFolderWithBookmarksMutation({
 *   variables: {
 *      folderName: // value for 'folderName'
 *      bookmarks: // value for 'bookmarks'
 *   },
 * });
 */
export function useCreateFolderWithBookmarksMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderWithBookmarksMutation, CreateFolderWithBookmarksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderWithBookmarksMutation, CreateFolderWithBookmarksMutationVariables>(CreateFolderWithBookmarksDocument, options);
      }
export type CreateFolderWithBookmarksMutationHookResult = ReturnType<typeof useCreateFolderWithBookmarksMutation>;
export type CreateFolderWithBookmarksMutationResult = Apollo.MutationResult<CreateFolderWithBookmarksMutation>;
export type CreateFolderWithBookmarksMutationOptions = Apollo.BaseMutationOptions<CreateFolderWithBookmarksMutation, CreateFolderWithBookmarksMutationVariables>;
export const UpdateFolderDocument = gql`
    mutation updateFolder($data: UpdateFolderInput!) {
  updateFolder(data: $data) {
    ... on Folder {
      id
      name
    }
  }
}
    `;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const AllFolderNamesDocument = gql`
    query allFolderNames {
  me {
    ... on User {
      folders {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useAllFolderNamesQuery__
 *
 * To run a query within a React component, call `useAllFolderNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFolderNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFolderNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFolderNamesQuery(baseOptions?: Apollo.QueryHookOptions<AllFolderNamesQuery, AllFolderNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFolderNamesQuery, AllFolderNamesQueryVariables>(AllFolderNamesDocument, options);
      }
export function useAllFolderNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFolderNamesQuery, AllFolderNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFolderNamesQuery, AllFolderNamesQueryVariables>(AllFolderNamesDocument, options);
        }
export type AllFolderNamesQueryHookResult = ReturnType<typeof useAllFolderNamesQuery>;
export type AllFolderNamesLazyQueryHookResult = ReturnType<typeof useAllFolderNamesLazyQuery>;
export type AllFolderNamesQueryResult = Apollo.QueryResult<AllFolderNamesQuery, AllFolderNamesQueryVariables>;
export const GetTreeDocument = gql`
    query getTree {
  getTree {
    ...Tree
    ...BaseError
  }
}
    ${TreeFragmentDoc}
${BaseErrorFragmentDoc}`;

/**
 * __useGetTreeQuery__
 *
 * To run a query within a React component, call `useGetTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTreeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTreeQuery(baseOptions?: Apollo.QueryHookOptions<GetTreeQuery, GetTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTreeQuery, GetTreeQueryVariables>(GetTreeDocument, options);
      }
export function useGetTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTreeQuery, GetTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTreeQuery, GetTreeQueryVariables>(GetTreeDocument, options);
        }
export type GetTreeQueryHookResult = ReturnType<typeof useGetTreeQuery>;
export type GetTreeLazyQueryHookResult = ReturnType<typeof useGetTreeLazyQuery>;
export type GetTreeQueryResult = Apollo.QueryResult<GetTreeQuery, GetTreeQueryVariables>;
export const UserNameDocument = gql`
    query userName {
  me {
    ... on User {
      id
      name
    }
  }
}
    `;

/**
 * __useUserNameQuery__
 *
 * To run a query within a React component, call `useUserNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserNameQuery(baseOptions?: Apollo.QueryHookOptions<UserNameQuery, UserNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNameQuery, UserNameQueryVariables>(UserNameDocument, options);
      }
export function useUserNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNameQuery, UserNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNameQuery, UserNameQueryVariables>(UserNameDocument, options);
        }
export type UserNameQueryHookResult = ReturnType<typeof useUserNameQuery>;
export type UserNameLazyQueryHookResult = ReturnType<typeof useUserNameLazyQuery>;
export type UserNameQueryResult = Apollo.QueryResult<UserNameQuery, UserNameQueryVariables>;

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
    "BooleanOrError": [
      "BaseError",
      "Success"
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
    