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
    id: 'gear-lever-sleeve',
    name: 'Gear Lever Silicone Rubber Sleeve (গিয়ার লিভার সিলিকন রাবার স্লিভ)',
    tagline: 'আপনার জুতার পারফেক্ট প্রোটেকশন! Perfect shoe protection for bikers',
    price: 260, // Base price for 1 item (special pricing: 1=260, 2=400, 3+=180 each)
    originalPrice: 499,
    rating: 4.9,
    reviews: 234,
    badge: 'BEST SELLER',
    emoji: '🛡️',
    category: 'Automotive',
    inStock: true,
    stock: 150,
    images: [
      'https://res.cloudinary.com/dufzkjd0c/image/upload/v1767192132/IMG20251225190944_qoodzl.jpg',
      'https://res.cloudinary.com/dufzkjd0c/image/upload/v1767192132/IMG20251225191014_ib6suh.jpg',
      'https://res.cloudinary.com/dufzkjd0c/image/upload/v1767192131/Screenshot_20251226_235841_com_facebook_orca_BrowserLiteInMainProcessActivity_of7pgd.jpg',
      'https://res.cloudinary.com/dufzkjd0c/image/upload/v1767192126/Screenshot_20251226_235921_com_facebook_orca_BrowserLiteInMainProcessActivity_ia5hvc.jpg',
      'https://res.cloudinary.com/dufzkjd0c/image/upload/v1767192126/Screenshot_20251226_235907_com_facebook_orca_BrowserLiteInMainProcessActivity_drtlso.jpg',
    ],
    description: '🔧 বাইক চালাতে গিয়ে জুতার নকশা নষ্ট হয়ে যায়? এখন থেকে আর নয়! এই স্মার্ট সিলিকন স্লিভ দেবে জুতাকে সম্পূর্ণ সুরক্ষা। ✅ গিয়ার বদলানো হবে আরও আরামদায়ক ✅ জুতায় দাগ পড়া ও স্ক্র্যাচ রোধ করে ✅ স্লিপ করে না – দেয় মজবুত গ্রিপ ✅ সহজে লাগানো যায়, কোনো টুল লাগে না ✅ সব ধরনের মোটরসাইকেলে ব্যবহারযোগ্য',
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

