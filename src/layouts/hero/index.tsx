import Container from "../../components/ui/Container";

const heroImg = require("../../assets/images/hero-img.png") as string;

const HeroSection: React.FC = () => {
  return (
    <article id="hero">
      <Container id="hero-container">
        <div>
          <h1>Blogs for Automobile Enthusiasts</h1>
          <p>
            Articles curated for the bike enthusiasts that want to keep up with
            the latest news in two wheeler segment.
          </p>
        </div>
        <div>
          <img src={heroImg} alt="Vintage Bike" />
        </div>
      </Container>
    </article>
  );
};

export default HeroSection;
