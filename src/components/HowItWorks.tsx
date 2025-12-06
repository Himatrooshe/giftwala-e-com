'use client';

import { motion } from 'framer-motion';
import { Play, Monitor, Smartphone, Droplets, Hand, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

const tutorialVideos = [
  {
    id: 'desktop-2', 
    title: 'Daily Usage Tips',
    description: 'Master the technique for effective nasal irrigation and care',
    icon: Monitor,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671800/VID_20251028211747_on4ysh.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633114/IMG_20251019_131330_o2cvlq.jpg', // Add your thumbnail image URL here
    duration: '0:35'
  },
  {
    id: 'desktop-1',
    title: 'Complete Setup Guide',
    description: 'Learn how to properly prepare and use your nasal cleaner bottle',
    device: 'desktop',
    icon: Monitor,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671796/VID_20251028212619_n33cug.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633116/IMG_20251019_131413_kf5jdi.jpg', // Add your thumbnail image URL here
    duration: '0:32'
  },
  {

    title: 'Quick Start Guide',
    description: 'Fast and easy tutorial for immediate relief and better breathing',
    icon: Smartphone,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671859/InShot_20251028_212539309_wgmckk.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761675280/gg_cjyzkl.webp', // Add your thumbnail image URL here
    duration: '0:48'
  }
];

const steps = [
  {
    number: '01',
    title: 'Fill with warm water + salt',
    description: 'Add lukewarm water and the recommended amount of nasal salt solution to the bottle.',
    icon: Droplets,
    color: 'from-red-500 to-amber-500'
  },
  {
    number: '02',
    title: 'Insert gently & press bottle',
    description: 'Tilt your head, insert the nozzle, and gently squeeze to allow water to flow through.',
    icon: Hand,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    number: '03',
    title: 'Rinse and repeat',
    description: 'Repeat for the other nostril. Breathe naturally and enjoy clear, refreshed sinuses.',
    icon: RotateCcw,
    color: 'from-violet-500 to-purple-500'
  },
];

export default function HowItWorks() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            How It <span className="text-gray-900">Works</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 font-medium max-w-3xl mx-auto leading-relaxed">
            Watch our tutorial videos and follow three simple steps to clearer breathing and better sinus health.
          </p>
        </motion.div>

        {/* Video Tutorials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Watch Tutorial Videos
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {tutorialVideos.map((video, index) => {
              const DeviceIcon = video.icon;
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div 
                    className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] cursor-pointer"
                    onClick={() => handleVideoClick(video.videoUrl)}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                      {/* Thumbnail Image */}
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block'
                        }}
                        onError={(e) => {
                          // Fallback to gradient background if thumbnail fails to load
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 items-center justify-center hidden">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-gray-700 ml-1" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">Click to play</p>
                        </div>
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-gray-700 ml-1" />
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Steps Grid - Made smaller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Quick Steps
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="p-4 sm:p-6 h-48 sm:h-52 group hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm hover:shadow-md">
                      {/* Step Icon */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#E4E5E8' }}>
                        <Icon className="text-gray-900 w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      
                      {/* Step Number */}
                      <div className="text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3">
                        {step.number}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-900 leading-relaxed flex-grow">
                        {step.description}
                      </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Inline Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 sm:p-2 transition-colors duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh]"
              onEnded={closeVideo}
              style={{ maxWidth: '100%', height: 'auto' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

