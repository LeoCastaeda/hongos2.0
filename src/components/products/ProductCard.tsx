'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useMessages, useTranslations } from 'next-intl';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { flyToCart } from '@/lib/fly-to-cart';
import { getProductCopy } from '@/lib/product-messages';
import { getProductImageHint, getProductImageUrl } from '@/lib/product-image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const t = useTranslations('Product');
  const imageUrl = getProductImageUrl(product);
  const imageHint = getProductImageHint(product);

  const messages = useMessages();
  const { name: productName, description: productDescription } = getProductCopy(
    (messages as { products?: unknown }).products,
    product
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    flyToCart(imageRef.current, imageUrl);
    addToCart(product, 1);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden bg-transparent border-none shadow-none group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
          <div ref={imageRef} className="aspect-square w-full relative">
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
        <div className="flex w-full sm:w-auto gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-none shrink-0"
            onClick={handleAddToCart}
            aria-label={t('addAria', { name: productName })}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button asChild className="flex-1 sm:flex-none rounded-none uppercase tracking-widest text-xs px-6">
            <Link href={`/products/${product.slug}`}>{t('viewProduct')}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
