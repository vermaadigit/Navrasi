const { body, query } = require("express-validator");
const { Product } = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  paginatedResponse,
} = require("../utils/response");
const { uploadImage, deleteImage } = require("../config/cloudinary");

/**
 * Validation rules for creating/updating products
 */
const productValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("category")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Category must be less than 100 characters"),
  body("sizeOptions")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    })
    .isArray()
    .withMessage("Size options must be an array"),
  body("colorOptions")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    })
    .isArray()
    .withMessage("Color options must be an array"),
  // NEW: Feature validation
  body("feature")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    })
    .isArray()
    .withMessage("Feature must be an array")
    .custom((value) => {
      const validFeatures = [
        "Sales",
        "Trending",
        "Top Rated",
        "New Collection",
      ];
      const invalidFeatures = value.filter((f) => !validFeatures.includes(f));
      if (invalidFeatures.length > 0) {
        throw new Error(
          `Invalid features: ${invalidFeatures.join(
            ", "
          )}. Valid features are: Sales, Trending, Top Rated, New Collection`
        );
      }
      return true;
    }),
];

/**
 * Get all products with pagination, search, filter, and sort
 */
const getAllProducts = async (req, res, next) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const feature = req.query.feature || ""; // NEW: Filter by feature
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "DESC";
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;

    // Build where clause
    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (category) {
      where.category = category;
    }

    // NEW: Filter by feature
    if (feature) {
      where.feature = {
        [Op.contains]: [feature], // PostgreSQL array contains operator
      };
    }

    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };

    // Calculate offset
    const offset = (page - 1) * limit;

    // Fetch products with pagination
    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      attributes: { exclude: ["isActive"] },
    });

    return paginatedResponse(res, "Products retrieved successfully", rows, {
      page,
      limit,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by ID
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id, isActive: true },
    });

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product retrieved successfully", product);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new product (Admin only)
 */
const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      category,
      sizeOptions,
      colorOptions,
      feature, // NEW: Feature field
    } = req.body;

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, file.originalname)
      );
      images = await Promise.all(uploadPromises);
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category: category || "General",
      sizeOptions: sizeOptions || [],
      colorOptions: colorOptions || [],
      feature: feature || [], // NEW: Feature field
      images,
    });

    return successResponse(res, "Product created successfully", product, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update product (Admin only)
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      stock,
      category,
      sizeOptions,
      colorOptions,
      feature, // NEW: Feature field
      existingImages,
    } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // Handle new image uploads
    let newImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadImage(file.buffer, file.originalname)
      );
      newImages = await Promise.all(uploadPromises);
    }

    // Parse existing images from request
    let images = [];
    if (existingImages) {
      try {
        images =
          typeof existingImages === "string"
            ? JSON.parse(existingImages)
            : existingImages;
      } catch (e) {
        images = [];
      }
    }

    // Delete images that are no longer in use
    const oldImages = product.images || [];
    const imagesToDelete = oldImages.filter((img) => !images.includes(img));
    for (const img of imagesToDelete) {
      await deleteImage(img);
    }

    // Combine existing and new images
    const allImages = [...images, ...newImages];

    // Update product
    await product.update({
      title: title || product.title,
      description: description || product.description,
      price: price !== undefined ? price : product.price,
      stock: stock !== undefined ? stock : product.stock,
      category: category || product.category,
      sizeOptions: sizeOptions || product.sizeOptions,
      colorOptions: colorOptions || product.colorOptions,
      feature: feature !== undefined ? feature : product.feature, // NEW: Feature field
      images: allImages,
    });

    return successResponse(res, "Product updated successfully", product);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product (Admin only)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // Delete product images
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        await deleteImage(img);
      }
    }

    // Soft delete (set isActive to false)
    await product.update({ isActive: false });

    return successResponse(res, "Product deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Get all categories
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.findAll({
      attributes: ["category"],
      where: { isActive: true },
      group: ["category"],
      raw: true,
    });

    const categoryList = categories.map((c) => c.category).filter(Boolean);

    return successResponse(
      res,
      "Categories retrieved successfully",
      categoryList
    );
  } catch (error) {
    next(error);
  }
};

/**
 * NEW: Get products by feature (Sales, Trending, Top Rated, New Collection)
 */
const getProductsByFeature = async (req, res, next) => {
  try {
    const { feature } = req.params;
    const validFeatures = ["Sales", "Trending", "Top Rated", "New Collection"];

    if (!validFeatures.includes(feature)) {
      return errorResponse(
        res,
        `Invalid feature. Valid features are: ${validFeatures.join(", ")}`,
        400
      );
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where: {
        isActive: true,
        feature: {
          [Op.contains]: [feature],
        },
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["isActive"] },
    });

    return paginatedResponse(
      res,
      `${feature} products retrieved successfully`,
      rows,
      {
        page,
        limit,
        total: count,
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductsByFeature, // NEW: Export new function
  productValidation,
};
