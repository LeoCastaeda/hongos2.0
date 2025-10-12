import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SubscriptionCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-16 lg:py-20 px-4 text-center">
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
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-background focus:text-foreground"
          />
          <Button type="submit" variant="secondary" className="w-full sm:w-auto">
            Subscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
