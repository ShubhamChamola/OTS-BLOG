// Firebase Modules
import { setDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useLoaderStore from "../../store/useLoaderStore";

// Custom Modules
import extractUserName from "../../utils/extractUserName";
import uploadImage from "../uploadFile/uploadImage";
import getUserInfo from "./getUserInfo";

interface AuthUserType {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface UserInfoType {
  firstName: string;
  lastName: string;
  email: null | string;
  avatar: null | string;
  blogIDs: string[];
  likedBlogs: string[];
}

// This function hepl us to convert the photourl that we receive from the auth into a file
async function convertUrlToFile(url: string, userID: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], `${userID}_avatar`, { type: "image/jpg" });
    return file;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function addUserInfo(user: AuthUserType) {
  try {
    const userID = user.uid;

    const userInfo: UserInfoType = {
      firstName: "OTS",
      lastName: "User",
      email: user.email,
      avatar: null,
      blogIDs: [],
      likedBlogs: [],
    };

    if (user.displayName) {
      [userInfo.firstName, userInfo.lastName] = extractUserName(
        user.displayName
      );
    }

    if (user.photoURL) {
      const file = await convertUrlToFile(user.photoURL, userID);

      // uploadImage is a promise which return us a url of the image uploaded on firebase storage
      if (file) {
        const downloadUrl = await uploadImage(file, userID, "user_avatar");
        await setDoc(doc(firestoreDB, "users", userID), {
          ...userInfo,
          avatar: downloadUrl,
        });
      } else {
        await setDoc(doc(firestoreDB, "users", userID), {
          ...userInfo,
        });
      }

      await getUserInfo(userID, "User");
    } else {
      console.log("no photo url present");

      await setDoc(doc(firestoreDB, "users", userID), {
        ...userInfo,
      });

      await getUserInfo(userID, "User");
    }
  } catch (error) {
    console.log(error);
    useLoaderStore.setState({
      isLoading: false,
      isFetchingInitialUserInfo: false,
    });
  }
}
