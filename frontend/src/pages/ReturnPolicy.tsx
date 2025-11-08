import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ReturnPolicy() {
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
            <li className="text-stone-900 font-light">Return Policy</li>
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
            Return Policy
          </h1>
          <p className="text-stone-600 font-light text-lg">
            Our commitment to your satisfaction
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
            
            {/* 30-Day Return Window */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    30-Day Return Window
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light">
                    You have 30 days from the date of delivery to return any items. Products must be
                    unused, unwashed, and in original packaging with all tags attached [web:12][web:14].
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Return Process */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Return Process
                  </h2>
                  <div className="space-y-3">
                    {[
                      { step: 1, text: "Contact our support team to initiate a return" },
                      { step: 2, text: "Pack the items securely in original packaging" },
                      { step: 3, text: "Ship the package to our return address" },
                      { step: 4, text: "Receive refund within 7-10 business days after we receive your return" }
                    ].map((item) => (
                      <div 
                        key={item.step}
                        className="flex items-start gap-4 p-4 bg-stone-50 rounded-sm border border-stone-200 transition-all"
                      >
                        <div className="w-8 h-8 rounded-sm bg-white border border-stone-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-stone-900 font-light text-sm">{item.step}</span>
                        </div>
                        <p className="text-stone-700 pt-1 font-light flex-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-stone-500 text-sm font-light mt-4">
                    Digital QR codes available for hassle-free returns [web:14][web:15].
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Non-Returnable Items */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Non-Returnable Items
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <ul className="space-y-2 text-stone-700 font-light">
                      <li className="flex items-start gap-3">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Undergarments and intimate apparel</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Items marked as final sale or clearance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-stone-400 mt-1">•</span>
                        <span>Products with removed tags or in used condition</span>
                      </li>
                    </ul>
                    <p className="text-stone-600 text-sm font-light mt-4 pt-4 border-t border-stone-200">
                      These restrictions are in place for hygiene and safety reasons [web:12][web:18].
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Additional Information */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Important Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-stone-50 rounded-sm border border-stone-200">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Return Shipping
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        Return shipping costs are the customer's responsibility unless the item is defective [web:15][web:18].
                      </p>
                    </div>
                    <div className="p-4 bg-stone-50 rounded-sm border border-stone-200">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Exchanges
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        We offer size and color exchanges for eligible items within the return window.
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-light mb-2">Need Help with Your Return?</h3>
                <p className="text-stone-300 text-sm font-light">
                  Our support team is here to assist you with any questions about returns or exchanges [web:15][web:18].
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Secure Process</p>
              <p className="text-stone-500 text-xs font-light">100% protected</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Fast Refunds</p>
              <p className="text-stone-500 text-xs font-light">7-10 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Easy Exchanges</p>
              <p className="text-stone-500 text-xs font-light">Hassle-free swaps</p>
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
