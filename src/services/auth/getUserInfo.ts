import { onSnapshot, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useAuthStore from "../../store/useAuthStore";
import useUnsubFuncsStore from "../../store/useUnsubFuncsStore";
import useUserInfoStore from "../../store/useUserInfoStore";

interface InfoType {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  avatarFileAddress: string | null;
  bookmarkedBlogs: string[];
  createdBlogs: string[];
  email: string | null;
  bio: string | null;
}

export async function getUserInfo(uid: string) {
  const role = useAuthStore.getState().role;
  console.log(`got the info for ${role}`);
  const unsubscribe = onSnapshot(
    doc(firestoreDB, `${role === "Admin" ? "admins" : "users"}`, uid),
    (doc) => {
      if (role === "Admin") {
        const {
          firstName,
          lastName,
          avatar,
          avatarFileAddress,
          bio,
          createdBlogs: blogs,
        } = doc.data() as InfoType;

        useUserInfoStore.setState({
          firstName,
          lastName,
          avatar,
          avatarFileAddress,
          bio,
          blogs,
        });
      } else {
        const {
          firstName,
          lastName,
          avatar,
          avatarFileAddress,
          bookmarkedBlogs: blogs,
        } = doc.data() as InfoType;

        useUserInfoStore.setState({
          firstName,
          lastName,
          avatar,
          avatarFileAddress,
          blogs,
        });
      }
    }
  );
  useUnsubFuncsStore.setState({ unSubGetUserInfo: unsubscribe });
}
