import ActiveBookmarkSVG from "../../../assets/icons/ActiveBookmarkSVG";
import BookmarkSVG from "../../../assets/icons/BookmarkSVG";
import bookmarkBlog from "../../../services/blog/bookmarkBlog";
import useUserInfoStore from "../../../store/useUserInfoStore";
import formatDate from "../../../utils/formatDate";
import { useState, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

const BlogMinimalTile: React.FC<Props> = ({
  title,
  readTime,
  createdAt,
  blogId,
}) => {
  const { role, userId } = useAuthStore((state) => state);

  const blogIds = useUserInfoStore((state) => state.blogs);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (role !== "Admin")
      if (blogIds.includes(blogId)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [blogIds, role]);

  return (
    <div className="blog-min-tile" id={blogId}>
      <h5>
        <Link to={`/blog/${blogId}`}>{title}</Link>
      </h5>
      <div>
        {role !== "Admin" && (
          <span
            onClick={() => {
              userId && bookmarkBlog(userId, blogId);
            }}
          >
            {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
          </span>
        )}
        <span>{readTime} Min Read</span>
        <span>
          {formatDate(new Date((createdAt as any).seconds * 1000), "full")}
        </span>
      </div>
    </div>
  );
};

export default BlogMinimalTile;
