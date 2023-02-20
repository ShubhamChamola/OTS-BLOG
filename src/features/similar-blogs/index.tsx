// React Module
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Component Module
import BlogTile from "../../components/global/BlogTile";

// Service Module
import fetchSimilarBlogs from "../../services/blog/fetchSimilarBlogs";
import { SimilarBlogsSkeleton } from "../../skeleton/BlogPage";

interface Prop {
  category: string;
}

interface BlogTileType {
  blogID: string;
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
}

const SimilarBlogs: React.FC<Prop> = ({ category }) => {
  const [blogs, setBlogs] = useState<BlogTileType[]>([]);
  const { blogID: currBlogID } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    fetchSimilarBlogs(category, currBlogID!, setBlogs, setIsFetching);

    return () => {
      setBlogs([]);
    };
  }, [currBlogID, category]);

  return (
    <>
      {isFetching && (
        <>
          <SimilarBlogsSkeleton />
        </>
      )}
      {!isFetching && blogs.length >= 1 && (
        <>
          <article id="similar-blogs">
            <h4>Read More Articles Like This</h4>
            <div className="overflow-container">
              {blogs.map((blogData) => (
                <BlogTile
                  key={blogData.blogID}
                  title={blogData.title}
                  createdAt={blogData.createdAt}
                  readTime={blogData.readTime}
                  category={blogData.category}
                  thumbnail={blogData.thumbnail}
                  blogID={blogData.blogID}
                />
              ))}
            </div>
          </article>
        </>
      )}
    </>
  );
};

export default SimilarBlogs;
