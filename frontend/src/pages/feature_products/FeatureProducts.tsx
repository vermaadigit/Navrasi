import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { AxiosError } from "../../utils/axios";
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${getFeatureColor(feature || '')} text-white shadow-lg`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {feature}
              </h1>
              <p className="text-gray-600 mt-1">
                Explore our {feature?.toLowerCase()} collection
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Found <strong>{products.length}</strong> products in this collection
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              No products available in this collection at the moment
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={product.images[0] || "/placeholder-product.png"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/500?text=No+Image";
                    }}
                  />
                  {/* Feature Badge */}
                  <div className={`absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r ${getFeatureColor(feature || '')} text-white text-xs font-semibold shadow-lg`}>
                    {feature}
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
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
      <Footer />
    </div>
  );
};

export default FeatureProducts;