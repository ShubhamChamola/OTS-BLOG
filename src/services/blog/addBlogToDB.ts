// Firebase Modules
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

// Service Module
import uploadImage from "../uploadFile/uploadImage";

// Store Module
import useUserInfoStore from "../../store/useUserInfoStore";
import useLoaderStore from "../../store/useLoaderStore";

interface BlogDataType {
  title: string;
  intro: string;
  category: string;
  image: File | null;
  readTime: number;
  body: string;
}

export default async function addBlogToDB(data: BlogDataType) {
  try {
    useLoaderStore.setState({ isLoading: true });
    const { userID, role } = useUserInfoStore.getState().info;

    if (role === "Admin" && userID) {
      const blogRef = await addDoc(collection(firestoreDB, "blogs"), {
        title: data.title,
        intro: data.intro,
        category: data.category,
        readTime: data.readTime,
        body: data.body,
        writterID: userID,
        createdAt: serverTimestamp(),
        likes: 0,
      });

      if (data.image) {
        const thumbnail = await uploadImage(
          data.image,
          blogRef.id,
          "blog_image/thumbnail"
        );
        const fullSizeImage = await uploadImage(
          data.image,
          blogRef.id,
          "blog_image/full_size"
        );

        await updateDoc(doc(firestoreDB, "blogs", blogRef.id), {
          fullSizeImage: fullSizeImage,
          thumbnail: thumbnail,
        });

        await updateDoc(doc(firestoreDB, "admins", userID), {
          blogIDs: arrayUnion(blogRef.id),
        });
        useLoaderStore.setState({ isLoading: false });
        window.history.back();
      } else {
        await updateDoc(doc(firestoreDB, "admins", userID), {
          createdBlogs: arrayUnion(blogRef.id),
        });
        useLoaderStore.setState({ isLoading: false });
        window.history.back();
      }
    } else {
      useLoaderStore.setState({ isLoading: false });
      throw new Error("You dont have rights to create a blog");
    }
  } catch (error) {
    console.log(error);
  }
}
