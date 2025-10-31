import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function RefundPolicy() {
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
              <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
            </div>
            <p className="text-gray-400 ml-7">Clear and transparent refund guidelines</p>
          </div>

          {/* Content Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
            
            {/* Refund Timeline */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Refund Timeline
                  </h2>
                  <div className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Once we receive and inspect your returned item, we will process your refund
                      within 7-10 business days. The refund will be credited to your original payment method.
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-400 font-semibold">7-10 Business Days</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-blue-400 font-semibold">Original Payment Method</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Partial Refunds */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Partial Refunds
                  </h2>
                  <div className="p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Partial refunds may be granted for items that are damaged, worn, or missing
                      original packaging. Shipping costs are non-refundable.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Items with damage or wear may receive partial refunds</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Missing original packaging affects refund amount</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-400">Shipping costs are <strong className="text-red-400">non-refundable</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Exchanges */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Exchanges
                  </h2>
                  <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      We offer exchanges for different sizes or colors subject to availability.
                      Contact our customer service to arrange an exchange.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-white">Size Exchange</h3>
                        </div>
                        <p className="text-sm text-gray-400">Exchange for different sizes</p>
                      </div>
                      <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-white">Color Exchange</h3>
                        </div>
                        <p className="text-sm text-gray-400">Exchange for different colors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Support Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white mb-1">Questions About Refunds?</h3>
                  <p className="text-gray-300 text-sm">
                    Our customer service team is here to help with any refund or exchange inquiries.
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">Fast Processing</h4>
                <p className="text-xs text-gray-400">Quick refund processing within 7-10 days</p>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">Secure Refunds</h4>
                <p className="text-xs text-gray-400">Safe and secure refund to your account</p>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-1">24/7 Support</h4>
                <p className="text-xs text-gray-400">Always available to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}