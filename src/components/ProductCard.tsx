'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col max-w-[260px] mx-auto"
      >
        {/* Product Image */}
        <div className="relative h-44 bg-gray-50 overflow-hidden flex items-center justify-center px-3">
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2 z-10">
              <span className={`text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm ${
                product.badge === 'BEST SELLER' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : product.badge === 'NEW ARRIVAL'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : product.badge === 'TRENDING'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600'
                  : product.badge === 'COMING SOON'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                  : 'bg-red-600'
              }`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Stock Status - Only show if badge is not COMING SOON */}
          {!product.inStock && product.badge !== 'COMING SOON' && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Product Image or Placeholder */}
          <div className="relative w-full h-full flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-300 flex items-center justify-center mb-3 text-sm font-semibold text-gray-500">
                  Coming Soon
                </div>
                <p className="text-xs text-gray-500 font-medium">Premium wellness bundle launching soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-1.5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  size={12}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-start justify-between pt-1 flex-1">
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-gray-900">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-gray-400 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[11px] font-medium whitespace-nowrap">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-1.5 px-3 rounded-md font-medium text-xs uppercase tracking-wide transition-colors duration-300 flex items-center justify-center gap-1.5 ${
              product.inStock 
                ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={14} />
            <span>{product.inStock ? 'Add to Cart' : 'Unavailable'}</span>
          </button>
        </div>
      </motion.div>
    </Link>
  );
}

