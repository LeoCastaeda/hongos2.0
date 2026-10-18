'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { BenefitIcons } from './BenefitIcons';
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden bg-[#0A0A0A]">
      <AutoplayVideo
        src="/videos/videocabecera.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 container max-w-5xl px-4">
        <p className="mb-5 text-xs md:text-sm font-headline uppercase tracking-[0.35em] text-[#7A9E7E] animate-fade-in">
          {t('eyebrow')}
        </p>
        <h1 className="text-fluid-h1 font-headline font-bold mb-6 text-shadow-2xl animate-fade-in-down tracking-tighter uppercase">
          {t('titleBefore')} <br />
          <span className="text-primary">{t('titleHighlight')}</span>
        </h1>
        <p className="text-fluid-p mb-12 max-w-2xl mx-auto text-shadow-lg animate-fade-in-up font-light text-gray-200 tracking-wide">
          {t('subtitle1')} <br className="hidden md:block" />
          {t('subtitle2')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-16">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-8 h-auto bg-primary hover:bg-primary/90 transition-all rounded-none text-white border-none shadow-xl"
          >
            <Link href="/collections/all">{t('ctaShop')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-8 h-auto bg-transparent hover:bg-white hover:text-black transition-all rounded-none text-white border-white border-2"
          >
            <Link href="/quiz">{t('ctaQuiz')}</Link>
          </Button>
        </div>

        <BenefitIcons />
      </div>
    </section>
  );
}
