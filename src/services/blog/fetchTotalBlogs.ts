// Firebase Modules
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

// Store Module
import useHomeBlogStore from "../../store/useBlogBrowseStore";

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
  try {
    useHomeBlogStore.setState({ isFetching: true });
    if (category === "All Blogs") {
      const AllBlogs = collection(firestoreDB, "blogs");
      const snapshot = await getCountFromServer(AllBlogs);
      snapshot.data().count === 0 &&
        useHomeBlogStore.setState({ isFetching: false });
      useHomeBlogStore.setState({ noOfBlogs: snapshot.data().count });
    } else {
      const blogColl = collection(firestoreDB, "blogs");
      const blogQuery = query(blogColl, where("category", "==", category));
      const snapshot = await getCountFromServer(blogQuery);
      snapshot.data().count === 0 &&
        useHomeBlogStore.setState({ isFetching: false });
      useHomeBlogStore.setState({ noOfBlogs: snapshot.data().count });
    }
  } catch (error) {
    console.log(error);
    useHomeBlogStore.setState({ noOfBlogs: 0, isFetching: false });
  }
}
