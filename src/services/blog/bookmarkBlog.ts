// Firebase Modules
import {
  runTransaction,
  doc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useUserInfoStore from "../../store/useUserInfoStore";

export default async function bookmarkBlog(userID: string, blogID: string) {
  try {
    const { blogIDs } = useUserInfoStore.getState().info;

    await runTransaction(firestoreDB, async (transaction) => {
      if (blogIDs.includes(blogID)) {
        transaction.update(doc(firestoreDB, "users", userID), {
          blogIDs: arrayRemove(blogID),
        });
      } else {
        transaction.update(doc(firestoreDB, "users", userID), {
          blogIDs: arrayUnion(blogID),
        });
      }
    });
  } catch (error: any) {
    console.log(error);
  }
}
