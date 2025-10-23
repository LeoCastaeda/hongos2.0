import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SubscriptionCta() {
  const ctaImage = PlaceHolderImages.find(p => p.id === 'subscription-cta-background');

  return (
    <section className="relative bg-primary text-primary-foreground">
      {ctaImage && (
        <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description}
          fill
          className="object-cover"
          data-ai-hint={ctaImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container py-16 lg:py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Únete a la comunidad Boulet
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Recibe guías de bienestar, acceso anticipado a productos y un 10% de descuento en tu primer pedido.
        </p>
        <form className="flex flex-col sm:flex-row w-full max-w-md mx-auto items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input 
            type="email" 
            placeholder="Introduce tu dirección de email" 
            className="bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:bg-background focus:text-foreground"
          />
          <Button type="submit" variant="default" className="w-full sm:w-auto">
            Subscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
