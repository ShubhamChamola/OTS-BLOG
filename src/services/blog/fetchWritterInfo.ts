// Firebase Modules
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface WritterInfoType {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
}

export default async function fetchWritterInfo(
  writterID: string,
  setWritterInfo: React.Dispatch<React.SetStateAction<WritterInfoType | null>>
) {
  try {
    const writterDocRef = doc(firestoreDB, "admins", writterID);

    const writterInfoSnap = await getDoc(writterDocRef);

    const { firstName, lastName, bio, avatar } =
      writterInfoSnap.data() as WritterInfoType;

    setWritterInfo({ firstName, lastName, bio, avatar });
  } catch (error) {
    console.log("Writter Info Not Found!");
  }
}
