'use client';

import { motion } from 'framer-motion';
import { Award, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Giftwala™ Quality',
    description: 'Premium gifts curated and verified for your special moments.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your order within 2-3 days anywhere in Bangladesh. Free shipping on all orders.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'All products are thoroughly checked and verified to meet high quality standards.'
  },
  {
    icon: HeartHandshake,
    title: 'Friendly Support',
    description: 'Questions? Message us on WhatsApp for quick help every day.'
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-gray-900">Giftwala?</span>
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            We're committed to providing you with the best products and service
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="p-8 h-64 sm:h-72 lg:h-80 group hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm hover:shadow-md">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={32} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-900 leading-relaxed flex-grow">
                      {reason.description}
                    </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

