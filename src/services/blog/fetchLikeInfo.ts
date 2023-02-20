import { doc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

export default async function fetchLikeInfo(
  blogId: string,
  userId: string,
  setLikedState: (value: boolean) => void
) {
  onSnapshot(doc(firestoreDB, "blogs", blogId), (doc) => {
    if (doc.exists()) {
      if (doc.data().likedUsers.includes(userId)) {
        setLikedState(true);
      } else {
        setLikedState(false);
      }
    }
  });
}
