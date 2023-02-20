import {
  runTransaction,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useUserInfoStore from "../../store/useUserInfoStore";

export default async function likeBlog(blogID: string) {
  try {
    const { userID, role } = useUserInfoStore.getState().info;

    const blogDocRef = doc(firestoreDB, "blogs", blogID);
    const userDocRef = doc(
      firestoreDB,
      `${role === "Admin" ? "admins" : "users"}`,
      userID!
    );

    await runTransaction(firestoreDB, async (transaction) => {
      const blogDoc = await transaction.get(blogDocRef);
      const userDoc = await transaction.get(userDocRef);

      if (!blogDoc.exists() && !userDoc.exists()) {
        throw new Error("Either blog or user does not exist!");
      }

      const likes = blogDoc.data()?.likes;
      const likedBlogs = userDoc.data()?.likedBlogs;

      if (likedBlogs.includes(blogID)) {
        transaction.update(blogDocRef, { likes: likes - 1 });
        transaction.update(userDocRef, { likedBlogs: arrayRemove(blogID) });
      } else {
        transaction.update(blogDocRef, { likes: likes + 1 });
        transaction.update(userDocRef, {
          likedBlogs: arrayUnion(blogID),
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
