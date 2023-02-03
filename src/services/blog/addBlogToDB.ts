import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useAuthStore from "../../store/useAuthStore";
import uploadImage from "../uploadFile/uploadImage";

interface Data {
  title: string;
  intro: string;
  category: string;
  image: File | null;
  readTime: number;
  body: string;
}

export default async function addBlogToDB(data: Data) {
  try {
    const { userId, role } = useAuthStore.getState();

    if (role === "Admin" && userId) {
      const blogRef = await addDoc(collection(firestoreDB, "blogs"), {
        title: data.title,
        intro: data.intro,
        category: data.category,
        readTime: data.readTime,
        body: data.body,
        writterId: userId,
        createdAt: serverTimestamp(),
        likedUsers: [],
        likes: 0,
      });

      if (data.image) {
        console.log("here");
        const fileName = `${data.image.name}-${new Date().getTime()}`;
        await uploadImage(data.image, fileName, blogRef.id, "blog_thumbnail");
        await updateDoc(doc(firestoreDB, "admins", userId), {
          createdBlogs: arrayUnion(blogRef.id),
        });
        console.log("now site should reload");
        window.history.back();
      } else {
        console.log("else");
        await updateDoc(doc(firestoreDB, "admins", userId), {
          createdBlogs: arrayUnion(blogRef.id),
        });
        window.history.back();
      }
    } else {
      throw "You dont have the rights to create a blog";
    }
  } catch (error) {
    console.log(error);
  }
}
