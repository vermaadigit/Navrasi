const { body } = require("express-validator");
const { Cart, Product } = require("../models");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Validation rules for adding to cart
 */
const addToCartValidation = [
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("size").optional().trim(),
  body("color").optional().trim(),
];

/**
 * Validation rules for updating cart
 */
const updateCartValidation = [
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("size").optional().trim(),
  body("color").optional().trim(),
];

/**
 * Get user's cart
 */
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find or create cart for user
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    // Validate cart items against current product data
    const validatedItems = [];
    for (const item of cart.items) {
      const product = await Product.findByPk(item.productId);
      if (product && product.isActive) {
        validatedItems.push({
          id: item.id,
          productId: item.productId,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null,
          image: product.images[0] || "",
          stock: product.stock,
        });
      }
    }

    // Update cart if items were removed
    if (validatedItems.length !== cart.items.length) {
      await cart.update({ items: validatedItems });
    }

    return successResponse(res, "Cart retrieved successfully", {
      cart: {
        id: cart.id,
        items: validatedItems,
        itemCount: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: validatedItems
          .reduce(
            (sum, item) => sum + parseFloat(item.price) * item.quantity,
            0
          )
          .toFixed(2),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add item to cart
 */
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, size, color } = req.body;

    // Validate product exists and is active
    const product = await Product.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      return errorResponse(res, "Product not found or unavailable", 404);
    }

    // Check stock availability
    if (product.stock < quantity) {
      return errorResponse(
        res,
        `Insufficient stock. Only ${product.stock} items available`,
        400
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    // Generate unique ID for cart item
    const itemId = `${productId}-${size || "nosize"}-${color || "nocolor"}`;

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.id === itemId
    );

    let updatedItems = [...cart.items];

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        return errorResponse(
          res,
          `Cannot add more items. Maximum stock is ${product.stock}`,
          400
        );
      }

      updatedItems[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      updatedItems.push({
        id: itemId,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        size: size || null,
        color: color || null,
        image: product.images[0] || "",
        stock: product.stock,
      });
    }

    // Update cart
    await cart.update({ items: updatedItems });

    // Reload to get fresh data
    await cart.reload();

    return successResponse(res, "Item added to cart successfully", {
      cart: {
        id: cart.id,
        items: cart.items,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update cart item quantity
 */
const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity, size, color } = req.body;

    // Find cart
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return errorResponse(res, "Cart not found", 404);
    }

    // Generate unique ID for cart item
    const itemId = `${productId}-${size || "nosize"}-${color || "nocolor"}`;

    // Find item in cart by unique ID
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return errorResponse(res, "Item not found in cart", 404);
    }

    // Validate product and stock
    const product = await Product.findByPk(productId);

    if (!product || !product.isActive) {
      return errorResponse(res, "Product not found or unavailable", 404);
    }

    if (quantity > product.stock) {
      return errorResponse(
        res,
        `Insufficient stock. Only ${product.stock} items available`,
        400
      );
    }

    // Update quantity
    let updatedItems = [...cart.items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity: quantity,
      price: product.price,
      stock: product.stock,
    };

    // Save to database
    await cart.update({ items: updatedItems });

    // Reload cart to get fresh data from database
    await cart.reload();

    return successResponse(res, "Cart item updated successfully", {
      cart: {
        id: cart.id,
        items: cart.items,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error("Update cart error:", error);
    next(error);
  }
};

/**
 * Remove item from cart
 */
const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Find cart
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return errorResponse(res, "Cart not found", 404);
    }

    // Filter out items with matching productId
    const updatedItems = cart.items.filter(
      (item) => item.productId !== productId
    );

    if (updatedItems.length === cart.items.length) {
      return errorResponse(res, "Item not found in cart", 404);
    }

    await cart.update({ items: updatedItems });
    await cart.reload();

    return successResponse(res, "Item removed from cart successfully", {
      cart: {
        id: cart.id,
        items: cart.items,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Clear entire cart
 */
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find cart
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return errorResponse(res, "Cart not found", 404);
    }

    await cart.update({ items: [] });
    await cart.reload();

    return successResponse(res, "Cart cleared successfully", {
      cart: {
        id: cart.id,
        items: [],
        itemCount: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  addToCartValidation,
  updateCartValidation,
};
