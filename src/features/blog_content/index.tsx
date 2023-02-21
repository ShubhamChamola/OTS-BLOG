// React Modules
import { useState, useEffect } from "react";

// Component Modules
import BlogContentBase from "./components/BlogContentBase";
import BlogInteraction from "./components/BlogInteraction";
import { WritterInfo } from "../../skeleton/BlogPage";

// Service Modules
import fetchWritterInfo from "../../services/blog/fetchWritterInfo";

interface BlogDataType {
  title: string;
  intro: string;
  fullSizeImage: string | null;
  body: string;
  createdAt: { seconds: number };
  writterID: string;
}

interface WritterDataType {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
}

const dummyBlogImage =
  require("../../assets/images/default_blog_image.jpg") as string;

const BlogContent: React.FC<BlogDataType> = ({
  title,
  intro,
  fullSizeImage,
  body,
  createdAt,
  writterID,
}: BlogDataType) => {
  const [writterInfo, setWritterInfo] = useState<WritterDataType | null>(null);

  // This useEffect is responsible for fetching info of the writter of the blog
  useEffect(() => {
    fetchWritterInfo(writterID, setWritterInfo);
  }, []);

  return (
    <article id="specific-blog">
      <h2>{title}</h2>
      <BlogInteraction />
      <p>{intro}</p>
      <div id="blog-image">
        <img src={fullSizeImage || dummyBlogImage} alt="related to the blog" />
      </div>
      {body.split("\n\n").map((para, index) => (
        <p key={para.slice(0, 10) + index}>
          {para.split("\n").map((textLine) => (
            <span>{textLine}</span>
          ))}
        </p>
      ))}
      {writterInfo ? (
        <BlogContentBase {...writterInfo} createdAt={createdAt} />
      ) : (
        <>
          <WritterInfo />
        </>
      )}
    </article>
  );
};

export default BlogContent;
