// Component Module
import BlogInteraction from "./BlogInteraction";

// Util Module
import formatDate from "../../../utils/formatDate";

interface Props {
  firstName: string;
  lastName: string;
  bio: string | null;
  avatar: string | null;
  createdAt: { seconds: number };
}

const dummyAvatar =
  require("../../../assets/images/user-dummy-avatar.png") as string;

const BlogContentBase: React.FC<Props> = ({
  firstName,
  lastName,
  bio,
  avatar,
  createdAt,
}) => {
  return (
    <div id="blog-base">
      <div className="writter">
        <span>WRITTEN BY</span>
        <div className="writter-info">
          <div>
            <img src={avatar || dummyAvatar} alt="blog writter profile" />
          </div>
          <div>
            <span>{`${firstName} ${lastName}`}</span>
            {bio && bio.trim().length > 0 && <span>{bio}</span>}
            <span>
              {formatDate(new Date(createdAt.seconds * 1000), "full")}
            </span>
          </div>
        </div>
      </div>
      <BlogInteraction />
    </div>
  );
};

export default BlogContentBase;
