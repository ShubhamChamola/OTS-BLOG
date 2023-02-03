import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";

const googleAuth = () => {
  signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

export default googleAuth;
