import { Card, CardContent } from '@/components/ui/card';
import { reviews } from '@/lib/data';
import { Star } from 'lucide-react';

export function Reviews() {
  return (
    <section id="reviews" className="py-16 lg:py-24">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Lo que dice nuestra comunidad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Opiniones reales de personas que han transformado su bienestar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <CardContent className="p-0">
                  <p className="italic">"{review.text}"</p>
                </CardContent>
              </div>
              <p className="mt-4 font-semibold text-right">- {review.author}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
