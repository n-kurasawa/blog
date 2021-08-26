import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import Intro from "../components/intro";
import HeroPost from "../components/hero-post";
import MorePost from "../components/more-post";
import type PostType from "../types/post";
import type { GetStaticProps } from "next";
import { TITLE } from "../lib/constants";
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

type Props = {
  allPosts: PostType[];
};

const Index: React.FC<Props> = ({ allPosts }) => {
  console.log(allPosts);
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query articles {
        articles {
          title
          date
          slug
          coverImage
        }
      }
    `,
  });
  return {
    props: { allPosts: data.articles },
  };
};
