import { useState, FormEvent } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

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
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-6">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-secondary-900">Email</p>
                    <p className="text-secondary-600">support@navrasi.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-secondary-900">Phone</p>
                    <p className="text-secondary-600">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-secondary-900">Address</p>
                    <p className="text-secondary-600">
                      123 Fashion Street<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                Send a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                  />

                  <Input
                    label="Subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="How can we help?"
                  />

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
