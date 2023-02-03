import {
  collection,
  orderBy,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface Blog {
  id: string;
  title: string;
  intro: string;
  category: string;
  image: string | null;
  readTime: number;
  body: string;
  createdAt: Date;
}

export default async function fetchSimilarBlogs(category: string) {
  const blogsQuery = await query(
    collection(firestoreDB, "blogs"),
    where("category", "==", category),
    orderBy("createdAt", "desc"),
    limit(3)
  );

  const fetchResult: Blog[] = [];

  const querySnapshot = await getDocs(blogsQuery);
  querySnapshot.forEach((doc) => {
    fetchResult.push({ id: doc.id, ...doc.data() } as Blog);
  });
  return fetchResult;
}
