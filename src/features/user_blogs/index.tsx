// Component Modules
import BlogTile from "../../components/global/BlogTile";
import Button from "../../components/ui/Button";
import BlogTileSkeleton from "../../skeleton/BlogTileSkeleton";

// React Modules
import { useEffect, useState } from "react";

// Service Modules
import fetchBlogsBasedOnIds from "../../services/blog/fetchBlogsBasedOnIds";

// Store Modules
import useUserInfoStore from "../../store/useUserInfoStore";

interface BlogTileType {
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
  blogID: string;
}

const UserBlogs: React.FC = () => {
  const [initialFetched, setInitialFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [blogs, setBlogs] = useState<BlogTileType[] | []>([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [currIndex, setCurrIndex] = useState(4);

  const { blogIDs, role } = useUserInfoStore((state) => state.info);

  // For initial fetching of blogs
  useEffect(() => {
    if (!initialFetched && blogIDs.length > 0) {
      fetchBlogsBasedOnIds(
        blogIDs.slice(0, currIndex),
        setBlogs,
        setIsFetching
      ).then(() => {
        setInitialFetched(true);
      });
    } else {
      setIsFetching(false);
    }
  }, [initialFetched, blogIDs]);

  // For button Show More
  useEffect(() => {
    if (currIndex >= blogIDs.length) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [currIndex, blogIDs]);

  return (
    <article id="user-blogs">
      {blogIDs.length <= 0 && (
        <p className="no-blog-para">
          {role === "Admin"
            ? "You have not created a blog"
            : "You have not bookmarked a blog"}
        </p>
      )}

      {!isFetching && blogs.length > 0 && blogIDs.length > 0 && (
        <>
          {blogs.map((blogData) => (
            <BlogTile
              key={blogData.blogID}
              blogID={blogData.blogID}
              title={blogData.title}
              createdAt={blogData.createdAt}
              readTime={blogData.readTime}
              category={blogData.category}
              thumbnail={blogData.thumbnail}
            />
          ))}

          <div className="btn-container">
            <Button
              className="solid-btn"
              disabled={btnDisabled}
              onClick={() => {
                fetchBlogsBasedOnIds(
                  blogIDs.slice(currIndex, currIndex + 4),
                  setBlogs,
                  setIsFetching
                );
                setCurrIndex((prev) => prev + 4);
              }}
            >
              Show More
            </Button>
          </div>
        </>
      )}

      {isFetching && blogs.length > 0 && blogIDs.length > 0 && (
        <>
          {blogs.map((blogData) => (
            <BlogTile
              key={blogData.blogID}
              blogID={blogData.blogID}
              title={blogData.title}
              createdAt={blogData.createdAt}
              readTime={blogData.readTime}
              category={blogData.category}
              thumbnail={blogData.thumbnail}
            />
          ))}
          <BlogTileSkeleton />
          <div className="btn-container">
            <Button
              className="solid-btn"
              disabled={btnDisabled}
              onClick={() => {
                fetchBlogsBasedOnIds(
                  blogIDs.slice(currIndex, currIndex + 4),
                  setBlogs,
                  setIsFetching
                );
                setCurrIndex((prev) => prev + 4);
              }}
            >
              Show More
            </Button>
          </div>
        </>
      )}

      {isFetching && blogs.length <= 0 && blogIDs.length > 0 && (
        <>
          <BlogTileSkeleton />
          <BlogTileSkeleton />
        </>
      )}

      {!isFetching && blogs.length <= 0 && blogIDs.length > 0 && (
        <>
          <BlogTileSkeleton />
          <BlogTileSkeleton />
        </>
      )}
    </article>
  );
};

export default UserBlogs;
