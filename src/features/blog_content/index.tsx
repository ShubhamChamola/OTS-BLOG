import BlogContentBase from "./components/BlogContentBase";
import BlogInteraction from "./components/BlogInteraction";
import { useState, useEffect } from "react";
import fetchBlogInfo from "../../services/blog/fetchBlogInfo";
import { useParams } from "react-router-dom";
import fetchWritterInfo from "../../services/blog/fetchWritterInfo";
import SimilarBlogs from "./components/SimilarBlogs";

interface BlogData {
  blogId: string;
  title: string;
  category: string;
  intro: string;
  image: string | null;
  body: string;
  createdAt: Date;
  writterId: string;
}

interface WritterData {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  writtenAt: Date;
}

const dummyBlogImage = require("../../assets/images/default_blog_image.jpg")!;

const BlogContent: React.FC = () => {
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [writterInfo, setWritterInfo] = useState<WritterData | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchBlogInfo(blogId!);
      setBlogData(data as BlogData);

      const writter = await fetchWritterInfo(data.writterId);

      setWritterInfo({ ...writter, writtenAt: data.createdAt });
    })();
  }, [blogId]);

  return (
    <article id="specific-blog">
      {blogData ? (
        <>
          <h2>{blogData.title}</h2>
          <BlogInteraction />
          <p>{blogData.intro}</p>
          <div id="blog-image">
            <img
              src={blogData.image || dummyBlogImage}
              alt="related to the blog"
            />
          </div>
          {blogData.body.split("\n\n").map((para, index) => (
            <p key={para.slice(0, 10) + index}>{para}</p>
          ))}
          {writterInfo && <BlogContentBase {...writterInfo} />}
          {/* <SimilarBlogs category={blogData.category} /> */}
        </>
      ) : (
        "This Blog Doesn't exist in the Database"
      )}
    </article>
  );
};

export default BlogContent;
