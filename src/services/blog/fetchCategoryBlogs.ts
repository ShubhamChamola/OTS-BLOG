// Firebase Modules
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

// Store Module
import useHomeBlogStore from "../../store/useBlogBrowseStore";

interface BlogDataType {
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
  blogID: string;
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
  try {
    useHomeBlogStore.setState({ isFetching: true });
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
    const queryResult: BlogDataType[] = [];
    let index = 0;

    querySnapshot.forEach((doc) => {
      const { title, category, thumbnail, readTime, createdAt } =
        doc.data() as BlogDataType;

      queryResult.push({
        title,
        category,
        thumbnail,
        readTime,
        createdAt,
        blogID: doc.id,
      });
      index++;
      if (index === 8) {
        useHomeBlogStore.setState({ lastDocSnap: doc });
      }
    });
    const prevBlogs = useHomeBlogStore.getState().blogs;
    if (prevBlogs)
      useHomeBlogStore.setState({
        blogs: [...prevBlogs, ...queryResult],
        isFetching: false,
      });
    else useHomeBlogStore.setState({ blogs: queryResult, isFetching: false });
  } catch (error) {
    console.log(error);
    useHomeBlogStore.setState({ blogs: [], noOfBlogs: 0, isFetching: false });
  }
}
