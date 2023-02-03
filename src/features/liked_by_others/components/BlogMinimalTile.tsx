import ActiveBookmarkSVG from "../../../assets/icons/ActiveBookmarkSVG";
import BookmarkSVG from "../../../assets/icons/BookmarkSVG";
import bookmarkBlog from "../../../services/blog/bookmarkBlog";
import useUserInfoStore from "../../../store/useUserInfoStore";
import formatDate from "../../../utils/formatDate";
import { useState, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

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
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId);

  const navigate = useNavigate();

  const bookmarkedBlogs = useUserInfoStore((state) => state.bookmarkedBlogs);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (role !== "Admin")
      if (bookmarkedBlogs.includes(blogId)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [bookmarkedBlogs, blogId, role]);

  return (
    <div
      className="blog-min-tile"
      id={blogId}
      onClick={() => {
        navigate(`/blog/${blogId}`);
      }}
    >
      <h5>{title}</h5>
      <div>
        <span>{readTime} Min Read</span>
        <span>
          {formatDate(new Date((createdAt as any).seconds * 1000), "full")}
        </span>
        {role !== "Admin" && (
          <span
            onClick={() => {
              bookmarkBlog(userId!, blogId);
            }}
          >
            {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogMinimalTile;
