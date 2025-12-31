import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrivals from '@/components/NewArrivals';
import WhyChooseUs from '@/components/WhyChooseUs';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Content */}
      <div>
        {/* Sticky Header with Navigation */}
        <Header />

      {/* Hero Section - Full-width with product showcase */}
      <Hero />

      {/* Shop by Category */}
      <Categories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Why Choose Giftwala - Trust indicators */}
      <WhyChooseUs />

      {/* Customer Reviews - Social proof */}
      <Reviews />

      {/* FAQ Section - Common questions and answers */}
      <FAQ />

      {/* Final CTA - Conversion-focused call to action */}
      <CTA />

      {/* Footer - Contact info, links, social media */}
      <Footer />
      </div>

      {/* Structured Data for SEO (JSON-LD) - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Giftwala Bangladesh',
            alternateName: 'Giftwala',
            url: 'https://www.giftwalabd.com',
            logo: 'https://www.giftwalabd.com/og-image.jpg',
            description: 'Giftwala is Bangladesh\'s trusted online shopping platform offering premium products with fast delivery across all districts. Secure payments, cash on delivery, and 100% authentic products guaranteed.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dhaka',
              addressRegion: 'Dhaka',
              addressCountry: 'BD',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+880-1789571784',
              contactType: 'Customer Service',
              areaServed: {
                '@type': 'Country',
                name: 'Bangladesh'
              },
              availableLanguage: ['en', 'bn'],
            },
            sameAs: [
              'https://www.facebook.com/share/17p5yog79E/',
              'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=zjb1k8d',
              'https://youtube.com/@flashshop-z7o?si=yeLwx6pXkFcyZmBV',
            ],
          }),
        }}
      />

      {/* Structured Data for SEO (JSON-LD) - E-commerce Store */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'Giftwala Bangladesh',
            image: 'https://www.giftwalabd.com/og-image.jpg',
            url: 'https://www.giftwalabd.com',
            telephone: '+880-1789571784',
            priceRange: '৳৳',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dhaka',
              addressRegion: 'Dhaka',
              addressCountry: 'Bangladesh',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 23.8103,
              longitude: 90.4125,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '09:00',
                closes: '21:00',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '10000',
            },
            paymentAccepted: 'Cash, Credit Card, Debit Card, Mobile Banking',
            currenciesAccepted: 'BDT',
            areaServed: {
              '@type': 'Country',
              name: 'Bangladesh'
            },
          }),
        }}
      />

      {/* Structured Data for SEO (JSON-LD) - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Giftwala Bangladesh',
            url: 'https://www.giftwalabd.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://www.giftwalabd.com/products?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
            inLanguage: 'en-BD',
          }),
        }}
      />

      {/* Structured Data for SEO (JSON-LD) - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Giftwala Bangladesh',
            image: 'https://www.giftwalabd.com/og-image.jpg',
            '@id': 'https://www.giftwalabd.com',
            url: 'https://www.giftwalabd.com',
            telephone: '+880-1789571784',
            priceRange: '৳৳',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Dhaka',
              addressLocality: 'Dhaka',
              addressRegion: 'Dhaka',
              postalCode: '1000',
              addressCountry: 'BD',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 23.8103,
              longitude: 90.4125,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '09:00',
              closes: '21:00',
            },
          }),
        }}
      />
    </main>
  );
}
