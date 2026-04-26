import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/600/600";
  const imageHint = placeholder?.imageHint || "product";

  const t = useTranslations('products');
  const productName = t(`${product.slug}.name`);
  const productDescription = t(`${product.slug}.description`);

  return (
    <Card className="flex flex-col h-full overflow-hidden bg-transparent border-none shadow-none group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square w-full relative">
            <Image
              src={imageUrl}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={imageHint}
            />
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-lg font-headline leading-tight mb-2 hover:text-primary transition-colors">
            {productName}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground">
          {productDescription.substring(0, 70)}...
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <p className="text-xl font-bold">{product.price.toFixed(2)}€</p>
        <Button asChild className="w-full sm:w-auto rounded-none uppercase tracking-widest text-xs px-6">
          <Link href={`/products/${product.slug}`}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
