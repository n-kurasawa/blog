import { PostIndex } from "../types/post";
import PostPreview from "./post-preview";

type Props = {
  posts: PostIndex[];
};

const MorePost: React.FC<Props> = ({ posts }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.publishedAt}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default MorePost;
