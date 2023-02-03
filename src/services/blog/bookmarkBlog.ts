import {
  runTransaction,
  doc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

export default async function bookmarkBlog(userId: string, blogId: string) {
  try {
    const userDocRef = doc(firestoreDB, "users", userId);

    await runTransaction(firestoreDB, async (transaction) => {
      const bookmarkedBlogs = await transaction.get(userDocRef).then((doc) => {
        if (doc.exists()) {
          return doc.data().bookmarkedBlogs;
        } else {
          return [];
        }
      });

      if (bookmarkedBlogs.includes(blogId)) {
        transaction.update(doc(firestoreDB, "users", userId), {
          bookmarkedBlogs: arrayRemove(blogId),
        });
      } else {
        transaction.update(doc(firestoreDB, "users", userId), {
          bookmarkedBlogs: arrayUnion(blogId),
        });
      }
    });
  } catch (error: any) {
    console.log(error);
  }
}
