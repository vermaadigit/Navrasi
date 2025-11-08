import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { AxiosError } from "../../utils/axios";
import { motion } from "framer-motion";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

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

const FeatureProducts = () => {
  const { feature } = useParams<{ feature: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, [feature]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products/feature/${feature}`);
      
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

  const getFeatureDescription = (feature: string) => {
    switch (feature) {
      case "Sales":
        return "Exclusive deals and special offers on selected items";
      case "Trending":
        return "Most popular products loved by our community";
      case "Top Rated":
        return "Highest rated products based on customer reviews";
      case "New Collection":
        return "Fresh arrivals and latest additions to our collection";
      default:
        return "Curated selection of premium products";
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
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
                Home
              </Link>
            </li>
            <li className="text-stone-300">/</li>
            <li>
              <Link to="/products" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
                Products
              </Link>
            </li>
            <li className="text-stone-300">/</li>
            <li className="text-stone-900 font-light">{feature}</li>
          </ol>
        </motion.nav>

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Back Button */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-8 font-light group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Products</span>
          </Link>
          
          {/* Feature Badge & Title */}
          <div className="flex items-start gap-6 mb-6">
            <div className={`px-4 py-2 ${getFeatureBadgeColor(feature || '')} rounded-sm text-xs tracking-wide font-light uppercase`}>
              {feature}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            {feature}
          </h1>
          <p className="text-stone-600 font-light max-w-2xl leading-relaxed">
            {getFeatureDescription(feature || '')}
          </p>
        </motion.div>

        {/* Product Count */}
        {products.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 pb-6 border-b border-stone-200"
          >
            <p className="text-sm text-stone-500 font-light">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          </motion.div>
        )}

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
            <p className="text-stone-600 mb-6 font-light">
              No products available in this collection at the moment
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
            >
              <span>Explore All Products</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
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
                    
                    {/* Feature Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 ${getFeatureBadgeColor(feature || '')} text-xs tracking-wide font-light rounded-sm`}>
                      {feature?.toUpperCase()}
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

        {/* Back to Top Button */}
        {products.length > 12 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-sm hover:border-stone-300 hover:bg-stone-50 transition-all font-light"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <span>Back to Top</span>
            </button>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FeatureProducts;