import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SubscriptionCta() {
  const ctaImage = PlaceHolderImages.find(p => p.id === 'subscription-cta-background');

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster={ctaImage?.imageUrl}
      >
        <source src="/videos/abajo.mp4" type="video/mp4" />
        {/* Fallback Image if video fails or is not supported */}
        {ctaImage && (
          <Image
            src={ctaImage.imageUrl}
            alt={ctaImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint={ctaImage.imageHint}
          />
        )}
      </video>
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="relative z-10 container py-16 lg:py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Únete a la comunidad Boulet
        </h2>
        <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8 font-light">
          Recibe guías de bienestar, acceso anticipado a productos y un 10% de descuento en tu primer pedido.
        </p>
        <form className="flex flex-col sm:flex-row w-full max-w-md mx-auto items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            type="email"
            placeholder="Introduce tu dirección de email"
            className="bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:text-foreground"
          />
          <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none shadow-lg transition-transform hover:scale-105">
            Subscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
