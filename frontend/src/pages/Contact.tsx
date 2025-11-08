import { useState, FormEvent } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        {/* Decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-stone-100/30 to-amber-50/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-amber-700 mb-4 font-medium">
              Get In Touch
            </p>
            <h1 className="text-5xl sm:text-6xl font-light text-stone-900 tracking-tight mb-6">
              Contact Us
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-stone-200 rounded-sm shadow-sm p-8"
            >
              <h2 className="text-2xl font-light text-stone-900 mb-8 tracking-wide">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-stone-900 mb-1 font-medium">Email</p>
                    <p className="text-stone-600 font-light">support@navrasi.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-stone-900 mb-1 font-medium">Phone</p>
                    <p className="text-stone-600 font-light">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-stone-900 mb-1 font-medium">Address</p>
                    <p className="text-stone-600 font-light leading-relaxed">
                      123 Fashion Street<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-stone-200">
                <p className="text-sm uppercase tracking-wider text-stone-900 mb-4 font-medium">Follow Us</p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-sm bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-sm bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-sm bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-stone-200 rounded-sm shadow-sm p-8"
            >
              <h2 className="text-2xl font-light text-stone-900 mb-8 tracking-wide">
                Send a Message
              </h2>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-sm"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-light">Thank you! Your message has been sent successfully.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-900 mb-2 font-medium">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-all font-light text-stone-900 placeholder-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-900 mb-2 font-medium">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-all font-light text-stone-900 placeholder-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-900 mb-2 font-medium">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-all font-light text-stone-900 placeholder-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider text-stone-900 mb-2 font-medium">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-all resize-none font-light text-stone-900 placeholder-stone-400"
                      placeholder="Your message..."
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-8 py-4 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg font-light tracking-wide"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Map or Additional Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-stone-50 border border-stone-200 rounded-sm p-12 text-center"
          >
            <h3 className="text-2xl font-light text-stone-900 mb-4 tracking-wide">
              Visit Our Store
            </h3>
            <p className="text-stone-600 font-light max-w-2xl mx-auto mb-8">
              Experience our collection in person at our flagship store. Our team is available Monday to Saturday, 10 AM to 8 PM.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="#" 
                className="px-6 py-3 bg-white border border-stone-200 text-stone-900 rounded-sm hover:bg-stone-50 transition-all font-light tracking-wide flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
              <a 
                href="#" 
                className="px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all font-light tracking-wide flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}