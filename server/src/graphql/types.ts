import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel } from '../entity/User';
import { BookmarkModel } from '../entity/Bookmark';
import { CategoryModel } from '../entity/Category';
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
  addBookmarkToCategories: AddBookmarkToCategoriesResult;
  /** Returns null if bookmark wasn't created */
  createBookmark: CreateBookmarkResult;
  createCategory: CreateCategoryResult;
  /** Pass in category id */
  deleteCategory: DeleteCategoryResult;
  invalidateTokens: Scalars['Boolean'];
  /** Returns null if login failed */
  login?: Maybe<UserResult>;
  /** true => success | false => fail */
  register: Scalars['Boolean'];
  updateBookmark: UpdateBookmarkResult;
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


export type MutationUpdateBookmarkArgs = {
  data: UpdateBookmarkInput;
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
  AddBookmarkToCategoriesResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  BaseError: ResolverTypeWrapper<BaseError>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Bookmark: ResolverTypeWrapper<BookmarkModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BookmarkResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  Category: ResolverTypeWrapper<CategoryModel>;
  CreateBookmarkInput: CreateBookmarkInput;
  CreateBookmarkResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  CreateCategoryInput: CreateCategoryInput;
  CreateCategoryResult: ResolversTypes['BaseError'] | ResolversTypes['Category'];
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteCategoryResult: ResolversTypes['BaseError'] | ResolversTypes['NoErrorCategoryDeletion'];
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  NoErrorCategoryDeletion: ResolverTypeWrapper<NoErrorCategoryDeletion>;
  Query: ResolverTypeWrapper<{}>;
  UpdateBookmarkInput: UpdateBookmarkInput;
  UpdateBookmarkResult: ResolversTypes['BaseError'] | ResolversTypes['Bookmark'];
  User: ResolverTypeWrapper<UserModel>;
  UserResult: ResolversTypes['BaseError'] | ResolversTypes['User'];
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddBookmarkToCategoriesInput: AddBookmarkToCategoriesInput;
  Int: Scalars['Int'];
  AddBookmarkToCategoriesResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  BaseError: BaseError;
  String: Scalars['String'];
  Bookmark: BookmarkModel;
  ID: Scalars['ID'];
  BookmarkResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  Category: CategoryModel;
  CreateBookmarkInput: CreateBookmarkInput;
  CreateBookmarkResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  CreateCategoryInput: CreateCategoryInput;
  CreateCategoryResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Category'];
  Date: Scalars['Date'];
  DeleteCategoryResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['NoErrorCategoryDeletion'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  NoErrorCategoryDeletion: NoErrorCategoryDeletion;
  Query: {};
  UpdateBookmarkInput: UpdateBookmarkInput;
  UpdateBookmarkResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['Bookmark'];
  User: UserModel;
  UserResult: ResolversParentTypes['BaseError'] | ResolversParentTypes['User'];
}>;

export type AddBookmarkToCategoriesResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AddBookmarkToCategoriesResult'] = ResolversParentTypes['AddBookmarkToCategoriesResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark', ParentType, ContextType>;
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

export type CreateBookmarkResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateBookmarkResult'] = ResolversParentTypes['CreateBookmarkResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark', ParentType, ContextType>;
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

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBookmarkToCategories?: Resolver<ResolversTypes['AddBookmarkToCategoriesResult'], ParentType, ContextType, RequireFields<MutationAddBookmarkToCategoriesArgs, 'data'>>;
  createBookmark?: Resolver<ResolversTypes['CreateBookmarkResult'], ParentType, ContextType, RequireFields<MutationCreateBookmarkArgs, 'data'>>;
  createCategory?: Resolver<ResolversTypes['CreateCategoryResult'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'data'>>;
  deleteCategory?: Resolver<ResolversTypes['DeleteCategoryResult'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  invalidateTokens?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
  updateBookmark?: Resolver<ResolversTypes['UpdateBookmarkResult'], ParentType, ContextType, RequireFields<MutationUpdateBookmarkArgs, 'data'>>;
}>;

export type NoErrorCategoryDeletionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['NoErrorCategoryDeletion'] = ResolversParentTypes['NoErrorCategoryDeletion']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bookmark?: Resolver<ResolversTypes['BookmarkResult'], ParentType, ContextType, RequireFields<QueryBookmarkArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UpdateBookmarkResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UpdateBookmarkResult'] = ResolversParentTypes['UpdateBookmarkResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'Bookmark', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<Maybe<ResolversTypes['Bookmark']>>, ParentType, ContextType>;
  categories?: Resolver<Array<Maybe<ResolversTypes['Category']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseError' | 'User', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AddBookmarkToCategoriesResult?: AddBookmarkToCategoriesResultResolvers<ContextType>;
  BaseError?: BaseErrorResolvers<ContextType>;
  Bookmark?: BookmarkResolvers<ContextType>;
  BookmarkResult?: BookmarkResultResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CreateBookmarkResult?: CreateBookmarkResultResolvers<ContextType>;
  CreateCategoryResult?: CreateCategoryResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteCategoryResult?: DeleteCategoryResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NoErrorCategoryDeletion?: NoErrorCategoryDeletionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateBookmarkResult?: UpdateBookmarkResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
