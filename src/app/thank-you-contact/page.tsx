'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ThankYouContact() {
  const [refId, setRefId] = useState<string>('MSG-' + Date.now());

  useEffect(() => {
    // Create a short readable reference id
    setRefId('MSG-' + new Date().getTime().toString().slice(-6));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Message!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We've received your message and will get back to you within 24 hours. 
              Our team is excited to help you with your inquiry.
            </p>
            <div className="mt-4 inline-block bg-red-50 border border-red-200 text-red-900 px-4 py-2 rounded-lg">
              Reference ID: <span className="font-semibold">{refId}</span>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">tuhinbogra010@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">+880 1789571784</span>
              </div>
              <p className="text-sm text-gray-600 text-center">Our team responds Sunday–Thursday, 9:00 AM – 6:00 PM.</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Send Another Message
            </Link>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
