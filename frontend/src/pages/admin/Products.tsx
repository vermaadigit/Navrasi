import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/layout/Header";
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';

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
        return "bg-red-600";
      case "Trending":
        return "bg-purple-600";
      case "Top Rated":
        return "bg-amber-600";
      case "New Collection":
        return "bg-green-600";
      default:
        return "bg-blue-600";
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
                Product Management
              </h1>
              <p className="text-stone-600 font-light leading-relaxed">
                Manage your product catalog and inventory
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="px-6 py-3 bg-white border border-stone-200 text-stone-900 rounded-sm hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center gap-2 font-light"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
              </Link>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 flex items-center gap-2 font-light tracking-wide shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </motion.div>

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

        {/* Products Grid */}
        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-stone-200 rounded-sm p-16 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-3">No products yet</h3>
            <p className="text-stone-600 font-light mb-8">Click "Add Product" to create your first product</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg font-light tracking-wide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Product
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="aspect-square bg-stone-100 overflow-hidden relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {product.feature && product.feature.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.feature.map((feat) => (
                        <span
                          key={feat}
                          className={`px-3 py-1 ${getFeatureColor(feat)} text-white text-xs font-light tracking-wide rounded-sm shadow-sm uppercase`}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-light text-lg text-stone-900 mb-2 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-3 line-clamp-2 font-light">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200">
                    <span className="text-2xl text-stone-900 font-light">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-600 px-3 py-1 bg-stone-50 rounded-sm border border-stone-200 font-light">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 px-4 py-2.5 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-all text-sm font-light tracking-wide flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 px-4 py-2.5 bg-red-700 text-white rounded-sm hover:bg-red-800 transition-all text-sm font-light tracking-wide flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl"
          >
            <div className="sticky top-0 bg-stone-900 px-6 py-4 flex items-center justify-between z-10 rounded-t-sm">
              <h2 className="text-2xl font-light text-white tracking-wide">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 rounded-sm p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                  placeholder="Enter product title"
                  required
                  minLength={3}
                  maxLength={255}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all resize-none font-light"
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Price and Stock */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                    placeholder="0"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                  placeholder="e.g., T-Shirts, Jeans"
                  maxLength={100}
                />
              </div>

              {/* Feature Selection */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Product Features
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFeatures.map((feature) => (
                    <label
                      key={feature}
                      className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all font-light ${
                        formData.feature.includes(feature)
                          ? "bg-stone-900 border-stone-900 text-white"
                          : "bg-white border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.feature.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                        className="w-5 h-5 text-stone-900 bg-white border-stone-300 rounded focus:ring-stone-900 focus:ring-2"
                      />
                      <span className="text-sm tracking-wide">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.feature.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-stone-600 font-light">Selected:</span>
                    {formData.feature.map((feat) => (
                      <span
                        key={feat}
                        className={`px-4 py-2 ${getFeatureColor(feat)} text-white rounded-sm text-sm font-light tracking-wide shadow-sm`}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Options */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Size Options
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
                    className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                    placeholder="e.g., S, M, L, XL"
                  />
                  <button
                    type="button"
                    onClick={addSize}
                    className="px-6 py-3 bg-blue-700 text-white rounded-sm hover:bg-blue-800 transition-all font-light tracking-wide"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizeOptions.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-sm text-sm font-light"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="hover:text-blue-600 text-lg font-light"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Color Options
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                    className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all font-light"
                    placeholder="e.g., Red, Blue, Black"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-6 py-3 bg-green-700 text-white rounded-sm hover:bg-green-800 transition-all font-light tracking-wide"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colorOptions.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-800 rounded-sm text-sm font-light"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="hover:text-green-600 text-lg font-light"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm uppercase tracking-wider text-stone-900 mb-3 font-medium">
                  Product Images {!editingProduct && "*"} (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-light file:tracking-wide file:bg-stone-900 file:text-white hover:file:bg-stone-800 file:transition-colors font-light"
                  required={!editingProduct}
                />
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-sm border-2 border-stone-200 group-hover:border-stone-400 transition-colors"
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
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-white border border-stone-200 text-stone-900 rounded-sm hover:bg-stone-50 transition-all font-light tracking-wide"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 px-6 py-3 ${editingProduct ? 'bg-blue-700 hover:bg-blue-800' : 'bg-green-700 hover:bg-green-800'} text-white rounded-sm transition-all duration-300 font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
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
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminProducts;