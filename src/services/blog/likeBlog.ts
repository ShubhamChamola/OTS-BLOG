import {
  runTransaction,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

export default async function likeBlog(blogId: string, userId: string) {
  try {
    const blogDocRef = doc(firestoreDB, "blogs", blogId);

    await runTransaction(firestoreDB, async (transaction) => {
      const blogDoc = await transaction.get(blogDocRef);

      if (!blogDoc.exists()) {
        throw "Blog does not exist!";
      }

      const likedUsers = blogDoc.data().likedUsers;
      const likes = blogDoc.data().likes;

      if (likedUsers.includes(userId)) {
        transaction.update(doc(firestoreDB, "blogs", blogId), {
          likedUsers: arrayRemove(userId),
        });

        transaction.update(blogDocRef, { likes: likes - 1 });
      } else {
        transaction.update(doc(firestoreDB, "blogs", blogId), {
          likedUsers: arrayUnion(userId),
        });

        transaction.update(blogDocRef, { likes: likes + 1 });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
