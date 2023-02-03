import BlogTile from "../../components/global/BlogTile";
import Button from "../../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useUserInfoStore from "../../store/useUserInfoStore";
import fetchBlogsBasedOnIds from "../../services/blog/fetchBlogsBasedOnIds";

interface Blog {
  title: string;
  category: string;
  image: string | null;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

const UserBlogs: React.FC = () => {
  const role = useAuthStore((state) => state.role);

  const [initialFetched, setInitialFetched] = useState(false);

  const createdBlogIds = useUserInfoStore((state) => state.createdBlogs);
  const bookmarkedBlogIds = useUserInfoStore((state) => state.bookmarkedBlogs);

  const [createdBlogs, setCreatedBlogs] = useState<Blog[]>([]);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Blog[]>([]);

  const [currIndex, setCurrIndex] = useState(4);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // For initial fetching of blogs
  useEffect(() => {
    console.log(createdBlogIds);
    if (!initialFetched) {
      if (role === "Admin") {
        fetchBlogsBasedOnIds(
          createdBlogIds.slice(0, currIndex),
          setCreatedBlogs
        );
      } else {
        fetchBlogsBasedOnIds(
          bookmarkedBlogIds.slice(0, currIndex),
          setBookmarkedBlogs
        );
        setInitialFetched(true);
      }
    }
  }, [bookmarkedBlogIds, role, createdBlogIds, initialFetched]);

  // For Show More
  useEffect(() => {
    if (role === "Admin") {
      if (currIndex >= createdBlogIds.length) {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    } else {
      if (currIndex >= bookmarkedBlogIds.length) {
        setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    }
  }, [currIndex, bookmarkedBlogIds, role, createdBlogIds]);

  return (
    <article id="user-blogs">
      {role === "Admin"
        ? createdBlogs.map((blogData) => (
            <BlogTile
              key={blogData.blogId}
              blogId={blogData.blogId}
              title={blogData.title}
              date={blogData.createdAt}
              readTime={blogData.readTime}
              category={blogData.category}
              image={blogData.image}
            />
          ))
        : bookmarkedBlogs.map((blogData) => (
            <BlogTile
              key={blogData.blogId}
              blogId={blogData.blogId}
              title={blogData.title}
              date={blogData.createdAt}
              readTime={blogData.readTime}
              category={blogData.category}
              image={blogData.image}
            />
          ))}
      <Button
        className="solid-btn"
        disabled={btnDisabled}
        onClick={() => {
          if (role === "Admin") {
            fetchBlogsBasedOnIds(
              createdBlogIds.slice(currIndex, currIndex + 4),
              setCreatedBlogs
            );
          } else {
            fetchBlogsBasedOnIds(
              bookmarkedBlogIds.slice(currIndex, currIndex + 4),
              setBookmarkedBlogs
            );
          }
          setCurrIndex((prev) => prev + 4);
        }}
      >
        Show More
      </Button>
    </article>
  );
};

export default UserBlogs;
