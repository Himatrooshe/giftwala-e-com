'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const featuredProducts = products.slice(0, 3);

export default function FeaturedProducts() {
  if (!featuredProducts.length) return null;

  return (
    <section className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(21, 136, 215, 0.08), transparent 60%), radial-gradient(circle at 50% 70%, rgba(15, 183, 177, 0.08), transparent 60%)'
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
              Best Picks
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Featured{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Products</span>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Customer-favorite gifts handpicked by Giftwala
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group"
            >
              <div className="relative">
                {/* Product Card Wrapper with Enhanced Styling */}
                <div className="relative transform transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-3 will-change-transform">
                  {/* Glow Effect on Hover */}
                  <div 
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10"
                    style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
                  ></div>
                  
                  {/* Enhanced Card Container */}
                  <div className="relative">
                    <ProductCard product={product} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA - Modern Design */}
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
              View All Products
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
