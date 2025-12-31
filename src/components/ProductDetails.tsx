'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Check, Star, Truck, Shield, Package, RotateCcw } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleOrderNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Parse features from description (looking for checkmark items)
  const parseFeatures = (description: string): string[] => {
    const features: string[] = [];
    const lines = description.split('\n');
    lines.forEach(line => {
      if (line.includes('✅') || line.trim().startsWith('✅')) {
        const feature = line.replace(/✅/g, '').trim();
        if (feature) features.push(feature);
      }
    });
    return features.length > 0 ? features : [
      'Premium Quality Guaranteed',
      'Fast Delivery Across Bangladesh',
      'Cash on Delivery Available'
    ];
  };

  const features = parseFeatures(product.description || '');
  const images = product.images && product.images.length > 0 ? product.images : ['/main-pro.jpeg'];
  const displayImage = images[selectedImageIndex] || images[0];

  // Coming Soon Products
  if (!product.inStock) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div 
                className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
              >
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
                <div className="relative z-10 text-center px-4 sm:px-8">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-3 sm:mb-4">{product.emoji || '📦'}</div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 text-gray-800">
                    Coming Soon
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                    This product will be available soon
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-4 sm:space-y-6">
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
                <h1 
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {product.name}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {product.description || "We're working hard to bring you this amazing product. Stay tuned for updates!"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Actual Product Details
  return (
    <section className="py-8 sm:py-12 lg:py-16 min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
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
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-full h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 20vw, 10vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Badge */}
              {product.badge && (
                <div>
                  <span 
                    className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white"
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

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {product.rating} ({product.reviews}+ reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl sm:text-2xl text-gray-400 line-through">
                      ৳{product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description.replace(/✅/g, '').replace(/🔧/g, '').trim()}
                  </p>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Key Features:</h3>
                  <div className="space-y-2.5">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                        >
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <label className="text-base font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-bold"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 py-2.5 text-base font-bold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}
                    className="px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-bold"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button 
                  onClick={handleOrderNow}
                  disabled={!product.inStock}
                  className="w-full py-4 px-6 font-bold text-base sm:text-lg uppercase tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  style={{
                    background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
                  }}
                  onMouseEnter={(e) => {
                    if (product.inStock) {
                      e.currentTarget.style.background = 'linear-gradient(to right, #0d6ba8, #0c9a94)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.inStock) {
                      e.currentTarget.style.background = 'linear-gradient(to right, #1588D7, #0FB7B1)';
                    }
                  }}
                >
                  <ShoppingCart size={24} />
                  <span>Order Now - ৳{product.price * quantity}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full py-3.5 px-6 font-semibold text-base text-gray-700 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Package size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Back to Products */}
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium pt-2"
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
