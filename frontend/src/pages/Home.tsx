import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  feature?: string[];
}

interface FeaturedProducts {
  [key: string]: Product[];
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newCollection, setNewCollection] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchFeaturedProducts();
    fetchTrendingProducts();
    fetchNewCollection();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axios.get("/api/products?limit=8");
      
      if (data.data && Array.isArray(data.data.items)) {
        setFeaturedProducts(data.data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setFeaturedProducts(data.data);
      } else if (Array.isArray(data)) {
        setFeaturedProducts(data);
      } else {
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingProducts = async () => {
    try {
      const { data } = await axios.get("/api/products/feature/Trending?limit=6");
      
      if (data.data && Array.isArray(data.data.items)) {
        setTrendingProducts(data.data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setTrendingProducts(data.data);
      } else if (Array.isArray(data)) {
        setTrendingProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch trending products:", error);
    }
  };

  const fetchNewCollection = async () => {
    try {
      const { data } = await axios.get("/api/products/feature/New Collection?limit=4");
      
      if (data.data && Array.isArray(data.data.items)) {
        setNewCollection(data.data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setNewCollection(data.data);
      } else if (Array.isArray(data)) {
        setNewCollection(data);
      }
    } catch (error) {
      console.error("Failed to fetch new collection:", error);
    }
  };

  const scrollToProducts = () => {
    const element = document.getElementById('featured-products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />

      {/* Hero Section - Dark Aesthetic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-40 right-20 animate-pulse delay-1000"></div>
          <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-20 left-1/3 animate-pulse delay-2000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm text-purple-300 font-medium">New Collection Available</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Welcome to
              </span>
              <br />
              <span className="text-white">Navrasi</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover premium quality products with cutting-edge design. 
              <span className="text-purple-400 font-semibold"> Elevate your lifestyle</span> with our exclusive collection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button
                onClick={scrollToProducts}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Explore Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <Link
                to="/products"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  1000+
                </div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  4.9★
                </div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section - Dark */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium service and quality products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Premium Quality</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every product undergoes rigorous quality checks to ensure you receive only the best
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Best Prices</h3>
                <p className="text-gray-400 leading-relaxed">
                  Competitive pricing with exclusive deals and regular discounts for our valued customers
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Fast Delivery</h3>
                <p className="text-gray-400 leading-relaxed">
                  Lightning-fast shipping with real-time tracking to ensure timely delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-white">Trending Now</h2>
                </div>
                <p className="text-gray-400">Most popular products this week</p>
              </div>
              <Link
                to="/products/feature/Trending"
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
              >
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="aspect-square overflow-hidden bg-gray-800/50">
                    <img
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/500?text=No+Image";
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs font-semibold">
                      Trending
                    </div>
                  </div>

                  <div className="p-6">
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
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section id="featured-products" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Handpicked selection of our finest products just for you
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-6">No products available yet</p>
              <Link
                to="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-800/50">
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
                          <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-xs text-purple-400 uppercase mb-2 font-semibold">
                        {product.category}
                      </p>
                      <h3 className="font-bold text-white mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.stock} left
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/products"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Explore All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* New Collection Banner */}
      {newCollection.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-400 font-medium">Just Launched</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                New Arrivals
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Fresh designs and latest trends, exclusively for you
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newCollection.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="aspect-square overflow-hidden bg-gray-800/50 relative">
                    <img
                      src={product.images[0] || "/placeholder-product.png"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/500?text=No+Image";
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-semibold">
                      New
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-green-400 uppercase mb-2 font-semibold">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-white mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/products/feature/New Collection"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                View New Collection
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Conditional Auth Buttons */}
      {!isAuthenticated && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8">
                <span className="text-sm text-purple-300 font-medium">Join Our Community</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Create an account today and get exclusive access to special offers, 
                <span className="text-purple-400 font-semibold"> early product launches</span>, and 
                <span className="text-pink-400 font-semibold"> members-only deals</span>
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/register"
                  className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    Sign Up Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  Login
                </Link>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Exclusive Discounts</h4>
                    <p className="text-sm text-gray-400">Get up to 30% off on selected items</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Early Access</h4>
                    <p className="text-sm text-gray-400">Be the first to see new collections</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Fast Shipping</h4>
                    <p className="text-sm text-gray-400">Free express delivery on all orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Add gradient animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;