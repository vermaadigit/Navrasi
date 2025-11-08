import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavrasiLogo from "../../assets/Navrasi_Logo_Home.png";

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle scroll effect for transparent-to-solid navbar
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      setShowMobileMenu(false);
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
    
    const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b45309;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grad)'/%3E%3Ctext x='50' y='50' font-family='Arial, sans-serif' font-size='40' font-weight='300' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
    
    return svg;
  };

  const getUserName = () => user?.name || user?.email?.split('@')[0] || "User";
  const getUserEmail = () => user?.email || "";

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm" 
            : "bg-white/80 backdrop-blur-md border-b border-stone-100"
        }`}
      >
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <img
                src={NavrasiLogo}
                alt="Navrasi"
                className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
              <Link 
                to="/products" 
                className="relative px-4 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide group"
              >
                <span className="relative z-10">Products</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-stone-900 group-hover:w-3/4 transition-all duration-300"></span>
              </Link>

              {!loading && isAuthenticated && !isAdmin && (
                <Link
                  to="/my-orders"
                  className="relative px-4 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide group"
                >
                  <span className="relative z-10">Orders</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-stone-900 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              )}

              {!loading && isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="relative px-4 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide group"
                  >
                    <span className="relative z-10">Dashboard</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-stone-900 group-hover:w-3/4 transition-all duration-300"></span>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="relative px-4 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide group"
                  >
                    <span className="relative z-10">All Orders</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-stone-900 group-hover:w-3/4 transition-all duration-300"></span>
                  </Link>
                </>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Icon */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-700 hover:text-stone-900 transition-colors hidden md:block"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Cart Icon */}
              <Link 
                to="/cart" 
                className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </Link>

              {/* User Section */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse"></div>
              ) : isAuthenticated ? (
                <div className="relative hidden lg:block" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 focus:outline-none group"
                    aria-label="User menu"
                  >
                    <img
                      src={user?.avatar || getDefaultAvatar(getUserName())}
                      alt={getUserName()}
                      className="w-8 h-8 rounded-full object-cover border border-stone-200 group-hover:border-stone-300 transition-colors"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.startsWith('data:image/svg+xml')) {
                          target.src = getDefaultAvatar(getUserName());
                        }
                      }}
                    />
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-sm shadow-lg border border-stone-200 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-4 py-4 border-b border-stone-100">
                          <div className="flex items-center gap-3">
                            <img
                              src={user?.avatar || getDefaultAvatar(getUserName())}
                              alt={getUserName()}
                              className="w-10 h-10 rounded-full object-cover border border-stone-200"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.startsWith('data:image/svg+xml')) {
                                  target.src = getDefaultAvatar(getUserName());
                                }
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-light text-stone-900 truncate">
                                {getUserName()}
                              </p>
                              <p className="text-xs text-stone-500 truncate font-light">
                                {getUserEmail()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-stone-100 text-stone-700 rounded-full font-light">
                              {user?.role === "admin" ? "Administrator" : "Member"}
                            </span>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors font-light"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span>Profile Settings</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors font-light"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm text-stone-700 hover:text-stone-900 transition-colors font-light tracking-wide"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-stone-900 text-white text-sm rounded-sm hover:bg-stone-800 transition-all duration-300 font-light tracking-wide"
                  >
                    Join Us
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-stone-700 hover:text-stone-900"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  {showMobileMenu ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-stone-100 hidden md:block"
              >
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 rounded-sm focus:outline-none focus:border-stone-300 transition-colors font-light text-sm"
                    autoFocus
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-500 hover:text-stone-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-light text-stone-900 tracking-wide">Menu</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-stone-700 hover:text-stone-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* User Info (Mobile) */}
                {isAuthenticated && (
                  <div className="mb-8 p-4 bg-stone-50 rounded-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={user?.avatar || getDefaultAvatar(getUserName())}
                        alt={getUserName()}
                        className="w-12 h-12 rounded-full object-cover border border-stone-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.startsWith('data:image/svg+xml')) {
                            target.src = getDefaultAvatar(getUserName());
                          }
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-light text-stone-900">{getUserName()}</p>
                        <p className="text-xs text-stone-500 font-light">{getUserEmail()}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-white text-stone-700 rounded-full font-light">
                      {user?.role === "admin" ? "Administrator" : "Member"}
                    </span>
                  </div>
                )}

                {/* Search (Mobile) */}
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 rounded-sm focus:outline-none focus:border-stone-300 transition-colors font-light text-sm"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                      <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1 mb-8">
                  <Link
                    to="/products"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                  >
                    Products
                  </Link>

                  {!loading && isAuthenticated && !isAdmin && (
                    <Link
                      to="/my-orders"
                      onClick={() => setShowMobileMenu(false)}
                      className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                    >
                      My Orders
                    </Link>
                  )}

                  {!loading && isAdmin && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setShowMobileMenu(false)}
                        className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/orders"
                        onClick={() => setShowMobileMenu(false)}
                        className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                      >
                        All Orders
                      </Link>
                    </>
                  )}

                  {isAuthenticated && (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setShowMobileMenu(false)}
                        className="block px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-sm transition-colors font-light"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </nav>

                {/* Auth Buttons (Mobile) */}
                {!isAuthenticated && (
                  <div className="space-y-3 pt-6 border-t border-stone-200">
                    <Link
                      to="/login"
                      onClick={() => setShowMobileMenu(false)}
                      className="block w-full text-center px-5 py-3 bg-stone-50 text-stone-900 rounded-sm hover:bg-stone-100 transition-colors font-light tracking-wide"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setShowMobileMenu(false)}
                      className="block w-full text-center px-5 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-colors font-light tracking-wide"
                    >
                      Join Us
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;