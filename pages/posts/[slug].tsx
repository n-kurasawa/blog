import type { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPostSlugs } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post";
import { TITLE } from "../../lib/constants";

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
                <title>{post.title} | Title</title>
                <meta name="description" content="普通のディスクリプション" />
                <meta property="og:title" content={post.title} />
                <meta
                  property="og:description"
                  content="OGPのディスクリプション"
                />
                <meta property="og:site_name" content={TITLE} />
                <meta property="og:image" content={post.ogImage.url} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@k_7016" />
              </Head>
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
  const post = getPostBySlug(slug);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: { ...post, content },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getAllPostSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};
