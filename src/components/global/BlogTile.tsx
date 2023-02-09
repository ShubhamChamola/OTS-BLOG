import formatDate from "../../utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserInfoStore from "../../store/useUserInfoStore";
import ActiveBookmarkSVG from "../../assets/icons/ActiveBookmarkSVG";
import BookmarkSVG from "../../assets/icons/BookmarkSVG";
import bookmarkBlog from "../../services/blog/bookmarkBlog";
import useAuthStore from "../../store/useAuthStore";

const defaultBlogImage =
  require("../../assets/images/default_blog_image.jpg") as string;

interface Props {
  title: string;
  date: Date;
  readTime: number;
  category: string;
  image: string | null;
  blogId: string;
}

const BlogTile: React.FC<Props> = ({
  title,
  date,
  readTime,
  category,
  image,
  blogId,
}) => {
  const { role, userId } = useAuthStore((state) => state);

  const blogIds = useUserInfoStore((state) => state.blogs);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Admin")
      if (blogIds.includes(blogId)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [blogIds, role]);

  return (
    <div className="blog-tile">
      <div className="blog-img">
        <Link to={`/blog/${blogId}`}>
          <img
            src={image || defaultBlogImage}
            alt="related to heading of the blog"
          />
        </Link>
      </div>
      <div className="blog-content">
        {title.length <= 70 ? (
          <h3>{title}</h3>
        ) : (
          <h3>
            {title.slice(0, 70)} <Link to={`/blog/${blogId}`}>Read more</Link>
          </h3>
        )}
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
          <span>
            {formatDate(new Date((date as any).seconds * 1000), "partial")}
          </span>
          <span>{readTime} Min Read</span>
          <span>#{category}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
