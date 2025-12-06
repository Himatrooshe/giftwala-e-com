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
  title: 'Giftwala Bangladesh | Online Gifts & Surprises | Fast Delivery',
  description: 'Giftwala - Your trusted online gift delivery service in Bangladesh. Send premium gifts, surprise boxes, flowers and more with fast delivery across Bangladesh. Perfect for birthdays, anniversaries and special occasions.',
  keywords: [
    'Giftwala',
    'Giftwala Bangladesh',
    'online gifts Bangladesh',
    'gift delivery Bangladesh',
    'gift shop Bangladesh',
    'send gifts Bangladesh',
    'surprise box Bangladesh',
    'birthday gifts Bangladesh',
    'anniversary gifts Bangladesh',
    'fast delivery Bangladesh',
    'cash on delivery',
    'COD Bangladesh',
    'authentic products',
    'Dhaka online shopping',
    'Bangladesh shopping',
    'best online store Bangladesh',
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
    title: 'Giftwala Bangladesh - Online Gifts & Surprises | Fast Delivery',
    description: 'Send curated gifts, surprise boxes, flowers and more anywhere in Bangladesh. Fast delivery, premium packaging, COD available. Make every occasion special with Giftwala.',
    siteName: 'Giftwala Bangladesh',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Giftwala Bangladesh - Online Gift Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giftwala Bangladesh | Online Gift Shop',
    description: 'Send thoughtful gifts online in Bangladesh. Fast delivery, premium packaging, COD available. Order now on Giftwala!',
    images: ['/twitter-image.jpg'],
    creator: '@giftwalabd',
  },
  icons: {
    icon: '/flashshop-icon.png',
    apple: '/flashshop-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'og:phone_number': '+880 1345903907',
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
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="canonical" href="https://www.giftwalabd.com" />
        
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

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '840498368356556');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=840498368356556&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
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
