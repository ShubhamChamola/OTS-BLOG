import BlogInteraction from "./BlogInteraction";
import formatDate from "../../../utils/formatDate";

interface Props {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  writtenAt: any;
}

const BlogContentBase: React.FC<Props> = ({
  firstName,
  lastName,
  bio,
  avatar,
  writtenAt,
}) => {
  return (
    <article id="blog-base">
      <div className="writter">
        <span>WRITTEN BY</span>
        <div className="writter-info">
          <div>
            <img src={avatar} alt="blog writter profile" />
          </div>
          <div>
            <span>{`${firstName} ${lastName}`}</span>
            <span>{bio}</span>
            <span>
              {formatDate(new Date(writtenAt.seconds * 1000), "full")}
            </span>
          </div>
        </div>
      </div>
      <BlogInteraction />
    </article>
  );
};

export default BlogContentBase;
