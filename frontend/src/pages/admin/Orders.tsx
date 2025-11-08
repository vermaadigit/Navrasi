import { useEffect, useState, ChangeEvent } from "react";
import axios, { AxiosError } from "../../utils/axios";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
}

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
  userId: string;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = filter 
        ? `/api/orders/admin/all?status=${filter}` 
        : "/api/orders/admin/all";
      
      const { data } = await axios.get(url);
      
      let orderData: Order[] = [];
      
      if (data.data && Array.isArray(data.data.items)) {
        orderData = data.data.items;
      } else if (data.data && Array.isArray(data.data)) {
        orderData = data.data;
      } else if (Array.isArray(data)) {
        orderData = data;
      }
      
      setOrders(orderData);
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data?.message || "Failed to fetch orders"
        );
      } else {
        setError("An unexpected error occurred");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    const confirmMessage =
      status === "rejected"
        ? "Are you sure you want to reject this order?"
        : `Are you sure you want to mark this order as ${status}?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setUpdatingOrderId(orderId);
      await axios.put(`/api/orders/admin/${orderId}/status`, { status });
      await fetchOrders();
      alert(`Order ${status} successfully`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        alert(
          axiosError.response?.data?.message ||
            "Failed to update order status"
        );
      } else {
        alert("Failed to update order status");
      }
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-800",
      },
      accepted: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
      },
      rejected: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
      },
      completed: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
      },
      cancelled: {
        bg: "bg-stone-100",
        border: "border-stone-300",
        text: "text-stone-700",
      },
    };
    return configs[status];
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />
      
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-stone-100/30 to-amber-50/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-700 mb-3 font-medium">
                Admin Dashboard
              </p>
              <h1 className="text-5xl sm:text-6xl font-light text-stone-900 tracking-tight mb-4">
                Order Management
              </h1>
              <p className="text-stone-600 font-light leading-relaxed">
                Manage and process all customer orders
              </p>
            </div>

            {/* Filter & Refresh */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFilter(e.target.value)
                  }
                  className="appearance-none px-6 py-3 pr-12 bg-white border border-stone-200 rounded-sm text-stone-900 focus:outline-none focus:border-stone-400 transition-all font-light cursor-pointer"
                >
                  <option value="">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={fetchOrders}
                className="px-6 py-3 bg-white border border-stone-200 text-stone-900 rounded-sm hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center gap-2 font-light"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-sm"
          >
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800 font-light">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-stone-200 rounded-sm p-16 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-3">
              No orders found
            </h3>
            <p className="text-stone-600 font-light">
              {filter 
                ? `No ${filter} orders at the moment`
                : "No orders have been placed yet"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const isExpanded = expandedOrderId === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-stone-50 px-6 py-6 border-b border-stone-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-sm bg-stone-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-light text-stone-900 mb-2 tracking-wide">
                            {order.orderNumber}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-sm text-stone-600 font-light">
                              <span className="text-stone-900">{order.user?.name || "N/A"}</span>
                            </p>
                            <p className="text-sm text-stone-500 font-light">{order.user?.email || "N/A"}</p>
                            <p className="text-xs text-stone-500 flex items-center gap-1 mt-2 font-light">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-light text-stone-900 mb-3">
                          ₹{Number(order.totalAmount).toLocaleString()}
                        </p>
                        <span
                          className={`inline-block px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} border`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    {/* Toggle Details Button */}
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex items-center gap-2 text-stone-700 hover:text-stone-900 mb-4 font-light transition-colors group"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span className="tracking-wide">{isExpanded ? "Hide Details" : "View Details"}</span>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-8"
                      >
                        {/* Items */}
                        <div>
                          <h4 className="text-sm uppercase tracking-widest text-stone-900 mb-4 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-4 p-4 bg-stone-50 rounded-sm border border-stone-200 hover:bg-stone-100 transition-colors"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-20 h-20 object-cover rounded-sm"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://via.placeholder.com/80?text=No+Image";
                                      }}
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-light text-stone-900 mb-2">{item.title}</p>
                                    <p className="text-sm text-stone-600 font-light">
                                      Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)} = <span className="text-stone-900">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                                    </p>
                                    {(item.size || item.color) && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {item.size && (
                                          <span className="px-2 py-1 bg-white border border-stone-200 rounded-sm text-xs text-stone-700">
                                            Size: {item.size}
                                          </span>
                                        )}
                                        {item.color && (
                                          <span className="px-2 py-1 bg-white border border-stone-200 rounded-sm text-xs text-stone-700">
                                            Color: {item.color}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-stone-500 text-center py-4 font-light">No items in this order</p>
                            )}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        {order.shippingAddress && (
                          <div>
                            <h4 className="text-sm uppercase tracking-widest text-stone-900 mb-4 font-medium flex items-center gap-2">
                              <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Shipping Address
                            </h4>
                            <div className="p-4 bg-stone-50 rounded-sm border border-stone-200">
                              <p className="font-light text-stone-900 mb-1">{order.shippingAddress.name}</p>
                              <p className="text-stone-600 text-sm mb-3 font-light">{order.shippingAddress.phone}</p>
                              <p className="text-stone-700 text-sm font-light">
                                {order.shippingAddress.address}
                              </p>
                              <p className="text-stone-700 text-sm font-light">
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Payment Method */}
                        <div>
                          <h4 className="text-sm uppercase tracking-widest text-stone-900 mb-4 font-medium flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Payment Method
                          </h4>
                          <p className="text-stone-700 capitalize px-4 py-3 bg-stone-50 rounded-sm border border-stone-200 inline-block font-light">
                            {order.paymentMethod}
                          </p>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                          <div>
                            <h4 className="text-sm uppercase tracking-widest text-stone-900 mb-4 font-medium flex items-center gap-2">
                              <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              Order Notes
                            </h4>
                            <p className="text-stone-700 text-sm p-4 bg-stone-50 rounded-sm border border-stone-200 font-light">
                              {order.notes}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-stone-200 flex flex-wrap gap-3">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, "accepted")}
                            disabled={updatingOrderId === order.id}
                            className="px-6 py-3 bg-green-700 text-white rounded-sm hover:bg-green-800 transition-all duration-300 font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {updatingOrderId === order.id ? "Updating..." : "Accept Order"}
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, "rejected")}
                            disabled={updatingOrderId === order.id}
                            className="px-6 py-3 bg-red-700 text-white rounded-sm hover:bg-red-800 transition-all duration-300 font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {updatingOrderId === order.id ? "Updating..." : "Reject Order"}
                          </button>
                        </>
                      )}

                      {order.status === "accepted" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          disabled={updatingOrderId === order.id}
                          className="px-6 py-3 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-all duration-300 font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {updatingOrderId === order.id ? "Updating..." : "Mark as Completed"}
                        </button>
                      )}

                      {(order.status === "completed" || order.status === "rejected" || order.status === "cancelled") && (
                        <span className="px-6 py-3 bg-stone-100 border border-stone-200 text-stone-600 rounded-sm font-light tracking-wide">
                          No actions available
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminOrders;