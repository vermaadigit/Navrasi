import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

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

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newCollection, setNewCollection] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />

      {/* Hero Section - Premium Minimal */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100/40 via-white to-amber-50/30"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-100/30 to-stone-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-stone-100/40 to-amber-50/40 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Minimal badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-stone-200/60 rounded-full mb-8 shadow-sm"
            >
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
              <span className="text-xs tracking-wide text-stone-700 font-medium uppercase">New Season 2025</span>
            </motion.div>

            {/* Hero heading */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light mb-6 leading-[0.95] tracking-tight">
              <span className="block text-stone-900 mb-2">Elegance</span>
              <span className="block bg-gradient-to-r from-stone-700 via-amber-700 to-stone-800 bg-clip-text text-transparent font-serif italic">Redefined</span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Discover timeless pieces crafted with precision. 
              <span className="text-stone-800 font-normal"> Elevate your wardrobe</span> with our curated collection.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-16"
            >
              <button
                onClick={scrollToProducts}
                className="group px-8 py-4 bg-stone-900 text-white rounded-sm font-light tracking-wide hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Shop Collection
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <Link
                to="/products"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-stone-300 text-stone-900 rounded-sm font-light tracking-wide hover:bg-white hover:border-stone-400 transition-all duration-300 shadow-sm"
              >
                Explore All
              </Link>
            </motion.div>

            {/* Minimal stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-stone-200/60"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-900 mb-1">1000+</div>
                <div className="text-xs uppercase tracking-wider text-stone-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-900 mb-1">50K+</div>
                <div className="text-xs uppercase tracking-wider text-stone-500">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-900 mb-1">4.9★</div>
                <div className="text-xs uppercase tracking-wider text-stone-500">Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-stone-400 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Brand Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3 text-stone-900 tracking-wide">Premium Quality</h3>
              <p className="text-stone-600 leading-relaxed font-light text-sm">
                Meticulously crafted from the finest materials, ensuring lasting elegance and comfort.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3 text-stone-900 tracking-wide">Sustainable Fashion</h3>
              <p className="text-stone-600 leading-relaxed font-light text-sm">
                Committed to eco-friendly practices and ethical production for a better tomorrow.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-3 text-stone-900 tracking-wide">Express Delivery</h3>
              <p className="text-stone-600 leading-relaxed font-light text-sm">
                Swift and secure shipping worldwide, bringing luxury to your doorstep.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-stone-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-16"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-700 mb-3 font-medium">Curated Selection</p>
                <h2 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">Trending Now</h2>
              </div>
              <Link
                to="/products/feature/Trending"
                className="hidden sm:flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 transition-colors group"
              >
                <span className="tracking-wide">View All</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                      <img
                        src={product.images[0] || "/placeholder-product.png"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/500x667?text=NAVRASI";
                        }}
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-900 text-xs tracking-wide font-light">
                        TRENDING
                      </div>
                      
                      {/* Quick view overlay */}
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300"></div>
                    </div>

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
                        {product.stock < 10 && product.stock > 0 && (
                          <span className="text-xs text-amber-700">Only {product.stock} left</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12 sm:hidden">
              <Link
                to="/products/feature/Trending"
                className="inline-flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900 transition-colors"
              >
                <span className="tracking-wide">View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Banner Section */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-xs uppercase tracking-widest text-amber-700 mb-4 font-medium">The Essence of Style</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 mb-6 leading-tight tracking-tight">
                Timeless Classics
                <span className="block text-stone-600 italic font-serif mt-2">for Every Occasion</span>
              </h2>
              <p className="text-stone-600 mb-8 leading-relaxed font-light">
                Our collection blends contemporary aesthetics with timeless elegance. Each piece is thoughtfully designed to complement your unique style and enhance your everyday moments.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 group"
              >
                <span className="tracking-wide font-light">Discover More</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-[4/5] bg-stone-200 overflow-hidden">
                <img
                  src="/home_card_img.jpeg"
                  alt="Editorial"
                  className="w-full h-full object-cover"
                  // onError={(e) => {
                  //   const target = e.target as HTMLImageElement;
                  //   target.src = "https://via.placeholder.com/800x1000?text=NAVRASI+COLLECTION";
                  // }}
                />
                {/* Decorative frame */}
                <div className="absolute inset-4 border border-white/40"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-amber-700 mb-4 font-medium">Handpicked for You</p>
            <h2 className="text-4xl sm:text-5xl font-light text-stone-900 mb-4 tracking-tight">
              Featured Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto font-light">
              Discover our carefully curated selection of the season's finest pieces
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-stone-600 mb-6 font-light">No products available at the moment</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300"
              >
                <span className="tracking-wide font-light">Explore Collection</span>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                        <img
                          src={product.images[0] || "/placeholder-product.png"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/500x667?text=NAVRASI";
                          }}
                        />
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-stone-900 text-sm tracking-wide font-light">SOLD OUT</span>
                          </div>
                        )}
                        
                        {/* Quick view overlay */}
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300"></div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-stone-500 uppercase tracking-widest">
                          {product.category}
                        </p>
                        <h3 className="font-light text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 text-sm">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-base text-stone-900 font-light">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.stock > 0 && product.stock < 10 && (
                            <span className="text-xs text-amber-700">Only {product.stock} left</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  <span className="tracking-wide font-light">View Full Collection</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* New Collection Section */}
      {newCollection.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
                <span className="text-xs tracking-wider text-amber-900 font-medium uppercase">Just Arrived</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-stone-900 mb-4 tracking-tight">
                New Arrivals
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto font-light">
                Fresh styles crafted for the modern wardrobe
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newCollection.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                      <img
                        src={product.images[0] || "/placeholder-product.png"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/500x667?text=NAVRASI";
                        }}
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-amber-600 text-white text-xs tracking-wide font-light">
                        NEW
                      </div>
                      
                      {/* Quick view overlay */}
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300"></div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-stone-500 uppercase tracking-widest">
                        {product.category}
                      </p>
                      <h3 className="font-light text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 text-sm">
                        {product.title}
                      </h3>
                      <span className="block text-base text-stone-900 font-light">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/products/feature/New Collection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-700 text-white rounded-sm hover:bg-amber-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <span className="tracking-wide font-light">Shop New Arrivals</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">
              Stay in Touch
            </h2>
            <p className="text-stone-300 mb-10 font-light leading-relaxed">
              Subscribe to receive exclusive updates, early access to new collections, and special offers delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-stone-400 rounded-sm focus:outline-none focus:border-white/40 transition-colors font-light"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-stone-900 rounded-sm hover:bg-stone-100 transition-all duration-300 font-light tracking-wide"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-stone-500 mt-6 font-light">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Auth CTA Section */}
      {!isAuthenticated && (
        <section className="py-24 bg-gradient-to-b from-white to-stone-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-stone-200 rounded-sm p-12 sm:p-16 text-center shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-200 rounded-full mb-8">
                  <span className="text-xs tracking-wider text-stone-700 font-medium uppercase">Exclusive Access</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mb-6 tracking-tight">
                  Join the Navrasi Community
                </h2>
                <p className="text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                  Create an account to enjoy personalized recommendations, exclusive member benefits, and seamless shopping experiences.
                </p>

                <div className="flex flex-wrap gap-4 justify-center mb-12">
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] font-light tracking-wide shadow-lg"
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-white border border-stone-300 text-stone-900 rounded-sm hover:border-stone-400 transition-all duration-300 font-light tracking-wide"
                  >
                    Sign In
                  </Link>
                </div>

                {/* Member benefits */}
                <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
                  <div>
                    <div className="text-2xl mb-2">✓</div>
                    <h4 className="text-sm font-light text-stone-900 mb-1 tracking-wide">Early Access</h4>
                    <p className="text-xs text-stone-600 font-light">First to shop new collections</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">✓</div>
                    <h4 className="text-sm font-light text-stone-900 mb-1 tracking-wide">Member Pricing</h4>
                    <p className="text-xs text-stone-600 font-light">Exclusive discounts & offers</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">✓</div>
                    <h4 className="text-sm font-light text-stone-900 mb-1 tracking-wide">Free Shipping</h4>
                    <p className="text-xs text-stone-600 font-light">Complimentary delivery on orders</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;