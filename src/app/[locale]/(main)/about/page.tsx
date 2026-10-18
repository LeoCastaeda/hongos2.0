import type { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, Check, FlaskConical, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return buildPageMetadata({
    locale,
    path: '/about',
    title: t('metaTitle'),
    description: t('metaDesc'),
    image: 'about-story',
  });
}

export default async function AboutPage() {
  const t = await getTranslations('About');
  const storyImage = PlaceHolderImages.find((p) => p.id === 'about-story');
  const sustainabilityImage = PlaceHolderImages.find(
    (p) => p.id === 'about-sustainability'
  );

  const guarantees = [
    { icon: FlaskConical, title: t('g1Title'), desc: t('g1Desc') },
    { icon: Leaf, title: t('g2Title'), desc: t('g2Desc') },
    { icon: ShieldCheck, title: t('g3Title'), desc: t('g3Desc') },
    { icon: Check, title: t('g4Title'), desc: t('g4Desc') },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white">
      <section className="relative h-[85vh] min-h-[600px] flex items-start overflow-hidden">
        <AutoplayVideo
          src="/videos/boulet_nosotros.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/45 z-[1]" />
        <div className="relative z-10 container px-6 md:px-10 pt-10 md:pt-16 text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50 mb-3 font-medium">
            {t('eyebrow')}
          </p>
          <h1 className="font-headline font-bold uppercase tracking-tighter leading-none text-white text-[clamp(1.8rem,4.5vw,4.5rem)] max-w-lg">
            {t('heroLine1')}
            <br />
            {t('heroLine2')}
          </h1>
        </div>
      </section>

      <section className="container px-4 py-20 lg:py-28 max-w-3xl">
        <p className="text-xl md:text-2xl font-light text-white/70 leading-relaxed">
          {t('intro')}
        </p>
      </section>

      <section className="container px-4 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          <div className="bg-[#1E2420] p-10 lg:p-16 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-6">
              {t('processEyebrow')}
            </p>
            <h2
              id="sustainability"
              className="font-headline font-bold uppercase text-4xl md:text-5xl tracking-tighter mb-8 leading-none"
            >
              {t('processTitle1')}
              <br />
              {t('processTitle2')}
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              {t('processP1')}
            </p>
            <p className="text-white/60 font-light leading-relaxed">
              {t('processP2')}
            </p>
          </div>
          {sustainabilityImage && (
            <div className="relative min-h-[400px] lg:min-h-0">
              <Image
                src={sustainabilityImage.imageUrl}
                alt={sustainabilityImage.description}
                fill
                className="object-cover"
                data-ai-hint={sustainabilityImage.imageHint}
              />
            </div>
          )}
        </div>
      </section>

      <section className="container px-4 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {storyImage && (
            <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1">
              <Image
                src={storyImage.imageUrl}
                alt={storyImage.description}
                fill
                className="object-cover"
                data-ai-hint={storyImage.imageHint}
              />
            </div>
          )}
          <div className="bg-[#F0E8D8] text-[#0A0A0A] p-10 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-6">
              {t('originEyebrow')}
            </p>
            <h2 className="font-headline font-bold uppercase text-4xl md:text-5xl tracking-tighter mb-8 leading-none">
              {t('originTitle1')}
              <br />
              {t('originTitle2')}
              <br />
              {t('originTitle3')}
            </h2>
            <p className="text-[#0A0A0A]/60 font-light leading-relaxed mb-4">
              {t('originP1')}
            </p>
            <p className="text-[#0A0A0A]/60 font-light leading-relaxed">
              {t('originP2')}
            </p>
          </div>
        </div>
      </section>

      <section id="made-in-bcn" className="py-24 lg:py-32 bg-[#1E2420]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#7A9E7E] mb-4">
              {t('guaranteesEyebrow')}
            </p>
            <h2 className="font-headline font-bold uppercase text-4xl md:text-6xl tracking-tighter">
              {t('guaranteesTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-[#1E2420] hover:bg-[#0A0A0A] transition-colors duration-300 p-10 flex flex-col gap-6"
              >
                <div className="w-12 h-12 border border-[#7A9E7E]/40 rounded-full flex items-center justify-center group-hover:border-[#7A9E7E] group-hover:bg-[#7A9E7E]/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#7A9E7E]" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl uppercase tracking-tight mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <p className="font-headline italic text-2xl md:text-4xl text-white/60 font-light leading-relaxed">
            &quot;{t('quote')}&quot;
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[#7A9E7E]">
            {t('quoteAuthor')}
          </p>
        </div>
      </section>
    </div>
  );
}
