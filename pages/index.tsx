import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MorePost from "../components/more-post";
import type { PostIndex } from "../types/post";
import type { GetStaticProps } from "next";
import { TITLE } from "../lib/constants";
import { sdk } from "../lib/graphql-client";

type Props = {
  allPosts: PostIndex[];
};

const Index: React.FC<Props> = ({ allPosts }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <Layout>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
          />
        )}
        {morePosts.length > 0 && <MorePost posts={morePosts} />}
      </Container>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { posts } = await sdk.posts();
  const allPosts = posts.map((post) => ({
    title: post.title,
    date: post.date,
    slug: post.slug,
    coverImage: post.coverImage,
  }));

  return {
    props: { allPosts },
  };
};
