import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";
import useHomeBlogStore from "../../store/useHomeBlogStore";

export default async function fetchTotalBlogs(
  category:
    | "All Blogs"
    | "Bike Reviews"
    | "Travel & Tips"
    | "Parts & Accessories"
    | "Latest News"
    | "Maintenance"
    | "Luxury Bikes"
) {
  if (category === "All Blogs") {
    const blogColl = collection(firestoreDB, "blogs");
    const snapshot = await getCountFromServer(blogColl);
    useHomeBlogStore.setState({ noOfBlogs: snapshot.data().count });
  } else {
    const blogColl = collection(firestoreDB, "blogs");
    const blogQuery = query(blogColl, where("category", "==", category));
    const snapshot = await getCountFromServer(blogQuery);
    useHomeBlogStore.setState({ noOfBlogs: snapshot.data().count });
  }
}
