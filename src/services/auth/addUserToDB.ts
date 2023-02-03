import { setDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import extractUserName from "../../utils/extractUserName";
import uploadImage from "../uploadFile/uploadImage";
import { getUserInfo } from "./getUserInfo";

interface Info {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

interface UserInfo {
  firstName: null | string;
  lastName: null | string;
  email: null | string;
  avatar: null | string;
  bookmarkedBlogs: string[];
}

export default async function addUserToDB(user: Info) {
  try {
    const userInfo: UserInfo = {
      firstName: null,
      lastName: null,
      email: user.email,
      avatar: null,
      bookmarkedBlogs: [],
    };

    if (user.displayName) {
      [userInfo.firstName, userInfo.lastName] = extractUserName(
        user.displayName
      );
    } else {
      userInfo.firstName = "User";
      userInfo.lastName = user.uid.slice(0, 5);
    }

    await setDoc(doc(firestoreDB, "users", user.uid), {
      ...userInfo,
    });

    if (user.photoURL) {
      try {
        fetch(user.photoURL)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            const file = new File(
              [blob],
              `${userInfo.firstName}-${new Date().getTime()}`,
              { type: "image/jpg" }
            );
            uploadImage(file, file.name, user.uid, "user_avatar");
          });
      } catch (error) {
        window.location.reload();
        console.log(error);
      }
    }

    await getUserInfo(user.uid);
  } catch (error) {
    console.log(error);
    window.location.reload();
  }
}
