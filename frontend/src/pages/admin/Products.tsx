import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/layout/Header";
import Footer from '../../components/layout/Footer';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sizeOptions: string[];
  colorOptions: string[];
  images: string[];
  feature: string[];
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

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products?limit=1000");
      
      if (data.data && Array.isArray(data.data.items)) {
        setProducts(data.data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (Array.isArray(data)) {
        setProducts(data);
      }
      
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
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

  const openAddModal = () => {
    setEditingProduct(null);
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
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      sizeOptions: product.sizeOptions || [],
      colorOptions: product.colorOptions || [],
      feature: product.feature || [],
      images: [],
    });
    setImagePreviews(product.images || []);
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      submitData.append("category", formData.category);
      submitData.append("sizeOptions", JSON.stringify(formData.sizeOptions));
      submitData.append("colorOptions", JSON.stringify(formData.colorOptions));
      submitData.append("feature", JSON.stringify(formData.feature));

      formData.images.forEach((image) => {
        submitData.append("images", image);
      });

      if (editingProduct) {
        submitData.append("existingImages", JSON.stringify(editingProduct.images));
        await axios.put(`/api/products/${editingProduct.id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated successfully!");
      } else {
        await axios.post("/api/products", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product created successfully!");
      }

      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to save product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`/api/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

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
              <h1 className="text-4xl font-bold text-white">Product Management</h1>
            </div>
            <p className="text-gray-400 ml-7">Manage your product catalog</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </Link>
            <button
              onClick={openAddModal}
              className="relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-3 text-white font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </div>
            </button>
          </div>
        </div>

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

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-20 text-center shadow-2xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No products yet</h3>
            <p className="text-gray-400 mb-8">Click "Add Product" to create your first product</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all group"
              >
                <div className="aspect-square bg-white/5 overflow-hidden relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {product.feature && product.feature.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.feature.map((feat) => (
                        <span
                          key={feat}
                          className={`px-3 py-1 bg-gradient-to-r ${getFeatureColor(feat)} text-white text-xs font-bold rounded-lg shadow-lg`}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 px-4 py-2.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 px-4 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                    Stock *
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
                  placeholder="e.g., T-Shirts, Jeans"
                  maxLength={100}
                />
              </div>

              {/* Feature Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Product Features
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFeatures.map((feature) => (
                    <label
                      key={feature}
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                        formData.feature.includes(feature)
                          ? "bg-purple-500/20 border-purple-500/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.feature.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                        className="w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm font-semibold text-white">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.feature.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400">Selected:</span>
                    {formData.feature.map((feat) => (
                      <span
                        key={feat}
                        className={`px-4 py-2 bg-gradient-to-r ${getFeatureColor(feat)} text-white rounded-xl text-sm font-bold shadow-lg`}
                      >
                        {feat}
                      </span>
                    ))}
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
                    placeholder="e.g., S, M, L, XL"
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
                        className="hover:text-blue-300 text-lg font-bold"
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
                    placeholder="e.g., Red, Blue, Black"
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
                        className="hover:text-green-300 text-lg font-bold"
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
                  Product Images {!editingProduct && "*"} (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:transition-colors"
                  required={!editingProduct}
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
                  onClick={() => setShowModal(false)}
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
                  <div className={`absolute inset-0 ${editingProduct ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-green-600 to-emerald-600'} rounded-xl`}></div>
                  <div className={`absolute inset-0 ${editingProduct ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative px-6 py-3 text-white font-bold flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      editingProduct ? "Update Product" : "Create Product"
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

export default AdminProducts;