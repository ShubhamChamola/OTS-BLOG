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

  const blogIds = useUserInfoStore((state) => state.blogs);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { blogId } = useParams();

  const { role, userId } = useAuthStore((state) => state);

  useEffect(() => {
    if (blogId && userId) fetchLikeInfo(blogId, userId, setLikedState);
  }, [userId, blogId]);

  useEffect(() => {
    if (role !== "Admin")
      if (blogId && blogIds.includes(blogId)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [blogIds, blogId, role]);

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
            userId && blogId && bookmarkBlog(userId, blogId);
          }}
        >
          {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
        </li>
      )}
    </ul>
  );
};

export default BlogInteraction;
