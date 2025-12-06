export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  emoji?: string;
  category: string;
  inStock: boolean;
  images?: string[];
  description?: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'nasal-cleaner-01',
    name: 'Smart Nasal Cleaner Bottle (স্মার্ট নাসাল ক্লিনার বোতল)',
    tagline: 'Gentle nasal irrigation for daily sinus care and allergy relief',
    price: 650,
    originalPrice: 1050,
    rating: 4.8,
    reviews: 127,
    badge: 'BEST SELLER',
    emoji: '🩺',
    category: 'Health & Wellness',
    inStock: true,
    stock: 120,
    images: [
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633111/IMG_20251019_124825_co8dcd.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633116/IMG_20251019_131413_kf5jdi.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633110/IMG_20251019_123820_p4kvve.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1761633108/IMG_20250925_162855_wtgfpz.jpg',
    ],
    description: 'Professional-grade nasal irrigation bottle designed for gentle and effective sinus care. Made from medical-grade, BPA-free materials. Perfect for relieving sinusitis, allergies, and congestion. Easy to use and clean.',
  },
  {
    id: 'foot-odor-spray',
    name: 'Anti Bacterial foot spray (অ্যান্টি ব্যাকটেরিয়াল ফুট স্প্রে)',
    tagline: 'Instantly eliminate foot odor and keep feet fresh all day',
    price: 450,
    originalPrice: 750,
    rating: 4.9,
    reviews: 89,
    badge: 'NEW ARRIVAL',
    emoji: '👟',
    category: 'Personal Care',
    inStock: true,
    stock: 90,
    images: [
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521832/spray-2_ayshp9.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521828/spray-1_pokfw3.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521830/spray-4_dx3jxr.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521831/spray-3_qs8y1k.jpg',
    ],
    description: 'Powerful foot odor eliminator spray that neutralizes bad smells instantly. Long-lasting formula keeps your feet fresh and dry throughout the day. Safe for daily use on feet and shoes. Antibacterial properties prevent odor-causing bacteria.',
  },
  {
    id: 'kids-comfy-pillow',
    name: 'Head shaping pillow (হেড শেপিং পিলো)',
    tagline: 'Ultra-soft memory foam pillow for peaceful sleep',
    price: 890,
    originalPrice: 1290,
    rating: 4.7,
    reviews: 156,
    badge: 'TRENDING',
    emoji: '🛏️',
    category: 'Kids & Baby',
    inStock: true,
    stock: 60,
    images: [
      
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521823/pillow-2_pqwye1.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521824/pillow-3_j38nyh.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521827/pillow-4_ibsojs.jpg',
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521827/pillow_qxrggj.jpg',
    ],
    description: 'Premium quality children\'s pillow designed for optimal neck support and comfort. Made with hypoallergenic memory foam that adapts to your child\'s sleeping position. Breathable cover keeps them cool all night. Perfect for ages 0-3 years.',
  },
  {
    id: 'spray-oil',
    name: 'Spray Oil Pot (স্প্রে অয়েল পট)',
    tagline: 'Premium quality spray oil pot for versatile use - Coming soon',
    price: 0,
    rating: 0,
    reviews: 0,
    badge: 'COMING SOON',
    emoji: '🛢️',
    category: 'Personal Care',
    inStock: false,
    stock: 0,
    images: [
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521824/oil-spray_drrayq.jpg',
    ],
    description: 'High-quality spray oil pot perfect for various applications. Stay tuned for this exciting new product launch!',
  },
  {
    id: 'fujiqui',
    name: 'Fujiqui LED Table Lamp (ফুজিকুই এলইডি টেবিল ল্যাম্প)',
    tagline: 'Innovative LED table lamp - Arriving soon',
    price: 0,
    rating: 0,
    reviews: 0,
    badge: 'COMING SOON',
    emoji: '💡',
    category: 'Home & Living',
    inStock: false,
    stock: 0,
    images: [
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521824/Fujiqui_nsmknz.jpg',
    ],
    description: 'An innovative LED table lamp that will revolutionize your workspace and home lighting. Coming soon to Giftwala!',
  },
  {
    id: 'wheel-cover',
    name: 'Car Steering Wheel Cover (কার স্টিয়ারিং হুইল কভার)',
    tagline: 'Protective car steering wheel cover - Coming soon',
    price: 0,
    rating: 0,
    reviews: 0,
    badge: 'COMING SOON',
    emoji: '🚗',
    category: 'Automotive',
    inStock: false,
    stock: 0,
    images: [
      'https://res.cloudinary.com/dgm2mosta/image/upload/v1764521837/wheel_cover_sgmcnb.jpg',
    ],
    description: 'Premium car steering wheel cover for vehicle protection and comfort. This exciting new product will be available soon!',
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.badge);
}

