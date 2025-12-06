import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: Request) {
  // Use production domain
  const baseUrl = 'https://www.giftwalabd.com';
  const lastmod = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  const pages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'products', priority: '0.9', changefreq: 'daily' },
    { url: 'reviews', priority: '0.7', changefreq: 'weekly' },
    { url: 'contact', priority: '0.6', changefreq: 'monthly' },
    { url: 'checkout', priority: '0.5', changefreq: 'monthly' },
  ];

  // Add all product pages with images
  const productPages = products.map(product => {
    const productUrl = `products/${product.id}`;
    const mainImage = product.images && product.images.length > 0 
      ? product.images[0].startsWith('http') 
        ? product.images[0] 
        : `${baseUrl}${product.images[0]}`
      : null;
    
    let imageTag = '';
    if (mainImage) {
      imageTag = `
    <image:image>
      <image:loc>${mainImage}</image:loc>
      <image:title>${product.name}</image:title>
      <image:caption>${product.tagline}</image:caption>
    </image:image>`;
    }
    
    return {
      url: productUrl,
      priority: product.inStock ? '0.8' : '0.6', // Lower priority for coming soon products
      changefreq: 'weekly',
      imageTag
    };
  });

  const allPages = [...pages, ...productPages];

  const urls = allPages.map((page) => {
    const imageTag = 'imageTag' in page ? page.imageTag : '';
    return `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${imageTag}
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
