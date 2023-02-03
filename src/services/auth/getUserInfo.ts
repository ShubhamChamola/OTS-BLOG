import { onSnapshot, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useAuthStore from "../../store/useAuthStore";
import useUnsubFuncsStore from "../../store/useUnsubFuncsStore";
import useUserInfoStore from "../../store/useUserInfoStore";

export async function getUserInfo(uid: string) {
  const role = useAuthStore.getState().role;
  console.log(`got the info for ${role}`);
  const unsubscribe = onSnapshot(
    doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, uid),
    (doc) => {
      useUserInfoStore.setState({
        ...doc.data(),
      });
    }
  );
  useUnsubFuncsStore.setState({ unSubGetUserInfo: unsubscribe });
}
