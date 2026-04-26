import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section className="py-24 bg-[#F0E8D8]">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">
            Best-Sellers y Packs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            LOS FAVORITOS DE NUESTRA COMUNIDAD PARA EMPEZAR TU CAMINO HACIA EL BIENESTAR.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
