'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleOrderNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push('/checkout');
  };

  // Generate a consistent gradient based on product ID
  const imageIndex = parseInt(product.id.slice(-1)) || 0;
  const isPrimaryColor = imageIndex % 2 === 0;

      return (
    <section className="py-8 sm:py-12 lg:py-16 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Coming Soon Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div 
              className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center"
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
              
              {/* Coming Soon Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span 
                  className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg text-white"
                  style={{
                    background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
                  }}
                >
                  Coming Soon
                </span>
            </div>

              {/* Coming Soon Content */}
              <div className="relative z-10 text-center px-4 sm:px-8">
                <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-3 sm:mb-4">📦</div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 text-gray-800">
                  Coming Soon
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                  This product will be available soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Coming Soon Badge */}
              <div>
                <span 
                  className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4"
                  style={{
                    background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
                  }}
                >
                  Coming Soon
                </span>
              </div>

              {/* Title */}
              <h1 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
                style={{
                  background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Coming Soon
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                We're working hard to bring you this amazing product. Stay tuned for updates and be among the first to know when it's available!
              </p>

              {/* Features */}
              <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Premium Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                  <span className="text-sm sm:text-base text-gray-700">Fast Delivery Across Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                  <span className="text-sm sm:text-base text-gray-700">Cash on Delivery Available</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <label className="text-sm sm:text-base font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-gray-900 font-medium">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    +
                </button>
                </div>
              </div>

              {/* Order Now Button */}
                <button 
                  onClick={handleOrderNow}
                className="w-full py-3 sm:py-4 px-6 sm:px-8 font-semibold text-sm sm:text-base uppercase tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] group"
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
                  <ShoppingCart size={20} />
                  <span>Order Now ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              {/* Back to Products */}
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Products</span>
              </Link>
        </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
