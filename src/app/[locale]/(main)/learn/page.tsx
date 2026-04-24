import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Aprende con Nosotros
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explora nuestras guías, recetas y artículos científicos para profundizar en el mundo del bienestar natural.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const placeholder = PlaceHolderImages.find(p => p.id === article.image);
          const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder-learn/600/400";
          const imageHint = placeholder?.imageHint || "education";

          return (
            <Card key={article.id} className="overflow-hidden group">
              <Link href={`/learn/${article.slug}`} className="block h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={imageHint}
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{article.category}</p>
                    <h3 className="text-xl font-headline font-bold mb-4">{article.title}</h3>
                  </div>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:underline mt-4">
                    Leer más <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
