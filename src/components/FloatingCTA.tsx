'use client';

import { useState } from 'react';
import { MessageCircle, MessageSquare, Phone, X, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDrawerOpen } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const phoneNumber = '01345903907';
  const whatsappMessageLink = 'https://wa.me/message/QB5ZDFKU4NQBL1';
  const email = 'support@giftwalabd.com';

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto transition-opacity duration-300 ${
      isDrawerOpen ? 'z-[50] opacity-50' : 'z-[98] opacity-100'
    }`}>
      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 sm:space-y-3 pointer-events-auto">
          {/* Call Button */}
          <a
            href={`tel:${phoneNumber}`}
            className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            style={{ 
              background: 'linear-gradient(to right, #1588D7, #0FB7B1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #0d6ba8, #0c9a94)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #1588D7, #0FB7B1)';
            }}
          >
            <Phone size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappMessageLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            {/* WhatsApp SVG */}
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
              <g clipPath="url(#clip0)">
              <path d="M16 1.999C8.268 2 2 8.27 2 16.003c0 2.822.781 5.57 2.262 7.98L2 30l6.174-2.093A14.001 14.001 0 0016 30c7.732 0 14-6.27 14-14.003C30 8.269 23.732 2 16 1.999zm0 25.454a11.13 11.13 0 01-5.662-1.556l-.404-.24-3.666 1.244 1.22-3.572-.263-.422A11.067 11.067 0 014.909 16.003c0-6.109 4.977-11.086 11.091-11.086 6.113 0 11.09 4.977 11.09 11.086 0 6.11-4.977 11.086-11.09 11.086zm6.066-8.295c-.332-.166-1.96-.967-2.263-1.078-.304-.111-.526-.166-.749.166-.222.333-.861 1.078-1.055 1.3-.194.222-.388.25-.72.083-.332-.166-1.403-.517-2.675-1.646-.988-.88-1.654-1.966-1.85-2.299-.194-.332-.021-.511.146-.676.15-.149.332-.388.5-.583.167-.195.222-.334.334-.555.111-.222.055-.416-.027-.583-.083-.166-.749-1.806-1.025-2.48-.27-.649-.547-.561-.749-.57a2.038 2.038 0 00-.532-.011c-.166 0-.444.055-.678.277-.234.222-.888.867-.888 2.116 0 1.249.91 2.454 1.037 2.624.126.166 1.79 2.857 4.337 4.021.606.262 1.078.419 1.448.536.608.193 1.162.166 1.6.1.488-.072 1.496-.611 1.709-1.201.212-.588.212-1.094.148-1.201-.065-.111-.305-.175-.638-.344z" fill="#fff"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="28" height="28" fill="#fff" transform="translate(2 2)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Messenger/Chat Button */}
          <a
            href="https://m.me/832930269899416?source=qr_link_share"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            {/* Messenger SVG */}
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
              <g clipPath="url(#clip1)">
                <path d="M16 3C8.268 3 2 8.98 2 16c0 2.739.944 5.283 2.669 7.458.185.238.273.536.232.835l-.352 2.487a1.002 1.002 0 001.247 1.131l2.595-.635a1 1 0 01.664.061A14.045 14.045 0 0016 29c7.732 0 14-5.98 14-13.999C30 8.98 23.732 3 16 3z" fill="#fff"/>
                <path d="M9.991 18.268l3.897-4.156a1.25 1.25 0 011.734-.078l2.275 2.07a.25.25 0 00.347-.008l4.154-4.183a1.25 1.25 0 011.735-.02 1.258 1.258 0 01-.02 1.776l-3.897 4.156a1.25 1.25 0 01-1.734.078l-2.275-2.07a.25.25 0 00-.347.008l-4.154 4.183a1.25 1.25 0 01-1.735.02 1.258 1.258 0 01.02-1.776z" fill="#006AFF"/>
              </g>
              <defs>
                <clipPath id="clip1">
                  <rect width="28" height="28" fill="#fff" transform="translate(2 2)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="hidden sm:inline">Messenger</span>
            <span className="sm:hidden">Messenger</span>
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${email}`}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <Mail size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Email Us</span>
            <span className="sm:hidden">Email</span>
          </a>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={toggleMenu}
        className="relative text-white rounded-full shadow-lg hover:shadow-xl flex items-center gap-3 px-4 py-3 transition-all duration-300 transform hover:scale-105 cursor-pointer pointer-events-auto min-w-[120px] sm:min-w-[140px]"
        style={{ 
          background: 'linear-gradient(to right, #1588D7, #0FB7B1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #0d6ba8, #0c9a94)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #1588D7, #0FB7B1)';
        }}
        type="button"
      >
        {/* Phone Icon in White Circle */}
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center border-2"
          style={{ borderColor: '#1588D7' }}
        >
          <Phone size={16} className="sm:w-5 sm:h-5" style={{ color: '#1588D7' }} />
        </div>
        
        {/* Support Text */}
        <span className="font-bold text-sm sm:text-base text-white">
          Get Help
        </span>
        
        {/* Close Icon (when menu is open) */}
        {isOpen && (
          <X size={16} className="sm:w-5 sm:h-5 text-white ml-1" />
        )}
      </button>

      {/* Pulse Animation Background */}
      {!isOpen && (
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #1588D7, #0FB7B1)' }}
        ></div>
      )}
    </div>
  );
}

