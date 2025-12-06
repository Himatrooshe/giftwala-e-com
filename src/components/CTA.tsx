'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to <span className="text-gray-900">Shop Quality Products?</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-900 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers who trust Giftwala for thoughtful gifts delivered right to their loved ones.
          </p>

          {/* CTA Button */}
          <div className="mb-2 sm:mb-4">
            <a href="/checkout" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium uppercase tracking-wide bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white hover:from-red-700 hover:via-red-600 hover:to-amber-600 transition-all duration-300 rounded-md group shadow-lg hover:shadow-xl">
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

