// Firebase Modules
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface BlogDataType {
  title: string;
  intro: string;
  fullSizeImage: string | null;
  body: string;
  category: string;
  createdAt: { seconds: number };
  writterID: string;
}

export default async function fetchBlogInfo(
  blogID: string,
  setBlogData: React.Dispatch<React.SetStateAction<BlogDataType | null>>
) {
  try {
    const blogRef = doc(firestoreDB, "blogs", blogID);
    const blogSnap = await getDoc(blogRef);

    const {
      title,
      intro,
      fullSizeImage,
      body,
      createdAt,
      writterID,
      category,
    } = blogSnap.data() as BlogDataType;

    setBlogData({
      title,
      intro,
      category,
      body,
      createdAt,
      writterID,
      fullSizeImage,
    });
  } catch (error) {
    console.log("Blog Not Found!");
  }
}
