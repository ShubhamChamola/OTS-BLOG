import { useEffect, useState } from "react";
import BlogTile from "../../components/global/BlogTile";
import BlogTileSkeleton from "../../components/loaders/blog-tile-skeleton/BlogTileSkeleton";
import Button from "../../components/ui/Button";
import fetchCategoryBlogs from "../../services/blog/fetchCategoryBlogs";
import fetchTotalBlogs from "../../services/blog/fetchTotalBlogs";
import useHomeBlogStore from "../../store/useHomeBlogStore";

const Browse: React.FC = () => {
  const category = useHomeBlogStore((state) => state.category);
  const blogs = useHomeBlogStore((state) => state.blogs);
  const totalBlogs = useHomeBlogStore((state) => state.noOfBlogs);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      useHomeBlogStore.setState({ blogs: [], noOfBlogs: 0, lastDocSnap: null });
      await fetchTotalBlogs(category);
      await fetchCategoryBlogs(category);
      setIsFetching(false);
    })();
  }, [category]);

  return (
    <>
      {isFetching && blogs && blogs.length === 0 ? (
        <article id="blog-browse">
          <BlogTileSkeleton />
          <BlogTileSkeleton />
        </article>
      ) : (
        <article id="blog-browse">
          {blogs && blogs.length >= 1 ? (
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
            <div className="not-found">
              <h3>Blog Not Found</h3>
              <p>
                We're sorry, but we couldn't find a blog matching your search
                criteria.
              </p>
            </div>
          )}
          <Button
            id="load-more"
            className="outlined-btn"
            disabled={totalBlogs === blogs?.length ? true : false}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              fetchCategoryBlogs(category);
            }}
          >
            Show More
          </Button>
        </article>
      )}
    </>
  );
};

export default Browse;
