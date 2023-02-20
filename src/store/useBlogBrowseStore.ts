import create from "zustand";

interface BlogDataType {
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
  blogID: string;
}

interface State {
  category:
    | "All Blogs"
    | "Bike Reviews"
    | "Travel & Tips"
    | "Parts & Accessories"
    | "Latest News"
    | "Maintenance"
    | "Luxury Bikes";
  blogs: BlogDataType[] | [];
  noOfBlogs: number;
  lastDocSnap: any;
  isFetching: boolean;
}

const useStore = create<State>((set) => ({
  category: "All Blogs",
  blogs: [],
  noOfBlogs: 0,
  lastDocSnap: null,
  isFetching: true,
}));

const useBlogBrowseStore = useStore;
export default useBlogBrowseStore;
