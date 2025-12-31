'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { fbReviews } from '@/data/textReviews';

export default function Reviews() {
  // Show first 6 reviews on landing page
  const displayedReviews = fbReviews.slice(0, 6);

  const makeInitialAvatarDataUrl = (name: string) => {
    const initial = (name || 'U').trim().charAt(0).toUpperCase();
    const bg = '%23e11d48'; // rose-600
    const fg = 'white';
    return `data:image/svg+xml;utf8,` +
      `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'>` +
      `<rect width='100%' height='100%' rx='22' ry='22' fill='${bg}'/>` +
      `<text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${fg}' font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji' font-size='20' font-weight='700'>${initial}</text>` +
      `</svg>`;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Customer Reviews
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about our products
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {displayedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 bg-white shrink-0">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 38%' }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = makeInitialAvatarDataUrl(review.name);
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{
              background: 'linear-gradient(to right, #1588D7, #0FB7B1)'
            }}
          >
            <span>View All Reviews</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

