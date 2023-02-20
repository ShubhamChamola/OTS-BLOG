import "./style.scss";
import Container from "../../../components/ui/Container";

export default function HeroSkeleton() {
  return (
    <article id="hero" className="hero-skeleton">
      <Container id="hero-container">
        <div className="skeleton-parent">
          <h1 className="skeleton">{}</h1>
          <p className="skeleton"></p>
        </div>
        <div className="skeleton"></div>
      </Container>
    </article>
  );
}
