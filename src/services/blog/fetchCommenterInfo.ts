// Firebase Modules
import { firestoreDB } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function fetchCommenterInfo(
  userId: string,
  role: "Admin" | "User"
) {
  try {
    const docSnap = await getDoc(
      doc(firestoreDB, role === "Admin" ? "admins" : "users", userId)
    );

    if (docSnap.exists()) {
      const { firstName, lastName, avatar } = docSnap.data();

      return { firstName, lastName, avatar };
    }
  } catch (error) {
    console.log(error);
  }
}
