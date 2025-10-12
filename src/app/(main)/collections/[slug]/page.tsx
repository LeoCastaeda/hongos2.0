import { products, benefits } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';

export async function generateStaticParams() {
  const benefitSlugs = benefits.map(b => ({ slug: b.slug }));
  const otherSlugs = [
    { slug: 'all' }, 
    { slug: 'bundles' }, 
    { slug: 'tinctures' },
    { slug: 'medicinal' },
    { slug: 'comestible' },
  ];
  return [...benefitSlugs, ...otherSlugs];
}


export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const benefit = benefits.find(b => b.slug === slug);

  let filteredProducts = [];
  let title = 'Nuestros Productos';
  let description = 'Explora nuestra gama completa de suplementos naturales.';

  if (slug === 'all') {
    filteredProducts = products;
  } else if (slug === 'bundles') {
    filteredProducts = products.filter(p => p.type === 'bundle');
    title = 'Packs y Bundles';
    description = 'Ahorra con nuestros packs predefinidos para objetivos específicos.';
  } else if (slug === 'tinctures') {
    filteredProducts = products.filter(p => p.type === 'tincture');
    title = 'Todas las Tincturas';
    description = 'Descubre nuestra colección de tincturas herbales.';
  } else if (slug === 'medicinal') {
    filteredProducts = products.filter(p => p.category === 'Medicinal');
    title = 'Hongos Medicinales';
    description = 'Extractos y packs centrados en los beneficios para la salud.';
  } else if (slug === 'comestible') {
    filteredProducts = products.filter(p => p.category === 'Comestible');
    title = 'Productos Comestibles';
    description = 'Disfruta de los beneficios de los hongos en tu día a día.';
  } else if (benefit) {
    filteredProducts = products.filter(p => p.benefitCategory === slug || p.type === 'bundle' && p.slug.includes(slug));
    title = `Productos para ${benefit.name}`;
    description = benefit.description;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No se encontraron productos en esta colección.</p>
        </div>
      )}
    </div>
  );
}
