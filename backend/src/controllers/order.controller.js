const { body } = require("express-validator");
const { Order, User, Product } = require("../models");
const { Op } = require("sequelize");
const {
  successResponse,
  errorResponse,
  paginatedResponse,
} = require("../utils/response");
const sendEmail = require("../emails/emailService");
const orderEmail = require("../emails/templates/orderEmail");

/**
 * Validation rules for creating order
 */
const createOrderValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),
  body("items.*.productId").notEmpty().withMessage("Product ID is required"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("shippingAddress.name")
    .notEmpty()
    .withMessage("Shipping name is required"),
  body("shippingAddress.phone")
    .notEmpty()
    .withMessage("Phone number is required"),
  body("shippingAddress.address").notEmpty().withMessage("Address is required"),
  body("shippingAddress.city").notEmpty().withMessage("City is required"),
  body("shippingAddress.state").notEmpty().withMessage("State is required"),
  body("shippingAddress.pincode").notEmpty().withMessage("Pincode is required"),
  body("paymentMethod").notEmpty().withMessage("Payment method is required"),
];

/**
 * Generate unique order number
 */
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

/**
 * Create new order (Checkout)
 */
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;
    const userId = req.user.id;

    // Validate and fetch product details
    const productIds = items.map((item) => item.productId);
    const products = await Product.findAll({
      where: {
        id: { [Op.in]: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      return errorResponse(res, "Some products are not available", 400);
    }

    // Calculate total and prepare order items
    let totalAmount = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      // Check stock
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.title}`);
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
        image: product.images[0] || null,
      };
    });

    // Create order
    const order = await Order.create({
      userId,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      totalAmount: totalAmount.toFixed(2),
      shippingAddress,
      paymentMethod,
      notes: notes || null,
      status: "pending",
    });

    // Update product stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      await product.update({
        stock: product.stock - item.quantity,
      });
    }

    // Email to Admin & User

    // const user = await User.findByPk(userId);

    // await sendEmail(
    //   user.email,
    //   `Order Confirmed – #${order.orderNumber}`,
    //   orderEmail({
    //     name: user.name,
    //     orderId: order.orderNumber,
    //     items: orderItems,
    //     total: totalAmount.toFixed(2),
    //   })
    // );

    // await sendEmail(
    //   process.env.ADMIN_EMAIL_MAILGUN,
    //   `🛒 New Order Placed – #${order.orderNumber}`,
    //   orderEmail({
    //     name: user.name,
    //     orderId: order.orderNumber,
    //     items: orderItems,
    //     total: totalAmount.toFixed(2),
    //   })
    // );

    return successResponse(
      res,
      "Order placed successfully",
      {
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt,
        },
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's orders
 */
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return paginatedResponse(res, "Orders retrieved successfully", rows, {
      page,
      limit,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single order by ID
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
    });

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(res, "Order retrieved successfully", order);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all orders (Admin only)
 */
const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status || "";
    const offset = (page - 1) * limit;

    const where = {};
    if (status) {
      where.status = status;
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return paginatedResponse(res, "Orders retrieved successfully", rows, {
      page,
      limit,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update order status (Admin only)
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !["pending", "accepted", "rejected", "completed", "cancelled"].includes(
        status
      )
    ) {
      return errorResponse(res, "Invalid order status", 400);
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    await order.update({ status });

    return successResponse(res, "Order status updated successfully", {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel order (User)
 */
const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
    });

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    if (order.status !== "pending") {
      return errorResponse(res, "Only pending orders can be cancelled", 400);
    }

    await order.update({ status: "cancelled" });

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({
          stock: product.stock + item.quantity,
        });
      }
    }

    return successResponse(res, "Order cancelled successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  createOrderValidation,
};
