// Component Modules
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

// Default Module
import ReactDOM from "react-dom";

// Assets Modules
import CloseSVG from "../../assets/icons/CloseSVG";
import GoogleSVG from "../../assets/icons/GoogleSVG";
import FaceBookSVG from "../../assets/icons/FaceBookSVG";

// Service Modules
import googleAuth from "../../services/auth/googleAuth";

interface Props {
  changeModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: React.FC<Props> = ({ changeModalState }) => {
  return ReactDOM.createPortal(
    <div
      id="auth-modal"
      onClick={(event) => {
        if ((event.target as HTMLElement).id === "auth-modal") {
          changeModalState(false);
        }
      }}
    >
      <Container id="auth-container">
        <div className="modal-interaction">
          <div
            className="close"
            onClick={() => {
              changeModalState(false);
            }}
          >
            <span>Close</span>
            <CloseSVG />
          </div>
        </div>
        <h3>Sign In</h3>
        <p>Sign in to enjoy the full benefits of our services</p>
        <div className="btns">
          <Button
            onClick={() => {
              googleAuth();
            }}
            className="outlined-btn"
          >
            <GoogleSVG />
            <span></span>
            <span>Google</span>
          </Button>
          <Button
            onClick={() => {
              console.log("facebook auth");
            }}
            className="outlined-btn"
          >
            <FaceBookSVG />
            <span></span>
            <span>Facebook</span>
          </Button>
        </div>
        <p>
          By continuing, you agree to OTS ’s <span>Terms of Use</span> . Read
          our <span>Privacy Policy</span>.
        </p>
      </Container>
    </div>,
    document.querySelector("body") as HTMLElement
  );
};

export default AuthModal;
