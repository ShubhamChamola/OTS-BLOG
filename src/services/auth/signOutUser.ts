// Firebase Modules
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

// Store Modules
import useUserInfoStore from "../../store/useUserInfoStore";

// This function is responsible for signing out a user as well as clearing the store of both authStore as well as userInfo store
export default async function signOutUser() {
  const { clearInfo, detachListener } = useUserInfoStore.getState();

  await signOut(auth);
  clearInfo();
  detachListener && detachListener();
}
