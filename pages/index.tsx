import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MorePost from "../components/more-post";
import type Post from "../types/post";
import { getAllPosts } from "../lib/api";
import type { GetStaticProps } from "next";

type Props = {
  allPosts: Post[];
};

const Index: React.FC<Props> = ({ allPosts }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <Layout>
      <Head>
        <title>Title</title>
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

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "coverImage"]);
  return {
    props: { allPosts },
  };
};
