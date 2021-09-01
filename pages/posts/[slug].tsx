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
import PostType from "../../types/post";
import { TITLE } from "../../lib/constants";
import Meta from "../../components/meta";
import client from "../../lib/apollo-client";
import { gql } from "@apollo/client";

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
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
                date={post.date}
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
  const { data } = await client.query({
    query: gql`
      query post {
        post(slug: "${slug}") {
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
    `,
  });
  const content = await markdownToHtml(data.post.content.body || "");

  return {
    props: {
      post: { ...data.post, content },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      query slugs {
        posts {
          slug
        }
      }
    `,
  });

  return {
    paths: data.posts.map((post: PostType) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
