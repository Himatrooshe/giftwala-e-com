'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeartPulse, UserCircle, Baby, Rocket, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Essential health care products for your daily wellness',
    icon: HeartPulse,
    color: '#1588D7',
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description: 'Daily care essentials for your routine',
    icon: UserCircle,
    color: '#0FB7B1',
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    description: 'Comfort and care for little ones',
    icon: Baby,
    color: '#1588D7',
  },
  {
    id: 'coming-soon',
    name: 'More Coming Soon',
    description: 'Exciting new arrivals on the way',
    icon: Rocket,
    color: '#0FB7B1',
  },
];

export default function Categories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
            Shop by{' '}
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Category
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated collections tailored to your needs
          </p>
        </motion.div>

        {/* Categories Grid - Simplified Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href="/products" className="block">
                  <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                    {/* Icon */}
                    <div className="mb-4">
                      <div 
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, ${category.color}, ${category.id === 'health-wellness' || category.id === 'kids-baby' ? '#0FB7B1' : '#1588D7'})`
                        }}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {category.description}
                    </p>

                    {/* Arrow Icon */}
                    <div className="flex items-center text-sm sm:text-base font-medium" style={{ color: category.color }}>
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Browse All CTA - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white rounded-xl hover:opacity-90 transition-opacity duration-300"
            style={{ 
              background: 'linear-gradient(135deg, #1588D7, #0FB7B1)'
            }}
          >
            Browse All Products
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
