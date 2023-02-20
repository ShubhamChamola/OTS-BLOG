// React Modules
import { useEffect, useState } from "react";
import BlogMinimalTile from "./components/BlogMinimalTile";
import BlogMinTileSkeleton from "../../skeleton/BlogMinimalTileSkeleton";

// Service Mdoules
import fetchLikedBlogs from "../../services/blog/fetchLikedBlogs";

interface BlogType {
  title: string;
  createdAt: { seconds: number };
  blogID: string;
  readTime: number;
}

const LikedByOthers: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [initialFetchRun, setInitialFetchRun] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetchLikedBlogs(setBlogs, setIsFetching);
    setInitialFetchRun(true);
  }, []);

  return (
    <>
      {initialFetchRun && !isFetching && blogs.length > 0 ? (
        <div id="liked-blogs">
          <h4>Liked by others</h4>
          {blogs.map(({ title, readTime, createdAt, blogID }) => (
            <BlogMinimalTile
              key={blogID}
              title={title}
              readTime={readTime}
              createdAt={createdAt}
              blogID={blogID}
            />
          ))}
        </div>
      ) : isFetching ? (
        <BlogMinTileSkeleton />
      ) : null}
    </>
  );
};

export default LikedByOthers;
