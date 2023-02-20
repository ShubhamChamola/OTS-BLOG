// React Module
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets Modules
import ActiveBookmarkSVG from "../../../assets/icons/ActiveBookmarkSVG";
import BookmarkSVG from "../../../assets/icons/BookmarkSVG";

// Service Module
import bookmarkBlog from "../../../services/blog/bookmarkBlog";

// Util Module
import formatDate from "../../../utils/formatDate";

// Store Module
import useUserInfoStore from "../../../store/useUserInfoStore";

interface Props {
  title: string;
  readTime: number;
  createdAt: { seconds: number };
  blogID: string;
}

const BlogMinimalTile: React.FC<Props> = ({
  title,
  readTime,
  createdAt,
  blogID,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { role, userID, blogIDs } = useUserInfoStore((state) => state.info);

  useEffect(() => {
    if (role === "User")
      if (blogIDs.includes(blogID)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [blogIDs, role, blogID]);

  return (
    <div className="blog-min-tile" id={blogID}>
      <h5>
        <Link to={`/blog/${blogID}`}>
          {title.length <= 70 ? (
            <h3>{title}</h3>
          ) : (
            <h3>{title.slice(0, 70)}...</h3>
          )}
        </Link>
      </h5>
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
        <span>{readTime} Min Read</span>
        <span>{formatDate(new Date(createdAt.seconds * 1000), "full")}</span>
      </div>
    </div>
  );
};

export default BlogMinimalTile;
