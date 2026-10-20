'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { BenefitIcons } from './BenefitIcons';
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] md:min-h-[85vh] md:h-[85vh] flex items-start md:items-center justify-center text-center text-white overflow-x-clip bg-[#0A0A0A]">
      <AutoplayVideo
        src="/videos/videocabecera.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 md:opacity-80"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/55 to-black/80 md:from-black/45 md:via-black/35 md:to-black/50"
        aria-hidden
      />

      <div className="relative z-10 container max-w-5xl px-4 pt-10 pb-12 md:py-8">
        <p className="mb-3 md:mb-5 text-[0.65rem] md:text-sm font-headline uppercase tracking-[0.2em] md:tracking-[0.35em] text-[#9BB89E] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          {t('eyebrow')}
        </p>
        <h1 className="mx-auto max-w-full font-headline font-bold mb-5 md:mb-6 uppercase text-white">
          <span className="block text-[clamp(1.15rem,4.8vw+0.35rem,3.75rem)] md:text-[clamp(2.5rem,8vw+1rem,6rem)] leading-tight tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {t('titleBefore')}
          </span>
          <span className="mt-1 block text-[clamp(1.35rem,5.5vw+0.4rem,4rem)] md:text-[clamp(2.5rem,8vw+1rem,6rem)] leading-tight tracking-tight text-[#E8A07A] md:text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {t('titleHighlight')}
          </span>
        </h1>
        <p className="text-[0.8rem] sm:text-fluid-p mb-8 md:mb-12 max-w-2xl mx-auto font-light text-white/90 tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
          {t('subtitle1')} <br className="hidden md:block" />
          {t('subtitle2')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center mb-10 md:mb-16">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-7 sm:py-8 h-auto bg-primary hover:bg-primary/90 transition-all rounded-none text-white border-none shadow-xl"
          >
            <Link href="/collections/all">{t('ctaShop')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-7 sm:py-8 h-auto bg-black/30 hover:bg-white hover:text-black transition-all rounded-none text-white border-white border-2"
          >
            <Link href="/quiz">{t('ctaQuiz')}</Link>
          </Button>
        </div>

        <div className="hidden sm:block">
          <BenefitIcons />
        </div>
      </div>
    </section>
  );
}
