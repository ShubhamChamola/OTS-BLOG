import { lazy, Suspense } from "react";
import HomePageAside from "../layouts/home_page_aside";
import Container from "../components/ui/Container";
import "../assets/styles/blogPage.scss";
import ComponentLoader from "../components/loaders/component_loader/ComponentLoader";
const BlogContent = lazy(() => import("../features/blog_content"));
const CommentTile = lazy(() => import("../features/comment_tile"));

const BlogPage: React.FC = () => {
  return (
    <section id="blog-page">
      <Container id="blog-container">
        <HomePageAside />
        <Suspense fallback={<ComponentLoader />}>
          <BlogContent />
        </Suspense>
        <div id="similar-blogs"></div>
        <Suspense fallback={<ComponentLoader />}>
          <CommentTile />
        </Suspense>
      </Container>
    </section>
  );
};

export default BlogPage;
