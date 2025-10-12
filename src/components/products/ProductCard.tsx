import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/placeholder/600/600";
  const imageHint = placeholder?.imageHint || "product";

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square w-full relative">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={imageHint}
            />
             <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                {product.isBestSeller && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                    Best Seller
                </Badge>
                )}
                <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-lg font-headline leading-tight mb-2 hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground">
          {product.description.substring(0, 70)}...
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold">{product.price.toFixed(2)}€</p>
        <Button asChild>
          <Link href={`/products/${product.slug}`}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
