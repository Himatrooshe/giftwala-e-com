'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeartPulse, UserCircle, Baby, Rocket, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Essential health care products',
    icon: HeartPulse,
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    bgGradient: 'from-red-50 via-rose-50 to-pink-50',
    accent: 'text-red-600',
    borderColor: 'border-red-200',
    hoverBorder: 'hover:border-red-400',
    count: '1+ Products'
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description: 'Daily care essentials',
    icon: UserCircle,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    accent: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    count: '1+ Products'
  },
  {
    id: 'kids-baby',
    name: 'Kids & Baby',
    description: 'Comfort for little ones',
    icon: Baby,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    bgGradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
    accent: 'text-violet-600',
    borderColor: 'border-violet-200',
    hoverBorder: 'hover:border-violet-400',
    count: '1+ Products'
  },
  {
    id: 'coming-soon',
    name: 'More Coming Soon',
    description: 'Exciting new arrivals',
    icon: Rocket,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    bgGradient: 'from-amber-50 via-orange-50 to-red-50',
    accent: 'text-amber-600',
    borderColor: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    count: 'Stay Tuned'
  },
];

export default function Categories() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      
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
            className="inline-block mb-4"
          >
            <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              Explore Collections
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Shop by{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Category</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-2 left-0 h-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-30 -z-0"
              />
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Discover curated collections tailored to your needs
          </p>
        </motion.div>

        {/* Categories Grid - Modern Large Cards */}
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
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group"
              >
                <Link href="/products" className="block h-full">
                  <div className={`
                    relative h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]
                    rounded-3xl overflow-hidden
                    bg-gradient-to-br ${category.bgGradient}
                    border-2 ${category.borderColor} ${category.hoverBorder}
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500 ease-out
                    group-hover:scale-[1.02] group-hover:-translate-y-2
                  `}>
                    {/* Animated Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      initial={false}
                    />
                    
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      {/* Top Section */}
                      <div>
                        {/* Icon with Modern Design */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="mb-6 inline-block"
                        >
                          <div className={`
                            relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
                            rounded-2xl sm:rounded-3xl
                            bg-gradient-to-br ${category.gradient}
                            flex items-center justify-center
                            shadow-xl group-hover:shadow-2xl
                            transform group-hover:scale-110 group-hover:rotate-3
                            transition-all duration-500
                          `}>
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                            
                            {/* Glow Effect */}
                            <div className={`
                              absolute inset-0 rounded-2xl sm:rounded-3xl
                              bg-gradient-to-br ${category.gradient}
                              opacity-0 group-hover:opacity-50 blur-xl
                              transition-opacity duration-500
                            `}></div>
                          </div>
                        </motion.div>

                        {/* Category Name */}
                        <h3 className={`
                          text-2xl sm:text-3xl lg:text-4xl font-bold mb-3
                          text-gray-900 transition-colors duration-300
                          ${category.id === 'health-wellness' ? 'group-hover:text-red-600' : ''}
                          ${category.id === 'personal-care' ? 'group-hover:text-emerald-600' : ''}
                          ${category.id === 'kids-baby' ? 'group-hover:text-violet-600' : ''}
                          ${category.id === 'coming-soon' ? 'group-hover:text-amber-600' : ''}
                        `}>
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-sm">
                          {category.description}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between">
                        {/* Product Count Badge */}
                        <span className={`
                          inline-flex items-center gap-2
                          px-4 py-2 sm:px-5 sm:py-2.5
                          bg-white/90 backdrop-blur-sm
                          rounded-xl sm:rounded-2xl
                          text-sm sm:text-base font-semibold
                          ${category.accent}
                          border border-white/50
                          shadow-md group-hover:shadow-lg
                          transition-all duration-300
                          group-hover:scale-105
                        `}>
                          {category.count}
                        </span>

                        {/* Arrow Icon */}
                        <motion.div
                          className={`
                            flex items-center justify-center
                            w-12 h-12 sm:w-14 sm:h-14
                            rounded-full
                            bg-white/90 backdrop-blur-sm
                            ${category.accent}
                            shadow-lg group-hover:shadow-xl
                            transform group-hover:scale-110
                            transition-all duration-300
                          `}
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                        </motion.div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className={`
                        absolute inset-0 rounded-3xl
                        border-2 ${category.borderColor}
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        pointer-events-none
                      `}></div>
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
            className="
              group relative inline-flex items-center justify-center gap-3
              px-8 py-4 sm:px-10 sm:py-5
              text-base sm:text-lg font-semibold
              text-white
              bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
              hover:from-gray-800 hover:via-gray-700 hover:to-gray-800
              rounded-2xl
              shadow-xl hover:shadow-2xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300
              overflow-hidden
            "
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
