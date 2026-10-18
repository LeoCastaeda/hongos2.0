'use client';

import { useTranslations } from 'next-intl';
import { benefits } from '@/lib/data';
import { Link } from '@/i18n/routing';

export function BenefitIcons() {
  const t = useTranslations('Benefits');

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mt-16 max-w-4xl mx-auto">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;
        return (
          <Link
            href={`/collections/${benefit.slug}`}
            key={benefit.id}
            className="flex flex-col items-center group transition-all"
          >
            <div className="mb-4">
              <Icon className="w-10 h-10 text-[#7A9E7E] transition-transform group-hover:scale-110 duration-300" />
            </div>
            <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors mb-1">
              {t(benefit.slug)}
            </span>
            <span className="text-[10px] font-body text-[#7A9E7E] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
              {t(`hint_${benefit.slug}`)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
