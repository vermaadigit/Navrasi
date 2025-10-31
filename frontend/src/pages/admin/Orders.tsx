import { useEffect, useState, ChangeEvent } from "react";
import axios, { AxiosError } from "../../utils/axios";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

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
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
      },
      accepted: {
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
      },
      rejected: {
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        text: "text-red-400",
      },
      completed: {
        bg: "bg-green-500/20",
        border: "border-green-500/30",
        text: "text-green-400",
      },
      cancelled: {
        bg: "bg-gray-500/20",
        border: "border-gray-500/30",
        text: "text-gray-400",
      },
    };
    return configs[status];
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    );
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h1 className="text-4xl font-bold text-white">Order Management</h1>
            </div>
            <p className="text-gray-400 ml-7">Manage all customer orders</p>
          </div>

          {/* Filter & Refresh */}
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
              className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer pr-10"
            >
              <option value="" className="bg-gray-800">All Orders</option>
              <option value="pending" className="bg-gray-800">Pending</option>
              <option value="accepted" className="bg-gray-800">Accepted</option>
              <option value="rejected" className="bg-gray-800">Rejected</option>
              <option value="completed" className="bg-gray-800">Completed</option>
              <option value="cancelled" className="bg-gray-800">Cancelled</option>
            </select>
            
            <button
              onClick={fetchOrders}
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
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
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center shadow-2xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No orders found
            </h3>
            <p className="text-gray-400">
              {filter 
                ? `No ${filter} orders at the moment`
                : "No orders have been placed yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Order Header */}
                  <div className="bg-white/5 backdrop-blur-sm px-6 py-6 border-b border-white/10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {order.orderNumber}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-400">
                              Customer: <span className="font-semibold text-white">{order.user?.name || "N/A"}</span>
                            </p>
                            <p className="text-sm text-gray-500">{order.user?.email || "N/A"}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-6 py-2 rounded-xl text-sm font-bold ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} border`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    {/* Toggle Details Button */}
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 font-semibold transition-colors"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="space-y-6">
                        {/* Items */}
                        <div>
                          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-20 h-20 object-cover rounded-lg"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://via.placeholder.com/80?text=No+Image";
                                      }}
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-semibold text-white mb-2">{item.title}</p>
                                    <p className="text-sm text-gray-400">
                                      Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)} = <span className="font-bold text-purple-400">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                                    </p>
                                    {(item.size || item.color) && (
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {item.size && (
                                          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs text-blue-400 font-semibold">
                                            Size: {item.size}
                                          </span>
                                        )}
                                        {item.color && (
                                          <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-lg text-xs text-pink-400 font-semibold">
                                            Color: {item.color}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-center py-4">No items in this order</p>
                            )}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        {order.shippingAddress && (
                          <div>
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Shipping Address
                            </h4>
                            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                              <p className="font-semibold text-white mb-1">{order.shippingAddress.name}</p>
                              <p className="text-gray-400 text-sm mb-3">{order.shippingAddress.phone}</p>
                              <p className="text-gray-300 text-sm">
                                {order.shippingAddress.address}
                              </p>
                              <p className="text-gray-300 text-sm">
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Payment Method */}
                        <div>
                          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Payment Method
                          </h4>
                          <p className="text-gray-300 capitalize px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 inline-block">
                            {order.paymentMethod}
                          </p>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                          <div>
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              Order Notes
                            </h4>
                            <p className="text-gray-300 text-sm p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                              {order.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, "accepted")}
                            disabled={updatingOrderId === order.id}
                            className="relative group overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 text-white font-bold flex items-center gap-2">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {updatingOrderId === order.id ? "Updating..." : "Accept Order"}
                            </div>
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, "rejected")}
                            disabled={updatingOrderId === order.id}
                            className="relative group overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative px-6 py-3 text-white font-bold flex items-center gap-2">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              {updatingOrderId === order.id ? "Updating..." : "Reject Order"}
                            </div>
                          </button>
                        </>
                      )}

                      {order.status === "accepted" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          disabled={updatingOrderId === order.id}
                          className="relative group overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative px-6 py-3 text-white font-bold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {updatingOrderId === order.id ? "Updating..." : "Mark as Completed"}
                          </div>
                        </button>
                      )}

                      {(order.status === "completed" || order.status === "rejected" || order.status === "cancelled") && (
                        <span className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-semibold">
                          No actions available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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