import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import { motion } from "framer-motion";
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
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
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

  const getFeatureBadgeColor = (feature: string) => {
    switch (feature) {
      case "Sales":
        return "bg-red-600 text-white";
      case "Trending":
        return "bg-amber-600 text-white";
      case "Top Rated":
        return "bg-yellow-500 text-white";
      case "New Collection":
        return "bg-green-600 text-white";
      default:
        return "bg-stone-900 text-white";
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSortBy("createdAt");
    setSortOrder("DESC");
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
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-4 font-medium">
            Discover
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            Our Collection
          </h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto">
            Explore our carefully curated selection of premium products
          </p>
        </motion.div>

        {/* Featured Sections - Horizontal Scrollable */}
        {availableFeatures.map((feature, index) => {
          const featureProducts = featuredProducts[feature] || [];
          if (featureProducts.length === 0) return null;

          return (
            <motion.div 
              key={feature} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-20"
            >
              {/* Section Header */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
                    Featured
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
                    {feature}
                  </h2>
                </div>
                <Link
                  to={`/products/feature/${feature}`}
                  className="hidden sm:flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 transition-colors group"
                >
                  <span className="tracking-wide font-light">View All</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-stone-50"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5 text-stone-900" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Products Container */}
                <div className="scroll-container overflow-x-auto scrollbar-hide -mx-2 px-2">
                  <div className="flex gap-6 pb-4">
                    {featureProducts.map((product, prodIndex) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prodIndex * 0.05 }}
                      >
                        <Link
                          to={`/products/${product.id}`}
                          className="flex-shrink-0 w-64 sm:w-72 block group"
                        >
                          {/* Product Image */}
                          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4 rounded-sm">
                            <img
                              src={product.images[0] || "/placeholder-product.png"}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://via.placeholder.com/500x667?text=NAVRASI";
                              }}
                            />
                            {/* Feature Badge */}
                            <div className={`absolute top-4 left-4 px-3 py-1 ${getFeatureBadgeColor(feature)} text-xs tracking-wide font-light rounded-sm`}>
                              {feature.toUpperCase()}
                            </div>
                            {product.stock === 0 && (
                              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-stone-900 text-sm tracking-wide font-light uppercase">
                                  Sold Out
                                </span>
                              </div>
                            )}
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
                          </div>

                          {/* Product Details */}
                          <div className="space-y-2">
                            <p className="text-xs text-stone-500 uppercase tracking-widest">
                              {product.category}
                            </p>
                            <h3 className="font-light text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                              {product.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg text-stone-900 font-light">
                                ₹{product.price.toLocaleString()}
                              </span>
                              {product.stock > 0 && product.stock < 10 && (
                                <span className="text-xs text-amber-700 font-light">
                                  Only {product.stock} left
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right Scroll Button */}
                <button
                  onClick={(e) => {
                    const container = e.currentTarget.parentElement?.querySelector('.scroll-container') as HTMLDivElement;
                    scrollContainer(container, 'right');
                  }}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-stone-50"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5 text-stone-900" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Mobile View All Link */}
              <div className="sm:hidden text-center mt-6">
                <Link
                  to={`/products/feature/${feature}`}
                  className="inline-flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <span className="tracking-wide font-light">View All {feature}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          );
        })}

        {/* All Products Section */}
        <div className="mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-medium">
              Shop
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
              All Products
            </h2>
          </motion.div>

          {/* Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-stone-200 rounded-sm text-stone-900 font-light"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                  <span>Filters & Sort</span>
                </span>
                <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Filters Content */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white border border-stone-200 rounded-sm p-6`}>
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Search
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 rounded-sm text-sm focus:outline-none focus:border-stone-300 transition-colors font-light"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 rounded-sm text-sm focus:outline-none focus:border-stone-300 transition-colors appearance-none cursor-pointer font-light"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                    Sort By
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleSortChange}
                      defaultValue="newest"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 text-stone-900 rounded-sm text-sm focus:outline-none focus:border-stone-300 transition-colors appearance-none cursor-pointer font-light"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Active Filters & Clear */}
              {(search || category) && (
                <div className="mt-6 pt-6 border-t border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-stone-600 font-light">
                    <span>Active filters:</span>
                    {search && <span className="px-3 py-1 bg-stone-100 rounded-full text-xs">{search}</span>}
                    {category && <span className="px-3 py-1 bg-stone-100 rounded-full text-xs">{category}</span>}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-stone-700 hover:text-stone-900 underline font-light"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-800 font-light">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          {products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-stone-200 rounded-sm p-16 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-stone-900 mb-3">
                No products found
              </h3>
              <p className="text-stone-600 mb-6 max-w-md mx-auto font-light">
                {search || category 
                  ? "Try adjusting your search or filter criteria"
                  : "No products available at the moment"}
              </p>
              {(search || category) && (
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="block group"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4 rounded-sm">
                      <img
                        src={product.images[0] || "/placeholder-product.png"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/500x667?text=NAVRASI";
                        }}
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-stone-900 text-sm tracking-wide font-light uppercase">
                            Sold Out
                          </span>
                        </div>
                      )}
                      {/* Feature Badges */}
                      {product.feature && product.feature.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.feature.slice(0, 1).map((feat) => (
                            <span
                              key={feat}
                              className={`px-3 py-1 ${getFeatureBadgeColor(feat)} text-xs tracking-wide font-light rounded-sm`}
                            >
                              {feat.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2">
                      <p className="text-xs text-stone-500 uppercase tracking-widest">
                        {product.category}
                      </p>
                      <h3 className="font-light text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 text-sm">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-base text-stone-900 font-light">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.stock > 0 && product.stock < 10 && (
                          <span className="text-xs text-amber-700 font-light">
                            Only {product.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {products.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-stone-500 font-light">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                {(search || category) && (
                  <span>
                    {' '}matching your criteria
                  </span>
                )}
              </p>
            </motion.div>
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