'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Generate a consistent gradient based on product ID
  const imageIndex = parseInt(product.id.slice(-1)) || 0;
  const isPrimaryColor = imageIndex % 2 === 0;

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col max-w-[280px] mx-auto relative will-change-transform"
        style={{
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(21, 136, 215, 0.1), 0 10px 10px -5px rgba(15, 183, 177, 0.04)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Hover Gradient Border Effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.1))',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        ></div>

        {/* Coming Soon Image */}
        <div className="relative h-48 sm:h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center">
          {/* Coming Soon Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg text-white"
              style={{
                background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* Coming Soon Image - Gradient Background */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{
              background: isPrimaryColor 
                ? 'linear-gradient(135deg, rgba(21, 136, 215, 0.3), rgba(15, 183, 177, 0.2))'
                : 'linear-gradient(135deg, rgba(15, 183, 177, 0.3), rgba(21, 136, 215, 0.2))'
            }}
          >
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
            }}></div>
            {/* Coming Soon Text Overlay */}
            <div className="relative z-10 text-center px-4">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm font-semibold text-gray-700">Coming Soon</p>
            </div>
          </div>

          {/* Hover Overlay Gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #1588D7, #0FB7B1)'
            }}
          ></div>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 flex flex-col items-center justify-center">
          {/* Coming Soon Text */}
          <div className="text-center">
            <h3 
              className="text-base sm:text-lg lg:text-xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Coming Soon
            </h3>
            <p className="text-sm text-gray-500">
              This product will be available soon
            </p>
          </div>

          {/* Order Now Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
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
            <ShoppingCart size={16} />
            <span>Order Now</span>
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
