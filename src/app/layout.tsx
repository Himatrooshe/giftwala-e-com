import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import FloatingCTA from '@/components/FloatingCTA';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.giftwalabd.com'),
  title: 'Giftwala Bangladesh | Premium Online Shopping | Fast Delivery Across BD',
  description: 'Giftwala - Your trusted online shopping platform in Bangladesh. Premium products, fast delivery across all districts, secure payments, and cash on delivery. Shop authentic products with 100% satisfaction guarantee.',
  keywords: [
    'Giftwala',
    'Giftwala Bangladesh',
    'online shopping Bangladesh',
    'ecommerce Bangladesh',
    'online store Bangladesh',
    'shop online Bangladesh',
    'premium products Bangladesh',
    'fast delivery Bangladesh',
    'cash on delivery Bangladesh',
    'COD Bangladesh',
    'authentic products Bangladesh',
    'Dhaka online shopping',
    'Bangladesh shopping',
    'best online store Bangladesh',
    'online shopping BD',
    'ecommerce BD',
    'shop online BD',
    'premium shopping Bangladesh',
    'secure payment Bangladesh',
    'free delivery Bangladesh',
  ],
  authors: [{ name: 'Giftwala Bangladesh' }],
  creator: 'Giftwala Bangladesh',
  publisher: 'Giftwala Bangladesh',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://www.giftwalabd.com',
    title: 'Giftwala Bangladesh - Premium Online Shopping | Fast Delivery',
    description: 'Shop premium products online in Bangladesh. Fast delivery across all districts, secure payments, COD available. Authentic products with 100% satisfaction guarantee.',
    siteName: 'Giftwala Bangladesh',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Giftwala Bangladesh - Premium Online Shopping Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giftwala Bangladesh | Premium Online Shopping',
    description: 'Shop premium products online in Bangladesh. Fast delivery, secure payments, COD available. Order now on Giftwala!',
    images: ['/twitter-image.jpg'],
    creator: '@giftwalabd',
  },
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/dufzkjd0c/image/upload/v1765099511/favicon_ftg7xq.png',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: 'https://res.cloudinary.com/dufzkjd0c/image/upload/v1765099511/favicon_ftg7xq.png',
        sizes: '180x180',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.giftwalabd.com',
    languages: {
      'en-BD': 'https://www.giftwalabd.com',
    },
  },
  other: {
    'og:phone_number': '+880 1789571784',
    'og:email': 'support@giftwalabd.com',
    'og:locality': 'Dhaka',
    'og:region': 'Dhaka',
    'og:country-name': 'Bangladesh',
    'og:postal-code': '1000',
    'google-site-verification': 'yzsoc0u1oIwZw_tksgUkxbh3Oti5Q79wSaMZCOrBMcw',
    'business:contact_data:street_address': 'Dhaka',
    'business:contact_data:locality': 'Dhaka',
    'business:contact_data:country_name': 'Bangladesh',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-BD" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#1588D7" />
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Bangladesh" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        <link rel="canonical" href="https://www.giftwalabd.com" />
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dufzkjd0c/image/upload/v1765099511/favicon_ftg7xq.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dufzkjd0c/image/upload/v1765099511/favicon_ftg7xq.png" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LB4F7582J6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LB4F7582J6');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-inter antialiased`}>
        <SmoothScrollProvider>
          <CartProvider>
            {children}
            <FloatingCTA />
            <CartDrawer />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
