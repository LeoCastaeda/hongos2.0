import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';

const FALLBACK = 'https://picsum.photos/seed/placeholder/600/600';

/** Resolves the best image URL for a product (WC media or local placeholder). */
export function getProductImageUrl(product: Product): string {
  if (product.imageUrl) return product.imageUrl;
  const placeholder = PlaceHolderImages.find((p) => p.id === product.image);
  return placeholder?.imageUrl || FALLBACK;
}

export function getProductImageHint(product: Product): string {
  const placeholder = PlaceHolderImages.find((p) => p.id === product.image);
  return placeholder?.imageHint || 'product';
}
