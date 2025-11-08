import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
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

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
  stock: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data.data);

      // Set default selections
      if (data.data.sizeOptions && data.data.sizeOptions.length > 0) {
        setSelectedSize(data.data.sizeOptions[0]);
      }
      if (data.data.colorOptions && data.data.colorOptions.length > 0) {
        setSelectedColor(data.data.colorOptions[0]);
      }

      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data?.message || "Failed to fetch product"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);

    try {
      const existingCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existingItemIndex = existingCart.findIndex(
        (item) =>
          item.productId === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${selectedSize}-${selectedColor}`,
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity,
          size: selectedSize,
          color: selectedColor,
          image: product.images[0] || "",
          stock: product.stock,
        };
        existingCart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      // Show notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      alert("Failed to add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 500);
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-stone-200 rounded-sm p-16 max-w-md text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-stone-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-stone-600 mb-6 font-light">{error || "The product you're looking for doesn't exist."}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Products</span>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 z-50"
          >
            <div className="bg-green-600 text-white px-6 py-4 rounded-sm shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-light">Added to cart successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm flex-wrap">
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
            <li className="text-stone-900 font-light truncate max-w-xs">{product.title}</li>
          </ol>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="bg-stone-100 rounded-sm overflow-hidden">
              <div className="aspect-[4/5] relative group">
                <img
                  src={product.images[selectedImage] || "/placeholder-product.png"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800x1000?text=NAVRASI";
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
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.feature.map((feat) => (
                      <span
                        key={feat}
                        className={`px-3 py-1 ${getFeatureBadgeColor(feat)} text-xs tracking-wide font-light rounded-sm`}
                      >
                        {feat.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-stone-900"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/200?text=NAVRASI";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-28">
              {/* Category & Stock */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs tracking-widest uppercase font-medium rounded-sm">
                  {product.category}
                </span>
                {product.stock > 0 && (
                  <span className="flex items-center gap-2 text-xs text-green-700 font-light">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    In Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-light text-stone-900 mb-6 leading-tight tracking-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-stone-200">
                <span className="text-4xl sm:text-5xl font-light text-stone-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-stone-500 text-sm font-light">
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                  Description
                </h3>
                <p className="text-stone-600 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Size Options */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded-sm font-light transition-all ${
                          selectedSize === size
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-300 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Options */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border rounded-sm font-light transition-all ${
                          selectedColor === color
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-300 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200 transition-all flex items-center justify-center text-stone-900 font-light"
                  >
                    −
                  </button>
                  <span className="w-16 text-center font-light text-stone-900 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                    className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200 transition-all flex items-center justify-center text-stone-900 font-light disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="w-full px-6 py-4 bg-white border-2 border-stone-900 text-stone-900 rounded-sm font-light tracking-wide hover:bg-stone-900 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>{addingToCart ? "Adding..." : "Add to Cart"}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full px-6 py-4 bg-stone-900 text-white rounded-sm font-light tracking-wide hover:bg-stone-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {product.stock === 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-sm mb-8">
                  <p className="text-center text-red-800 font-light text-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    This product is currently out of stock
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="pt-8 border-t border-stone-200 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-900 font-light mb-1">Free Shipping</p>
                    <p className="text-stone-500 text-xs font-light">On all orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-900 font-light mb-1">Secure Payment</p>
                    <p className="text-stone-500 text-xs font-light">100% protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-900 font-light mb-1">Easy Returns</p>
                    <p className="text-stone-500 text-xs font-light">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-stone-900 font-light mb-1">24/7 Support</p>
                    <p className="text-stone-500 text-xs font-light">Always here</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;