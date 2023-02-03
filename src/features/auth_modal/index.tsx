import { useState } from "react";
import ReactDOM from "react-dom";
import googleAuth from "../../services/auth/googleAuth";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import CloseSVG from "../../assets/icons/CloseSVG";
import GoogleSVG from "../../assets/icons/GoogleSVG";
import FaceBookSVG from "../../assets/icons/FaceBookSVG";

interface Props {
  changeModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: React.FC<Props> = ({ changeModalState }) => {
  const [authState, setAuthState] = useState<"signIn" | "signUp">("signUp");

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
        <h3>{authState === "signUp" ? "Sign Up" : "Sign In"}</h3>
        <div className="btns">
          <Button
            id="google-auth"
            onClick={() => {
              googleAuth();
            }}
            className="outlined-btn"
          >
            <GoogleSVG />
            <span>Google</span>
          </Button>
          <Button
            id="facebook-auth"
            onClick={() => {
              console.log("facebook auth");
            }}
            className="outlined-btn"
          >
            <FaceBookSVG />
            <span>Facebook</span>
          </Button>
        </div>
        <div className="seperator">
          <span>OR</span>
          <span></span>
        </div>
        <p>
          {authState === "signUp"
            ? "Already Have An Account?"
            : "Don't Have An Account Sign Up For Free"}
        </p>
        {authState === "signUp" ? (
          <Button
            id="sign-In"
            className="outlined-btn"
            onClick={() => {
              setAuthState("signIn");
            }}
          >
            Sign In
          </Button>
        ) : (
          <Button
            id="sign-up"
            className="outlined-btn"
            onClick={() => {
              setAuthState("signUp");
            }}
          >
            Sign Up
          </Button>
        )}
      </Container>
    </div>,
    document.querySelector("body") as HTMLElement
  );
};

export default AuthModal;
