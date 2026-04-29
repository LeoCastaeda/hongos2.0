import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubscriptionForm } from '@/components/forms/SubscriptionForm';
import { AutoplayVideo } from '@/components/ui/AutoplayVideo';

export function SubscriptionCta() {

  return (
    <section id="subscribe" className="relative text-white overflow-hidden bg-[#1E2420] py-20 lg:py-32">
      {/* Background Video */}
      <AutoplayVideo
        src="/videos/abajo.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="relative z-10 container py-24 lg:py-32 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-fluid-h1 font-headline font-bold mb-6 uppercase tracking-tighter leading-none">
          Únete a la <br /> <span className="text-primary">Comunidad Boulet</span>
        </h2>
        <p className="text-fluid-p text-gray-100 max-w-2xl mx-auto mb-12 font-light tracking-wide">
          RECIBE GUÍAS DE BIENESTAR, ACCESO ANTICIPADO A PRODUCTOS Y UN <span className="font-bold">10% DE DESCUENTO</span> EN TU PRIMER PEDIDO.
        </p>
        <div className="max-w-xl mx-auto">
          <SubscriptionForm 
            className="flex flex-col sm:flex-row w-full items-center gap-0 shadow-2xl"
            inputClassName="h-16 text-lg px-6 rounded-none border-none bg-white text-black"
            buttonClassName="h-16 px-10 rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-sm font-bold"
          />
        </div>
      </div>
    </section>
  );
}
