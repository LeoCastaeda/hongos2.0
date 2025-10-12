import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Best-Sellers y Packs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los favoritos de nuestra comunidad para empezar tu camino hacia el bienestar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
