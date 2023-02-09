import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { firestoreDB, storage } from "../../lib/firebase";
import useLoadingState from "../../store/useLoadState";

export default async function uploadImage(
  imageFile: File,
  fileName: string,
  uid: string,
  type: "user_avatar" | "admin_avatar" | "blog_thumbnail",
  fileAddress?: string
) {
  if (!useLoadingState.getState().isLoading) {
    useLoadingState.setState({ isLoading: true });
  }
  const uploadTask = uploadBytesResumable(
    ref(storage, `${fileAddress ? fileAddress : `${type}/${fileName}`}`),
    imageFile
  );
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      useLoadingState.setState({ isLoading: false });
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        // ...
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if (type === "user_avatar") {
          console.log(downloadURL);
          await updateDoc(doc(firestoreDB, "users", uid), {
            avatar: downloadURL,
            avatarFileAddress: `${type}/${fileName}`,
          }).then(() => {
            useLoadingState.setState({ isLoading: false });
            if (window.location.pathname !== "/manage-account")
              window.location.reload();
          });
        } else if (type === "admin_avatar") {
          await updateDoc(doc(firestoreDB, "admins", uid), {
            avatar: downloadURL,
            avatarFileAddress: `${type}/${fileName}`,
          }).then(() => {
            useLoadingState.setState({ isLoading: false });
            if (window.location.pathname !== "/manage-account")
              window.location.reload();
          });
        } else if (type === "blog_thumbnail") {
          await updateDoc(doc(firestoreDB, "blogs", uid), {
            image: downloadURL,
            fileAddress: `${type}/${fileName}`,
          }).then(() => {
            useLoadingState.setState({ isLoading: false });
            return "done";
          });
        } else {
          useLoadingState.setState({ isLoading: false });
        }
      });
    }
  );
}
