import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function EducationalBlock() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Aprende con Nosotros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guías, recetas y la ciencia detrás de nuestros productos para que tomes decisiones informadas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => {
            const placeholder = PlaceHolderImages.find(p => p.id === article.image);
            const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder-edu/600/400";
            const imageHint = placeholder?.imageHint || "education";

            return (
              <Card key={article.id} className="overflow-hidden group">
                <Link href={`/learn/${article.slug}`} className="block">
                  <div className="relative aspect-video">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={imageHint}
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{article.category}</p>
                    <h3 className="text-xl font-headline font-bold mb-4">{article.title}</h3>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
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
