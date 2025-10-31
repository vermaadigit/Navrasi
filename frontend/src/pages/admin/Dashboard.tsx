import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
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
  feature: string[]; // NEW: Added feature field
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
  
  // NEW: Available feature options
  const availableFeatures = ["Sales", "Trending", "Top Rated", "New Collection"];
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sizeOptions: [],
    colorOptions: [],
    feature: [], // NEW: Added feature field
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

  // NEW: Handle feature checkbox changes
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

  // NEW: Get feature color gradient
  const getFeatureColor = (feature: string) => {
    switch (feature) {
      case "Sales":
        return "from-red-500 to-pink-500";
      case "Trending":
        return "from-purple-500 to-indigo-500";
      case "Top Rated":
        return "from-yellow-500 to-orange-500";
      case "New Collection":
        return "from-green-500 to-teal-500";
      default:
        return "from-blue-500 to-cyan-500";
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
      feature: [], // NEW: Reset feature
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
      submitData.append("feature", JSON.stringify(formData.feature)); // NEW: Add feature

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
        feature: [], // NEW: Reset feature
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
        <Footer />
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
        <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-gray-400 ml-7">Welcome back! Here's your overview</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchDashboardData}
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={openProductModal}
              className="relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-3 text-white font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </div>
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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Orders */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Orders</p>
                <p className="text-4xl font-bold text-white mb-1">
                  {stats.totalOrders}
                </p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Pending Orders</p>
                <p className="text-4xl font-bold text-yellow-400 mb-1">
                  {stats.pendingOrders}
                </p>
                <p className="text-xs text-gray-500">Requires action</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Completed Orders</p>
                <p className="text-4xl font-bold text-green-400 mb-1">
                  {stats.completedOrders}
                </p>
                <p className="text-xs text-gray-500">Successfully delivered</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  ₹{stats.totalRevenue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">From completed orders</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/admin/orders?status=pending"
            className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Review Pending</h3>
                  <p className="text-yellow-100 text-sm">
                    {stats.pendingOrders} orders waiting
                  </p>
                </div>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">All Orders</h3>
                  <p className="text-blue-100 text-sm">
                    View complete order list
                  </p>
                </div>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/products"
            className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Products</h3>
                  <p className="text-green-100 text-sm">
                    Manage product catalog
                  </p>
                </div>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Recent Orders</h2>
              <p className="text-sm text-gray-400">Latest customer orders</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
            >
              View All
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to="/admin/orders"
                          className="text-purple-400 hover:text-purple-300 font-semibold"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">
                            {order.user?.name || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.user?.email || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          ₹{Number(order.totalAmount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-4 py-2 rounded-xl text-xs font-bold ${
                            order.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : order.status === "accepted"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : order.status === "completed"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : order.status === "rejected"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
        </div>
      </div>

      {/* Add Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="Enter product title"
                  required
                  minLength={3}
                  maxLength={255}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Price and Stock */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="0"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="e.g., T-Shirts, Jeans, Shoes"
                  maxLength={100}
                />
              </div>

              {/* NEW: Product Features Section */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Product Features
                  <span className="text-gray-500 text-xs ml-2">(Select one or more)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFeatures.map((feature) => {
                    const isSelected = formData.feature.includes(feature);
                    return (
                      <label
                        key={feature}
                        className={`relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleFeatureChange(feature)}
                            className="peer sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-purple-600 border-purple-600"
                              : "bg-white/5 border-white/30"
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-white block">
                            {feature}
                          </span>
                          <span className={`text-xs transition-colors ${
                            isSelected ? "text-purple-300" : "text-gray-500"
                          }`}>
                            {feature === "Sales" && "Show as on sale"}
                            {feature === "Trending" && "Mark as trending"}
                            {feature === "Top Rated" && "Highlight as top rated"}
                            {feature === "New Collection" && "Show in new arrivals"}
                          </span>
                        </div>
                        <div className={`transition-opacity ${isSelected ? "opacity-100" : "opacity-30"}`}>
                          {feature === "Sales" && (
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          )}
                          {feature === "Trending" && (
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          )}
                          {feature === "Top Rated" && (
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          )}
                          {feature === "New Collection" && (
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
                
                {/* Selected Features Display */}
                {formData.feature.length > 0 && (
                  <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-300">Selected Features ({formData.feature.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.feature.map((feat) => (
                        <span
                          key={feat}
                          className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getFeatureColor(feat)} text-white rounded-xl text-sm font-bold shadow-lg`}
                        >
                          {feat === "Sales" && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          )}
                          {feat === "Trending" && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          )}
                          {feat === "Top Rated" && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {feat === "New Collection" && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          )}
                          {feat}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      These features will be displayed as badges on your product
                    </p>
                  </div>
                )}
                
                {/* No Features Selected State */}
                {formData.feature.length === 0 && (
                  <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                    <svg className="w-8 h-8 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p className="text-sm text-gray-500">No features selected</p>
                    <p className="text-xs text-gray-600 mt-1">Select features to highlight your product</p>
                  </div>
                )}
              </div>

              {/* Size Options */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Size Options
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                    className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="e.g., S, M, L, XL, XXL"
                  />
                  <button
                    type="button"
                    onClick={addSize}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizeOptions.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm font-semibold"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="hover:text-blue-300 text-lg"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Color Options
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                    className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="e.g., Red, Blue, Black, White"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colorOptions.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="hover:text-green-300 text-lg"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Product Images * (Maximum 5 images)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:transition-colors"
                  required
                />
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-xl border-2 border-white/10 group-hover:border-purple-500/50 transition-colors"
                        />
                        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-lg font-bold">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-semibold"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative flex-1 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-3 text-white font-bold flex items-center justify-center gap-2">
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
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminDashboard;