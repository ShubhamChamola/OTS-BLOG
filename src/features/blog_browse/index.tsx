// React Modules
import { useEffect } from "react";

// Component Modules
import BlogTile from "../../components/global/BlogTile";
import BlogTileSkeleton from "../../skeleton/BlogTileSkeleton";
import Button from "../../components/ui/Button";

// Service Modules
import fetchCategoryBlogs from "../../services/blog/fetchCategoryBlogs";
import fetchTotalBlogs from "../../services/blog/fetchTotalBlogs";

// Store Module
import useHomeBlogStore from "../../store/useBlogBrowseStore";

const Browse: React.FC = () => {
  const {
    category,
    blogs,
    noOfBlogs: totalBlogs,
    isFetching,
  } = useHomeBlogStore((store) => store);

  useEffect(() => {
    return () => {
      useHomeBlogStore.setState({
        lastDocSnap: null,
        noOfBlogs: 0,
        blogs: [],
      });
    };
  }, []);

  useEffect(() => {
    useHomeBlogStore.setState({
      lastDocSnap: null,
      noOfBlogs: 0,
      blogs: [],
      isFetching: true,
    });
    fetchTotalBlogs(category);
  }, [category]);

  useEffect(() => {
    totalBlogs > 0 && fetchCategoryBlogs(category);
  }, [totalBlogs]);

  return (
    <>
      {isFetching && blogs.length < 1 ? (
        <article id="blog-browse">
          <BlogTileSkeleton />
          <BlogTileSkeleton />
          <BlogTileSkeleton />
          <BlogTileSkeleton />
        </article>
      ) : (
        <article id="blog-browse">
          {blogs && blogs.length >= 1 ? (
            !isFetching ? (
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
              </>
            ) : (
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
              </>
            )
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
            disabled={totalBlogs === blogs.length || isFetching ? true : false}
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
