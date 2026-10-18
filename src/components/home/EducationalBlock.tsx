'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';
import { Link } from '@/i18n/routing';

const articleKeys = ['article1', 'article2', 'article3'] as const;

export function EducationalBlock() {
  const t = useTranslations('Home');
  const tl = useTranslations('Learn');
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="relative py-24 bg-[#1E2420] text-white overflow-hidden">
      <AutoplayVideo
        src="/videos/aprende_con_nosotros.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 container px-4">
        <div className="text-center mb-16">
          <h2 className="text-fluid-h2 font-headline font-bold mb-4 tracking-tighter">
            {t('learnTitle')}
          </h2>
          <p className="text-fluid-p text-gray-100 max-w-2xl mx-auto font-light">
            {t('learnSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => {
            const key = articleKeys[index] ?? 'article1';
            const title = tl(`${key}Title`);
            const placeholder = PlaceHolderImages.find((p) => p.id === article.image);
            const imageUrl =
              placeholder?.imageUrl ||
              'https://picsum.photos/seed/placeholder-edu/600/400';
            const imageHint = placeholder?.imageHint || 'education';

            return (
              <Card
                key={article.id}
                className="overflow-hidden bg-[#F0E8D8] text-black border-none shadow-none group rounded-none"
              >
                <Link href={`/learn/${article.slug}`} className="block">
                  <div className="relative aspect-video">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={imageHint}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      {tl('readMore')}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
