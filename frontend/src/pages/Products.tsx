import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  sizeOptions?: string[];
  colorOptions?: string[];
  feature?: string[];
}

interface FeaturedProducts {
  [key: string]: Product[];
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProducts>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Filters
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("DESC");

  // Available features
  const availableFeatures = ["Sales", "Trending", "Top Rated", "New Collection"];

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sortBy, sortOrder]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/products/categories");
      
      if (Array.isArray(data.data)) {
        setCategories(data.data);
      } else if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const featured: FeaturedProducts = {};
      
      for (const feature of availableFeatures) {
        try {
          const { data } = await axios.get(`/api/products/feature/${feature}?limit=10`);
          
          if (data.data && Array.isArray(data.data.items)) {
            featured[feature] = data.data.items;
          } else if (data.data && Array.isArray(data.data)) {
            featured[feature] = data.data;
          } else if (Array.isArray(data)) {
            featured[feature] = data;
          }
        } catch (err) {
          console.error(`Failed to fetch ${feature} products:`, err);
          featured[feature] = [];
        }
      }
      
      setFeaturedProducts(featured);
    } catch (err) {
      console.error("Failed to fetch featured products:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const { data } = await axios.get(`/api/products?${params.toString()}`);
      
      if (data.data && Array.isArray(data.data.items)) {
        setProducts(data.data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
      
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data?.message || "Failed to fetch products"
        );
      } else {
        setError("An unexpected error occurred");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "price-asc") {
      setSortBy("price");
      setSortOrder("ASC");
    } else if (value === "price-desc") {
      setSortBy("price");
      setSortOrder("DESC");
    } else if (value === "newest") {
      setSortBy("createdAt");
      setSortOrder("DESC");
    } else if (value === "oldest") {
      setSortBy("createdAt");
      setSortOrder("ASC");
    }
  };

  const scrollContainer = (container: HTMLDivElement | null, direction: 'left' | 'right') => {
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Sales":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case "Trending":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "Top Rated":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case "New Collection":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
      default:
        return null;
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-5xl font-bold text-white">
              Our Products
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-7">
            Discover our collection of premium products
          </p>
        </div>

        {/* Featured Sections - Horizontal Scrollable */}
        {availableFeatures.map((feature) => {
          const products = featuredProducts[feature] || [];
          if (products.length === 0) return null;

          return (
            <div key={feature} className="mb-16">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getFeatureColor(feature)} text-white shadow-lg`}>
                    {getFeatureIcon(feature)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{feature}</h2>
                    <p className="text-sm text-gray-400 mt-1">Check out our {feature.toLowerCase()} collection</p>
                  </div>
                </div>
                <Link
                  to={`/products/feature/${feature}`}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all font-medium flex items-center gap-2 group"
                >
                  View All
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Horizontal Scrollable Products */}
              <div className="relative group/scroll">
                {/* Left Scroll Button */}
                <button
                  onClick={(e) => {
                    const container = e.currentTarget.parentElement?.querySelector('.scroll-container') as HTMLDivElement;
                    scrollContainer(container, 'left');
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg rounded-full p-3 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-white/20"
                  aria-label="Scroll left"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Products Container */}
                <div className="scroll-container overflow-x-auto scrollbar-hide -mx-2 px-2">
                  <div className="flex gap-6 pb-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="flex-shrink-0 w-72 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] group shadow-xl"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-800/50">
                          <img
                            src={product.images[0] || "/placeholder-product.png"}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/500?text=No+Image";
                            }}
                          />
                          {/* Feature Badge */}
                          <div className={`absolute top-3 left-3 px-4 py-1.5 rounded-full bg-gradient-to-r ${getFeatureColor(feature)} text-white text-xs font-bold shadow-lg`}>
                            {feature}
                          </div>
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-5">
                          <p className="text-xs text-purple-400 uppercase mb-2 font-semibold">
                            {product.category}
                          </p>
                          <h3 className="font-bold text-white mb-2 line-clamp-2 h-12 text-lg">
                            {product.title}
                          </h3>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.stock} left
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Scroll Button */}
                <button
                  onClick={(e) => {
                    const container = e.currentTarget.parentElement?.querySelector('.scroll-container') as HTMLDivElement;
                    scrollContainer(container, 'right');
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg rounded-full p-3 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-white/20"
                  aria-label="Scroll right"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* All Products Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white">All Products</h2>
          </div>

          {/* Filters */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Search Products
                </label>
                <div className="relative group">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-800">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    onChange={handleSortChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="newest" className="bg-gray-800">Newest First</option>
                    <option value="oldest" className="bg-gray-800">Oldest First</option>
                    <option value="price-asc" className="bg-gray-800">Price: Low to High</option>
                    <option value="price-desc" className="bg-gray-800">Price: High to Low</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center shadow-xl">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No products found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {search || category 
                  ? "Try adjusting your search or filter criteria to find what you're looking for"
                  : "No products available at the moment. Check back soon!"}
              </p>
              {(search || category) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] group shadow-xl"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-800/50">
                    <img
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/500?text=No+Image";
                      }}
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {/* Feature Badges */}
                    {product.feature && product.feature.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.feature.slice(0, 2).map((feat) => (
                          <span
                            key={feat}
                            className={`px-3 py-1 rounded-full bg-gradient-to-r ${getFeatureColor(feat)} text-white text-xs font-bold shadow-lg`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <p className="text-xs text-purple-400 uppercase mb-2 font-semibold">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-white mb-2 line-clamp-2 text-lg">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Products;