const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

/**
 * @route POST /api/orders
 * @desc Create new order (Checkout)
 * @access Private
 */
router.post(
  "/",
  authenticate,
  orderController.createOrderValidation,
  validate,
  orderController.createOrder
);

/**
 * @route GET /api/orders/my-orders
 * @desc Get user's orders
 * @access Private
 */
router.get("/my-orders", authenticate, orderController.getUserOrders);

/**
 * @route GET /api/orders/:id
 * @desc Get single order by ID
 * @access Private
 */
router.get("/:id", authenticate, orderController.getOrderById);

/**
 * @route PUT /api/orders/:id/cancel
 * @desc Cancel order
 * @access Private
 */
router.put("/:id/cancel", authenticate, orderController.cancelOrder);

/**
 * @route GET /api/orders/admin/all
 * @desc Get all orders (Admin)
 * @access Private (Admin)
 */
router.get("/admin/all", authenticate, isAdmin, orderController.getAllOrders);

/**
 * @route PUT /api/orders/admin/:id/status
 * @desc Update order status (Admin)
 * @access Private (Admin)
 */
router.put(
  "/admin/:id/status",
  authenticate,
  isAdmin,
  orderController.updateOrderStatus
);

module.exports = router;
