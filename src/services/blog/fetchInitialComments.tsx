import {
  query,
  ref,
  limitToLast,
  get,
  onChildAdded,
  startAfter,
  startAt,
  orderByKey,
  orderByChild,
  orderByValue,
} from "firebase/database";
import { realtimeDB } from "../../lib/firebase";

interface CommentType {
  userID: string;
  text: string;
  role: "Admin" | "User";
}

export default async function fetchInitialComments(
  blogID: string,
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
  setLastCommentKey: React.Dispatch<React.SetStateAction<string | null>>,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>,
  setBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setIsFetching(true);
    let comments: CommentType[] = [];
    let startListeningKey: string = "";

    // This query is responsible for fetching recent 10 comments
    const recentCommentsRef = query(
      ref(realtimeDB, `comments/${blogID}`),
      limitToLast(11)
    );

    const commentsSnapshot = await get(recentCommentsRef);
    if (commentsSnapshot.size < 11) {
      setBtnDisabled(true);
    }
    let size = commentsSnapshot.size - 1;
    let index = 0;

    commentsSnapshot.forEach((comment) => {
      if (comment.exists()) {
        const { userID, text, role } = comment.val() as CommentType;

        if (index <= size - 1) {
          comments.unshift({ userID, text, role });
        }

        if (index === 0) {
          setLastCommentKey(comment.key);
        }

        if (index === size) {
          startListeningKey = comment.key!;
        }
        index++;
      }
    });

    setComments(comments);

    // This event function will be called whenever a new comment is posted on the database
    const listeningCommentsRef =
      size > 0
        ? query(
            ref(realtimeDB, `comments/${blogID}`),
            startAt(startListeningKey),
            orderByKey()
          )
        : ref(realtimeDB, `comments/${blogID}`);

    onChildAdded(listeningCommentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const { userID, text, role } = snapshot.val();
        setComments((prev) => {
          return [{ userID, text, role }, ...prev];
        });
      }
    });

    setIsFetching(false);
  } catch (error) {
    setIsFetching(false);
    console.log(error);
  }
}
