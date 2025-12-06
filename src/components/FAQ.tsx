'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Simply browse our products, add items to your cart, and proceed to checkout. Fill in your delivery details and choose Cash on Delivery (COD) as your payment method. We\'ll call you to confirm your order before shipping.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We currently accept Cash on Delivery (COD) only. You can pay for your order when it arrives at your doorstep. This ensures you only pay when you receive your products.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 2-3 business days inside Dhaka and 3-5 business days outside Dhaka. We ship to all areas of Bangladesh. You\'ll receive a confirmation call with tracking details after placing your order.',
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Delivery charges are ৳80 inside Dhaka and ৳150 outside Dhaka. These charges will be added to your order total at checkout.',
  },
  {
    question: 'Are your products authentic?',
    answer: 'Yes! We guarantee 100% authentic products. All items are quality-checked before shipping. We source directly from authorized suppliers to ensure you receive genuine, high-quality products.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'You can cancel or modify your order within 2 hours of placing it. Please contact us immediately via WhatsApp at +880 1345903907 or call us. Once the order is shipped, it cannot be cancelled.',
  },
  {
    question: 'What is your return policy?',
    answer: 'Due to hygiene and quality reasons, we do not accept returns or exchanges. Please check the product details carefully before ordering. If you receive a damaged or defective product, contact us within 24 hours with photos.',
  },
  {
    question: 'How can I track my order?',
    answer: 'After your order is shipped, we\'ll send you tracking details via SMS and WhatsApp. You can also contact our customer support anytime for order status updates.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="pt-12 sm:pt-16 lg:pt-20 xl:pt-24 pb-6 sm:pb-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked <span className="text-gray-900">Questions</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-900">
            Everything you need to know about ordering from Giftwala
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 rounded-lg transition-all duration-300 text-left hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="text-gray-900" size={24} />
                    ) : (
                      <Plus className="text-gray-900" size={24} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-900 leading-relaxed mt-4 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-900 mb-4 text-lg">Still have questions?</p>
          <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium uppercase tracking-wide bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-md">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}

