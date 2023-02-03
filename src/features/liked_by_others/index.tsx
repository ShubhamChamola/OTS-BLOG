import { useEffect, useState } from "react";
import fetchLikedBlogs from "../../services/blog/fetchLikedBlogs";
import BlogMinimalTile from "./components/BlogMinimalTile";

interface Blog {
  title: string;
  createdAt: Date;
  blogId: string;
  readTime: number;
}

const LikedByOthers: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchLikedBlogs(setBlogs);
  }, []);

  return (
    <article id="liked-blogs">
      <h4>LIKED BY OTHERS</h4>
      {blogs.map(({ title, readTime, createdAt, blogId }) => (
        <BlogMinimalTile
          key={blogId}
          title={title}
          readTime={readTime}
          createdAt={createdAt}
          blogId={blogId}
        />
      ))}
    </article>
  );
};

export default LikedByOthers;
