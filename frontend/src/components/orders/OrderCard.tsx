import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import OrderStatusTracker from "./OrderStatusTracker";
import OrderItemCard from "./OrderItemCard";

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

interface OrderCardProps {
  order: Order;
  onCancel: (orderId: string) => void;
  isCancelling: boolean;
}

const OrderCard = ({ order, onCancel, isCancelling }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Order Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {order.orderNumber}
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(order.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                {order.items?.length || 0} {order.items?.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">
              ₹{Number(order.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="mt-6">
          <OrderStatusTracker status={order.status} />
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4 md:p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4 group"
        >
          <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Order Items
          </h4>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 overflow-hidden"
            >
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <OrderItemCard key={idx} item={item} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No items in this order</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/orders/${order.id}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </Link>

          {order.status === "pending" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCancel(order.id)}
              disabled={isCancelling}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
