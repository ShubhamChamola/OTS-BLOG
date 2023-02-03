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
  blogId: string,
  setComments: React.Dispatch<
    React.SetStateAction<
      { userId: string; role: "Admin" | "User"; text: string }[]
    >
  >,
  lastCommentKey: string,
  setLastCommentKey: React.Dispatch<React.SetStateAction<string | null>>
) {
  const commentsQuery = query(
    ref(realtimeDB, `comments/${blogId}`),
    orderByKey(),
    endBefore(lastCommentKey),
    limitToLast(10)
  );

  let comments = await get(commentsQuery);

  setComments((prev) => {
    return [...prev, ...(Object.values(comments.val()).reverse() as [])];
  });

  setLastCommentKey(Object.keys(comments.val())[0]);
}
