const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get("/", authenticate, cartController.getCart);

/**
 * @route POST /api/cart/add
 * @desc Add item to cart
 * @access Private
 */
router.post(
  "/add",
  authenticate,
  cartController.addToCartValidation,
  validate,
  cartController.addToCart
);

/**
 * @route PUT /api/cart/update/:productId
 * @desc Update cart item quantity
 * @access Private
 */
router.put(
  "/update/:productId",
  authenticate,
  cartController.updateCartValidation,
  validate,
  cartController.updateCartItem
);

/**
 * @route DELETE /api/cart/remove/:productId
 * @desc Remove item from cart
 * @access Private
 */
router.delete(
  "/remove/:productId",
  authenticate,
  cartController.removeFromCart
);

/**
 * @route DELETE /api/cart/clear
 * @desc Clear entire cart
 * @access Private
 */
router.delete("/clear", authenticate, cartController.clearCart);

module.exports = router;
