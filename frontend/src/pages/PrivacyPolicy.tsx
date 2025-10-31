import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
        </div>

        <div className="profile-container mx-auto px-4 max-w-4xl relative z-10">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="text-gray-400 ml-7">Your privacy is important to us</p>
          </div>

          {/* Content Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Information We Collect
                  </h2>
                  <div className="p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We collect information you provide directly to us, such as when you create an account,
                      make a purchase, or contact us. This includes your name, email address, shipping address,
                      and payment information.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">Name & Email Address</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">Shipping Address</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">Payment Information</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-400">Account Details</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    How We Use Your Information
                  </h2>
                  <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We use the information we collect to process your orders, communicate with you,
                      improve our services, and personalize your shopping experience.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm mb-1">Process Orders</h4>
                          <p className="text-xs text-gray-400">Handle purchases and shipments efficiently</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm mb-1">Customer Communication</h4>
                          <p className="text-xs text-gray-400">Keep you updated on orders and promotions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm mb-1">Service Improvement</h4>
                          <p className="text-xs text-gray-400">Enhance and personalize your experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Data Security */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Data Security
                  </h2>
                  <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We implement appropriate security measures to protect your personal information
                      from unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-white text-sm">SSL Encryption</h4>
                        </div>
                        <p className="text-xs text-gray-400">Secure data transmission</p>
                      </div>
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-white text-sm">Secure Storage</h4>
                        </div>
                        <p className="text-xs text-gray-400">Protected databases</p>
                      </div>
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-white text-sm">Access Control</h4>
                        </div>
                        <p className="text-xs text-gray-400">Restricted access to data</p>
                      </div>
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-white text-sm">Regular Audits</h4>
                        </div>
                        <p className="text-xs text-gray-400">Continuous monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Contact Us */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Contact Us
                  </h2>
                  <div className="p-5 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy, please{' '}
                      <Link 
                        to="/contact" 
                        className="text-purple-400 hover:text-purple-300 font-semibold underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors"
                      >
                        contact us
                      </Link>
                      .
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Get In Touch
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Features Grid */}
            <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">GDPR Compliant</h4>
                <p className="text-xs text-gray-400">Following EU data protection standards</p>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">Data Protection</h4>
                <p className="text-xs text-gray-400">Your information is safe with us</p>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">Transparency</h4>
                <p className="text-xs text-gray-400">Clear about how we use data</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}