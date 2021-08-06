import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Blog.
          </h1>
        </section>
      </Container>
    </Layout>
  );
}
