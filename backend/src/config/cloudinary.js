const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Configure Cloudinary (optional - will use local storage if not configured)
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("✅ Cloudinary configured successfully");
} else {
  console.log("⚠️  Cloudinary not configured - using local storage");
}

/**
 * Upload image to Cloudinary or local storage
 * @param {Buffer} fileBuffer - Image file buffer
 * @param {string} filename - Original filename
 * @returns {Promise<string>} - URL of uploaded image
 */
const uploadImage = async (fileBuffer, filename) => {
  if (isCloudinaryConfigured) {
    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "navrasi-products",
          resource_type: "auto",
          transformation: [
            { width: 1000, height: 1000, crop: "limit" },
            { quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  } else {
    // Fallback: Save to local uploads directory
    const uploadsDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFilename = `${Date.now()}-${filename}`;
    const filepath = path.join(uploadsDir, uniqueFilename);

    fs.writeFileSync(filepath, fileBuffer);

    // Return relative URL (you'll need to serve this static directory)
    return `/uploads/${uniqueFilename}`;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} imageUrl - URL of image to delete
 */
const deleteImage = async (imageUrl) => {
  if (isCloudinaryConfigured && imageUrl.includes("cloudinary")) {
    try {
      // Extract public_id from Cloudinary URL
      const parts = imageUrl.split("/");
      const filename = parts[parts.length - 1].split(".")[0];
      const folder = parts[parts.length - 2];
      const publicId = `${folder}/${filename}`;

      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted image: ${publicId}`);
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
    }
  } else if (imageUrl.startsWith("/uploads/")) {
    // Delete from local storage
    const filepath = path.join(__dirname, "../..", imageUrl);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  deleteImage,
  isCloudinaryConfigured,
};
