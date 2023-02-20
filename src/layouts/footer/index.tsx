// Component Modules
import Base from "./components/Base";
import NewsLetterSub from "./components/NewsLetterSub";
import Container from "../../components/ui/Container";

const footerImg = require("../../assets/images/footer-img.jpg") as string;

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container id="footer-container">
        <NewsLetterSub />
        <div className="footer-img">
          <img src={footerImg} alt="tools in mechanic's workshop" />
        </div>
        <Base />
      </Container>
    </footer>
  );
};

export default Footer;
