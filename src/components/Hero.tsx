'use client';

import { ShieldCheck, Truck, Award, Star, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Image */}
        <Image
          src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764915773/hero-bg-final_u8d7hm.png"
          alt="Giftwala Background"
          fill
          className="object-cover hidden sm:block"
          priority
        />
        {/* Mobile Background Image */}
        <Image
          src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764916263/hero-bg-mob_huxvag.png"
          alt="Giftwala Mobile Background"
          fill
          className="object-cover sm:hidden"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/20 to-white/10"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 max-w-2xl text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900">4.9/5 from 10,000+ reviews</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1]">
                Your Trusted{' '}
                <span className="text-gray-900 inline-flex items-center gap-1 sm:gap-2">
                  Online Store
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-900 inline-block" />
                </span>
              </h1>
              <p className="hero-subtitle text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed font-medium">
                Discover thoughtful gifts at Giftwala Bangladesh. Fast delivery,
                beautiful packaging, and exceptional customer service - all in one place.
              </p>
              
              {/* Key Benefits */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-900/90">100% Authentic Products Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-900/90">Fast Delivery Across Bangladesh</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="/products" className="group px-8 py-3.5 text-sm font-medium uppercase tracking-wide bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 rounded-md">
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              
              <a href="#features" className="px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-gray-900 hover:text-gray-700 border-2 border-gray-900 hover:border-gray-700 transition-all duration-300 flex items-center justify-center rounded-md">
                <span>Learn More</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
