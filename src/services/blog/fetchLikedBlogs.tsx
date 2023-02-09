import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface Blog {
  title: string;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

export default async function fetchLikedBlogs(
  setBlog: React.Dispatch<React.SetStateAction<Blog[]>>,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    let blogs: Blog[] = [];

    setIsFetching(true);

    const blogsQuery = query(
      collection(firestoreDB, "blogs"),
      where("likes", ">", 0),
      orderBy("likes", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(blogsQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setIsFetching(true);
        const { title, readTime, createdAt } = doc.data();
        blogs.push({ title, readTime, createdAt, blogId: doc.id });
        setBlog(blogs);
        setIsFetching(false);
      });
    });
  } catch (error) {
    console.log(error);
    setIsFetching(false);
  }
}
