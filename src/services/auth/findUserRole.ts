import { getDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useAuthStore from "../../store/useAuthStore";

export default async function findUserRole(uid: string) {
  const adminInfoDoc = await getDoc(doc(firestoreDB, "admins", uid));

  if (adminInfoDoc.exists()) {
    console.log("user exist and has a role of ADMIN");
    useAuthStore.setState({ role: "Admin", userId: uid });
    return true;
  } else {
    const userInfoDoc = await getDoc(doc(firestoreDB, "users", uid));
    if (userInfoDoc.exists()) {
      console.log("user exist and has a role of USER");
      useAuthStore.setState({ role: "User", userId: uid });
      return true;
    } else {
      console.log("user doesn't exist, adding user info...");
      return false;
    }
  }
}
