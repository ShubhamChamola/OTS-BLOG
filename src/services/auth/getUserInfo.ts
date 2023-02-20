// Firebase Modules
import { onSnapshot, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useLoaderStore from "../../store/useLoaderStore";

// Store Modules
import useUserInfoStore from "../../store/useUserInfoStore";

// Custom Types
interface UserInfoType {
  role: "User" | "Admin";
  userID: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  blogIDs: string[];
  bio: string | null;
  email: string | null;
  likedBlogs: string[];
}

export default async function getUserInfo(
  userID: string,
  role: "Admin" | "User"
) {
  try {
    const unsubscribe = onSnapshot(
      doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, userID),
      (doc) => {
        if (role === "Admin") {
          const { firstName, lastName, avatar, blogIDs, bio, likedBlogs } =
            doc.data() as UserInfoType;

          useUserInfoStore.setState((state) => {
            return {
              ...state,
              info: {
                role,
                userID,
                firstName,
                lastName,
                avatar,
                blogIDs,
                bio,
                likedBlogs,
              },
            };
          });
        } else {
          useUserInfoStore.setState((state) => {
            const { firstName, lastName, avatar, blogIDs, email, likedBlogs } =
              doc.data() as UserInfoType;
            return {
              ...state,
              info: {
                role,
                userID,
                firstName,
                lastName,
                avatar,
                email,
                blogIDs,
                likedBlogs,
              },
            };
          });
        }
      }
    );
    useUserInfoStore.setState((state) => {
      return { ...state, detachListener: unsubscribe };
    });
    useLoaderStore.setState({
      isLoading: false,
      isFetchingInitialUserInfo: false,
    });
  } catch (error) {
    console.log("Unable To Fetch User Info!", error);
    useLoaderStore.setState({
      isLoading: false,
      isFetchingInitialUserInfo: false,
    });
  }
}
