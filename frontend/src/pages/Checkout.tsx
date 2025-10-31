import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface CartItem {
  id: string;
  productId?: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CheckoutFormData extends ShippingAddress {
  paymentMethod: string;
  notes: string;
}

interface ErrorResponse {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
    notes: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        if (parsedCart.length === 0) {
          navigate("/cart");
        } else {
          setCartItems(parsedCart);
        }
      } catch (err) {
        console.error("Failed to parse cart:", err);
        navigate("/cart");
      }
    } else {
      navigate("/cart");
    }
  }, [isAuthenticated, navigate]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null,
        })),
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.notes || null,
      };

      const { data } = await axios.post("/api/orders", orderData);

      localStorage.removeItem("cart");

      navigate("/my-orders", {
        state: { orderSuccess: true, orderId: data.data.order.id },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(
          axiosError.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="profile-container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-4xl font-bold text-white">Checkout</h1>
          </div>
          <p className="text-gray-400 ml-7">Complete your order securely</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
                    Full Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3">
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-white mb-3">
                    Address *
                  </label>
                  <div className="relative group">
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                      placeholder="Enter your complete address"
                      required
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-white mb-3">
                      City *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        placeholder="City"
                        required
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-white mb-3">
                      State *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                        placeholder="State"
                        required
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-white mb-3">
                    Pincode *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      placeholder="Enter pincode"
                      required
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-semibold text-white mb-3">
                    Payment Method *
                  </label>
                  <div className="relative">
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="cod" className="bg-gray-800">Cash on Delivery</option>
                      <option value="online" className="bg-gray-800">Online Payment</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-white mb-3">
                    Order Notes (Optional)
                  </label>
                  <div className="relative group">
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                      placeholder="Any special instructions for your order"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative mt-8 w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative px-6 py-4 text-white font-bold flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Place Order • ₹{totalAmount.toFixed(2)}</span>
                    </>
                  )}
                </div>
                {!loading && (
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl"></div>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm line-clamp-2">{item.title}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.size && (
                          <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                            {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">
                            {item.color}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-bold text-white text-sm">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({cartItems.length} items)</span>
                  <span className="text-white font-semibold">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    FREE
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-3">
                  <span className="text-white">Total</span>
                  <span className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Easy returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;