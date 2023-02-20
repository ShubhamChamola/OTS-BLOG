import { realtimeDB } from "../../lib/firebase";
import {
  ref,
  limitToLast,
  query,
  get,
  endBefore,
  orderByKey,
} from "firebase/database";

export default async function fetchComments(
  blogID: string,
  setComments: React.Dispatch<
    React.SetStateAction<
      { userID: string; role: "Admin" | "User"; text: string }[]
    >
  >,
  lastCommentKey: string,
  setLastCommentKey: React.Dispatch<React.SetStateAction<string | null>>,
  setBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const commentsQuery = query(
      ref(realtimeDB, `comments/${blogID}`),
      orderByKey(),
      endBefore(lastCommentKey),
      limitToLast(10)
    );

    let comments = await get(commentsQuery);
    if (comments.size > 0) {
      setComments((prev) => {
        return [...prev, ...(Object.values(comments.val()).reverse() as [])];
      });
    } else {
      setBtnDisabled(true);
    }
    if (comments.size < 10) {
      setBtnDisabled(true);
    }

    setLastCommentKey(Object.keys(comments.val())[0]);
  } catch (error) {
    console.log(error);
  }
}
