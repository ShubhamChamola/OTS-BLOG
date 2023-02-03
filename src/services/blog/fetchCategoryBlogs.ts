import {
  collection,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useHomeBlogStore from "../../store/useHomeBlogStore";

interface Blog {
  title: string;
  category: string;
  image: string | null;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

export default async function fetchCategoryBlogs(
  category:
    | "All Blogs"
    | "Bike Reviews"
    | "Travel & Tips"
    | "Parts & Accessories"
    | "Latest News"
    | "Maintenance"
    | "Luxury Bikes"
) {
  let lastDoc = useHomeBlogStore.getState().lastDocSnap;

  let blogsQuery: any;
  if (category === "All Blogs") {
    if (lastDoc) {
      blogsQuery = query(
        collection(firestoreDB, "blogs"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(8)
      );
    } else {
      blogsQuery = query(
        collection(firestoreDB, "blogs"),
        orderBy("createdAt", "desc"),
        limit(8)
      );
    }
  } else {
    if (lastDoc) {
      blogsQuery = query(
        collection(firestoreDB, "blogs"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    } else {
      blogsQuery = query(
        collection(firestoreDB, "blogs"),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(10)
      );
    }
  }

  const querySnapshot = await getDocs(blogsQuery);
  const queryResult: Blog[] = [];
  let index = 0;
  querySnapshot.forEach((doc) => {
    const { title, category, image, readTime, createdAt } = doc.data() as Blog;

    const blogId = doc.id;

    queryResult.push({
      title,
      category,
      image,
      readTime,
      createdAt,
      blogId,
    });
    index++;
    if (index === 8) {
      useHomeBlogStore.setState({ lastDocSnap: doc });
    }
  });
  const prevBlogs = useHomeBlogStore.getState().blogs;
  if (prevBlogs)
    useHomeBlogStore.setState({ blogs: [...prevBlogs, ...queryResult] });
  else useHomeBlogStore.setState({ blogs: queryResult });
}
