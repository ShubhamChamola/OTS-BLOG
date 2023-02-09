import { deleteUser, signOut } from "firebase/auth";
import { auth, firestoreDB } from "../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import useLoadingState from "../../store/useLoadState";

const { setIsLoading } = useLoadingState.getState();

export default async function deleteAccount() {
  const user = auth.currentUser;

  setIsLoading(true);

  await deleteDoc(doc(firestoreDB, "users", user!.uid));
  console.log("doc deleted");

  await deleteUser(user!).then(() => {
    setIsLoading(false);
  });

  // Remove the avatar image related to the account

  await signOut(auth);
}
