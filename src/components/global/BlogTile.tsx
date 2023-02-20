// React Modules
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Store Module
import useUserInfoStore from "../../store/useUserInfoStore";

// Assets Modules
import ActiveBookmarkSVG from "../../assets/icons/ActiveBookmarkSVG";
import BookmarkSVG from "../../assets/icons/BookmarkSVG";

// Utility Module
import formatDate from "../../utils/formatDate";

// Service Modules
import bookmarkBlog from "../../services/blog/bookmarkBlog";

const defaultBlogImage =
  require("../../assets/images/default_blog_image.jpg") as string;

interface Props {
  title: string;
  createdAt: { seconds: number };
  readTime: number;
  category: string;
  thumbnail: string | null;
  blogID: string;
}

const BlogTile: React.FC<Props> = ({
  title,
  createdAt,
  readTime,
  category,
  thumbnail,
  blogID,
}) => {
  const { role, userID, blogIDs } = useUserInfoStore((state) => state.info);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (role === "User" && blogIDs.length > 0) {
      blogIDs.includes(blogID) ? setIsBookmarked(true) : setIsBookmarked(false);
    } else {
      setIsBookmarked(false);
    }
  }, [blogIDs, role, blogID]);

  return (
    <div className="blog-tile">
      <div className="blog-img">
        <Link to={`/blog/${blogID}`}>
          <img
            src={thumbnail || defaultBlogImage}
            alt="related to heading of the blog"
          />
        </Link>
      </div>
      <div className="blog-content">
        {title.length <= 70 ? (
          <h3>{title}</h3>
        ) : (
          <h3>
            {title.slice(0, 70)}...
            <Link to={`/blog/${blogID}`}>
              <span>Read more</span>
            </Link>
          </h3>
        )}
        <div>
          {role === "User" && (
            <span
              onClick={() => {
                userID && bookmarkBlog(userID, blogID);
              }}
            >
              {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
            </span>
          )}
          <span>
            {formatDate(new Date(createdAt.seconds * 1000), "partial")}
          </span>
          <span>{readTime} Min Read</span>
          <span>#{category}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
