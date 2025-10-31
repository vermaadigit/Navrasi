import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <><footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black border-t border-white/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="mx-10 px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Navrasi
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your trusted destination for premium quality products.
              <span className="text-purple-400 font-semibold"> Elevate your lifestyle</span> with our exclusive collection.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 transition-colors" />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-3">
              <li>

                <a href="/return-policy"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
                Return Policy
              </a>
            </li>
            <li>

              <a href="/refund-policy"
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
              <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
              Refund Policy
            </a>
          </li>
          <li>

            <a href="/privacy-policy"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
            <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
            Privacy Policy
          </a>
        </li>
        <li>

          <a href="/terms"
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
          <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
          Terms & Conditions
        </a>
      </li>
      <li>

        <a href="/about"
        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
        <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
        About Us
      </a>
    </li><li>

        <a href="/contact"
        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
        <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-4 transition-all duration-300"></span>
        Contact Us
      </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
              Connect
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Email</p>
                  <a href="mailto:support@navrasi.com" className="hover:text-purple-400 transition-colors">
                    support@navrasi.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Phone</p>
                  <a href="tel:+911234567890" className="hover:text-purple-400 transition-colors">
                    +91 123 456 7890
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h5 className="text-white font-semibold text-sm">Follow Us</h5>
              <div className="flex gap-3">
                
                  <a href="#"
                  className="group relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all overflow-hidden"
                  aria-label="Facebook"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <svg className="w-5 h-5 relative z-10 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                
                  <a href="#"
                  className="group relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all overflow-hidden"
                  aria-label="Twitter"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-sky-600 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <svg className="w-5 h-5 relative z-10 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                
                  <a href="#"
                  className="group relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all overflow-hidden"
                  aria-label="Instagram"
                >
                  <><span className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span><svg className="w-5 h-5 relative z-10 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg></>
                </a>
                
                  <a href="#"
                  className="group relative w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-all overflow-hidden"
                  aria-label="LinkedIn"
                >
                  <><span className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span><svg className="w-5 h-5 relative z-10 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg></>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Trust Badges */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-3">Secure Payments</p>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 text-xs font-medium hover:border-purple-500/50 transition-colors">
                  Visa
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 text-xs font-medium hover:border-purple-500/50 transition-colors">
                  Mastercard
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 text-xs font-medium hover:border-purple-500/50 transition-colors">
                  PayPal
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 text-xs font-medium hover:border-purple-500/50 transition-colors">
                  UPI
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-3">Trusted By</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400 text-xs font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-gray-400 text-xs font-medium">50K+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <><div className="flex items-center gap-2">
            <span className="text-gray-400">©</span>
            <span>{currentYear}</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              Navrasi
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">All rights reserved</span>
          </div><div className="flex items-center gap-6">
              <a href="/terms" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="/privacy-policy" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="/disclaimer" className="hover:text-purple-400 transition-colors">Disclaimer</a>
            </div></>
        </div>

        {/* Made with Love */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            Made with 
            <span className="text-red-500 animate-pulse">♥</span> 
            in India
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;