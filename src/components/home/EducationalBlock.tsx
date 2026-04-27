import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function EducationalBlock() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="relative py-24 bg-[#1E2420] text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/videos/aprende_con_nosotros.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 container px-4">
        <div className="text-center mb-16">
          <h2 className="text-fluid-h2 font-headline font-bold mb-4 tracking-tighter">
            Aprende con Nosotros
          </h2>
          <p className="text-fluid-p text-gray-100 max-w-2xl mx-auto font-light">
            GUÍAS, RECETAS Y LA CIENCIA DETRÁS DE NUESTROS PRODUCTOS.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => {
            const placeholder = PlaceHolderImages.find(p => p.id === article.image);
            const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder-edu/600/400";
            const imageHint = placeholder?.imageHint || "education";

            return (
              <Card key={article.id} className="overflow-hidden bg-[#F0E8D8] text-black border-none shadow-none group rounded-none">
                <Link href={`/learn/${article.slug}`} className="block">
                  <div className="relative aspect-video">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={imageHint}
                    />
                  </div>
                  <CardContent className="p-8">
                    <p className="text-xs font-headline uppercase tracking-widest text-primary mb-3">{article.category}</p>
                    <h3 className="text-2xl font-headline font-bold mb-4 leading-tight">{article.title}</h3>
                    <div className="flex items-center text-xs font-headline uppercase tracking-widest text-primary group-hover:underline">
                      Leer más <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
