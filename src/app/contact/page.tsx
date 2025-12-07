'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxySwJfivbBwNA3nk9EoL5ZLMd0c5Ym3UtveoN2q9VuAQWI5gS8PeuznwcWiMoHXY36/exec?sheet=contact-us', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      router.push('/thank-you-contact');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(21, 136, 215, 0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(15, 183, 177, 0.1), transparent 50%)'
          }}
        ></div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              Get in{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Touch
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#1588D7] transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#1588D7] transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#1588D7] transition-all duration-200"
                      placeholder="+880 1345903907"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#1588D7] transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="return-refund">Return & Refund</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#1588D7] transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 font-semibold text-base uppercase tracking-wide text-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{
                    background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(to right, #0d6ba8, #0c9a94)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(to right, #1588D7, #0FB7B1)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Choose the most convenient way to reach us. We're available to assist you with any questions or concerns.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div 
                  className="flex items-start gap-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21, 136, 215, 0.05), rgba(15, 183, 177, 0.05))'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Phone className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Phone</h3>
                    <p className="text-gray-600 mb-2">Call us directly</p>
                    <a 
                      href="tel:+8801345903907" 
                      className="font-semibold transition-colors"
                      style={{ color: '#1588D7' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0FB7B1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#1588D7';
                      }}
                    >
                      +880 1345903907
                    </a>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21, 136, 215, 0.05), rgba(15, 183, 177, 0.05))'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Mail className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Email</h3>
                    <p className="text-gray-600 mb-2">Send us an email</p>
                    <a 
                      href="mailto:support@giftwalabd.com" 
                      className="font-semibold transition-colors"
                      style={{ color: '#1588D7' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#0FB7B1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#1588D7';
                      }}
                    >
                      support@giftwalabd.com
                    </a>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21, 136, 215, 0.05), rgba(15, 183, 177, 0.05))'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <MapPin className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Address</h3>
                    <p className="text-gray-700">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div 
                  className="flex items-start gap-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(21, 136, 215, 0.05), rgba(15, 183, 177, 0.05))'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Clock className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">Business Hours</h3>
                    <p className="text-gray-600 mb-2">When you can reach us</p>
                    <div className="text-gray-700 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
