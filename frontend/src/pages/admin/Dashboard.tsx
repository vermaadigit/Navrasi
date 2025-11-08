import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios, { AxiosError } from "../../utils/axios";
import Header from "../../components/layout/Header";
import Footer from '../../components/layout/Footer';

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  user: {
    name: string;
    email: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  sizeOptions: string[];
  colorOptions: string[];
  feature: string[];
  images: File[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  // Product Form States
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const availableFeatures = ["Sales", "Trending", "Top Rated", "New Collection"];
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sizeOptions: [],
    colorOptions: [],
    feature: [],
    images: [],
  });
  const [sizeInput, setSizeInput] = useState<string>("");
  const [colorInput, setColorInput] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/orders/admin/all?limit=1000");

      let orders: RecentOrder[] = [];

      if (data.data && Array.isArray(data.data.items)) {
        orders = data.data.items;
      } else if (data.data && Array.isArray(data.data)) {
        orders = data.data;
      } else if (Array.isArray(data)) {
        orders = data;
      }

      const totalOrders = orders.length;
      const pendingOrders = orders.filter(
        (order: RecentOrder) => order.status === "pending"
      ).length;
      const completedOrders = orders.filter(
        (order: RecentOrder) => order.status === "completed"
      ).length;
      const totalRevenue = orders
        .filter(
          (order: RecentOrder) =>
            order.status === "completed" || order.status === "accepted"
        )
        .reduce(
          (sum: number, order: RecentOrder) => sum + Number(order.totalAmount),
          0
        );

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
      });

      setRecentOrders(orders.slice(0, 5));
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data?.message ||
            "Failed to fetch dashboard data"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData((prev) => {
      const isSelected = prev.feature.includes(feature);
      if (isSelected) {
        return {
          ...prev,
          feature: prev.feature.filter((f) => f !== feature),
        };
      } else {
        return {
          ...prev,
          feature: [...prev.feature, feature],
        };
      }
    });
  };

  const getFeatureColor = (feature: string) => {
    switch (feature) {
      case "Sales":
        return "from-red-500 to-pink-500";
      case "Trending":
        return "from-amber-600 to-orange-500";
      case "Top Rated":
        return "from-yellow-500 to-amber-600";
      case "New Collection":
        return "from-green-600 to-emerald-600";
      default:
        return "from-stone-600 to-stone-700";
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const addSize = () => {
    if (sizeInput.trim() && !formData.sizeOptions.includes(sizeInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        sizeOptions: [...prev.sizeOptions, sizeInput.trim()],
      }));
      setSizeInput("");
    }
  };

  const removeSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizeOptions: prev.sizeOptions.filter((s) => s !== size),
    }));
  };

  const addColor = () => {
    if (colorInput.trim() && !formData.colorOptions.includes(colorInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        colorOptions: [...prev.colorOptions, colorInput.trim()],
      }));
      setColorInput("");
    }
  };

  const removeColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colorOptions: prev.colorOptions.filter((c) => c !== color),
    }));
  };

  const openProductModal = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      sizeOptions: [],
      colorOptions: [],
      feature: [],
      images: [],
    });
    setImagePreviews([]);
    setSizeInput("");
    setColorInput("");
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      submitData.append("category", formData.category || "General");
      submitData.append("sizeOptions", JSON.stringify(formData.sizeOptions));
      submitData.append("colorOptions", JSON.stringify(formData.colorOptions));
      submitData.append("feature", JSON.stringify(formData.feature));

      formData.images.forEach((image) => {
        submitData.append("images", image);
      });

      await axios.post("/api/products", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product created successfully!");
      setShowProductModal(false);
      
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        sizeOptions: [],
        colorOptions: [],
        feature: [],
        images: [],
      });
      setImagePreviews([]);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to create product"
      );
      alert(err.response?.data?.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-700 mb-2 font-medium">
                Administration
              </p>
              <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-stone-600 font-light mt-2">
                Monitor your store performance
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchDashboardData}
                className="px-6 py-3 bg-white border border-stone-200 text-stone-900 rounded-sm hover:bg-stone-50 transition-all flex items-center gap-2 font-light shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openProductModal}
                className="px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all flex items-center gap-2 font-light shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm"
            >
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-800 font-light">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-light">
                  Total Orders
                </p>
                <p className="text-4xl font-light text-stone-900 mb-1">
                  {stats.totalOrders}
                </p>
                <p className="text-xs text-stone-400 font-light">All time</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-stone-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Pending Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-amber-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-700 mb-2 font-light">
                  Pending Orders
                </p>
                <p className="text-4xl font-light text-amber-600 mb-1">
                  {stats.pendingOrders}
                </p>
                <p className="text-xs text-amber-500 font-light">Requires action</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Completed Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-green-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-green-700 mb-2 font-light">
                  Completed Orders
                </p>
                <p className="text-4xl font-light text-green-600 mb-1">
                  {stats.completedOrders}
                </p>
                <p className="text-xs text-green-500 font-light">Successfully delivered</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-light">
                  Total Revenue
                </p>
                <p className="text-3xl font-light text-stone-900 mb-1">
                  ₹{stats.totalRevenue.toFixed(2)}
                </p>
                <p className="text-xs text-stone-400 font-light">From completed orders</p>
              </div>
              <div className="w-12 h-12 rounded-sm bg-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/admin/orders?status=pending"
            className="group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-sm p-6 text-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light mb-2">Review Pending</h3>
                  <p className="text-amber-100 text-sm font-light">
                    {stats.pendingOrders} orders waiting
                  </p>
                </div>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </Link>

          <Link
            to="/admin/orders"
            className="group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-sm p-6 text-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light mb-2">All Orders</h3>
                  <p className="text-stone-300 text-sm font-light">
                    View complete order list
                  </p>
                </div>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </Link>

          <Link
            to="/admin/products"
            className="group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-sm p-6 text-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light mb-2">Products</h3>
                  <p className="text-green-100 text-sm font-light">
                    Manage product catalog
                  </p>
                </div>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-stone-900">Recent Orders</h2>
              <p className="text-sm text-stone-600 font-light mt-1">Latest customer orders</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-stone-900 hover:text-stone-700 font-light flex items-center gap-1 transition-colors text-sm"
            >
              View All
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-stone-500 font-light">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-light text-stone-700 uppercase tracking-widest">
                      Order Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-light text-stone-700 uppercase tracking-widest">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-light text-stone-700 uppercase tracking-widest">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-light text-stone-700 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-light text-stone-700 uppercase tracking-widest">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to="/admin/orders"
                          className="text-stone-900 hover:text-stone-700 font-light"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-light text-stone-900">
                            {order.user?.name || "N/A"}
                          </p>
                          <p className="text-sm text-stone-500 font-light">
                            {order.user?.email || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-light text-stone-900">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-sm text-xs font-light border ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : order.status === "accepted"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : order.status === "completed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : order.status === "rejected"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-stone-50 text-stone-700 border-stone-200"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-light">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-xl"
            >
              <div className="sticky top-0 bg-stone-900 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-light text-white tracking-tight">Add New Product</h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-white hover:text-stone-300 rounded-sm p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                    placeholder="Enter product title"
                    required
                    minLength={3}
                    maxLength={255}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all resize-none font-light"
                    placeholder="Enter product description"
                    required
                  />
                </div>

                {/* Price and Stock */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                      placeholder="0"
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                    placeholder="e.g., T-Shirts, Jeans, Shoes"
                    maxLength={100}
                  />
                </div>

                {/* Product Features Section */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-3 font-light">
                    Product Features
                    <span className="text-stone-500 text-xs normal-case ml-2">(Select one or more)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableFeatures.map((feature) => {
                      const isSelected = formData.feature.includes(feature);
                      return (
                        <label
                          key={feature}
                          className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all ${
                            isSelected
                              ? "bg-stone-100 border-stone-900 shadow-sm"
                              : "bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleFeatureChange(feature)}
                            className="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-900"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-light text-stone-900 block">
                              {feature}
                            </span>
                            <span className="text-xs text-stone-500 font-light">
                              {feature === "Sales" && "Show as on sale"}
                              {feature === "Trending" && "Mark as trending"}
                              {feature === "Top Rated" && "Highlight as top rated"}
                              {feature === "New Collection" && "Show in new arrivals"}
                            </span>
                          </div>
                          <div className="text-stone-400">
                            {feature === "Sales" && (
                              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                            )}
                            {feature === "Trending" && (
                              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            )}
                            {feature === "Top Rated" && (
                              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                            {feature === "New Collection" && (
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                              </svg>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  
                  {/* Selected Features Display */}
                  {formData.feature.length > 0 && (
                    <div className="mt-4 p-4 bg-stone-50 rounded-sm border border-stone-200">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-light text-stone-700">Selected Features ({formData.feature.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.feature.map((feat) => (
                          <span
                            key={feat}
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getFeatureColor(feat)} text-white rounded-sm text-sm font-light shadow-sm`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 mt-3 font-light">
                        These features will be displayed as badges on your product
                      </p>
                    </div>
                  )}
                </div>

                {/* Size Options */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Size Options
                  </label>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                      className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                      placeholder="e.g., S, M, L, XL, XXL"
                    />
                    <button
                      type="button"
                      onClick={addSize}
                      className="px-6 py-3 bg-stone-900 text-white rounded-sm font-light hover:bg-stone-800 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.sizeOptions.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 border border-stone-300 text-stone-700 rounded-sm text-sm font-light"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="hover:text-stone-900 text-lg"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Options */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Color Options
                  </label>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                      className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:border-stone-900 transition-all font-light"
                      placeholder="e.g., Red, Blue, Black, White"
                    />
                    <button
                      type="button"
                      onClick={addColor}
                      className="px-6 py-3 bg-stone-900 text-white rounded-sm font-light hover:bg-stone-800 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.colorOptions.map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 border border-stone-300 text-stone-700 rounded-sm text-sm font-light"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="hover:text-stone-900 text-lg"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-700 mb-2 font-light">
                    Product Images * (Maximum 5 images)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-stone-900 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-light file:bg-stone-900 file:text-white hover:file:bg-stone-800 file:transition-colors font-light"
                    required
                  />
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-5 gap-3 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-sm border-2 border-stone-200 group-hover:border-stone-900 transition-colors"
                          />
                          <div className="absolute top-2 right-2 bg-stone-900 text-white text-xs px-2 py-1 rounded-sm font-light">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="flex-1 px-6 py-3 bg-white border border-stone-300 text-stone-900 rounded-sm hover:bg-stone-50 transition-all font-light"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all font-light flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Product...
                      </>
                    ) : (
                      "Create Product"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
