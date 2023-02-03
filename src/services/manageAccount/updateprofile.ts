import useAuthStore from "../../store/useAuthStore";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import uploadImage from "../uploadFile/uploadImage";
import useUserInfoStore from "../../store/useUserInfoStore";

interface Arg {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export default async function updateProfile(data: Arg, avatar?: File) {
  const { userId, role } = useAuthStore.getState();
  const { avatarFileAddress } = useUserInfoStore.getState();

  await updateDoc(
    doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, userId!),
    {
      ...data,
    }
  ).then(() => {
    if (avatar) {
      uploadImage(
        avatar,
        `${avatar.name}-${new Date().getTime()}`,
        userId!,
        `${role === "User" ? "user_avatar" : "admin_avatar"}`,
        avatarFileAddress!
      );
    }
  });
}
