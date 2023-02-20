export default function resizeImage(
  file: File,
  aspectRatio: { width: number; height: number }
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = img.width;
        const height = img.height;
        const canvasRatio = aspectRatio.width / aspectRatio.height;
        const imageRatio = width / height;
        let newWidth = width;
        let newHeight = height;
        if (imageRatio > canvasRatio) {
          newWidth = height * canvasRatio;
        } else {
          newHeight = width / canvasRatio;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (blob) => resolve(new File([blob!], file.name, { type: file.type })),
          file.type
        );
      };
      img.onerror = () => reject("Error loading image");
    };
    reader.onerror = () => reject("Error reading file");
  });
}
