import type { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type { PostDetail } from "../../types/post";
import { TITLE } from "../../lib/constants";
import Meta from "../../components/meta";
import { sdk } from "../../lib/graphql-client";
import { published } from "../../lib/util";

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
  const content = await markdownToHtml(post!.content.body || "");

  return {
    props: {
      post: {
        slug: post!.slug,
        title: post!.title,
        publishedAt: post!.publishedAt,
        coverImage: post!.coverImage,
        content: content,
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
