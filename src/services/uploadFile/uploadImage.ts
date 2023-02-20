// Firebase Modules
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../lib/firebase";
import fileCompression from "./fileCompression";

// This function take the file and upload it to storage and return the download url of the file(image)
export default async function uploadImage(
  file: File,
  id: string,
  type:
    | "user_avatar"
    | "admin_avatar"
    | "blog_image/thumbnail"
    | "blog_image/full_size"
) {
  return new Promise<String>((resolve, reject) => {
    try {
      fileCompression(file, type).then((compressedFile) => {
        const uploadTask = uploadBytesResumable(
          ref(storage, `${type}/${id}`),
          compressedFile
        );

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                console.log("User canceled the upload");
                break;
              case "storage/unknown":
                console.log("Unknown error occurred");
                break;
            }
            reject(Error("File upload Failed"));
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  });
}
