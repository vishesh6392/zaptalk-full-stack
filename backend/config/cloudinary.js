const cloudinary=require("cloudinary").v2;
const dotenv=require("dotenv");
const fs=require("fs");
const path=require("path");


 dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const res=cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
     secure: true })

     console.log(res);
const uploadOncloudinary = async (relativePathFromRoot) => {
  try {
    // Convert relative path (from root) to absolute
    const absolutePath = path.resolve(__dirname, "../", relativePathFromRoot);
    console.log("Uploading:", absolutePath);

    const result = await cloudinary.uploader.upload(absolutePath);
    
    // Delete file after upload
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error(`Cloudinary upload error: ${error.message}`);
  }
};

module.exports = { uploadOncloudinary };



