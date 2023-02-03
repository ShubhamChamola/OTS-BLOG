import { firestoreDB } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import useCommentersInfoStore from "../../store/useCommentersInfo";

export default async function fetchCommenterInfo(
  userId: string,
  role: "Admin" | "User"
) {
  const docSnap = await getDoc(
    doc(firestoreDB, role === "Admin" ? "admins" : "users", userId)
  );

  // const addCommentersInfo = useCommentersInfoStore.getState().addCommentersInfo;

  if (docSnap.exists()) {
    const { firstName, lastName, avatar } = docSnap.data();

    // addCommentersInfo({ firstName, lastName, avatar, userId });

    return { firstName, lastName, avatar };
  } else {
    return null;
  }
}
