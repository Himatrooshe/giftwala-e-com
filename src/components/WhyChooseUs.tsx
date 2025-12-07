'use client';

import { motion } from 'framer-motion';
import { Award, Truck, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Giftwala™ Quality',
    description: 'Premium gifts curated and verified for your special moments.',
    color: '#1588D7',
    gradient: 'linear-gradient(135deg, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.05))',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your order within 2-3 days anywhere in Bangladesh. Free shipping on all orders.',
    color: '#0FB7B1',
    gradient: 'linear-gradient(135deg, rgba(15, 183, 177, 0.1), rgba(21, 136, 215, 0.05))',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'All products are thoroughly checked and verified to meet high quality standards.',
    color: '#1588D7',
    gradient: 'linear-gradient(135deg, rgba(21, 136, 215, 0.1), rgba(15, 183, 177, 0.05))',
  },
  {
    icon: HeartHandshake,
    title: 'Friendly Support',
    description: 'Questions? Message us on WhatsApp for quick help every day.',
    color: '#0FB7B1',
    gradient: 'linear-gradient(135deg, rgba(15, 183, 177, 0.1), rgba(21, 136, 215, 0.05))',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(21, 136, 215, 0.08), transparent 50%), radial-gradient(circle at 70% 50%, rgba(15, 183, 177, 0.08), transparent 50%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Why Choose{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #1588D7, #0FB7B1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Giftwala?
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're committed to providing you with the best products and exceptional service
          </p>
        </motion.div>

        {/* Reasons Grid - Modern Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div 
                  className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 border border-gray-100 shadow-lg hover:shadow-2xl"
                  style={{
                    background: reason.gradient
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(21, 136, 215, 0.15), rgba(15, 183, 177, 0.1))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = reason.gradient;
                  }}
                >
                  {/* Decorative Gradient Overlay */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: reason.color }}
                  ></div>
                  <div 
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: reason.color }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon with Gradient Background */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4 sm:mb-6"
                    >
                      <div 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${reason.color}, ${reason.color === '#1588D7' ? '#0FB7B1' : '#1588D7'})`
                        }}
                      >
                        <Icon className="text-white" size={32} strokeWidth={2.5} />
                        
                        {/* Glow Effect */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                          style={{ background: reason.color }}
                        ></div>
                      </div>
                    </motion.div>
                    
                    {/* Title */}
                    <h3 
                      className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300"
                      style={{
                        color: 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = reason.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#111827';
                      }}
                    >
                      {reason.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">
                      {reason.description}
                    </p>

                    {/* Checkmark Indicator */}
                    <div className="mt-4 sm:mt-6 flex items-center gap-2">
                      <CheckCircle2 
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: reason.color }}
                      />
                      <span className="text-xs sm:text-sm font-medium" style={{ color: reason.color }}>
                        Verified
                      </span>
                    </div>

                    {/* Hover Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ borderColor: reason.color }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
