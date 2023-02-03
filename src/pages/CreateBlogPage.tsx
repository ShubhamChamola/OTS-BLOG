import BlogCreator from "../features/blog_creator";
import BackArrowSVG from "../assets/icons/BackArrowSVG";
import Container from "../components/ui/Container";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import "../assets/styles/createBlogPage.scss";

const CreateBlogPage: React.FC = () => {
  console.log("create blog page");
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "User") {
      navigate(-1);
    }
  }, [role]);

  return (
    <section id="create-blog-page">
      <Container id="create-blog-container">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackArrowSVG />
          <span>Back To Panel</span>
        </div>
        <BlogCreator />
      </Container>
    </section>
  );
};

export default CreateBlogPage;
