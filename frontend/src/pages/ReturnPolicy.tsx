import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ReturnPolicy() {
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
              <h1 className="text-4xl font-bold text-white">Return Policy</h1>
            </div>
            <p className="text-gray-400 ml-7">Our commitment to your satisfaction</p>
          </div>

          {/* Content Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
            
            {/* 30-Day Return Window */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    30-Day Return Window
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    You have 30 days from the date of delivery to return any items. Products must be
                    unused, unwashed, and in original packaging with all tags attached.
                  </p>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Return Process */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Return Process
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold">1</span>
                      </div>
                      <p className="text-gray-300 pt-1">Contact our support team to initiate a return</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold">2</span>
                      </div>
                      <p className="text-gray-300 pt-1">Pack the items securely in original packaging</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <p className="text-gray-300 pt-1">Ship the package to our return address</p>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold">4</span>
                      </div>
                      <p className="text-gray-300 pt-1">Receive refund within 7-10 business days after we receive your return</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Non-Returnable Items */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Non-Returnable Items
                  </h2>
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-gray-300 leading-relaxed">
                      Undergarments, accessories, and items marked as final sale cannot be returned
                      for hygiene and safety reasons.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Support Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Need Help?</h3>
                  <p className="text-gray-300 text-sm">
                    Contact our support team for any questions about returns or exchanges.
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}