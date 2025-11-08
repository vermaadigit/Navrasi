import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function TermsConditions() {
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
            <li className="text-stone-900 font-light">Terms & Conditions</li>
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
            Terms & Conditions
          </h1>
          <p className="text-stone-600 font-light text-lg">
            Please read these terms carefully before using our services
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
            
            {/* Agreement to Terms */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Agreement to Terms
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-4">
                    By accessing and using the Navrasi website and services, you agree to be bound by these Terms and Conditions. 
                    If you do not agree with any part of these terms, you may not use our services [web:46][web:47].
                  </p>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-700 text-sm font-light">
                      These terms apply to all visitors, users, and customers who access or use our e-commerce platform [web:53].
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Product Information */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Product Information & Pricing
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that 
                    product descriptions or other content is accurate, complete, or error-free [web:51][web:53].
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-stone-400 mt-1">•</span>
                      <span className="text-stone-700 font-light">Product colors may vary slightly due to screen settings</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-stone-400 mt-1">•</span>
                      <span className="text-stone-700 font-light">Prices are subject to change without notice</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-stone-400 mt-1">•</span>
                      <span className="text-stone-700 font-light">We reserve the right to correct pricing errors</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-stone-400 mt-1">•</span>
                      <span className="text-stone-700 font-light">Product availability is subject to stock levels</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Orders & Payment */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Orders & Payment
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order 
                    for any reason, including product unavailability or errors in pricing [web:53].
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Payment Methods
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        We accept credit cards, debit cards, and other secure payment methods [web:53].
                      </p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Order Confirmation
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        You'll receive an email confirmation once your order is processed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Shipping & Delivery */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Shipping & Delivery
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    Delivery times are estimates and may vary based on location and product availability. We are not liable 
                    for delays caused by shipping carriers or unforeseen circumstances [web:51][web:53].
                  </p>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                    <div className="space-y-2">
                      <p className="text-stone-700 text-sm font-light flex items-start gap-2">
                        <span className="text-stone-900 font-medium">•</span>
                        Shipping costs are calculated at checkout
                      </p>
                      <p className="text-stone-700 text-sm font-light flex items-start gap-2">
                        <span className="text-stone-900 font-medium">•</span>
                        International orders may incur customs duties
                      </p>
                      <p className="text-stone-700 text-sm font-light flex items-start gap-2">
                        <span className="text-stone-900 font-medium">•</span>
                        You are responsible for providing accurate delivery information
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Returns & Refunds */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Returns & Refunds
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-4">
                    Please review our Return Policy and Refund Policy for detailed information about returns, exchanges, 
                    and refunds [web:53].
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link 
                      to="/return-policy"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-sm font-light text-sm hover:bg-stone-800 transition-all"
                    >
                      <span>Return Policy</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link 
                      to="/refund-policy"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-stone-900 text-stone-900 rounded-sm font-light text-sm hover:bg-stone-50 transition-all"
                    >
                      <span>Refund Policy</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Intellectual Property */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Intellectual Property
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    All content on this website, including text, graphics, logos, images, and designs, is the property of 
                    Navrasi and is protected by copyright and intellectual property laws [web:51][web:53].
                  </p>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-700 font-light mb-4">
                      You may not reproduce, distribute, or use any content from this site without express written permission.
                    </p>
                    <div className="space-y-2">
                      <p className="text-stone-600 text-sm font-light">
                        Unauthorized use may result in legal action [web:53].
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* User Accounts */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    User Accounts
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    When creating an account, you are responsible for maintaining the confidentiality of your account 
                    information and for all activities that occur under your account [web:47].
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Provide accurate and complete information</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Maintain password security and confidentiality</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Notify us immediately of any unauthorized access</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Limitation of Liability */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.306-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Limitation of Liability
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-4">
                      Navrasi shall not be liable for any indirect, incidental, special, or consequential damages arising 
                      from the use or inability to use our products or services [web:53][web:55].
                    </p>
                    <p className="text-stone-700 text-sm font-light">
                      Our total liability shall not exceed the amount paid by you for the product or service in question.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Governing Law */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Governing Law & Jurisdiction
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-4">
                    These Terms and Conditions are governed by and construed in accordance with the laws of India. 
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts 
                    in India [web:51][web:53].
                  </p>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-700 text-sm font-light">
                      We encourage resolving disputes amicably through direct communication before pursuing legal action.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Last Updated */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-stone-200">
              <p className="text-sm text-stone-500 font-light text-center">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-stone-400 font-light text-center mt-2">
                We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of updated terms [web:47][web:55].
              </p>
            </motion.div>
          </div>

          {/* Contact Banner */}
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
                <h3 className="text-white text-lg font-light mb-2">Questions About Our Terms?</h3>
                <p className="text-stone-300 text-sm font-light">
                  If you have any questions regarding these Terms and Conditions, please contact our support team [web:47][web:53].
                </p>
              </div>
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white text-stone-900 rounded-sm font-light tracking-wide hover:bg-stone-100 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Contact Us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Link to="/privacy-policy" className="flex items-start gap-3 text-sm p-4 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-all">
            <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Privacy Policy</p>
              <p className="text-stone-500 text-xs font-light">Data protection</p>
            </div>
          </Link>
          <Link to="/return-policy" className="flex items-start gap-3 text-sm p-4 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-all">
            <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Return Policy</p>
              <p className="text-stone-500 text-xs font-light">30-day returns</p>
            </div>
          </Link>
          <Link to="/refund-policy" className="flex items-start gap-3 text-sm p-4 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-all">
            <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Refund Policy</p>
              <p className="text-stone-500 text-xs font-light">Fast refunds</p>
            </div>
          </Link>
          <Link to="/contact" className="flex items-start gap-3 text-sm p-4 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-all">
            <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Contact Support</p>
              <p className="text-stone-500 text-xs font-light">Get help</p>
            </div>
          </Link>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
