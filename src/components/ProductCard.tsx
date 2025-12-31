'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
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
    e.stopPropagation();
    addToCart(product);
  };

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/main-pro.jpeg';

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

        {/* Product Image */}
        <div className="relative h-48 sm:h-52 bg-gray-50 overflow-hidden">
          {product.inStock ? (
            <>
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 280px, 280px"
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{
                      background: product.badge === 'BEST SELLER' 
                        ? 'linear-gradient(to right, #EF4444, #F59E0B)'
                        : product.badge === 'NEW ARRIVAL'
                        ? 'linear-gradient(to right, #10B981, #059669)'
                        : 'linear-gradient(to right, #1588D7, #0FB7B1)'
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
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
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-4xl mb-2">{product.emoji || '📦'}</div>
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.tagline}
          </p>

          {/* Rating */}
          {product.inStock && product.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviews})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.inStock ? `৳${product.price}` : 'Coming Soon'}
            </span>
            {product.inStock && product.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.originalPrice}
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 font-semibold rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          {product.inStock && (
            <button 
              onClick={handleAddToCart}
              className="w-full mt-auto py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] group"
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
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
