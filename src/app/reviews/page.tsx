'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { videoReviews } from '../../data/reviewVideos';
import { fbReviews } from '../../data/textReviews';
import { ChevronLeft, ChevronRight, MoreHorizontal, ThumbsUp, MessageSquare, Star } from 'lucide-react';

export default function ReviewsPage() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const total = videoReviews.length;
  
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
    <section className="py-0 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Customer Reviews
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-3">
            Real feedback from customers across Bangladesh
          </p>
        </motion.div>

        {/* Video Reviews */}
        {total > 0 && (
          <div className="mb-10 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative mx-auto flex items-center justify-center"
            >
              <div className="relative w-[280px] h-[350px] sm:w-[360px] sm:h-[440px] md:w-[420px] md:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg">
                <video
                  key={videoReviews[currentVideo].id}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                >
                  <source src={videoReviews[currentVideo].src} type="video/mp4" />
                </video>
              </div>

              {/* Arrows */}
              <button
                type="button"
                aria-label="Previous review video"
                onClick={() => setCurrentVideo((prev) => (prev - 1 + total) % total)}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white active:scale-95"
              >
                <ChevronLeft className="text-gray-900" size={22} />
              </button>
              <button
                type="button"
                aria-label="Next review video"
                onClick={() => setCurrentVideo((prev) => (prev + 1) % total)}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white active:scale-95"
              >
                <ChevronRight className="text-gray-900" size={22} />
              </button>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {videoReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentVideo(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i === currentVideo ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Facebook-style Text Reviews (template) */}
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fbReviews.map((r, idx) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.02 }}
                className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 bg-white shrink-0">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center 38%' }}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          target.src = makeInitialAvatarDataUrl(r.name);
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[16px] sm:text-[17px] font-semibold text-gray-900">
                        {r.name}
                        <span className="inline-flex items-center gap-1 ml-2 text-[13px] font-medium text-gray-900 align-middle">
                          <span className="inline-flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                              <path d="M4 3h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#ef476f"/>
                              <path d="M12 6l1.176 3.618H17l-2.588 1.882.988 3.5L12 12.8 9.6 15l.988-3.5L8 9.618h3.824L12 6z" fill="#ffffff"/>
                            </svg>
                          </span>
                          recommends
                        </span>
                      </p>
                      <p className="text-[13px] text-gray-900 font-semibold">Flash Shop</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-[12px] text-gray-600 flex items-center gap-1">
                          {r.date}
                          <span className="text-gray-400">·</span>
                          <img src="/globe.svg" alt="Public" className="w-3 h-3 opacity-70" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="p-1 text-gray-500 hover:text-gray-700">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="text-[22px] sm:text-[24px] leading-10 text-gray-900 whitespace-pre-line mb-2">
                  {r.content || 'Write review here...'}
                </div>

                {/* Actions (visual only) */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-gray-600 pr-6 sm:pr-8">
                  <div className="flex items-center">
                    <button type="button" className="inline-flex items-center gap-2 text-[18px] leading-none hover:text-gray-800 transition-colors">
                      <ThumbsUp size={20} className="shrink-0 align-middle" />
                      <span className="align-middle">Like</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-8">
                    <button type="button" className="inline-flex items-center gap-2 text-[18px] leading-none hover:text-gray-800 transition-colors">
                      <MessageSquare size={20} className="shrink-0 align-middle" />
                      <span className="align-middle">Comment</span>
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 text-[18px] leading-none hover:text-gray-800 transition-colors">
                      {/* Facebook Messenger glyph - stroked outline */}
                      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 align-middle" aria-hidden="true">
                        <path d="M12 2.25c-5.385 0-9.75 3.99-9.75 8.914 0 2.713 1.4 5.15 3.63 6.777.15.11.24.29.24.48l.02 2.03c0 .4.43.65.78.45l2.27-1.26c.14-.08.31-.1.47-.07 0 0 1.39.27 2.89.27 5.385 0 9.75-3.99 9.75-8.914S17.385 2.25 12 2.25Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M6.9 12.3l2.97-1.78c.26-.16.6-.14.84.05l1.42 1.24c.3.26.74.27 1.05.02l2.77-2.27c.35-.29.83.17.56.54l-2.1 2.87c-.25.35-.73.46-1.11.26l-1.5-.85c-.27-.15-.6-.14-.86.04l-2.43 1.77c-.39.29-.86-.22-.61-.59Z" fill="currentColor"/>
                      </svg>
                      <span className="align-middle">Send</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}


