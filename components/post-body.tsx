import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody: React.FC<Props> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
