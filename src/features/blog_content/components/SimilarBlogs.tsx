import { useEffect, useState } from "react";
import BlogTile from "../../../components/global/BlogTile";
import fetchSimilarBlogs from "../../../services/blog/fetchSimilarBlogs";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

interface Prop {
  category: string;
}

interface Blog {
  id: string;
  title: string;
  intro: string;
  category: string;
  image: string | null;
  readTime: number;
  body: string;
  createdAt: Date;
}

const SimilarBlogs: React.FC<Prop> = ({ category }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { blogId: currentBlogId } = useParams();

  useEffect(() => {
    (async () => {
      fetchSimilarBlogs(category).then((fetchedBlogs) => {
        setBlogs(fetchedBlogs.filter((blog) => blog.id !== currentBlogId));
      });
    })();
  }, []);

  return ReactDOM.createPortal(
    <>
      <h4>Read More Articles Like This</h4>
      {blogs.length >= 1 ? (
        <>
          {blogs.map((blogData) => (
            <BlogTile
              key={blogData.id}
              title={blogData.title}
              date={blogData.createdAt}
              readTime={blogData.readTime}
              category={blogData.category}
              image={blogData.image}
              blogId={blogData.id}
            />
          ))}
        </>
      ) : (
        <p>No Similar Blogs Found</p>
      )}
    </>,
    document.getElementById("similar-blogs")!
  );
};

export default SimilarBlogs;
