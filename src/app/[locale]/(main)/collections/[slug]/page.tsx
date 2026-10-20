import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/products/ProductCard';
import { Link } from '@/i18n/routing';
import {
  buildPageMetadata,
  COLLECTION_SLUGS,
  getCollectionContent,
} from '@/lib/seo';
import { getCatalogProducts } from '@/lib/woocommerce';

export async function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Collections' });
  const { benefit } = getCollectionContent(slug);

  let title = t('all');
  let description = t('allDesc');
  if (slug === 'bundles') {
    title = t('bundles');
    description = t('bundlesDesc');
  } else if (slug === 'tinctures') {
    title = t('tinctures');
    description = t('tincturesDesc');
  } else if (slug === 'medicinal') {
    title = t('medicinal');
    description = t('medicinalDesc');
  } else if (benefit) {
    const benefitName = await getTranslations({ locale, namespace: 'Benefits' });
    title = t('benefitTitle', { name: benefitName(benefit.slug) });
    description = benefit.description;
  }

  return buildPageMetadata({
    locale,
    path: `/collections/${slug}`,
    title,
    description,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('Collections');
  const tb = await getTranslations('Benefits');
  const catalog = await getCatalogProducts();
  const { filteredProducts, benefit } = getCollectionContent(slug, catalog);

  let title = t('all');
  let description = t('allDesc');
  if (slug === 'bundles') {
    title = t('bundles');
    description = t('bundlesDesc');
  } else if (slug === 'tinctures') {
    title = t('tinctures');
    description = t('tincturesDesc');
  } else if (slug === 'medicinal') {
    title = t('medicinal');
    description = t('medicinalDesc');
  } else if (benefit) {
    title = t('benefitTitle', { name: tb(benefit.slug) });
    description = benefit.description;
  }

  return (
    <div className="bg-[#F0E8D8] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            {description.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-black/10 pb-8">
          {[
            { name: t('filterAll'), slug: 'all' },
            { name: t('filterTinctures'), slug: 'tinctures' },
            { name: t('filterPacks'), slug: 'bundles' },
            { name: t('filterMedicinal'), slug: 'medicinal' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className={`text-xs font-headline uppercase tracking-widest px-6 py-2 border border-black/20 hover:bg-black hover:text-white transition-all ${slug === cat.slug ? 'bg-black text-white' : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-headline uppercase tracking-widest text-muted-foreground">
              {t('empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
