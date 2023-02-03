import create from "zustand";

interface Blog {
  title: string;
  category: string;
  image: string | null;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

interface State {
  search: string | null;
  category:
    | "All Blogs"
    | "Bike Reviews"
    | "Travel & Tips"
    | "Parts & Accessories"
    | "Latest News"
    | "Maintenance"
    | "Luxury Bikes";
  blogs: Blog[] | null;
  noOfBlogs: number;
  lastDocSnap: any;
}

const useStore = create<State>((set) => ({
  search: null,
  category: "All Blogs",
  blogs: [],
  noOfBlogs: 0,
  lastDocSnap: null,
}));

const useHomeBlogStore = useStore;
export default useHomeBlogStore;
