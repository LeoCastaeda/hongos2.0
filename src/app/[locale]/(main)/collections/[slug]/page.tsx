import { products, benefits } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { Link } from '@/i18n/routing';

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


export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const benefit = benefits.find(b => b.slug === slug);

  let filteredProducts: typeof products = [];
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
    <div className="bg-[#F0E8D8] min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-32">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            {description.toUpperCase()}
          </p>
        </div>

        {/* Filters / Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-black/10 pb-8">
          {[
            { name: 'Todos', slug: 'all' },
            { name: 'Packs', slug: 'bundles' },
            { name: 'Medicinal', slug: 'medicinal' },
            { name: 'Comestible', slug: 'comestible' }
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className={`text-xs font-headline uppercase tracking-widest px-6 py-2 border border-black/20 hover:bg-black hover:text-white transition-all ${slug === cat.slug ? 'bg-black text-white' : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-headline uppercase tracking-widest text-muted-foreground">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
