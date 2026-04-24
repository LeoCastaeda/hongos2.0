import Image from 'next/image';
import { Check, Leaf, Heart, MapPin, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const storyImage = PlaceHolderImages.find(p => p.id === 'about-story');
    const sustainabilityImage = PlaceHolderImages.find(p => p.id === 'about-sustainability');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-primary font-semibold">Nuestra Historia</p>
          <h1 className="text-4xl md:text-6xl font-headline font-bold my-4">
            Volviendo a lo natural, potenciando el futuro.
          </h1>
          <p className="text-lg text-muted-foreground">
            En Boulet, creemos que el bienestar es un equilibrio entre cuerpo y mente. Nuestra misión es reconectar a las personas con el poder de la naturaleza a través de suplementos a base de hongos funcionales, cultivados con respeto y procesados con ciencia.
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
            <h2 id="sustainability" className="text-3xl font-headline font-bold mb-4">Compromiso con la Calidad y el Planeta</h2>
            <p className="text-muted-foreground mb-6">
              La salud de nuestros clientes y la del planeta son nuestras máximas prioridades. Por eso cuidamos cada detalle, desde el origen de nuestros hongos hasta el packaging que llega a tus manos.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Leaf className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Cultivo Orgánico y Sostenible</h3>
                  <p className="text-muted-foreground">Nuestros hongos crecen en un entorno controlado, libre de pesticidas y metales pesados, asegurando la máxima pureza.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Heart className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Doble Extracción para Máxima Potencia</h3>
                  <p className="text-muted-foreground">Utilizamos un método de doble extracción (agua y alcohol) para obtener todos los compuestos beneficiosos del hongo.</p>
                </div>
              </li>
               <li className="flex items-start">
                <Award className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Cuerpo Fructífero, Sin Rellenos</h3>
                  <p className="text-muted-foreground">Solo usamos el cuerpo fructífero del hongo, la parte con mayor concentración de activos. Sin micelio, sin granos, sin aditivos.</p>
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
                <p className="text-sm text-muted-foreground">Análisis de laboratorio independientes para cada lote.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Ingredientes Puros</h3>
                <p className="text-sm text-muted-foreground">100% cuerpo fructífero de hongo. Sin aditivos.</p>
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
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">100% Orgánico</h3>
                <p className="text-sm text-muted-foreground">Cultivado de forma sostenible y responsable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
