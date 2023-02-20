// React Modules
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Component Modules
import BlogCreator from "../features/blog_creator";
import Container from "../components/ui/Container";

// Assets Modules
import BackArrowSVG from "../assets/icons/BackArrowSVG";

// CSS Modules
import "../assets/styles/createBlogPage.scss";

// Store Modules
import useUserInfoStore from "../store/useUserInfoStore";

const CreateBlogPage: React.FC = () => {
  const { role } = useUserInfoStore((store) => store.info);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Admin") {
      return;
    } else {
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
