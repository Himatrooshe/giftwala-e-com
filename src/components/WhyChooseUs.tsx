'use client';

import { motion } from 'framer-motion';
import { Award, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Giftwala™ Quality',
    description: 'Premium gifts curated and verified for your special moments.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your order within 2-3 days anywhere in Bangladesh. Free shipping on all orders.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'All products are thoroughly checked and verified to meet high quality standards.',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly Support',
    description: 'Questions? Message us on WhatsApp for quick help every day.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Why Choose{' '}
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Giftwala?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Experience premium shopping with unmatched quality, speed, and service
          </p>
        </motion.div>

        {/* Reasons Grid - Simplified Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #1588D7, #0FB7B1)'
                    }}
                  >
                    <Icon className="text-white w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
