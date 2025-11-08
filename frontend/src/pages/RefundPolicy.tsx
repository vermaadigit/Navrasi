import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function RefundPolicy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-4xl">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-stone-500 hover:text-stone-900 transition-colors font-light">
                Home
              </Link>
            </li>
            <li className="text-stone-300">/</li>
            <li className="text-stone-900 font-light">Refund Policy</li>
          </ol>
        </motion.nav>

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-light text-stone-900 mb-3 leading-tight tracking-tight">
            Refund Policy
          </h1>
          <p className="text-stone-600 font-light text-lg">
            Clear and transparent refund guidelines
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white border border-stone-200 rounded-sm overflow-hidden"
        >
          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Refund Timeline */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Refund Timeline
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-6">
                      Once we receive and inspect your returned item, we will process your refund
                      within 7-10 business days. The refund will be credited to your original payment method [web:12][web:14].
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-sm">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-stone-900 font-light text-sm">7-10 Business Days</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-sm">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <span className="text-stone-900 font-light text-sm">Original Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Partial Refunds */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Partial Refunds
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-6">
                      Partial refunds may be granted for items that are damaged, worn, or missing
                      original packaging. Shipping costs are non-refundable [web:12][web:23].
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Items with damage or wear may receive partial refunds</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Missing original packaging affects refund amount</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Shipping costs are <strong className="text-stone-900">non-refundable</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Exchanges */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Exchanges
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-6">
                      We offer exchanges for different sizes or colors subject to availability.
                      Contact our customer service to arrange an exchange [web:14][web:15].
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-stone-200 rounded-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                          </div>
                          <h3 className="font-light text-stone-900">Size Exchange</h3>
                        </div>
                        <p className="text-sm text-stone-600 font-light">Exchange for different sizes</p>
                      </div>
                      <div className="p-4 bg-white border border-stone-200 rounded-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                            </svg>
                          </div>
                          <h3 className="font-light text-stone-900">Color Exchange</h3>
                        </div>
                        <p className="text-sm text-stone-600 font-light">Exchange for different colors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Refund Methods */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Refund Methods
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Original Payment Method
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        Refunds are automatically processed to your original payment method (credit card, debit card, or digital wallet) [web:23].
                      </p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Store Credit
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        You may choose to receive store credit instead, which can be used for future purchases [web:23].
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Contact Support Banner */}
          <motion.div 
            variants={itemVariants}
            className="bg-stone-900 p-8 sm:p-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-light mb-2">Questions About Refunds?</h3>
                <p className="text-stone-300 text-sm font-light">
                  Our customer service team is here to help with any refund or exchange inquiries [web:14][web:15].
                </p>
              </div>
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white text-stone-900 rounded-sm font-light tracking-wide hover:bg-stone-100 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Contact Support</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Fast Processing</p>
              <p className="text-stone-500 text-xs font-light">7-10 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Secure Refunds</p>
              <p className="text-stone-500 text-xs font-light">100% protected</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Multiple Options</p>
              <p className="text-stone-500 text-xs font-light">Flexible refunds</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">24/7 Support</p>
              <p className="text-stone-500 text-xs font-light">Always available</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
