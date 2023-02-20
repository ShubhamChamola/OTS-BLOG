// Firebase Modules
import { deleteUser } from "firebase/auth";
import { auth, firestoreDB, storage } from "../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

// Store Module
import useLoaderStore from "../../store/useLoaderStore";
import useUserInfoStore from "../../store/useUserInfoStore";
import signOutUser from "./signOutUser";

export default async function deleteAccount() {
  try {
    deleteUser(auth.currentUser!).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
    useLoaderStore.setState({ isLoading: true });
    const { userID } = useUserInfoStore.getState().info;

    await deleteDoc(doc(firestoreDB, "users", userID!));

    const desertRef = ref(storage, `user_avatar/${userID}`);

    await deleteObject(desertRef);

    useLoaderStore.setState({ isLoading: false });

    deleteUser(auth.currentUser!);
    await signOutUser();
  } catch (error) {
    console.log("Unable To Delete The User!", error);
    alert(
      "Plz Sign out and log in again to delete your account, for security purpose you need to be a recently logged in user for deleting your account"
    );
    useLoaderStore.setState({ isLoading: false });
  }
}
