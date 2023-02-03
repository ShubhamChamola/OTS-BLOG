import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../lib/firebase";

interface WritterInfo {
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
}

export default async function fetchWritterInfo(writterId: string) {
  const writterDocRef = doc(firestoreDB, "admins", writterId);

  const writterInfoSnap = await getDoc(writterDocRef);

  const { firstName, lastName, bio, avatar } =
    writterInfoSnap.data() as WritterInfo;

  return {
    firstName,
    lastName,
    bio,
    avatar,
  };
}
