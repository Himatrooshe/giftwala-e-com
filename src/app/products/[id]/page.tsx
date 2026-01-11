import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetails from '@/components/ProductDetails';
import { products, getProductById } from '@/data/products';
import { notFound } from 'next/navigation';

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/main-pro.jpeg';

  return {
    title: `${product.name} | Giftwala BD`,
    description: product.tagline || product.description,
    openGraph: {
      title: product.name,
      description: product.tagline || product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/main-pro.jpeg';

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.tagline || product.description,
    "image": imageUrl,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Giftwala BD"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://giftwalabd.com/products/${product.id}`,
      "priceCurrency": "BDT",
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      {/* Product Details Section */}
      <ProductDetails product={product} />

      <Footer />
    </main>
  );
}

