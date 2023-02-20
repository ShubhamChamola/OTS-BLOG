import { realtimeDB } from "../../lib/firebase";
import { ref, set, push } from "firebase/database";

interface CommentData {
  blogID: string;
  userID: string;
  comment: string;
  role: "Admin" | "User";
}

export default async function postComment({
  blogID,
  userID,
  role,
  comment: text,
}: CommentData) {
  try {
    await set(push(ref(realtimeDB, `comments/${blogID}`)), {
      userID,
      text,
      role,
    });
  } catch (error) {
    console.log(error);
  }
}
