import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { benefits } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';

export function ShopByBenefit() {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-secondary">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Comprar por Beneficio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra la solución natural perfecta para tus necesidades de bienestar.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon as LucideIcon;
            return (
              <Link href={`/collections/${benefit.slug}`} key={benefit.id} className="group">
                <Card className="text-center h-full flex flex-col items-center justify-center p-4 hover:bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center transition-colors group-hover:bg-primary">
                      <Icon className="w-8 h-8 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-2">
                    <CardTitle className="text-base font-semibold">{benefit.name}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
