'use client';

import { Linkedin, Instagram, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';
import { BrandLogo } from './BrandLogo';

export function Footer({ hideVideo = false }: { hideVideo?: boolean }) {
  void hideVideo;
  const t = useTranslations('Footer');

  const footerLinks = {
    comprar: [
      { title: t('allProducts'), href: '/collections/all' },
      { title: t('tinctures'), href: '/collections/tinctures' },
      { title: t('medicinal'), href: '/collections/medicinal' },
      { title: t('packs'), href: '/collections/bundles' },
    ],
    nosotros: [
      { title: t('ourStory'), href: '/about' },
      { title: t('quality'), href: '/about#sustainability' },
      { title: t('reviews'), href: '/#reviews' },
    ],
    ayuda: [
      { title: t('contact'), href: '/contact' },
      { title: t('faq'), href: '/faq' },
      { title: t('shipping'), href: '/shipping' },
    ],
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden border-t border-white/5">
      <div className="container py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 pr-8">
            <Link href="/" className="inline-flex items-center mb-4" aria-label="Boulet">
              <BrandLogo variant="light" className="h-10 w-auto md:h-11" />
            </Link>
            <p className="text-sm font-headline uppercase tracking-[0.2em] text-white mb-3">
              {t('motto')}
            </p>
            <p className="text-sm text-white/80 mb-4">{t('tagline')}</p>
            <p className="text-xs text-white/60 mt-2 uppercase tracking-widest">
              {t('location')}
            </p>
            <a
              href={CONTACT_MAILTO}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 md:col-span-2 lg:col-span-3">
            <div>
              <h3 className="font-semibold text-white mb-4">{t('shop')}</h3>
              <ul className="space-y-2">
                {footerLinks.comprar.map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">{t('about')}</h3>
              <ul className="space-y-2">
                {footerLinks.nosotros.map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">{t('help')}</h3>
              <ul className="space-y-2">
                {footerLinks.ayuda.map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60" suppressHydrationWarning>
            © {new Date().getFullYear()} Bouletmushrooms. {t('rights')}
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/bouletmushrooms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-white/60 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/company/boulet-mushrooms/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-white/60 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
