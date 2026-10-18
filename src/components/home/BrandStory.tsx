'use client';

import { useTranslations } from 'next-intl';

export function BrandStory() {
  const t = useTranslations('BrandStory');

  return (
    <section className="relative bg-[#F0E8D8] text-[#0A0A0A] py-20 lg:py-28 overflow-hidden">
      <div className="container px-4">
        <p className="text-center text-xs font-headline uppercase tracking-[0.35em] text-[#7A9E7E] mb-4">
          {t('eyebrow')}
        </p>
        <h2 className="text-center text-fluid-h2 font-headline font-bold uppercase tracking-tighter mb-6 max-w-3xl mx-auto">
          {t('title')}
        </h2>
        <p className="text-center text-sm md:text-base text-[#0A0A0A]/70 max-w-2xl mx-auto mb-16 font-light tracking-wide">
          {t('lead')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <div>
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4">
              {t('whyTitle')}
            </h3>
            <p className="text-[#0A0A0A]/75 leading-relaxed font-light">
              {t('whyBody')}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4">
              {t('uaeTitle')}
            </h3>
            <p className="text-[#0A0A0A]/75 leading-relaxed font-light mb-4">
              {t('uaeBody')}
            </p>
            <p className="text-sm text-[#0A0A0A]/60 leading-relaxed border-l-2 border-[#7A9E7E] pl-4">
              {t('uaeNote')}
            </p>
          </div>
        </div>

        <p className="mt-16 text-center font-headline text-lg md:text-xl uppercase tracking-[0.2em] text-[#0A0A0A]">
          {t('motto')}
        </p>
      </div>
    </section>
  );
}
