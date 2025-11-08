import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "../utils/axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import OrderStatusTracker from "../components/orders/OrderStatusTracker";
import OrderItemCard from "../components/orders/OrderItemCard";

interface OrderItem {
  productId: string;
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

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");
      
      const { data } = await axios.get(`/api/orders/${id}`);
      
      // Handle different response structures
      let orderData: Order | null = null;
      
      if (data.data) {
        orderData = data.data;
      } else if (data) {
        orderData = data;
      }
      
      if (!orderData) {
        setError("Order not found");
        return;
      }
      
      setOrder(orderData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data?.message || "Failed to load order details"
        );
      } else {
        setError("An unexpected error occurred");
      }
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
      accepted: "text-blue-700 bg-blue-50 border-blue-200",
      rejected: "text-red-700 bg-red-50 border-red-200",
      completed: "text-green-700 bg-green-50 border-green-200",
      cancelled: "text-gray-700 bg-gray-50 border-gray-200",
    };
    return colors[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        <Header />
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-stone-200 rounded-sm p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-stone-900 mb-4">
              {error || "Order not found"}
            </h2>
            <button
              onClick={() => navigate("/my-orders")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-colors font-light"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to My Orders
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/my-orders")}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8 transition-colors font-light"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to My Orders
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm"
        >
          {/* Order Header */}
          <div className="p-6 md:p-8 border-b border-stone-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-light text-stone-900 mb-2 tracking-tight">
                  {order.orderNumber}
                </h1>
                <p className="text-sm text-stone-600 font-light">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-sm text-sm font-light border ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <OrderStatusTracker status={order.status} />
          </div>

          {/* Order Items */}
          <div className="p-6 md:p-8 border-b border-stone-100">
            <h2 className="text-lg font-light text-stone-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <OrderItemCard key={idx} item={item} />
                ))
              ) : (
                <p className="text-stone-500 text-center py-4 font-light">No items in this order</p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 md:p-8 border-b border-stone-100">
            <h2 className="text-lg font-light text-stone-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h2>
            <div className="bg-stone-50 rounded-sm p-4 border border-stone-100">
              <p className="font-light text-stone-900 mb-1">{order.shippingAddress.name}</p>
              <p className="text-stone-600 font-light text-sm mb-2">{order.shippingAddress.phone}</p>
              <p className="text-stone-600 font-light text-sm">
                {order.shippingAddress.address}
              </p>
              <p className="text-stone-600 font-light text-sm">
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          {/* Payment & Total */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-light text-stone-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>
              <span className="text-stone-600 font-light">{order.paymentMethod}</span>
            </div>

            {order.notes && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-100 rounded-sm">
                <p className="text-sm text-amber-900 font-light">
                  <span className="font-normal">Note:</span> {order.notes}
                </p>
              </div>
            )}

            <div className="border-t border-stone-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-light text-stone-900">Total Amount</span>
                <span className="text-2xl md:text-3xl font-light text-stone-900">
                  ₹{Number(order.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;
