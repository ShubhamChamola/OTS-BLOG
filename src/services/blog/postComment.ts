import { realtimeDB } from "../../lib/firebase";
import { ref, set, push } from "firebase/database";

interface CommentData {
  blogId: string;
  userId: string;
  comment: string;
  role: "Admin" | "User";
}

export default async function postComment({
  blogId,
  userId,
  role,
  comment: text,
}: CommentData) {
  set(push(ref(realtimeDB, `comments/${blogId}`)), {
    userId,
    text,
    role,
  });
}
