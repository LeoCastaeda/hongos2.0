import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { EducationalBlock } from '@/components/home/EducationalBlock';
import { Reviews } from '@/components/home/Reviews';
import { SubscriptionCta } from '@/components/home/SubscriptionCta';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { getCatalogProducts } from '@/lib/woocommerce';

export default async function HomePage() {
  const t = await getTranslations('Home');
  const catalog = await getCatalogProducts();
  const featuredProducts = catalog.slice(0, 4);

  return (
    <>
      <Hero />
      <BrandStory />
      <section className="py-24 lg:py-32 bg-[#E8DFD0]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-h2 font-headline font-bold mb-4 uppercase tracking-tighter">
              {t('productsTitle')}
            </h2>
            <p className="text-fluid-p text-muted-foreground max-w-2xl mx-auto font-light">
              {t('productsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-20 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-none uppercase tracking-widest text-sm px-10 py-6 h-auto bg-transparent border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all"
            >
              <Link href="/collections/all">{t('viewAll')}</Link>
            </Button>
          </div>
        </div>
      </section>
      <EducationalBlock />
      <Reviews />
      <SubscriptionCta />
    </>
  );
}
