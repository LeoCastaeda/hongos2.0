import { Hero } from "@/components/home/Hero";
import { ShopByBenefit } from "@/components/home/ShopByBenefit";
import { EducationalBlock } from "@/components/home/EducationalBlock";
import { Reviews } from "@/components/home/Reviews";
import { SubscriptionCta } from "@/components/home/SubscriptionCta";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  return (
    <>
      <Hero />
      <ShopByBenefit />
       <section className="py-16 lg:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                Nuestros Productos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Favoritos de nuestra comunidad para empezar tu camino hacia el bienestar.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                    <Link href="/collections/all">Ver todos los productos</Link>
                </Button>
            </div>
          </div>
      </section>
      <EducationalBlock />
      <Reviews />
      <SubscriptionCta />
    </>
  );
}
