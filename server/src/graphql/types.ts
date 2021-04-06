import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel } from '../entity/User';
import { BookmarkModel } from '../entity/Bookmark';
import { CategoryModel } from '../entity/Category';
import { Folder } from '../entity/Folder';
import { MyContext } from './contextType';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type AddBookmarkToCategoriesInput = {
  bookmarkId: Scalars['Int'];
  /** Category id */
  categoryId: Scalars['Int'];
};

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

export type CreateCategoryInput = {
  name: Scalars['String'];
  bookmarks?: Maybe<Array<Scalars['Int']>>;
};

export type CreateCategoryResult = BaseError | Category;

export type CreateFolderInput = {
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
};


export type DeleteCategoryResult = BaseError | NoErrorCategoryDeletion;

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['Int'];
  parent?: Maybe<Folder>;
  children: Array<Maybe<Folder>>;
  bookmarks: Array<Maybe<Bookmark>>;
  depth: Scalars['Int'];
  name: Scalars['String'];
};

export type FolderResult = BaseError | Folder;

export type Mutation = {
  __typename?: 'Mutation';
  addBookmarkToCategories: BookmarkResult;
  /** Returns null if bookmark wasn't created */
  createBookmark: BookmarkResult;
  createCategory: CreateCategoryResult;
  createFolder: FolderResult;
  /** Pass in category id */
  deleteCategory: DeleteCategoryResult;
  invalidateTokens: Scalars['Boolean'];
  /** Returns null if login failed */
  login?: Maybe<UserResult>;
  /** true => success | false => fail */
  register: Scalars['Boolean'];
  softDeleteFolder: FolderResult;
  updateBookmark: BookmarkResult;
  updateFolderName: FolderResult;
};


export type MutationAddBookmarkToCategoriesArgs = {
  data: AddBookmarkToCategoriesInput;
};


export type MutationCreateBookmarkArgs = {
  data: CreateBookmarkInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
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

export type NoErrorCategoryDeletion = {
  __typename?: 'NoErrorCategoryDeletion';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: BookmarkResult;
  folder: FolderResult;
  me?: Maybe<User>;
  ping: Scalars['String'];
};


export type QueryBookmarkArgs = {
  id: Scalars['Int'];
};


export type QueryFolderArgs = {
  id: Scalars['Int'];
};

export type UpdateBookmarkInput = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Int']>;
};

/** User */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  bookmarks: Array<Maybe<Bookmark>>;
  categories: Array<Maybe<Category>>;
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
  AddBookmarkToCategoriesInput: AddBookmarkToCategoriesInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  BaseError: ResolverTypeWrapper<BaseError>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Bookmark: ResolverTypeWrapper<BookmarkModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BookmarkResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  Category: ResolverTypeWrapper<CategoryModel>;
  CreateBookmarkInput: CreateBookmarkInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCategoryResult: ResolversTypes['BaseError'] | ResolversTypes['Category'];
  CreateFolderInput: CreateFolderInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteCategoryResult: ResolversTypes['BaseError'] | ResolversTypes['NoErrorCategoryDeletion'];
  Folder: ResolverTypeWrapper<Folder>;
  FolderResult: ResolversTypes['BaseError'] | ResolversTypes['Folder'];
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  NoErrorCategoryDeletion: ResolverTypeWrapper<NoErrorCategoryDeletion>;
  Query: ResolverTypeWrapper<{}>;
  UpdateBookmarkInput: UpdateBookmarkInput;
  User: ResolverTypeWrapper<UserModel>;
  UserResult: ResolversTypes['BaseError'] | ResolversTypes['User'];
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddBookmarkToCategoriesInput: AddBookmarkToCategoriesInput;
  Int: Scalars['Int'];
  BaseError: BaseError;
  String: Scalars['String'];
  Bookmark: BookmarkModel;
  ID: Scalars['ID'];
  BookmarkResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  Category: CategoryModel;
  CreateBookmarkInput: CreateBookmarkInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCategoryResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Category'];
  CreateFolderInput: CreateFolderInput;
  Date: Scalars['Date'];
  DeleteCategoryResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['NoErrorCategoryDeletion'];
  Folder: Folder;
  FolderResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Folder'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  NoErrorCategoryDeletion: NoErrorCategoryDeletion;
  Query: {};
  UpdateBookmarkInput: UpdateBookmarkInput;
  User: UserModel;
  UserResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['User'];
}>;

export type BaseErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BaseError'] = ResolversParentTypes['BaseError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookmarkResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Bookmark'] = ResolversParentTypes['Bookmark']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookmarkResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['BookmarkResult'] = ResolversParentTypes['BookmarkResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark', ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateCategoryResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateCategoryResult'] = ResolversParentTypes['CreateCategoryResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Category', ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteCategoryResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeleteCategoryResult'] = ResolversParentTypes['DeleteCategoryResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'NoErrorCategoryDeletion', ParentType, ContextType>;
}>;

export type FolderResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType>;
  children?: Resolver<Array<Maybe<ResolversTypes['Folder']>>, ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  depth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FolderResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FolderResult'] = ResolversParentTypes['FolderResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Folder', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBookmarkToCategories?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationAddBookmarkToCategoriesArgs, 'data'>>;
  createBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationCreateBookmarkArgs, 'data'>>;
  createCategory?: Resolver<ResolversTypes['CreateCategoryResult'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'data'>>;
  createFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationCreateFolderArgs, 'data'>>;
  deleteCategory?: Resolver<ResolversTypes['DeleteCategoryResult'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  invalidateTokens?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
  softDeleteFolder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationSoftDeleteFolderArgs, 'id'>>;
  updateBookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<MutationUpdateBookmarkArgs, 'data'>>;
  updateFolderName?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<MutationUpdateFolderNameArgs, 'id' | 'name'>>;
}>;

export type NoErrorCategoryDeletionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['NoErrorCategoryDeletion'] = ResolversParentTypes['NoErrorCategoryDeletion']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<QueryBookmarkArgs, 'id'>>;
  folder?: Resolver<ResolversTypes['FolderResult'], ParentType, ContextType, RequireFields<QueryFolderArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
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
  Category?: CategoryResolvers<ContextType>;
  CreateCategoryResult?: CreateCategoryResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteCategoryResult?: DeleteCategoryResultResolvers<ContextType>;
  Folder?: FolderResolvers<ContextType>;
  FolderResult?: FolderResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NoErrorCategoryDeletion?: NoErrorCategoryDeletionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
