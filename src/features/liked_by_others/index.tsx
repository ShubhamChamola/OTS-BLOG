import { useEffect, useState } from "react";
import ArrowSVG from "../../assets/icons/ArrowSVG";
import BlogMinTileSkeleton from "../../components/loaders/blog-min-tile-skeleton/BlogMinTileSkeleton";
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

  const [isFetching, setIsFetching] = useState(false);

  const [initialFetchRun, setInitialFetchRun] = useState(false);

  useEffect(() => {
    fetchLikedBlogs(setBlogs, setIsFetching);
    setInitialFetchRun(true);
  }, []);

  return (
    <>
      {initialFetchRun && !isFetching && blogs.length > 0 ? (
        <article id="liked-blogs">
          <h4>Liked by others</h4>
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
      ) : isFetching ? (
        <BlogMinTileSkeleton />
      ) : null}
    </>
  );
};

export default LikedByOthers;
