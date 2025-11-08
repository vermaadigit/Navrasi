import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-stone-50 to-white border-t border-stone-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-light text-stone-900 tracking-tight">
                Navrasi
              </h3>
            </Link>
            <p className="text-stone-600 leading-relaxed text-sm font-light mb-6 max-w-sm">
              Discover timeless elegance and premium quality. 
              Elevate your wardrobe with our curated collection of sophisticated pieces.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-stone-900 font-light text-sm tracking-wide uppercase">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 rounded-sm text-sm focus:outline-none focus:border-stone-400 transition-colors font-light"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 text-sm font-light"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
              {subscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-600 font-light"
                >
                  ✓ Thank you for subscribing!
                </motion.p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-stone-900 font-light text-sm tracking-wide uppercase mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products/feature/New Collection"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products/feature/Trending"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-3">
            <h4 className="text-stone-900 font-light text-sm tracking-wide uppercase mb-6">
              Customer Care
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="lg:col-span-3">
            <h4 className="text-stone-900 font-light text-sm tracking-wide uppercase mb-6">
              Company
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  to="/about"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-light"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-stone-600 text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:support@navrasi.com" className="hover:text-stone-900 font-light">
                  support@navrasi.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-stone-600 text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+911234567890" className="hover:text-stone-900 font-light">
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-stone-200">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500 font-light uppercase tracking-wider">Follow Us</span>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500 font-light uppercase tracking-wider">We Accept</span>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded text-xs font-light text-stone-600">
                Visa
              </div>
              <div className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded text-xs font-light text-stone-600">
                Mastercard
              </div>
              <div className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded text-xs font-light text-stone-600">
                UPI
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-light">
            <span>© {currentYear}</span>
            <span>Navrasi</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link to="/terms" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
              Terms
            </Link>
            <Link to="/privacy-policy" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
              Privacy
            </Link>
            <Link to="/disclaimer" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400 flex items-center justify-center gap-2 font-light">
            Crafted with
            <span className="text-amber-600">♥</span>
            in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;