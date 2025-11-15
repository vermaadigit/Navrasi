import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart as clearCartAPI,
  CartItem,
} from "../utils/cartApi";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      // Optimistically update UI
      const optimisticItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      setCartItems(optimisticItems);

      // Update in backend
      const items = await updateCartItem(
        item.productId,
        newQuantity,
        item.size,
        item.color
      );
      
      // Set the response from backend
      setCartItems(items);
    } catch (err: any) {
      // Revert on error
      await loadCart();
      alert(err.message || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const items = await removeFromCart(productId);
      setCartItems(items);
    } catch (err: any) {
      alert(err.message || "Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCartAPI();
        setCartItems([]);
      } catch (err: any) {
        alert(err.message || "Failed to clear cart");
      }
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-stone-200 rounded-sm p-16 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-stone-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light text-stone-900 mb-3">
              Please log in to view your cart
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              Sign in to access your saved items and continue shopping
            </p>
            <Link
              to="/login"
              state={{ from: "/cart" }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
            >
              <span>Sign In</span>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-3 font-medium">
            Your Cart
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-stone-600 font-light mt-2">
            Review your items and proceed to checkout
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-stone-200 rounded-sm p-16 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-stone-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light text-stone-900 mb-3">
              Your cart is empty
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              Discover our collection and add your favorite items
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
            >
              <span>Browse Products</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-stone-200 rounded-sm overflow-hidden"
              >
                <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-900 rounded-sm flex items-center justify-center text-white font-light text-sm">
                      {cartItems.length}
                    </div>
                    <h2 className="text-lg font-light text-stone-900">
                      Cart Items
                    </h2>
                  </div>
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 text-sm text-red-700 hover:text-red-900 hover:bg-red-50 rounded-sm transition-all font-light"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-stone-200">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link
                            to={`/products/${item.productId}`}
                            className="flex-shrink-0 group"
                          >
                            <div className="relative overflow-hidden rounded-sm bg-stone-100">
                              <img
                                src={item.image || "placeholder-product.png"}
                                alt={item.title}
                                className="w-28 h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://via.placeholder.com/200?text=NAVRASI";
                                }}
                              />
                            </div>
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/products/${item.productId}`}
                              className="text-base font-light text-stone-900 hover:text-amber-800 line-clamp-2 transition-colors"
                            >
                              {item.title}
                            </Link>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.size && (
                                <span className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-sm text-xs text-stone-600 font-light">
                                  Size:{" "}
                                  <span className="font-normal text-stone-900">
                                    {item.size}
                                  </span>
                                </span>
                              )}
                              {item.color && (
                                <span className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-sm text-xs text-stone-600 font-light">
                                  Color:{" "}
                                  <span className="font-normal text-stone-900">
                                    {item.color}
                                  </span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-10 h-10 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200 transition-all flex items-center justify-center text-stone-900 font-light disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  −
                                </button>
                                <span className="w-12 text-center font-light text-stone-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= item.stock}
                                  className="w-10 h-10 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200 transition-all flex items-center justify-center text-stone-900 font-light disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  +
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-lg font-light text-stone-900">
                                  ₹
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </p>
                                <p className="text-xs text-stone-500 font-light">
                                  ₹{item.price.toLocaleString()} each
                                </p>
                              </div>
                            </div>

                            {/* Stock Warning & Remove Button */}
                            <div className="flex items-center justify-between mt-4">
                              {item.quantity >= item.stock && (
                                <span className="text-xs text-amber-700 flex items-center gap-1 font-light">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Max stock reached
                                </span>
                              )}
                              <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="ml-auto flex items-center gap-2 px-4 py-2 text-xs text-red-700 hover:text-red-900 font-light hover:bg-red-50 rounded-sm transition-all uppercase tracking-wider"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-sm hover:border-stone-300 hover:bg-stone-50 transition-all font-light"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-stone-200 rounded-sm p-6 sticky top-28"
              >
                <h2 className="text-lg font-light text-stone-900 mb-6 uppercase tracking-wider text-xs">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-stone-600 font-light">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-stone-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600 font-light">
                    <span>Shipping</span>
                    <span className="text-green-700 font-normal flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      FREE
                    </span>
                  </div>
                  <div className="border-t border-stone-200 pt-4 flex justify-between">
                    <span className="text-stone-900 font-light">Total</span>
                    <span className="text-2xl font-light text-stone-900">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 mb-3 font-light tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                {/* Features */}
                <div className="pt-6 border-t border-stone-200 space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-stone-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-stone-900 font-light mb-1">
                        Secure Checkout
                      </p>
                      <p className="text-stone-500 text-xs font-light">
                        Your payment info is safe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-stone-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-stone-900 font-light mb-1">
                        Free Shipping
                      </p>
                      <p className="text-stone-500 text-xs font-light">
                        On all orders
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-stone-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-stone-900 font-light mb-1">
                        Easy Returns
                      </p>
                      <p className="text-stone-500 text-xs font-light">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-stone-200">
                  <p className="text-xs text-stone-500 mb-3 font-light uppercase tracking-wider">
                    We Accept
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="w-12 h-8 bg-stone-100 border border-stone-200 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24">
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          VISA
                        </text>
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-stone-100 border border-stone-200 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24">
                        <circle cx="9" cy="12" r="5" fill="red" opacity="0.7" />
                        <circle cx="15" cy="12" r="5" fill="orange" opacity="0.7" />
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-stone-100 border border-stone-200 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24">
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="7"
                          fontWeight="bold"
                        >
                          UPI
                        </text>
                      </svg>
                    </div>
                    <div className="w-12 h-8 bg-stone-100 border border-stone-200 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24">
                        <text
                          x="50%"
                          y="50%"
                          dominantBaseline="middle"
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          COD
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;