'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Check, Star, Truck, Shield, Package, RotateCcw, Tag, Sparkles, Gift } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { getProductPrice, getProductUnitPrice, hasSpecialPricing } from '@/lib/pricing';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Calculate price based on quantity (handles special pricing if configured)
  const isSpecialPricing = hasSpecialPricing(product.id);
  const totalPrice = useMemo(() => {
    return getProductPrice(product.id, quantity, product.price);
  }, [quantity, product.price, product.id]);

  const unitPrice = useMemo(() => {
    return getProductUnitPrice(product.id, quantity, product.price);
  }, [quantity, product.price, product.id]);

  const handleAddToCart = () => {
    // Add items to cart - the cart will group them by ID
    // Pricing will be calculated at checkout based on total quantity
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
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  {isSpecialPricing ? (
                    <>
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
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
                        {quantity > 1 && (
                          <div className="mt-2">
                            <span className="text-lg font-semibold text-gray-700">
                              Total for {quantity} pieces: ৳{totalPrice}
                            </span>
                            {quantity === 2 && (
                              <span className="ml-2 text-sm text-green-600 font-semibold">(Save ৳130! 🎉)</span>
                            )}
                            {quantity >= 3 && (
                              <span className="ml-2 text-sm text-green-600 font-semibold">(৳{unitPrice} per piece)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                
                {/* Special Pricing Info */}
                {isSpecialPricing && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2">
                      <Tag className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">Special Combo Offers:</p>
                        <ul className="text-xs text-blue-800 space-y-0.5">
                          <li>• 1 piece: ৳260</li>
                          <li>• 2 pieces (Combo): ৳390 (Save ৳130!)</li>
                          <li>• 3+ pieces: ৳180 each (Best Value!)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Offer Combo Button */}
                {isSpecialPricing && (
                  <div className="mt-4 space-y-3">
                    <motion.button
                      onClick={() => setQuantity(2)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-6 py-5 rounded-2xl font-bold transition-all relative overflow-hidden group ${
                        quantity === 2
                          ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/60 ring-4 ring-green-300/50'
                          : 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 text-gray-900 hover:from-orange-100 hover:via-amber-100 hover:to-yellow-100 border-3 border-orange-400 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-300/50 ring-2 ring-orange-200/30'
                      }`}
                    >
                      {/* Animated background gradient on hover */}
                      {quantity !== 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-green-400/20 transition-opacity duration-500"
                        >
                          <div className="absolute inset-0 animate-shimmer"></div>
                        </motion.div>
                      )}
                      
                      {/* Sparkle effect */}
                      {quantity !== 2 && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                        </div>
                      )}
                      
                      {/* Gift icon animation */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          {quantity === 2 ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Gift className="w-6 h-6" />
                            </motion.div>
                          ) : (
                            <motion.div
                              animate={{ 
                                rotate: [0, 5, -5, 5, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              <Gift className="w-6 h-6 text-green-600" />
                            </motion.div>
                          )}
                          <div className="flex flex-col items-start flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl font-bold flex items-center gap-2">
                                🎁 2 Pieces Combo Deal
                              </span>
                              {quantity !== 2 && (
                                <motion.span
                                  animate={{ 
                                    scale: [1, 1.3, 1],
                                    opacity: [1, 0.8, 1]
                                  }}
                                  transition={{ 
                                    duration: 1.2,
                                    repeat: Infinity
                                  }}
                                  className="text-yellow-500 text-2xl"
                                >
                                  ⭐
                                </motion.span>
                              )}
                            </div>
                            <span className="text-sm text-gray-600 mb-1">
                              {quantity === 2 ? (
                                <span className="flex items-center gap-1 text-green-600 font-semibold">
                                  <motion.span
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="text-xl"
                                  >
                                    ✓
                                  </motion.span>
                                  <span>Combo Selected - Great Choice!</span>
                                </span>
                              ) : (
                                <span className="text-orange-600 font-semibold">🔥 Limited Time Offer - Click to Activate!</span>
                              )}
                            </span>
                            {quantity !== 2 && (
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 line-through">৳520</span>
                                <span className="text-xs text-red-600 font-semibold">25% OFF</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-gray-900">৳390</span>
                            {quantity !== 2 && (
                              <span className="text-lg text-gray-400 line-through">৳520</span>
                            )}
                          </div>
                          {quantity !== 2 && (
                            <motion.div
                              animate={{ 
                                scale: [1, 1.08, 1],
                                boxShadow: [
                                  '0 0 0px rgba(34, 197, 94, 0)', 
                                  '0 0 15px rgba(34, 197, 94, 0.6)', 
                                  '0 0 0px rgba(34, 197, 94, 0)'
                                ]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity
                              }}
                              className="mt-2"
                            >
                              <span className="text-xs bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-4 py-2 rounded-full font-extrabold shadow-xl flex items-center gap-1">
                                <span className="text-base">💰</span>
                                Save ৳130
                              </span>
                            </motion.div>
                          )}
                          {quantity === 2 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2"
                            >
                              <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold">
                                Only ৳195 per piece!
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      {/* Success animation when selected */}
                      {quantity === 2 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-white/10"
                        >
                          <motion.div
                            animate={{ 
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]"
                          />
                        </motion.div>
                      )}
                    </motion.button>
                    
                    {quantity > 1 && (
                      <div className="text-sm text-center">
                        {quantity === 2 && (
                          <span className="text-green-600 font-semibold">🎉 Combo Deal: Save ৳130!</span>
                        )}
                        {quantity >= 3 && (
                          <span className="text-green-600 font-semibold">🎉 Best Value: ৳180 per piece!</span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-4">
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
                    <span>Order Now - ৳{totalPrice}</span>
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
