import BlogTile from "../../components/global/BlogTile";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import useUserInfoStore from "../../store/useUserInfoStore";
import fetchBlogsBasedOnIds from "../../services/blog/fetchBlogsBasedOnIds";
import BlogTileSkeleton from "../../components/loaders/blog-tile-skeleton/BlogTileSkeleton";
import useAuthStore from "../../store/useAuthStore";

interface BlogType {
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

  const blogIds = useUserInfoStore((state) => state.blogs);

  const [blogs, setBlogs] = useState<BlogType[] | []>([]);

  const [currIndex, setCurrIndex] = useState(4);

  const [btnDisabled, setBtnDisabled] = useState(false);

  // For initial fetching of blogs
  useEffect(() => {
    if (!initialFetched && blogIds.length > 0) {
      fetchBlogsBasedOnIds(blogIds.slice(0, currIndex), setBlogs).then(() => {
        setInitialFetched(true);
      });
    }
  }, [initialFetched, blogIds]);

  // For button Show More
  useEffect(() => {
    if (currIndex >= blogIds.length) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [currIndex, blogIds]);

  return (
    <article id="user-blogs">
      {blogIds.length > 0 ? (
        <>
          {blogs.length > 0 ? (
            blogs.map((blogData) => (
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
          ) : (
            <>
              <BlogTileSkeleton />
              <BlogTileSkeleton />
              <BlogTileSkeleton />
              <BlogTileSkeleton />
            </>
          )}
          <div className="btn-container">
            <Button
              className="solid-btn"
              disabled={btnDisabled}
              onClick={() => {
                fetchBlogsBasedOnIds(
                  blogIds.slice(currIndex, currIndex + 4),
                  setBlogs
                );
                setCurrIndex((prev) => prev + 4);
              }}
            >
              Show More
            </Button>
          </div>
        </>
      ) : (
        <p className="no-blog-para">
          {role === "Admin"
            ? "You have not created a blog"
            : "You have not bookmarked a blog"}
        </p>
      )}
    </article>
  );
};

export default UserBlogs;
