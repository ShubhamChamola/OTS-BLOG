// React Modules
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Component Modules
import HomePageAside from "../layouts/home_page_aside";
import Container from "../components/ui/Container";
import BlogContent from "../features/blog_content/index";
import SimilarBlogs from "../features/similar-blogs";
import {
  BlogContentSkeleton,
  SimilarBlogsSkeleton,
} from "../skeleton/BlogPage";

// CSS Module
import "../assets/styles/blogPage.scss";

// Service Modules
import fetchBlogInfo from "../services/blog/fetchBlogInfo";
import CommentSection from "../features/comment_section";

interface BlogDataType {
  title: string;
  category: string;
  intro: string;
  fullSizeImage: string | null;
  body: string;
  createdAt: { seconds: number };
  writterID: string;
}

const BlogPage: React.FC = () => {
  const { blogID } = useParams();

  const [blogData, setBlogData] = useState<BlogDataType | null>(null);

  useEffect(() => {
    setBlogData(null);
    fetchBlogInfo(blogID!, setBlogData);
  }, [blogID]);

  return (
    <section id="blog-page">
      <Container id="blog-container">
        <HomePageAside />
        {blogData ? (
          <BlogContent {...blogData} />
        ) : (
          <>
            <BlogContentSkeleton />
          </>
        )}
        {blogData ? (
          <SimilarBlogs category={blogData.category} />
        ) : (
          <SimilarBlogsSkeleton />
        )}
        <CommentSection />
      </Container>
    </section>
  );
};

export default BlogPage;
