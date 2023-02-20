import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface BlogTileType {
  title: string;
  category: string;
  thumbnail: string | null;
  readTime: number;
  createdAt: { seconds: number };
  blogID: string;
}

export default async function fetchBlogsBasedOnIds(
  blogIDs: string[],
  setBlogs: React.Dispatch<React.SetStateAction<[] | BlogTileType[]>>,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setIsFetching(true);
    blogIDs.forEach(async (id) => {
      const blogRef = doc(firestoreDB, "blogs", id);

      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const { title, category, thumbnail, readTime, createdAt } =
          blogSnap.data();

        setBlogs((prev) => {
          return [
            ...prev,
            {
              title,
              category,
              thumbnail,
              readTime,
              createdAt,
              blogID: blogSnap.id,
            },
          ];
        });
        setIsFetching(false);
      } else {
        setIsFetching(false);
        throw new Error("Blog Not Found!");
      }
    });
  } catch (error) {
    setIsFetching(false);
    console.log(error);
  }
}
