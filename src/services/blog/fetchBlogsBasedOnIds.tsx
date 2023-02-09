import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface BlogType {
  title: string;
  category: string;
  image: string | null;
  readTime: number;
  createdAt: Date;
  blogId: string;
}

export default async function fetchBlogsBasedOnIds(
  Ids: string[],
  setBlogs: React.Dispatch<React.SetStateAction<[] | BlogType[]>>
) {
  try {
    Ids.forEach(async (id) => {
      const blogRef = doc(firestoreDB, "blogs", id);

      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const { title, category, image, readTime, createdAt } = blogSnap.data();

        setBlogs((prev) => {
          return [
            ...prev,
            {
              title,
              category,
              image,
              readTime,
              createdAt,
              blogId: blogSnap.id,
            },
          ];
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
