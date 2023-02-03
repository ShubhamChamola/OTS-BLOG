import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface Blog {
  blogId: string;
  title: string;
  intro: string;
  image: string | null;
  body: string;
  category: string;
  createdAt: Date;
  writterId: string;
}

export default async function fetchBlogInfo(id: string) {
  const blogRef = doc(firestoreDB, "blogs", id);
  const blogSnap = await getDoc(blogRef);

  const { title, intro, image, body, createdAt, writterId, category } =
    blogSnap.data() as Blog;

  return {
    blogId: blogSnap.id,
    title,
    category,
    intro,
    image,
    body,
    createdAt,
    writterId,
  };
}
