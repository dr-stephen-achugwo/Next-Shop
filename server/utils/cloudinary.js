const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageToCloudinary = async (imagePath) => {
  try {
    const data = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    console.log("error uploading image to cloudinary" + error);
  }
};

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId);
    return data;
  } catch (error) {
    console.log("error delete image from cloudinary" + error);
  }
};

module.exports = { uploadImageToCloudinary, deleteImageFromCloudinary };
