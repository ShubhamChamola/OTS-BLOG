// Firebase Modules
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

// Service Modules
import uploadImage from "../uploadFile/uploadImage";

// Store Modules
import useUserInfoStore from "../../store/useUserInfoStore";
import useLoaderStore from "../../store/useLoaderStore";

interface Arg {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export default async function updateProfile(data: Arg, avatar?: File) {
  try {
    useLoaderStore.setState({ isLoading: true });
    const { userID, role } = useUserInfoStore.getState().info;

    await updateDoc(
      doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, userID!),
      {
        ...data,
      }
    );

    if (avatar) {
      const downloadURL = await uploadImage(
        avatar,
        userID!,
        `${role === "User" ? "user_avatar" : "admin_avatar"}`
      );

      await updateDoc(
        doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, userID!),
        {
          avatar: downloadURL,
        }
      );

      useLoaderStore.setState({ isLoading: false });
    } else {
      useLoaderStore.setState({ isLoading: false });
    }
  } catch (error) {
    console.log(error, "Failed to Update User Info");
    useLoaderStore.setState({ isLoading: false });
  }
}
