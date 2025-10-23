import { useEffect, useState, ChangeEvent } from "react";
import axios, { AxiosError } from "../../utils/axios";
import Header from "../../components/Header";

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
      
      console.log("Admin Orders API Response:", data); // Debug log
      
      // Handle different response structures
      let orderData: Order[] = [];
      
      if (data.data && Array.isArray(data.data.items)) {
        orderData = data.data.items;
      } else if (data.data && Array.isArray(data.data)) {
        orderData = data.data;
      } else if (Array.isArray(data)) {
        orderData = data;
      }
      
      console.log("Extracted Orders:", orderData); // Debug log
      console.log("Total Orders Found:", orderData.length); // Debug log
      
      setOrders(orderData);
      setError("");
    } catch (err) {
      console.error("Fetch orders error:", err); // Debug log
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
      await fetchOrders(); // Refresh the list
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

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      accepted: "bg-blue-100 text-blue-800 border-blue-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status];
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Manage all customer orders</p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Debug Info (Remove after fixing) */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <p><strong>Debug:</strong> Found {orders.length} orders</p>
          {filter && <p><strong>Filter:</strong> {filter}</p>}
        </div>

        {/* Test API Button (Remove after fixing) */}
        <button
          onClick={async () => {
            try {
              const response = await axios.get("/api/orders/admin/all");
              console.log("Raw API Response:", response);
              console.log("Response Data:", response.data);
              alert("Check console for API response");
            } catch (error) {
              console.error("API Error:", error);
              alert("API Error - check console");
            }
          }}
          className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Test API
        </button>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              {filter 
                ? `No ${filter} orders at the moment`
                : "No orders have been placed yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Customer: <span className="font-medium">{order.user?.name || "N/A"}</span>
                      </p>
                      <p className="text-sm text-gray-500">{order.user?.email || "N/A"}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{Number(order.totalAmount).toFixed(2)}
                      </p>
                      <span
                        className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
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
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        expandedOrderId === order.id ? "rotate-90" : ""
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
                    {expandedOrderId === order.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {/* Expanded Details */}
                  {expandedOrderId === order.id && (
                    <div className="space-y-6">
                      {/* Items */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                              >
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = "https://via.placeholder.com/64?text=No+Image";
                                    }}
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)} = ₹
                                    {(Number(item.price) * item.quantity).toFixed(2)}
                                  </p>
                                  {(item.size || item.color) && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {item.size && `Size: ${item.size}`}
                                      {item.size && item.color && " • "}
                                      {item.color && `Color: ${item.color}`}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">No items in this order</p>
                          )}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Shipping Address
                          </h4>
                          <div className="p-4 bg-gray-50 rounded-lg text-sm">
                            <p className="font-medium">{order.shippingAddress.name}</p>
                            <p className="text-gray-600">{order.shippingAddress.phone}</p>
                            <p className="text-gray-600 mt-2">
                              {order.shippingAddress.address}
                            </p>
                            <p className="text-gray-600">
                              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                              {order.shippingAddress.pincode}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Payment Method
                        </h4>
                        <p className="text-gray-600 capitalize">
                          {order.paymentMethod}
                        </p>
                      </div>

                      {/* Notes */}
                      {order.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Order Notes
                          </h4>
                          <p className="text-gray-600 text-sm">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "accepted")}
                          disabled={updatingOrderId === order.id}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {updatingOrderId === order.id
                            ? "Updating..."
                            : "Accept Order"}
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "rejected")}
                          disabled={updatingOrderId === order.id}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {updatingOrderId === order.id
                            ? "Updating..."
                            : "Reject Order"}
                        </button>
                      </>
                    )}

                    {order.status === "accepted" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        disabled={updatingOrderId === order.id}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {updatingOrderId === order.id
                          ? "Updating..."
                          : "Mark as Completed"}
                      </button>
                    )}

                    {(order.status === "completed" || order.status === "rejected" || order.status === "cancelled") && (
                      <span className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                        No actions available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
