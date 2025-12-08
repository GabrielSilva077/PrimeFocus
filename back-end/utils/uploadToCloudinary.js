import cloudinary from "../config/cloudinary.js";

export function uploadBufferToCloudinary(buffer, folder = "portfolio") {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        type: "authenticated" // imagem privada
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    ).end(buffer);
  });
}
