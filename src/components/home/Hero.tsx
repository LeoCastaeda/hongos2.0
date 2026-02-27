import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
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

      {/* Premium Overlay - Mist/Darkness for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-[1]" />

      <div className="relative z-10 container max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-shadow-2xl animate-fade-in-down tracking-tight leading-tight">
          El Poder de los <span className="text-primary italic">Hongos Funcionales</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-shadow-lg animate-fade-in-up font-light text-gray-100">
          Descubre el poder ancestral de los hongos con nuestras tinturas de doble extracción. Potencia tu mente, energía y bienestar de forma natural.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
          <Button asChild size="lg" className="text-xl px-10 py-7 h-auto bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 shadow-2xl border-none text-white">
            <Link href="/collections/all">Comprar Ahora</Link>
          </Button>
          <Button asChild size="lg" className="text-xl px-10 py-7 h-auto bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 shadow-2xl border-none text-white">
            <Link href="/quiz">Hacer el Quiz</Link>
          </Button>
        </div>
      </div>

      {/* Subtle fade to bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
    </section>
  );
}
