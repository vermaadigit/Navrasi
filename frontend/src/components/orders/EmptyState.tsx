import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 md:p-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start shopping and your orders will appear here. Discover our amazing collection!
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Browse Products
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
