import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel } from '../entity/User';
import { BookmarkModel } from '../entity/Bookmark';
import { Folder } from '../entity/Folder';
import { MyContext } from './contextType';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
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
  createBookmark: BookmarkResultWithInput;
  createFolder: FolderResult;
  deleteFolder: FolderResult;
  hardDeleteBookmark: BookmarkResult;
  hardDeleteBookmarks: BookmarksResult;
  invalidateTokens: Scalars['Boolean'];
  /** Returns null if login failed */
  login: UserResult;
  moveFolder: FolderResult;
  recoverFolder: FolderResult;
  /** true => success | false => fail */
  register: UserResult;
  softDeleteBookmark: BookmarkResult;
  softDeleteBookmarks: BookmarksResult;
  softDeleteFolder: FolderResult;
  updateBookmark: BookmarkResultWithInput;
  updateFolderName: FolderResult;
};


export type MutationCreateBookmarkArgs = {
  data: CreateBookmarkInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
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
  CreateBookmarkInput: CreateBookmarkInput;
  CreateFolderInput: CreateFolderInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Folder: ResolverTypeWrapper<Folder>;
  FolderArrayResult: ResolversTypes['BaseError'] | ResolversTypes['Folders'];
  FolderResult: ResolversTypes['BaseError'] | ResolversTypes['Folder'];
  Folders: ResolverTypeWrapper<Omit<Folders, 'folders'> & { folders: Array<Maybe<ResolversTypes['Folder']>> }>;
  InputValidationError: ResolverTypeWrapper<InputValidationError>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Tree: ResolverTypeWrapper<Tree>;
  TreeResult: ResolversTypes['BaseError'] | ResolversTypes['Tree'];
  UpdateBookmarkInput: UpdateBookmarkInput;
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
  CreateBookmarkInput: CreateBookmarkInput;
  CreateFolderInput: CreateFolderInput;
  Date: Scalars['Date'];
  Folder: Folder;
  FolderArrayResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Folders'];
  FolderResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Folder'];
  Folders: Omit<Folders, 'folders'> & { folders: Array<Maybe<ResolversParentTypes['Folder']>> };
  InputValidationError: InputValidationError;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  Tree: Tree;
  TreeResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Tree'];
  UpdateBookmarkInput: UpdateBookmarkInput;
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
  createBookmark?: Resolver<ResolversTypes['BookmarkResultWithInput'], ParentType, ContextType, RequireFields<MutationCreateBookmarkArgs, 'data'>>;
  createFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationCreateFolderArgs, 'data'>>;
  deleteFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationDeleteFolderArgs, 'id'>>;
  hardDeleteBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationHardDeleteBookmarkArgs, 'id'>>;
  hardDeleteBookmarks?: Resolver<ResolversTypes['BookmarksResult'], ParentType, ContextType, RequireFields<MutationHardDeleteBookmarksArgs, 'ids'>>;
  invalidateTokens?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  moveFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationMoveFolderArgs, 'folderId'>>;
  recoverFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationRecoverFolderArgs, 'id'>>;
  register?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
  softDeleteBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteBookmarkArgs, 'id'>>;
  softDeleteBookmarks?: Resolver<ResolversTypes['BookmarksResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteBookmarksArgs, 'ids'>>;
  softDeleteFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteFolderArgs, 'id'>>;
  updateBookmark?: Resolver<ResolversTypes['BookmarkResultWithInput'], ParentType, ContextType, RequireFields<MutationUpdateBookmarkArgs, 'data'>>;
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

export type TreeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Tree'] = ResolversParentTypes['Tree']> = ResolversObject<{
  tree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TreeResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['TreeResult'] = ResolversParentTypes['TreeResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Tree', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  folders?: Resolver<Array<Maybe<ResolversTypes['Folder']>>, ParentType, ContextType>;
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
  Date?: GraphQLScalarType;
  Folder?: FolderResolvers<ContextType>;
  FolderArrayResult?: FolderArrayResultResolvers<ContextType>;
  FolderResult?: FolderResultResolvers<ContextType>;
  Folders?: FoldersResolvers<ContextType>;
  InputValidationError?: InputValidationErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tree?: TreeResolvers<ContextType>;
  TreeResult?: TreeResultResolvers<ContextType>;
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