// Component Module
import Container from "../components/ui/Container";
import BlogTileSkeleton from "./BlogTileSkeleton";
import LikedBlogSkeleton from "./BlogMinimalTileSkeleton";

// CSS Module
import "../assets/styles/home_page.scss";
import AsideSkeleton from "./AsideSkeleton";

export default function HomePage() {
  return (
    <section id="home-page" className="skeleton-parent">
      <article id="hero">
        <Container id="hero-container">
          <div>
            <h3 className="skeleton">{}</h3>
            <p className="skeleton"></p>
          </div>
          <div className="skeleton"></div>
        </Container>
      </article>
      <Container id="home-container">
        <AsideSkeleton />
        <article id="blog-browse">
          <BlogTileSkeleton />
          <BlogTileSkeleton />
          <BlogTileSkeleton />
        </article>
      </Container>
    </section>
  );
}
