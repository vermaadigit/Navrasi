import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
  stock: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart:", error);
        setCartItems([]);
      }
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        const quantity = Math.min(newQuantity, item.stock);
        return { ...item, quantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="profile-container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          </div>
          <p className="text-gray-400 ml-7">Review your items and checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center shadow-2xl">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-16 h-16 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Your cart is empty
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {cartItems.length}
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      Cart Items
                    </h2>
                  </div>
                  <button
                    onClick={clearCart}
                    className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-white/10">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          to={`/products/${item.productId}`}
                          className="flex-shrink-0 group"
                        >
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={item.image || "/placeholder-product.png"}
                              alt={item.title}
                              className="w-28 h-28 object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-product.png";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/products/${item.productId}`}
                            className="text-lg font-bold text-white hover:text-purple-400 line-clamp-2 transition-colors"
                          >
                            {item.title}
                          </Link>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.size && (
                              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-gray-300">
                                Size: <span className="font-semibold text-white">{item.size}</span>
                              </span>
                            )}
                            {item.color && (
                              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-gray-300">
                                Color: <span className="font-semibold text-white">{item.color}</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center text-white font-bold"
                              >
                                -
                              </button>
                              <span className="w-16 text-center font-bold text-white text-lg">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={item.quantity >= item.stock}
                                className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                ₹{item.price} each
                              </p>
                            </div>
                          </div>

                          {/* Stock Warning & Remove Button */}
                          <div className="flex items-center justify-between mt-4">
                            {item.quantity >= item.stock && (
                              <span className="text-xs text-yellow-400 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Max stock reached
                              </span>
                            )}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 font-medium hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-white font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      FREE
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-lg">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="relative w-full group overflow-hidden mb-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-4 text-white font-bold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
                  </div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl"></div>
                </button>

                {!isAuthenticated && (
                  <p className="text-xs text-center text-gray-500 mb-6">
                    You'll be redirected to login before checkout
                  </p>
                )}

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Free Shipping</p>
                      <p className="text-gray-400 text-xs">On all orders nationwide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Secure Checkout</p>
                      <p className="text-gray-400 text-xs">SSL encrypted payment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Easy Returns</p>
                      <p className="text-gray-400 text-xs">Within 30 days</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-3">We Accept</p>
                  <div className="flex gap-2">
                    {["Visa", "Mastercard", "UPI", "PayPal"].map((method) => (
                      <div
                        key={method}
                        className="flex-1 px-2 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-center"
                      >
                        <span className="text-xs text-gray-400 font-medium">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;