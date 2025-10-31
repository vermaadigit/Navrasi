const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const upload = require("../utils/upload");

/**
 * @route   GET /api/products
 * @desc    Get all products with pagination, search, filter
 * @access  Public
 */
router.get("/", productController.getAllProducts);

/**
 * @route   GET /api/products/categories
 * @desc    Get all product categories
 * @access  Public
 */
router.get("/categories", productController.getCategories);

/**
 * NEW: Get products by feature (Sales, Trending, Top Rated, New Collection)
 * @route   GET /api/products/feature/:feature
 * @desc    Get products by feature
 * @access  Public
 */
router.get("/feature/:feature", productController.getProductsByFeature);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", productController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private (Admin)
 */
router.post(
  "/",
  authenticate,
  isAdmin,
  upload.array("images", 5),
  productController.productValidation,
  validate,
  productController.createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.array("images", 5),
  productController.productValidation,
  validate,
  productController.updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (Admin)
 */
router.delete("/:id", authenticate, isAdmin, productController.deleteProduct);

module.exports = router;
