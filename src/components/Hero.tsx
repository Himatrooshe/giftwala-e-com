'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Award, Star, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Image */}
        <Image
          src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764915773/hero-bg-final_u8d7hm.png"
          alt="Giftwala Bangladesh - Premium Online Shopping"
          fill
          className="object-cover hidden sm:block"
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Mobile Background Image */}
        <Image
          src="https://res.cloudinary.com/dufzkjd0c/image/upload/v1764916263/hero-bg-mob_huxvag.png"
          alt="Giftwala Bangladesh - Premium Online Shopping"
          fill
          className="object-cover sm:hidden"
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
          }}
        ></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-7rem)]">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 max-w-2xl text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900">4.9/5 Rating from 10,000+ Happy Customers</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                Premium Online Shopping{' '}
                <span 
                  className="inline-flex items-center gap-2 sm:gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  in Bangladesh
                </span>
              </h1>
              
              <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-xl">
                Discover premium products with fast delivery across Bangladesh. Authentic quality, secure payments, and exceptional customer service.
              </p>
              
              {/* Key Benefits */}
              <div className="flex flex-col gap-3 sm:gap-4 pt-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">100% Authentic Products Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">Fast & Secure Delivery Across Bangladesh</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #1588D7, #0FB7B1)' }}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">Cash on Delivery Available</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
              <Link 
                href="/products" 
                className="group relative px-8 sm:px-10 py-4 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wide text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
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
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="#features" 
                className="px-8 sm:px-10 py-4 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wide text-gray-900 hover:text-gray-700 border-2 border-gray-900 hover:border-gray-700 transition-all duration-300 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <span>Explore More</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" style={{ color: '#1588D7' }} />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" style={{ color: '#0FB7B1' }} />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: '#1588D7' }} />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
