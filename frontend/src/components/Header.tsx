import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import NavrasiLogo from "../assets/Navrasi_Logo_Home.png";

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Generate default avatar with initials
  const getDefaultAvatar = (name: string = "User") => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
    
    // Create SVG avatar with initials
    const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234F46E5'/%3E%3Ctext x='50' y='50' font-family='Arial, sans-serif' font-size='40' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
    
    return svg;
  };

  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white shadow-lg sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md">
      <nav className="header-container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo with Image */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img
              src={NavrasiLogo}
              alt="Navrasi Logo"
              className="h-12 w-auto object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-blue-600 transition-colors relative group"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <>
                {/* User Navigation */}
                {!isAdmin && (
                  <Link
                    to="/my-orders"
                    className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
                  >
                    My Orders
                  </Link>
                )}

                {/* Admin Navigation */}
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
                    >
                      All Orders
                    </Link>
                  </>
                )}

                {/* Profile Dropdown - Compact Version */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
                    aria-label="User menu"
                  >
                    <img
                      src={user?.avatar || getDefaultAvatar(user?.name)}
                      alt={user?.name || "User"}
                      className="w-11 h-11 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition-all shadow-sm"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.startsWith('data:image/svg+xml')) {
                          target.src = getDefaultAvatar(user?.name);
                        }
                      }}
                    />
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu - Compact Size */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-medium">
                          {user?.role === "admin" ? "Admin" : "Customer"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Profile Settings
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg text-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-5 flex items-center justify-around border-t pt-5">
          <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">
            Products
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
            Cart
          </Link>
          {isAuthenticated && !isAdmin && (
            <Link to="/my-orders" className="text-gray-700 hover:text-blue-600 font-medium">
              Orders
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
