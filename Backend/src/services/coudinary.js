import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const uploadImageIntoCloudinary = async (imagePath, cloudinaryFolder) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      folder: cloudinaryFolder
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      fs.unlinkSync(imagePath);
      console.log(result);
      return result;
    } catch (error) {
      fs.unlinkSync(imagePath);
      console.log({ cloudinary_error: error });
      throw new Error("failed to upload image into cloudinary");
    }
};

export default uploadImageIntoCloudinary;
