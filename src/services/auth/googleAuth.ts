// Firebase Modules
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";

// Store Module
import useLoaderStore from "../../store/useLoaderStore";

const googleAuth = () => {
  useLoaderStore.setState({ isLoading: true });
  signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    useLoaderStore.setState({ isLoading: false });
  });
};

export default googleAuth;
