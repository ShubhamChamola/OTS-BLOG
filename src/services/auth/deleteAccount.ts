import { deleteUser, signOut } from "firebase/auth";
import { auth, firestoreDB } from "../../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteAccount() {
  const user = auth.currentUser;

  await deleteDoc(doc(firestoreDB, "users", user!.uid));
  console.log("doc deleted");

  await deleteUser(user!);

  console.log("now sign out");

  // Remove the avatar image related to the account

  await signOut(auth);
}
