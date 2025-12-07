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
    lightColor: 'rgba(21, 136, 215, 0.1)',
    hoverColor: 'rgba(21, 136, 215, 0.15)',
    count: '1+ Products'
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description: 'Daily care essentials for your routine',
    icon: UserCircle,
    color: '#0FB7B1',
    lightColor: 'rgba(15, 183, 177, 0.1)',
    hoverColor: 'rgba(15, 183, 177, 0.15)',
    count: '1+ Products'
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    description: 'Comfort and care for little ones',
    icon: Baby,
    color: '#1588D7',
    lightColor: 'rgba(21, 136, 215, 0.1)',
    hoverColor: 'rgba(21, 136, 215, 0.15)',
    count: '1+ Products'
  },
  {
    id: 'coming-soon',
    name: 'More Coming Soon',
    description: 'Exciting new arrivals on the way',
    icon: Rocket,
    color: '#0FB7B1',
    lightColor: 'rgba(15, 183, 177, 0.1)',
    hoverColor: 'rgba(15, 183, 177, 0.15)',
    count: 'Stay Tuned'
  },
];

export default function Categories() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(21, 136, 215, 0.08), transparent 50%), radial-gradient(circle at 80% 70%, rgba(15, 183, 177, 0.08), transparent 50%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              Explore Collections
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Shop by{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Category</span>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Discover curated collections tailored to your needs
          </p>
        </motion.div>

        {/* Categories Grid - Modern Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group"
              >
                <Link href="/products" className="block h-full">
                  <div 
                    className="relative h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2 border border-gray-100 will-change-transform"
                    style={{
                      background: `linear-gradient(135deg, ${category.lightColor}, rgba(255, 255, 255, 0.8))`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${category.hoverColor}, rgba(255, 255, 255, 0.9))`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${category.lightColor}, rgba(255, 255, 255, 0.8))`;
                    }}
                  >
                    {/* Decorative Gradient Overlay */}
                    <div 
                      className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: category.color }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                      style={{ background: category.color }}
                    ></div>

                    {/* Content */}
                    <div className="relative h-full p-8 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
                      {/* Top Section */}
                      <div>
                        {/* Icon with Modern Design */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="mb-6 inline-block"
                        >
                          <div 
                            className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500"
                            style={{ 
                              background: `linear-gradient(135deg, ${category.color}, ${category.id === 'health-wellness' || category.id === 'kids-baby' ? '#0FB7B1' : '#1588D7'})`
                            }}
                          >
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                            
                            {/* Glow Effect */}
                            <div 
                              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                              style={{ background: category.color }}
                            ></div>
                          </div>
                        </motion.div>

                        {/* Category Name */}
                        <h3 
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 transition-colors duration-300"
                          style={{
                            color: 'inherit'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = category.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#111827';
                          }}
                        >
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between">
                        {/* Product Count Badge */}
                        <span 
                          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold border border-gray-200 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                          style={{ color: category.color }}
                        >
                          {category.count}
                        </span>

                        {/* Arrow Icon */}
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300"
                          style={{ color: category.color }}
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                        </motion.div>
                      </div>

                      {/* Hover Border Effect */}
                      <div 
                        className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ borderColor: category.color }}
                      ></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Browse All CTA - Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Link 
            href="/products"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{ 
              background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #0d6ba8, #0c9a94)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #1588D7, #0FB7B1)';
            }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: 'linear-gradient(to right, rgba(21, 136, 215, 0.9), rgba(15, 183, 177, 0.9))'
              }}
              initial={false}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Browse All Products
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </motion.div>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
