import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios, { AxiosError } from "../utils/axios";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OrderCard from '../components/orders/OrderCard';
import OrderFilters from '../components/orders/OrderFilters';

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

type FilterStatus = Order["status"] | "all";
type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const location = useLocation();
  const state = location.state as LocationState;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [orders, filterStatus, sortBy]);

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

  const applyFiltersAndSort = () => {
    let result = [...orders];

    if (filterStatus !== "all") {
      result = result.filter(order => order.status === filterStatus);
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "amount-high":
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case "amount-low":
        result.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }

    setFilteredOrders(result);
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

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      accepted: orders.filter(o => o.status === "accepted").length,
      completed: orders.filter(o => o.status === "completed").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
      rejected: orders.filter(o => o.status === "rejected").length,
    };
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
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-7xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-4 font-medium">
            Account
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            My Orders
          </h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto">
            Track and manage your order history
          </p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {state?.orderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-green-800 font-light">
                    Order placed successfully! We'll process it soon.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-800 font-light">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders Content */}
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-stone-200 rounded-sm p-16 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-3">
              No orders yet
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              Start shopping and your orders will appear here
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OrderFilters
                statusCounts={getStatusCounts()}
                activeFilter={filterStatus}
                onFilterChange={setFilterStatus}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </motion.div>

            {/* Orders List */}
            <motion.div layout className="space-y-6 mt-8">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border border-stone-200 rounded-sm p-12 text-center"
                  >
                    <p className="text-stone-600 font-light">
                      No orders found with the selected filters.
                    </p>
                  </motion.div>
                ) : (
                  filteredOrders.map((order, index) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onCancel={handleCancelOrder}
                      isCancelling={cancellingOrderId === order.id}
                      index={index}
                    />
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {/* Results Count */}
            {filteredOrders.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <p className="text-sm text-stone-500 font-light">
                  Showing {filteredOrders.length} of {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MyOrders;
