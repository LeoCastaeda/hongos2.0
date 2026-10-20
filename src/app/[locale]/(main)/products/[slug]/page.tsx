import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { products, reviews as allReviews } from '@/lib/data';
import { ProductDetails } from '@/components/products/ProductDetails';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata, productJsonLd } from '@/lib/seo';
import {
  getCatalogProductBySlug,
  getCatalogProducts,
} from '@/lib/woocommerce';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getCatalogProductBySlug(slug);
  if (!product) {
    return buildPageMetadata({
      locale,
      path: `/products/${slug}`,
      title: 'Producto no encontrado',
      description: 'Este producto no está disponible.',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: product.name,
    description: product.description,
    image: product.imageUrl || product.image,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations('Product');
  const catalog = await getCatalogProducts();
  const localTwin = products.find((p) => p.slug === product.slug);
  const productReviews = allReviews.filter(
    (r) => r.product_id === (localTwin?.id ?? product.id)
  );
  const recommendedStack = catalog
    .filter((p) => p.type === 'tincture' && p.id !== product.id)
    .slice(0, 2);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <JsonLd data={productJsonLd(product, locale)} />
      <ProductDetails product={product} reviews={productReviews} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold font-headline text-center lg:text-3xl">
          {t('customerReviews')}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <div key={review.id} className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 italic text-muted-foreground">&quot;{review.text}&quot;</p>
                <p className="mt-4 font-semibold text-right">- {review.author}</p>
              </div>
            ))
          ) : (
            <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
              {t('noReviewsYet')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold font-headline text-center lg:text-3xl">
          {t('recommendedStack')}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ProductCard product={product} />
          {recommendedStack.map((recProduct) => (
            <ProductCard key={recProduct.id} product={recProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
