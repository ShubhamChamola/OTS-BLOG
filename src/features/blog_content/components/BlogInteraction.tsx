import LikeSVG from "../../../assets/icons/LikeSVG";
import ActiveLikeSVG from "../../../assets/icons/ActiveLikeSVG";
import CommentSVG from "../../../assets/icons/CommentSVG";
import ShareSVG from "../../../assets/icons/ShareSVG";
import BookmarkSVG from "../../../assets/icons/BookmarkSVG";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import fetchLikeInfo from "../../../services/blog/fetchLikeInfo";
import likeBlog from "../../../services/blog/likeBlog";
import bookmarkBlog from "../../../services/blog/bookmarkBlog";
import ActiveBookmarkSVG from "../../../assets/icons/ActiveBookmarkSVG";
import useUserInfoStore from "../../../store/useUserInfoStore";

const BlogInteraction: React.FC = () => {
  const [likedState, setLikedState] = useState(false);

  const location = useLocation();

  const bookmarkedBlogs = useUserInfoStore((state) => state.bookmarkedBlogs);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { blogId } = useParams();
  const userId = useAuthStore((state) => state.userId);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (blogId && userId) fetchLikeInfo(blogId, userId, setLikedState);
  }, [userId, blogId]);

  useEffect(() => {
    if (role !== "Admin")
      if (blogId && bookmarkedBlogs.includes(blogId)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [bookmarkedBlogs, blogId, role]);

  return (
    <ul id="blog-interaction">
      <li
        onClick={() => {
          likeBlog(blogId!, userId!);
        }}
      >
        {likedState ? <ActiveLikeSVG /> : <LikeSVG />}
      </li>
      <li>
        <CommentSVG />
      </li>
      <li
        onClick={() => {
          navigator.clipboard.writeText(location.pathname);
        }}
      >
        <ShareSVG />
      </li>
      {role !== "Admin" && (
        <li
          onClick={() => {
            bookmarkBlog(userId!, blogId!);
          }}
        >
          {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
        </li>
      )}
    </ul>
  );
};

export default BlogInteraction;
