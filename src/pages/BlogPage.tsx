import BlogContent from "../features/blog_content";
import HomePageAside from "../layouts/home_page_aside";
import BackArrowSVG from "../assets/icons/BackArrowSVG";
import CommentTile from "../features/comment_tile";
import Container from "../components/ui/Container";
import "../assets/styles/blogPage.scss";
import { useNavigate } from "react-router-dom";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="blog-page">
      <Container id="blog-container">
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackArrowSVG /> <span>Back To Home</span>
        </div>
        <HomePageAside />
        <BlogContent />
        <div id="similar-blogs"></div>
        <CommentTile />
      </Container>
    </section>
  );
};

export default BlogPage;
