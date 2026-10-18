import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleJsonLd, buildPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/routing';

const slugToKey: Record<string, 'article1' | 'article2' | 'article3'> = {
  'what-are-functional-mushrooms': 'article1',
  'bulletproof-coffee-lions-mane': 'article2',
  'science-double-extraction': 'article3',
};

const categoryKeys: Record<string, string> = {
  guías: 'cat_guides',
  recetas: 'cat_recipes',
  ciencia: 'cat_science',
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const t = await getTranslations({ locale, namespace: 'Learn' });
  if (!article) {
    return buildPageMetadata({
      locale,
      path: `/learn/${slug}`,
      title: t('metaTitle'),
      description: t('metaDesc'),
      noIndex: true,
    });
  }

  const key = slugToKey[slug] ?? 'article1';
  return buildPageMetadata({
    locale,
    path: `/learn/${article.slug}`,
    title: t(`${key}Title`),
    description: t(`${key}Content`),
    image: article.image,
    type: 'article',
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const t = await getTranslations('Learn');

  if (!article) {
    notFound();
  }

  const key = slugToKey[slug] ?? 'article1';
  const title = t(`${key}Title`);
  const content = t(`${key}Content`);
  const catKey = categoryKeys[article.category] ?? 'cat_guides';

  const placeholder = PlaceHolderImages.find((p) => p.id === article.image);
  const imageUrl =
    placeholder?.imageUrl ||
    'https://picsum.photos/seed/placeholder-article/1200/600';
  const imageHint = placeholder?.imageHint || 'article';

  return (
    <article>
      <JsonLd
        data={articleJsonLd(
          { ...article, title, content },
          locale
        )}
      />
      <div className="relative w-full h-96">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container text-white">
          <Badge variant="secondary" className="mb-2">
            {t(catKey)}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">{title}</h1>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto py-12 px-4">
        <div className="prose lg:prose-xl max-w-none prose-h2:font-headline prose-h2:text-3xl prose-a:text-primary hover:prose-a:underline">
          <p className="lead text-xl text-muted-foreground mb-8">{content}</p>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/learn"
            className="text-primary hover:underline font-semibold"
          >
            &larr; {t('back')}
          </Link>
        </div>
      </div>
    </article>
  );
}
