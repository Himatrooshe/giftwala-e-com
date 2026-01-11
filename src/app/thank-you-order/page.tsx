'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Clock, ArrowLeft, Home, Phone } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ThankYouOrder() {
  const [lastOrder, setLastOrder] = useState<null | {
    fullName?: string;
    phone?: string;
    fullAddress?: string;
    deliveryLocation?: 'inside' | 'outside';
    productPrice?: number;
    deliveryCost?: number;
    totalPrice?: number;
    orderId?: string;
  }>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pendingOrders');
      if (!raw) return;
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        const recent = list[list.length - 1];
        setLastOrder(recent);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const id = localStorage.getItem('lastOrderId');
      if (id) setOrderId(id);
    } catch {
      // ignore
    }
  }, []);


  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
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
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Thank you for your order! We've received your order details and will process it shortly.
            </p>
            {orderId && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-green-900 font-semibold">
                  Your Order ID: <span className="font-bold">{orderId}</span>
                </p>
              </div>
            )}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
              {lastOrder && (
                <p className="text-red-900">
                  Estimated delivery: 2-3 working days · {lastOrder.deliveryLocation === 'outside' ? 'Outside Dhaka' : 'Inside Dhaka'}
                </p>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-gray-500">Pay on Delivery</p>
                <p className="text-2xl font-bold text-gray-900">{lastOrder?.totalPrice ? `৳${lastOrder.totalPrice}` : '৳650–800'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery</p>
                <p className="text-lg font-semibold text-gray-900">{lastOrder?.deliveryLocation === 'outside' ? 'Outside Dhaka' : 'Inside Dhaka'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-semibold text-gray-900">{lastOrder?.fullAddress || '—'}</p>
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              What Happens Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll prepare your Smart Nasal Cleaner for shipment within 24 hours.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your order will be delivered within 2-3 business days via our trusted courier.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You'll receive a call to confirm delivery details and payment method.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-yellow-800 mb-3">
              💰 Cash on Delivery
            </h2>
            <ul className="text-yellow-900 text-sm space-y-2">
              <li>Pay the courier in cash upon delivery. No advance needed.</li>
              <li>Please keep your phone available for the confirmation call.</li>
              <li>Delivery charge: Inside Dhaka ৳80 · Outside Dhaka ৳120.</li>
            </ul>
          </motion.div>

          {/* Order Confirmation Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
              📞 Order Confirmation
            </h2>
            <p className="text-red-700 leading-relaxed">
              Our specialist will contact you within 24 hours to confirm your order details, delivery address, and preferred payment method. Please keep your phone available.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Questions About Your Order?
            </h2>
            <div className="text-center space-y-2">
              <p className="text-gray-700">
                Call us at <strong>+880 1789571784</strong> for any questions about your order.
              </p>
              <p className="text-sm text-gray-600">
                Our customer service team is available 9 AM - 6 PM, Sunday to Thursday.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
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
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Package className="w-4 h-4" />
              View Products
            </Link>
            <a
              href="tel:+8801789571784"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              Call Support
            </a>
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
