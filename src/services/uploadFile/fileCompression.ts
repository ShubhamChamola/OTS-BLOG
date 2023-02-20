import imageCompression from "browser-image-compression";
import resizeImage from "./resizeImage";

export default async function fileCompression(image: File, type: string) {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 400,
    canvas: true,
    widthRatio: 1,
    heightRatio: 0.65,
  };

  if (type === "user_avatar" || type === "admin_avatar") {
    // 20kb size width 300px
    options.maxSizeMB = 0.019;
    options.maxWidthOrHeight = 300;
  } else if (type === "blog_image/thumbnail") {
    // 100kb size width 500px
    options.maxSizeMB = 0.0976;
    options.maxWidthOrHeight = 500;
  } else {
    // 200kb size width 900px
    options.maxSizeMB = 0.195;
    options.maxWidthOrHeight = 800;
  }

  try {
    // Image Compression
    const compressedFile = await imageCompression(image, options);
    console.log(compressedFile.size / 1024 / 1024);

    if (type !== "user_avatar" && type !== "admin_avatar") {
      let newFile = resizeImage(compressedFile, {
        width: options.widthRatio,
        height: options.heightRatio,
      }).catch((error) => {
        console.log(error);
        return compressedFile;
      });

      return newFile;
    }

    return compressedFile;
  } catch (error) {
    throw new Error("Unable to Compress the file!");
  }
}
