import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useLoaderStore from "../../store/useLoaderStore";

async function emailLogIn(email: string, password: string) {
  try {
    useLoaderStore.setState({ isLoading: true });
    await signInWithEmailAndPassword(auth, email, password);
    useLoaderStore.setState({ isLoading: false });
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      alert("Incorrect Email");
    } else {
      alert(
        `Incorrect Password \n\n Note: Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters`
      );
    }
    useLoaderStore.setState({ isLoading: false });
    console.log(error);
  }
}

export default emailLogIn;
