// Firebase Modules
import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface BlogTileType {
  blogID: string;
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
}

export default async function fetchSimilarBlogs(
  category: string,
  currBlogID: string,
  setBlogs: React.Dispatch<React.SetStateAction<BlogTileType[]>>,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const blogsQuery = query(
      collection(firestoreDB, "blogs"),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(4)
    );

    const querySnapshot = await getDocs(blogsQuery);

    const blogs: BlogTileType[] = [];

    querySnapshot.forEach((doc) => {
      const { title, createdAt, readTime, category, thumbnail } = doc.data();
      let blogID = doc.id;
      if (blogID !== currBlogID && blogs.length <= 3) {
        blogs.push({ blogID, title, createdAt, readTime, category, thumbnail });
      }
    });

    setBlogs(blogs);
    setIsFetching(false);
  } catch (error) {
    setBlogs([]);
    setIsFetching(false);
    console.log(error);
  }
}
