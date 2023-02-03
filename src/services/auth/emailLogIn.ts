import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function emailLogIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
}

export default emailLogIn;
