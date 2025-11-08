import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function About() {
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
            <li className="text-stone-900 font-light">About Us</li>
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
            About Navrasi
          </h1>
          <p className="text-stone-600 font-light text-lg">
            Modern elegance meets timeless craftsmanship
          </p>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-12 rounded-sm overflow-hidden border border-stone-200"
        >
          <div className="aspect-[21/9] bg-stone-100 relative">
            <img 
              src="/about-hero.jpg" 
              alt="Navrasi Brand" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white border border-stone-200 rounded-sm overflow-hidden mb-12"
        >
          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Our Story */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Our Story
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light">
                    Navrasi is a premium clothing brand dedicated to bringing you modern, stylish
                    apparel for every occasion. Founded with a vision to make quality fashion
                    accessible, we combine contemporary design with comfortable fabrics [web:30][web:31].
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Our Mission */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Our Mission
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    We believe fashion should be inclusive, sustainable, and affordable. Our mission
                    is to provide high-quality clothing that empowers individuals to express their
                    unique style with confidence [web:31][web:33].
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Inclusive
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        Fashion for everyone
                      </p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Sustainable
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        Eco-conscious choices
                      </p>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm">
                      <h3 className="text-stone-900 font-light mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                        Affordable
                      </h3>
                      <p className="text-stone-600 text-sm font-light">
                        Quality within reach
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Quality Commitment */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Quality Commitment
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light mb-6">
                    Every piece in our collection is carefully crafted with attention to detail.
                    We source premium materials and work with skilled artisans to ensure each
                    product meets our high standards of quality and durability [web:28][web:30].
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Premium materials sourced ethically</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Meticulous attention to detail in every stitch</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-stone-700 font-light">Skilled artisans ensuring craftsmanship excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divider */}
            <motion.div variants={itemVariants} className="border-t border-stone-200" />

            {/* Our Values */}
            <motion.section variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-sm bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xs uppercase tracking-widest text-stone-700 mb-4 font-medium">
                    Our Values
                  </h2>
                  <p className="text-stone-600 leading-relaxed font-light">
                    At Navrasi, we're driven by values that shape every decision we make—from design to delivery. We're committed to creating fashion that respects both people and planet [web:31][web:34].
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* CTA Banner */}
          <motion.div 
            variants={itemVariants}
            className="bg-stone-900 p-8 sm:p-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-light mb-2">Explore Our Collection</h3>
                <p className="text-stone-300 text-sm font-light">
                  Discover modern designs crafted with care for your everyday style [web:34].
                </p>
              </div>
              <Link 
                to="/products"
                className="px-6 py-3 bg-white text-stone-900 rounded-sm font-light tracking-wide hover:bg-stone-100 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Shop Now</span>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Handcrafted</p>
              <p className="text-stone-500 text-xs font-light">With love & care</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Sustainable</p>
              <p className="text-stone-500 text-xs font-light">Eco-friendly</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">Premium Quality</p>
              <p className="text-stone-500 text-xs font-light">Guaranteed</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-10 h-10 bg-white border border-stone-200 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-light mb-1">For Everyone</p>
              <p className="text-stone-500 text-xs font-light">Inclusive fashion</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
