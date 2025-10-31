import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-400 mb-6">{error || "The product you're looking for doesn't exist."}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>
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

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Added to cart successfully!</span>
          </div>
        </div>
      )}

      <div className="profile-container mx-auto px-4 py-12 max-w-7xl relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-purple-400 transition-colors">
                Products
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white font-medium truncate max-w-xs">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-square relative group">
                <img
                  src={product.images[selectedImage] || "/placeholder-product.png"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800?text=No+Image";
                  }}
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
                {/* Feature Badges */}
                {product.feature && product.feature.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.feature.map((feat) => (
                      <span
                        key={feat}
                        className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getFeatureColor(feat)} text-white text-sm font-bold shadow-lg`}
                      >
                        {feat}
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
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-purple-500 shadow-lg shadow-purple-500/50"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-400 font-semibold uppercase">
                  {product.category}
                </span>
                {product.stock > 0 && (
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-sm text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    In Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-white/10">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 text-lg">
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Options */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-xl font-semibold transition-all ${
                          selectedSize === size
                            ? "border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/30"
                            : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
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
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Select Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border-2 rounded-xl font-semibold transition-all ${
                          selectedColor === color
                            ? "border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/30"
                            : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
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
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center text-white font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="w-20 text-center font-bold text-white text-2xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center text-white font-bold text-xl disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-purple-500 text-white rounded-xl font-bold hover:bg-purple-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="relative flex-1 group overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-4 text-white font-bold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Buy Now
                  </div>
                </button>
              </div>

              {product.stock === 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-center text-red-400 font-semibold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    This product is currently out of stock
                  </p>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Free Shipping</p>
                    <p className="text-gray-400 text-xs">On all orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Secure Payment</p>
                    <p className="text-gray-400 text-xs">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Easy Returns</p>
                    <p className="text-gray-400 text-xs">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">24/7 Support</p>
                    <p className="text-gray-400 text-xs">Always here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;