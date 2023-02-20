// React Modules
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

// Asset Modules
import LikeSVG from "../../../assets/icons/LikeSVG";
import ActiveLikeSVG from "../../../assets/icons/ActiveLikeSVG";
import CommentSVG from "../../../assets/icons/CommentSVG";
import ShareSVG from "../../../assets/icons/ShareSVG";
import BookmarkSVG from "../../../assets/icons/BookmarkSVG";
import ActiveBookmarkSVG from "../../../assets/icons/ActiveBookmarkSVG";

// Service Modules
import likeBlog from "../../../services/blog/likeBlog";
import bookmarkBlog from "../../../services/blog/bookmarkBlog";

// Store Module
import useUserInfoStore from "../../../store/useUserInfoStore";

const BlogInteraction: React.FC = () => {
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { blogID } = useParams();

  const { role, userID, blogIDs, likedBlogs } = useUserInfoStore(
    (state) => state.info
  );

  // This useEffect is used for checking wether the blog is liked by user or not
  useEffect(() => {
    if (blogID && likedBlogs.includes(blogID)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedBlogs, blogID]);

  // This useEffect check wether this blog was bookmarked by the user or not
  useEffect(() => {
    if (role === "User")
      if (blogID && blogIDs.includes(blogID)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
  }, [blogIDs, blogID, role]);

  return (
    <ul id="blog-interaction">
      <li
        onClick={() => {
          userID && blogID && likeBlog(blogID!);
        }}
      >
        {isLiked ? <ActiveLikeSVG /> : <LikeSVG />}
      </li>
      <li
        onClick={() => {
          document
            .querySelector("#comment-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <CommentSVG />
      </li>
      <li
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.protocol}//${window.location.host}${location.pathname}`
          );
        }}
      >
        <ShareSVG />
      </li>
      {role !== "Admin" && (
        <li
          onClick={() => {
            userID && blogID && bookmarkBlog(userID, blogID);
          }}
        >
          {isBookmarked ? <ActiveBookmarkSVG /> : <BookmarkSVG />}
        </li>
      )}
    </ul>
  );
};

export default BlogInteraction;
