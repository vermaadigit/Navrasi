import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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

interface LocationState {
  orderSuccess?: boolean;
  orderId?: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/orders/my-orders");
      
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

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await axios.put(`/api/orders/${orderId}/cancel`);
      await fetchOrders();
      alert("Order cancelled successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        alert(axiosError.response?.data?.message || "Failed to cancel order");
      } else {
        alert("Failed to cancel order");
      }
    } finally {
      setCancellingOrderId(null);
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        gradient: "from-yellow-500 to-orange-500",
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
      },
      accepted: {
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
        text: "text-blue-400",
      },
      rejected: {
        gradient: "from-red-500 to-pink-500",
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        text: "text-red-400",
      },
      completed: {
        gradient: "from-green-500 to-emerald-500",
        bg: "bg-green-500/20",
        border: "border-green-500/30",
        text: "text-green-400",
      },
      cancelled: {
        gradient: "from-gray-500 to-gray-600",
        bg: "bg-gray-500/20",
        border: "border-gray-500/30",
        text: "text-gray-400",
      },
    };
    return configs[status];
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case "accepted":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case "completed":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case "rejected":
      case "cancelled":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
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
      
      <div className="profile-container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-4xl font-bold text-white">My Orders</h1>
          </div>
          <p className="text-gray-400 ml-7">Track and manage your purchases</p>
        </div>

        {/* Success Message */}
        {state?.orderSuccess && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400">Order placed successfully! We'll process it soon.</p>
              </div>
            </div>
          </div>
        )}

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No orders yet
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start shopping and your orders will appear here
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
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const isExpanded = expandedOrders.has(order.id);
              
              return (
                <div
                  key={order.id}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Order Header */}
                  <div className="bg-white/5 backdrop-blur-sm p-6 border-b border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${statusConfig.gradient} flex items-center justify-center`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {order.orderNumber}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${statusConfig.bg} border ${statusConfig.border} backdrop-blur-sm`}>
                        <div className={statusConfig.text}>
                          {getStatusIcon(order.status)}
                        </div>
                        <span className={`${statusConfig.text} font-bold text-sm uppercase`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <button
                      onClick={() => toggleOrderExpand(order.id)}
                      className="w-full flex items-center justify-between mb-4 text-left"
                    >
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Order Items ({order.items?.length || 0})
                      </h4>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                          >
                            {item.image && (
                              <div className="relative overflow-hidden rounded-xl flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-24 h-24 object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://via.placeholder.com/96?text=No+Image";
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-white mb-2 line-clamp-2">
                                {item.title}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs text-purple-400 font-semibold">
                                  Qty: {item.quantity}
                                </span>
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
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ₹{Number(item.price).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                × {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No items in this order</p>
                      )}
                    </div>

                    {/* Order Footer */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </p>
                      </div>

                      {order.status === "pending" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={cancellingOrderId === order.id}
                          className="px-8 py-3 bg-red-500/10 border-2 border-red-500/30 text-red-400 rounded-xl font-bold hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {cancellingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                        </button>
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

export default MyOrders;