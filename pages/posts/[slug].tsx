import { ParsedUrlQuery } from "querystring";

import { PostHeader, PostBody } from "@n-kurasawa/blog-component";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import PostTitle from "../../components/post-title";
import { TITLE } from "../../lib/constants";
import { sdk } from "../../lib/graphql-client";
import { published } from "../../lib/util";

import type { PostDetail } from "../../types/post";
import type { GetStaticProps, GetStaticPaths } from "next";

type Props = {
  post: PostDetail;
};

const Post: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (!published(post.publishedAt)) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | {TITLE}
                </title>
              </Head>
              <Meta
                title={post.title}
                path={router.asPath}
                ogImage={post.coverImage}
                description={post.description}
              />
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.publishedAt}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const { post } = await sdk.post({ slug });

  return {
    props: {
      post: {
        slug: post!.slug,
        title: post!.title,
        publishedAt: post!.publishedAt,
        coverImage: post!.coverImage,
        content: post!.content.body,
        description: post!.description,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await sdk.slugs();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
