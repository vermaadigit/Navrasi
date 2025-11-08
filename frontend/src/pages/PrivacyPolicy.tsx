import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function PrivacyPolicy() {
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
            <li className="text-stone-900 font-light">Privacy Policy</li>
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
            Privacy Policy
          </h1>
          <p className="text-stone-600 font-light text-lg">
            Your privacy is important to us
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
            
            {/* Information We Collect */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Information We Collect
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-6">
                      We collect information you provide directly to us, such as when you create an account,
                      make a purchase, or contact us. This includes your name, email address, shipping address,
                      and payment information [web:37][web:38].
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Name & Email Address</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Shipping Address</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Payment Information</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <span className="text-stone-400 mt-1">•</span>
                        <span className="text-stone-700 font-light">Account Preferences</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* How We Use Your Information */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    How We Use Your Information
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    We use the information we collect to process your orders, communicate with you,
                    improve our services, and personalize your shopping experience [web:37][web:42].
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="w-8 h-8 rounded-sm bg-white border border-stone-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-light text-stone-900 text-sm mb-1">Process Orders</h4>
                        <p className="text-xs text-stone-600 font-light">Handle purchases and shipments efficiently</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="w-8 h-8 rounded-sm bg-white border border-stone-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-light text-stone-900 text-sm mb-1">Customer Communication</h4>
                        <p className="text-xs text-stone-600 font-light">Keep you updated on orders and promotions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="w-8 h-8 rounded-sm bg-white border border-stone-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-light text-stone-900 text-sm mb-1">Service Improvement</h4>
                        <p className="text-xs text-stone-600 font-light">Enhance and personalize your experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Data Security */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Data Security
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    We implement appropriate security measures to protect your personal information
                    from unauthorized access, alteration, disclosure, or destruction [web:41][web:42].
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                          </svg>
                        </div>
                        <h4 className="font-light text-stone-900 text-sm">SSL Encryption</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-light">Secure data transmission</p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                          </svg>
                        </div>
                        <h4 className="font-light text-stone-900 text-sm">Secure Storage</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-light">Protected databases</p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                          </svg>
                        </div>
                        <h4 className="font-light text-stone-900 text-sm">Access Control</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-light">Restricted access</p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-sm bg-stone-900 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-light text-stone-900 text-sm">Regular Audits</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-light">Continuous monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Your Rights */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Your Rights
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    You have certain rights regarding your personal data. You can access, correct, delete,
                    or request a copy of your information at any time [web:41][web:42].
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Right to access your personal data</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Right to correct inaccurate information</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Right to delete your data (right to be forgotten)</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Right to opt out of marketing communications</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Cookies & Tracking */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Cookies & Tracking
                  </h2>
                  <div className="p-6 bg-stone-50 border border-stone-200 rounded-sm">
                    <p className="text-stone-600 leading-relaxed font-light mb-4">
                      We use cookies and similar technologies to enhance your browsing experience,
                      analyze site traffic, and personalize content. You can control cookie preferences
                      through your browser settings [web:37][web:42].
                    </p>
                    <p className="text-stone-600 text-sm font-light">
                      For more information, please see our Cookie Policy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Privacy Features Grid */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-stone-200">
              <h3 className="text-xs uppercase tracking-widest text-stone-700 mb-6 font-medium">
                Our Commitment
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm text-center">
                  <div className="w-10 h-10 rounded-sm bg-white border border-stone-300 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h4 className="font-light text-stone-900 mb-1">GDPR Compliant</h4>
                  <p className="text-xs text-stone-600 font-light">EU data protection standards</p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm text-center">
                  <div className="w-10 h-10 rounded-sm bg-white border border-stone-300 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h4 className="font-light text-stone-900 mb-1">Data Protection</h4>
                  <p className="text-xs text-stone-600 font-light">Your information is safe</p>
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm text-center">
                  <div className="w-10 h-10 rounded-sm bg-white border border-stone-300 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-light text-stone-900 mb-1">Transparency</h4>
                  <p className="text-xs text-stone-600 font-light">Clear data practices</p>
                </div>
              </div>
            </motion.div>

            {/* Last Updated */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-stone-200">
              <p className="text-sm text-stone-500 font-light text-center">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-light mb-2">Questions About Privacy?</h3>
                <p className="text-stone-300 text-sm font-light">
                  If you have any questions about this Privacy Policy, please contact us [web:38][web:40].
                </p>
              </div>
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white text-stone-900 rounded-sm font-light tracking-wide hover:bg-stone-100 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Get In Touch</span>
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
              <p className="text-stone-900 font-light mb-1">Bank-Level Security</p>
              <p className="text-stone-500 text-xs font-light">256-bit encryption</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Your Data Rights</p>
              <p className="text-stone-500 text-xs font-light">Full control</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">No Hidden Uses</p>
              <p className="text-stone-500 text-xs font-light">Complete transparency</p>
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
