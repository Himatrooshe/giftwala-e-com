'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const newArrivalProducts = products.filter((product) => product.badge === 'NEW ARRIVAL' || product.id === 'coming-soon-product');

export default function NewArrivals() {
  if (!newArrivalProducts.length) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-gray-600 uppercase mb-2">What's New</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">New Arrivals & Coming Soon</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Fresh drops you shouldn't miss. Limited stock and lots of excitement.
            </p>
          </div>
          <Link
            href="/products"
            className="self-start inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Shop the Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

