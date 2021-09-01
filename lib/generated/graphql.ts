import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Content = {
  __typename?: 'Content';
  id: Scalars['ID'];
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
};


export type MutationCreatePostArgs = {
  input: NewPost;
};

export type NewPost = {
  slug: Scalars['String'];
  title: Scalars['String'];
  coverImage: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
  date: Scalars['String'];
  coverImage: Scalars['String'];
  content: Content;
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post?: Maybe<Post>;
};


export type QueryPostArgs = {
  slug: Scalars['String'];
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', title: string, date: string, slug: string, coverImage: string }> };

export type PostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', title: string, date: string, slug: string, coverImage: string, description: string, content: { __typename?: 'Content', body: string } }> };

export type SlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type SlugsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', slug: string }> };


export const PostsDocument = gql`
    query posts {
  posts {
    title
    date
    slug
    coverImage
  }
}
    `;
export const PostDocument = gql`
    query post($slug: String!) {
  post(slug: $slug) {
    content {
      body
    }
    title
    date
    slug
    coverImage
    description
  }
}
    `;
export const SlugsDocument = gql`
    query slugs {
  posts {
    slug
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    posts(variables?: PostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'posts');
    },
    post(variables: PostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostQuery>(PostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'post');
    },
    slugs(variables?: SlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SlugsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SlugsQuery>(SlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'slugs');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;