import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-display font-bold text-primary-600">
            Navrasi
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/#categories"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/#about"
              className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <svg
                className="w-6 h-6 text-secondary-700 group-hover:text-primary-600 transition-colors"
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
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            {isAuthenticated && user?.role === 'admin' ? (
              <Link
                to="/admin"
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
