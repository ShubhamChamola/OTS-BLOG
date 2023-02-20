import imageCompression from "browser-image-compression";

export default async function fileCompression(image: File, type: string) {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 400,
  };

  if (type === "user_avatar" || type === "admin_avatar") {
    // 20kb size width 300px
    options.maxSizeMB = 0.0195;
    options.maxWidthOrHeight = 300;
  } else if (type === "blog_image/thumbnail") {
    // 50kb size width 500px
    options.maxSizeMB = 0.0488;
    options.maxWidthOrHeight = 500;
  } else {
    options.maxSizeMB = 0.0976;
    options.maxWidthOrHeight = 900;
  }

  try {
    const compressedFile = await imageCompression(image, options);
    console.log(compressedFile.size / 1024 / 1024);
    return compressedFile;
  } catch (error) {
    throw new Error("Unable to Compress the file!");
  }
}
