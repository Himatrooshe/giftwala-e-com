'use client';

import { Sparkles, Droplets, Zap, Leaf } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Gentle Nasal Cleaning',
    description: 'Soft, controlled flow ensures comfortable and effective cleaning without irritation.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: Droplets,
    title: 'Relieves Congestion & Allergies',
    description: 'Flush out allergens, mucus, and irritants for instant sinus relief.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Easy to Use & Reusable',
    description: 'Simple squeeze design. Durable, eco-friendly, and cost-effective.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Leaf,
    title: 'Safe for Daily Use',
    description: 'Made from medical-grade, BPA-free materials. Perfect for the whole family.',
    color: 'from-emerald-500 to-teal-500'
  },
];

export default function Features() {
  return (
    <section id="benefits" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-fade-up text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Why Choose Our <span className="text-gray-900">Nasal Cleaner?</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-medium max-w-3xl mx-auto">
            Experience the benefits of professional-grade nasal care at home
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="animate-card"
              >
                <div className="p-4 sm:p-6 lg:p-8 h-64 sm:h-72 lg:h-80 group hover:scale-[1.02] transition-all duration-300 bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm hover:shadow-md">
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#E4E5E8' }}>
                      <Icon className="text-gray-900 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-900 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

