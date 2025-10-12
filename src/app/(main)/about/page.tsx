import Image from 'next/image';
import { Check, Leaf, Heart, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const storyImage = PlaceHolderImages.find(p => p.id === 'about-story');
    const sustainabilityImage = PlaceHolderImages.find(p => p.id === 'about-sustainability');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-primary font-semibold">Nuestra Marca</p>
          <h1 className="text-4xl md:text-6xl font-headline font-bold my-4">
            Pasión por el bienestar, con raíces en Barcelona.
          </h1>
          <p className="text-lg text-muted-foreground">
            En Herbolario Barcelona, creemos en el poder de la naturaleza para restaurar el equilibrio y potenciar la vida. Combinamos la sabiduría herbal tradicional con la ciencia moderna para crear suplementos puros y efectivos.
          </p>
        </div>
        
        {storyImage && (
            <div className="my-16 rounded-lg overflow-hidden shadow-xl">
                <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    data-ai-hint={storyImage.imageHint}
                />
            </div>
        )}

        <div className="grid md:grid-cols-2 gap-16 items-center my-16">
          <div>
            <h2 id="sustainability" className="text-3xl font-headline font-bold mb-4">Nuestro Compromiso con la Sostenibilidad</h2>
            <p className="text-muted-foreground mb-6">
              La salud del planeta es tan importante como la tuya. Por eso, nos esforzamos por tener un impacto positivo en cada paso de nuestro proceso.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Leaf className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Ingredientes de Origen Ético</h3>
                  <p className="text-muted-foreground">Colaboramos con agricultores que practican la agricultura regenerativa y sostenible.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Heart className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Packaging Eco-Friendly</h3>
                  <p className="text-muted-foreground">Utilizamos botellas de vidrio reciclable y materiales de envío compostables para minimizar nuestra huella.</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Producción Local</h3>
                  <p className="text-muted-foreground">Al producir en Barcelona, reducimos las emisiones del transporte y apoyamos la economía local.</p>
                </div>
              </li>
            </ul>
          </div>
          {sustainabilityImage && (
              <div className="rounded-lg overflow-hidden aspect-square">
                <Image
                    src={sustainabilityImage.imageUrl}
                    alt={sustainabilityImage.description}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    data-ai-hint={sustainabilityImage.imageHint}
                />
              </div>
          )}
        </div>

        <div id="made-in-bcn" className="bg-secondary rounded-lg p-8 lg:p-12 my-16">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">Nuestras Garantías</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Tu confianza es nuestra prioridad. Por eso te ofrecemos total transparencia y calidad.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Testado por Terceros</h3>
                <p className="text-sm text-muted-foreground">Cada lote es verificado por laboratorios independientes.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Ingredientes Puros</h3>
                <p className="text-sm text-muted-foreground">Sin rellenos, aditivos artificiales ni GMOs.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Garantía de Satisfacción</h3>
                <p className="text-sm text-muted-foreground">Si no estás satisfecho, te devolvemos tu dinero.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Hecho en Barcelona</h3>
                <p className="text-sm text-muted-foreground">Con orgullo, formulado y producido en nuestra ciudad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
