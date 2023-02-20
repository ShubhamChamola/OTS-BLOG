// Component Module
import HomePageAside from "../layouts/home_page_aside";
import HeroSection from "../layouts/hero";
import BlogBrowse from "../features/blog_browse";
import Container from "../components/ui/Container";

// CSS Module
import "../assets/styles/home_page.scss";

const HomePage: React.FC = () => {
  return (
    <section id="home-page">
      <HeroSection />
      <Container id="home-container">
        <HomePageAside />
        <BlogBrowse />
      </Container>
    </section>
  );
};

export default HomePage;
