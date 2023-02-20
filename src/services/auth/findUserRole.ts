// Firebase Modules
import { getDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useLoaderStore from "../../store/useLoaderStore";

// Store Module
import addUserInfo from "./addUserInfo";
import getUserInfo from "./getUserInfo";

// Custom Types
interface AuthUserType {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export default async function findUserRole(user: AuthUserType) {
  try {
    const { uid: userID } = user;

    const userInfoDoc = await getDoc(doc(firestoreDB, "users", userID));

    switch (userInfoDoc.exists()) {
      case true: {
        console.log("Role => USER");
        await getUserInfo(userID, "User");
        break;
      }
      default: {
        const adminInfoDoc = await getDoc(doc(firestoreDB, "admins", userID));

        switch (adminInfoDoc.exists()) {
          case true: {
            console.log("Role => ADMIN");
            await getUserInfo(userID, "Admin");
            break;
          }
          default: {
            console.log("Role => UNDEFINED", "New User");
            addUserInfo(user);
            break;
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    useLoaderStore.setState({
      isLoading: false,
      isFetchingInitialUserInfo: false,
    });
  }
}
