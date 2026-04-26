import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden bg-[#0A0A0A]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        poster={heroImage?.imageUrl}
      >
        <source src="/videos/videocabecera.mp4" type="video/mp4" />
        {/* Fallback Image if video fails or is not supported */}
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
      </video>

      {/* Premium Overlay - Solid black if video doesn't cover everything or as requested */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 container max-w-5xl px-4">
        <h1 className="text-6xl md:text-8xl font-headline font-bold mb-6 text-shadow-2xl animate-fade-in-down tracking-tighter leading-[0.9] uppercase">
          El Poder de los <br />
          <span className="text-primary">Hongos Funcionales</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-shadow-lg animate-fade-in-up font-light text-gray-200 tracking-wide">
          EXTRACTOS DOBLES DE CUERPO FRUCTÍFERO. <br className="hidden md:block" />
          POTENCIA TU MENTE, ENERGÍA Y BIENESTAR DE FORMA NATURAL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button asChild size="lg" className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-8 h-auto bg-primary hover:bg-primary/90 transition-all rounded-none text-white border-none shadow-xl">
            <Link href="/collections/all">Comprar Ahora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-sm uppercase tracking-widest px-12 py-8 h-auto bg-transparent hover:bg-white hover:text-black transition-all rounded-none text-white border-white border-2">
            <Link href="/quiz">Hacer el Quiz</Link>
          </Button>
        </div>
      </div>

      {/* Subtle fade to bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
    </section>
  );
}
