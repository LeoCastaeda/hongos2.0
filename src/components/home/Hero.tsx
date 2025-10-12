import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-shadow-lg animate-fade-in-down">
          El Poder de los Hongos Funcionales
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-shadow animate-fade-in-up">
          Descubre el poder ancestral de los hongos con nuestras tinturas de doble extracción. Potencia tu mente, energía y bienestar de forma natural.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button asChild size="lg" className="text-lg">
            <Link href="/collections/all">Comprar Ahora</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/quiz">Hacer el Quiz</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
