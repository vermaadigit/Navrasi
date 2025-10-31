import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import NavrasiLogo from "../../assets/Navrasi_Logo_Home.png";

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    
    const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238B5CF6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23EC4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grad)'/%3E%3Ctext x='50' y='50' font-family='Arial, sans-serif' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
    
    return svg;
  };

  // Get user display name safely
  const getUserName = () => {
    return user?.name || user?.email?.split('@')[0] || "User";
  };

  // Get user display email safely
  const getUserEmail = () => {
    return user?.email || "";
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-purple-500/5" 
          : "bg-gray-900/80 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <nav className="header-container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Glow Effect */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src={NavrasiLogo}
              alt="Navrasi Logo"
              className="h-10 md:h-12 w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link 
              to="/products" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium group"
            >
              <span className="relative z-10">Products</span>
              <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            {!loading && isAuthenticated && !isAdmin && (
              <Link
                to="/my-orders"
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium group"
              >
                <span className="relative z-10">My Orders</span>
                <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            )}

            {!loading && isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
                <Link
                  to="/admin/orders"
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium group"
                >
                  <span className="relative z-10">All Orders</span>
                  <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2.5 text-gray-300 hover:text-white transition-colors group"
              aria-label="Shopping Cart"
            >
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg
                className="w-6 h-6 relative z-10"
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
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {loading ? (
              // Loading skeleton while checking auth
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none group"
                  aria-label="User menu"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <img
                      src={user?.avatar || getDefaultAvatar(getUserName())}
                      alt={getUserName()}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20 group-hover:border-purple-500/50 transition-all shadow-lg relative"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.startsWith('data:image/svg+xml')) {
                          target.src = getDefaultAvatar(getUserName());
                        }
                      }}
                    />
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden md:block ${
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

                {/* Dropdown Menu - Dark Theme */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 z-50 overflow-hidden">
                    {/* User Info Section */}
                    <div className="px-4 py-4 border-b border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.avatar || getDefaultAvatar(getUserName())}
                          alt={getUserName()}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.startsWith('data:image/svg+xml')) {
                              target.src = getDefaultAvatar(getUserName());
                            }
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {getUserName()}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {getUserEmail()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          {user?.role === "admin" ? "Administrator" : "Customer"}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <svg
                            className="w-5 h-5"
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
                        </div>
                        <span className="font-medium">Profile Settings</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                          <svg
                            className="w-5 h-5"
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
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 md:px-6 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative px-4 md:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-2">
            <Link 
              to="/products" 
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs font-medium">Products</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs font-medium">Cart</span>
              <span className="absolute top-1 right-3 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </Link>
            
            {!loading && isAuthenticated && !isAdmin && (
              <Link 
                to="/my-orders" 
                className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-xs font-medium">Orders</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
