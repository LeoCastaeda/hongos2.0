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
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 md:opacity-80"
      />
      {/* Stronger veil on small screens so the title stays readable over the video */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/55 to-black/75 md:from-black/45 md:via-black/35 md:to-black/50"
        aria-hidden
      />

      <div className="relative z-10 container max-w-5xl px-4 py-8">
        <p className="mb-4 md:mb-5 text-xs md:text-sm font-headline uppercase tracking-[0.25em] md:tracking-[0.35em] text-[#9BB89E] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] animate-fade-in">
          {t('eyebrow')}
        </p>
        <h1 className="text-fluid-h1 font-headline font-bold mb-5 md:mb-6 leading-[1.05] md:leading-[0.9] tracking-tight md:tracking-tighter uppercase text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] animate-fade-in-down">
          {t('titleBefore')} <br />
          <span className="text-[#E8A07A] md:text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {t('titleHighlight')}
          </span>
        </h1>
        <p className="text-fluid-p mb-8 md:mb-12 max-w-2xl mx-auto font-light text-white/90 tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] animate-fade-in-up">
          {t('subtitle1')} <br className="hidden md:block" />
          {t('subtitle2')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-10 md:mb-16">
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
            className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-8 h-auto bg-black/30 hover:bg-white hover:text-black transition-all rounded-none text-white border-white border-2 backdrop-blur-[2px]"
          >
            <Link href="/quiz">{t('ctaQuiz')}</Link>
          </Button>
        </div>

        <BenefitIcons />
      </div>
    </section>
  );
}
