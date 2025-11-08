import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-7xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-3 font-medium">
            Secure Checkout
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-stone-600 font-light mt-2">
            Fill in your details to proceed with the order
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-sm flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-light text-red-800">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit} 
              className="bg-white border border-stone-200 rounded-sm p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-stone-900 rounded-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-light text-stone-900 uppercase tracking-wider text-xs">
                  Shipping Information
                </h2>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all resize-none font-light"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                      placeholder="City"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                      placeholder="State"
                      required
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="pincode" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                    placeholder="Enter pincode"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label htmlFor="paymentMethod" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Payment Method *
                  </label>
                  <div className="relative">
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 focus:outline-none focus:border-stone-300 focus:bg-white transition-all appearance-none cursor-pointer font-light"
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="online">Online Payment</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all resize-none font-light"
                    placeholder="Any special instructions for your order"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full px-6 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-light tracking-wide flex items-center justify-center gap-2"
              >
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
                    <span>Place Order • ₹{totalAmount.toLocaleString()}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-stone-200 rounded-sm p-6 sticky top-28"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-stone-900 rounded-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
                <h2 className="text-lg font-light text-stone-900 uppercase tracking-wider text-xs">
                  Order Summary
                </h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-stone-50 border border-stone-200 rounded-sm">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-sm"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/80?text=NAVRASI";
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-light text-stone-900 text-sm line-clamp-2">{item.title}</p>
                      <p className="text-xs text-stone-500 mt-1 font-light">
                        Qty: {item.quantity}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.size && (
                          <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded-sm text-xs text-stone-600 font-light">
                            {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded-sm text-xs text-stone-600 font-light">
                            {item.color}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-light text-stone-900 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-stone-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 font-light">Subtotal ({cartItems.length} items)</span>
                  <span className="text-stone-900 font-light">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 font-light">Shipping</span>
                  <span className="text-green-700 font-normal flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    FREE
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-3">
                  <span className="text-stone-900 font-light">Total</span>
                  <span className="text-2xl font-light text-stone-900">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <span className="text-stone-600 font-light">Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <span className="text-stone-600 font-light">Easy returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                  <span className="text-stone-600 font-light">24/7 support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;