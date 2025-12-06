'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package, AlertCircle, MessageSquare, Play, Monitor, Smartphone, X, ArrowRight, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from './ProductCard';

// Default product images for nasal cleaner (used when product doesn't have images)
const defaultProductImages = [
  { id: 1, src: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633111/IMG_20251019_124825_co8dcd.jpg', alt: 'Smart Nasal Cleaner - Main View' },
  { id: 5, src: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633116/IMG_20251019_131413_kf5jdi.jpg', alt: 'Smart Nasal Cleaner - Usage View' },
  { id: 2, src: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633110/IMG_20251019_123820_p4kvve.jpg', alt: 'Smart Nasal Cleaner - Side View' },
  { id: 3, src: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633108/IMG_20250925_162855_wtgfpz.jpg', alt: 'Smart Nasal Cleaner - Package View' },
];

const tutorialVideos = [
  {
    id: 'desktop-2', 
    title: 'Daily Usage Tips',
    description: 'Master the technique for effective nasal irrigation and care',
    icon: Monitor,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671800/VID_20251028211747_on4ysh.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633114/IMG_20251019_131330_o2cvlq.jpg',
    duration: '0:35'
  },
  {
    id: 'desktop-1',
    title: 'Complete Setup Guide',
    description: 'Learn how to properly prepare and use your nasal cleaner bottle',
    icon: Monitor,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671796/VID_20251028212619_n33cug.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633116/IMG_20251019_131413_kf5jdi.jpg',
    duration: '0:32'
  },
  {
    id: 'mobile-1',
    title: 'Quick Start Guide',
    description: 'Fast and easy tutorial for immediate relief and better breathing',
    icon: Smartphone,
    videoUrl: 'https://res.cloudinary.com/dgm2mosta/video/upload/v1761671859/InShot_20251028_212539309_wgmckk.mp4',
    thumbnail: 'https://res.cloudinary.com/dgm2mosta/image/upload/v1761675280/gg_cjyzkl.webp',
    duration: '0:48'
  }
];

const tabs = [
  { id: 'how-to-use', label: 'ব্যবহার করার নিয়ম', icon: AlertCircle },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  { id: 'description', label: 'Description', icon: Package },
  { id: 'precautions', label: 'Precautions', icon: AlertCircle },
];

const productHighlights: Record<string, { label: string; value: string }[]> = {
  'nasal-cleaner-01': [
    { label: 'Material', value: 'Medical-grade BPA-Free plastic' },
    { label: 'Capacity', value: '500ml squeeze bottle' },
    { label: 'Includes', value: '2 soft silicone nozzles' },
    { label: 'Delivery', value: 'Inside Dhaka 2-3 days' },
  ],
  'foot-odor-spray': [
    { label: 'Type', value: 'Antibacterial deodorizing spray' },
    { label: 'Size', value: '60ml portable bottle' },
    { label: 'Best For', value: 'Feet, socks & shoes' },
    { label: 'Fragrance', value: 'Cooling menthol finish' },
  ],
  'kids-comfy-pillow': [
    { label: 'Material', value: 'Hypoallergenic memory foam' },
    { label: 'Cover', value: 'Breathable removable knit cover' },
    { label: 'Age Range', value: 'Ideal for ages 0-3 years' },
    { label: 'Support', value: 'Ergonomic neck alignment' },
  ],
  'coming-soon-product': [
    { label: 'Bundle Type', value: 'Premium wellness essentials' },
    { label: 'Status', value: 'Limited launch incoming' },
    { label: 'Payment', value: 'COD & pre-orders' },
    { label: 'Delivery', value: 'Nationwide shipping planned' },
  ],
};

const reviewColorClasses = [
  'from-red-50 to-rose-50 border-red-400',
  'from-green-50 to-emerald-50 border-green-400',
  'from-amber-50 to-yellow-50 border-amber-400',
  'from-orange-50 to-red-50 border-orange-400',
];

const productReviews: Record<
  string,
  { name: string; quote: string; time: string }[]
> = {
  'nasal-cleaner-01': [
    {
      name: 'Rahman Ahmed',
      quote:
        'Excellent product! Really helps with my sinus problems. Easy to use and very effective. Highly recommended!',
      time: '2 weeks ago',
    },
    {
      name: 'Fatima Begum',
      quote:
        'Perfect for allergy season! My whole family uses it. The quality is amazing and it is very gentle on the nose.',
      time: '1 month ago',
    },
    {
      name: 'Karim Hassan',
      quote:
        'Great value for money! Works exactly as described. My nasal congestion has improved significantly since using this.',
      time: '3 weeks ago',
    },
    {
      name: 'Ayesha Khan',
      quote:
        'Very easy to use and clean. The instructions are clear and the product is exactly what I needed for my sinus issues.',
      time: '1 week ago',
    },
  ],
  'foot-odor-spray': [
    {
      name: 'Nafisa Karim',
      quote:
        'My shoes finally stay fresh all day. The minty cooling feel is awesome and it dries super fast.',
      time: '5 days ago',
    },
    {
      name: 'Tanvir Hossain',
      quote:
        'I spray it on my gym sneakers and sandals. No more embarrassing smells even after long shifts.',
      time: '2 weeks ago',
    },
    {
      name: 'Farzana Rahman',
      quote:
        'Love that I can use it on both feet and shoes. It kills odor instantly without staining anything.',
      time: '3 weeks ago',
    },
  ],
  'kids-comfy-pillow': [
    {
      name: 'Sadia Noor',
      quote:
        'My daughter sleeps through the night now. The pillow is soft yet supportive and stays cool.',
      time: '1 week ago',
    },
    {
      name: 'Mahfuz Alam',
      quote:
        'Perfect height for my 6-year-old. The removable cover is easy to wash and dries quickly.',
      time: '2 weeks ago',
    },
    {
      name: 'Ruma Chowdhury',
      quote:
        'We take it everywhere. Helps with posture and keeps my kid comfortable during long study hours.',
      time: '1 month ago',
    },
  ],
};

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart, updateQuantity, items, closeDrawer } = useCart();
  const [activeTab, setActiveTab] = useState('how-to-use');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Get current quantity from cart if product is already in cart
  const cartItem = items.find(item => item.id === product.id);
  const currentCartQuantity = cartItem?.quantity || 0;

  // Sync quantity with cart when cart changes or component mounts
  useEffect(() => {
    if (cartItem && cartItem.quantity > 0) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleOrderNow = () => {
    // Check if product is already in cart
    if (cartItem) {
      // If already in cart, update quantity to the selected quantity
      updateQuantity(product.id, quantity);
    } else {
      // If not in cart, add it first
      addToCart(product);
      // Then update to the desired quantity if more than 1
      if (quantity > 1) {
        // Use setTimeout to ensure cart state is updated first
        setTimeout(() => {
          updateQuantity(product.id, quantity);
        }, 50);
      }
    }
    // Close drawer if it opened
    closeDrawer();
    // Navigate to checkout
    router.push('/checkout');
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  // Use product images if available, otherwise use default images
  const productImages = product.images && product.images.length > 0
    ? product.images.map((src, idx) => ({ 
        id: idx + 1, 
        src, 
        alt: `${product.name} - View ${idx + 1}` 
      }))
    : product.id === 'nasal-cleaner-01' 
      ? defaultProductImages 
      : [{ id: 1, src: product.images?.[0] || '/main-pro.jpeg', alt: product.name }];

  const highlights = productHighlights[product.id] ?? [
    { label: 'Category', value: product.category },
    { label: 'Payment', value: 'Cash on Delivery' },
    { label: 'Availability', value: product.inStock ? 'In Stock' : 'Coming Soon' },
    { label: 'Delivery', value: 'Inside Dhaka 2-3 days' },
  ];

  const renderDescriptionContent = () => {
    if (product.id === 'nasal-cleaner-01') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">🏥 Medical-Grade Quality</h4>
              <p className="mb-3">The Smart Nasal Cleaner Bottle is designed to provide gentle and effective nasal irrigation for daily sinus care.</p>
              <p className="text-sm text-gray-700">Made from high-quality, medical-grade materials, this bottle ensures safe and comfortable use for the entire family.</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-green-900">✨ Key Features</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Ergonomic design for comfortable grip</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Soft silicone nozzle for gentle insertion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Squeeze-controlled water flow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy to clean and maintain</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Dishwasher safe components</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-purple-900">🎯 Perfect For</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Daily sinus care</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Allergy relief</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Cold & flu symptoms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-600">•</span>
                  <span>Nasal congestion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'foot-odor-spray') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Stay Fresh & Confident</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Instant Odor Control</h4>
              <p>Neutralizes odor-causing bacteria within seconds and keeps your feet dry throughout the day.</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-green-900">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>• Cooling menthol finish</li>
                <li>• Works on bare feet, socks, and shoes</li>
                <li>• No white residue or staining</li>
                <li>• Safe for daily use</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-amber-900">Perfect For</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <span>• Office shoes & sneakers</span>
                <span>• Gym sessions & sports</span>
                <span>• Sandals & loafers</span>
                <span>• Everyday foot care</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'kids-comfy-pillow') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Comfort for Growing Kids</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-purple-900">Adaptive Support</h4>
              <p>Memory foam core adapts to every sleeping position and keeps the spine aligned.</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Breathable & Hygienic</h4>
              <p>Removable, washable cover keeps the pillow fresh while ventilation pores prevent heat build-up.</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-green-900">Perfect For</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <span>• Kids transitioning from toddler pillows</span>
                <span>• Study time and reading</span>
                <span>• Travel and sleepovers</span>
                <span>• Sensory-sensitive children</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'coming-soon-product') {
      return (
        <div className="prose max-w-none text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Wellness Bundle</h3>
          <p className="text-gray-700">We are finalizing the product mix to bring you the best all-in-one health package. Join our newsletter to get notified the moment it launches.</p>
        </div>
      );
    }

    return (
      <div className="prose max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{product.name}</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    );
  };

  const renderHowToContent = () => {
    if (product.id === 'nasal-cleaner-01') {
      return (
        <div className="prose max-w-none">
          {/* Video Tutorials */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Watch Tutorial Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorialVideos.map((video, index) => (
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
                    <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-gray-700 ml-1" />
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bengali Instructions */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">ব্যবহার করার নিয়ম</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-fuchsia-50 border-l-4 border-fuchsia-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">১. পানির প্রস্তুতি</h4>
              <p className="mb-2">বোতলে আগে থেকে ফুটিয়ে রাখা পরিস্কার পানি নিন।</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• কোনভাবেই ট্যাপ অথবা কলের পানি ব্যবহার করবেন না</p>
                <p>• অতিরিক্ত গরম অথবা ঠান্ডা পানি ব্যবহার করবেন না</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">২. লবণ মিশ্রণ</h4>
              <p className="mb-2">পানিতে স্যালাইন / লবণ মিশ্রণ যোগ করতে হবে।</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• তাহলে পানি নাকে দিলে জ্বলবে না</p>
                <p>• হাফ চা চামচ পরিমাণে লবণ যথেষ্ট হবে</p>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৩. নাকের প্রবেশ</h4>
              <p>নোজল (মুখ অংশ) নাকে আলতোভাবে প্রবেশ করান।</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৪. চাপ প্রয়োগ</h4>
              <p className="mb-2">বোতল হালকা চাপ দিন 👍 পানি এক নাসারন্ধ্র দিয়ে ঢুকে অপর নাসারন্ধ্র দিয়ে বের হবে।</p>
              <p className="text-sm text-gray-700">(ভেতরে জমে থাকা সর্দি সহ)</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৫. অন্য পাশ পরিস্কার</h4>
              <p>একইভাবে অন্য পাশের নাকও পরিস্কার করুন।</p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৬. পরিস্কারকরণ</h4>
              <p className="mb-2">ব্যবহার শেষে বোতলটি ভালোভাবে ধুয়ে রাখুন</p>
              <p className="text-sm text-gray-700">(পুনরায় ব্যবহারের জন্য)</p>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'foot-odor-spray') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">ব্যবহার করার নিয়ম</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-fuchsia-50 border-l-4 border-fuchsia-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">১. পরিস্কার ও শুকনো করুন</h4>
              <p className="mb-2">স্প্রে করার আগে পা ধুয়ে শুকিয়ে নিন অথবা জুতার ভিতর পরিস্কার করুন।</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">২. ঝাঁকিয়ে স্প্রে করুন</h4>
              <p className="mb-2">বোতলটি ভালোভাবে ঝাঁকিয়ে নিন। ১৫ সেন্টিমিটার দূরত্বে রেখে পা, মোজা বা জুতায় সমানভাবে স্প্রে করুন।</p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৩. শুকাতে দিন</h4>
              <p className="mb-2">জুতা পরার আগে কয়েক সেকেন্ড শুকাতে দিন। দীর্ঘ সময় ব্যবহারের পর পুনরায় ব্যবহার করুন।</p>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'kids-comfy-pillow') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">ব্যবহার করার নিয়ম</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-fuchsia-50 border-l-4 border-fuchsia-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">১. খুলে বাতাসে রাখুন</h4>
              <p className="mb-2">প্যাকেজিং থেকে বের করে কয়েক ঘন্টা বাতাসে রাখুন যাতে ফোম সম্পূর্ণভাবে প্রসারিত হতে পারে।</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">২. কভার দিয়ে ব্যবহার করুন</h4>
              <p className="mb-2">পরিস্কার রাখার জন্য শ্বাস-প্রশ্বাসযোগ্য কভার বা আপনার নিজের পিলো কেস ব্যবহার করুন।</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-2">৩. নিয়মিত যত্ন</h4>
              <p className="mb-2">শুধুমাত্র ফোমের দাগ পরিস্কার করুন। অপসারণযোগ্য কভার সপ্তাহে একবার মেশিনে ধুয়ে নিন।</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="prose max-w-none text-gray-900">
        <h3 className="text-2xl font-bold mb-4">ব্যবহার করার নিয়ম</h3>
        <p>বিস্তারিত ব্যবহারের নির্দেশনা শীঘ্রই শেয়ার করা হবে। কোন প্রশ্ন থাকলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।</p>
      </div>
    );
  };

  const renderPrecautionsContent = () => {
    if (product.id === 'foot-odor-spray') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Precautions & Safety</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Flammable</h4>
              <p>Keep away from open flames or high heat. Store below 30°C.</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-orange-900">Skin Safety</h4>
              <p>For external use only. Do not use on broken or irritated skin.</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Patch Test</h4>
              <p>Spray on a small area first if you have sensitive skin. Keep away from eyes and mouth.</p>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'kids-comfy-pillow') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Care & Safety</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Foam Care</h4>
              <p>Do not wash or submerge the memory foam. Spot clean only and keep away from direct sunlight.</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-green-900">Cover Maintenance</h4>
              <p>Remove the cover and machine wash on gentle cycle. Lay flat to dry for best results.</p>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">Usage Tips</h4>
              <p>Allow the pillow to fully air out before first use and fluff gently every few days.</p>
            </div>
          </div>
        </div>
      );
    }

    if (product.id === 'nasal-cleaner-01') {
      return (
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Precautions & Safety</h3>
          <div className="space-y-6 text-gray-900">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">🚰 Water Safety</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">⚠️</span>
                  <span>Always use distilled, sterile, or previously boiled water</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">⚠️</span>
                  <span>Never use tap water directly</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-orange-900">🧽 Maintenance & Care</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">⚠️</span>
                  <span>Clean the bottle thoroughly after each use</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">⚠️</span>
                  <span>Replace the bottle every 3-6 months</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-purple-900">🏥 Medical Considerations</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">⚠️</span>
                  <span>Consult a doctor if you have ear infections or sinus surgery</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">⚠️</span>
                  <span>Stop use if you experience pain or discomfort</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3 text-red-900">👶 Child Safety</h4>
              <p>Children should use under adult supervision. Use gentle pressure only.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="prose max-w-none text-gray-900">
        <h3 className="text-2xl font-bold mb-4">General Precautions</h3>
        <p>Please follow the instructions included with the product. Keep away from heat, direct sunlight, and children when not in use.</p>
      </div>
    );
  };

  const renderReviewsContent = () => {
    const reviews = productReviews[product.id] ?? [
      {
        name: 'Giftwala Customer',
        quote: `Absolutely loved this gift: ${product.name}. Quality is great and delivery was fast!`,
        time: 'Recently',
      },
      {
        name: 'Verified Buyer',
        quote: `This ${product.category.toLowerCase()} gift from Giftwala exceeded my expectations.`,
        time: 'This month',
      },
    ];

    if (!reviews.length) {
      return <p className="text-gray-600">Reviews will be available soon.</p>;
    }

    return (
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div
            key={`${review.name}-${idx}`}
            className={`bg-gradient-to-r ${reviewColorClasses[idx % reviewColorClasses.length]} border-l-4 p-6 rounded-r-lg`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, starIdx) => (
                  <Star key={starIdx} className="text-yellow-400 fill-yellow-400" size={18} />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{review.name}</span>
              <span className="text-sm text-gray-600">Verified Purchase</span>
            </div>
            <p className="text-gray-900 mb-2">"{review.quote}"</p>
            <p className="text-sm text-gray-600">{review.time}</p>
          </div>
        ))}
      </div>
    );
  };

  if (!isHydrated) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 animate-pulse">
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl bg-gray-100" />
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
              <div className="h-6 w-1/3 bg-gray-200 rounded" />
              <div className="h-32 w-full bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left - Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden bg-white"
            >
              <Image
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {productImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedImage === index
                      ? 'ring-2 sm:ring-4 ring-cyan-400 scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain bg-white"
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12.5vw, 10vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Badge */}
              {product.badge && (
                <div className="inline-block">
                  <span className={`text-white px-3 py-1 rounded-md text-sm font-semibold ${
                    product.badge === 'BEST SELLER' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600'
                      : product.badge === 'NEW ARRIVAL'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : product.badge === 'TRENDING'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600'
                      : product.badge === 'COMING SOON'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                      : 'bg-red-600'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                      size={20}
                    />
                  ))}
                </div>
                <span className="text-gray-900">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 sm:space-x-4">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">৳{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl sm:text-2xl text-gray-900 line-through">
                      ৳{product.originalPrice}
                    </span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              
              {/* Delivery Info */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900 font-medium">Delivery Charges:</p>
                <p className="text-sm text-red-800 mt-1">
                  Inside Dhaka: ৳80 | Outside Dhaka: ৳150
                </p>
              </div>

              {/* Short Description */}
              <p className="text-lg text-gray-900 leading-relaxed">
                {product.tagline}
              </p>
              {product.description && (
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Stock Status */}
              {!product.inStock && (
                <div className={`${
                  product.badge === 'COMING SOON'
                    ? 'bg-purple-50 border border-purple-200'
                    : 'bg-red-50 border border-red-200'
                } rounded-lg p-4`}>
                  <p className={`text-sm font-medium ${
                    product.badge === 'COMING SOON' ? 'text-purple-900' : 'text-red-900'
                  }`}>
                    {product.badge === 'COMING SOON' ? 'Coming Soon' : 'Out of Stock'}
                  </p>
                  <p className={`text-sm mt-1 ${
                    product.badge === 'COMING SOON' ? 'text-purple-800' : 'text-red-800'
                  }`}>
                    {product.badge === 'COMING SOON' 
                      ? 'This exciting new product will be available soon. Stay tuned!' 
                      : 'This product is currently unavailable.'}
                  </p>
                </div>
              )}

              {/* Quantity Controls */}
              {product.inStock && (
                <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  {product.stock > 0 && (
                    <span className="text-xs text-gray-600">
                      {product.stock - quantity} left in stock
                    </span>
                  )}
                </div>
              )}

              {/* Order Now Button */}
              {product.inStock ? (
                <button 
                  onClick={handleOrderNow}
                  className="w-full py-4 px-8 font-medium text-sm uppercase tracking-wide bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white hover:from-red-700 hover:via-red-600 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-3 rounded-md group shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart size={20} />
                  <span>Order Now ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <button disabled className="w-full py-4 px-8 font-medium text-sm uppercase tracking-wide bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center gap-3 rounded-md">
                  <ShoppingCart size={20} />
                  <span>Unavailable</span>
                </button>
              )}

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item) => (
                  <div key={item.label} className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-900">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 px-4 font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-900 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8 rounded-2xl">
            {activeTab === 'description' && renderDescriptionContent()}
            {activeTab === 'how-to-use' && renderHowToContent()}
            {activeTab === 'precautions' && renderPrecautionsContent()}
            {activeTab === 'reviews' && renderReviewsContent()}
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              You May Also Like
            </h2>
            <p className="text-gray-600 text-lg">
              Discover more curated gifts from Giftwala
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
          </div>

          {products.filter((p) => p.id !== product.id).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">More products coming soon!</p>
            </div>
          )}
        </div>
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
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 sm:p-2 transition-colors duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh]"
              onEnded={closeVideo}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

