// Firebase Modules
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Custom Modules
import findUserRole from "./findUserRole";
import useLoaderStore from "../../store/useLoaderStore";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await findUserRole(user);
  } else {
    useLoaderStore.setState({
      isLoading: false,
      isFetchingInitialUserInfo: false,
    });
    console.log("No one is loagged in!");
  }
});
