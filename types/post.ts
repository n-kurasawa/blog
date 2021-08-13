type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  ogImage: {
    url: string;
  };
  content: string;
  description: string;
};

export default PostType;
