import Head from "next/head";
import { SITE_URL, TITLE } from "../lib/constants";

type Props = {
  title: string;
  path: string;
  ogImage: string;
};

const Meta: React.FC<Props> = ({ title, path, ogImage }) => {
  return (
    <Head>
      <meta name="description" content="明るく楽しく元気よく、なブログ" />
      <meta property="og:title" content={`${title} | ${TITLE}`} />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:url" content={`${SITE_URL}/${path}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@k_7016" />
      <meta property="fb:app_id" content="1415963142107393" />
    </Head>
  );
};

export default Meta;
