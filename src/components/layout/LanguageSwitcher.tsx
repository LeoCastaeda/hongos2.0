'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-xs font-headline uppercase tracking-widest',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((item, index) => (
        <span key={item.code} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-white/30" aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: item.code })}
            className={cn(
              'transition-colors',
              locale === item.code
                ? 'text-primary font-bold'
                : 'text-white/60 hover:text-white'
            )}
            aria-current={locale === item.code ? 'true' : undefined}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}
