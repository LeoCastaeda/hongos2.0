import type { Product } from '@/lib/types';

export type ProductCopy = {
  name: string;
  description: string;
  habitat: string;
  howToUse: string;
};

type ProductsMessages = Record<string, Partial<ProductCopy>>;

/**
 * Resolves localized product copy from the `products` message namespace.
 * Falls back to the Product fields when a slug is missing.
 */
export function getProductCopy(
  productsMessages: unknown,
  product: Product
): ProductCopy {
  const map =
    productsMessages && typeof productsMessages === 'object'
      ? (productsMessages as ProductsMessages)
      : {};
  const copy = map[product.slug] ?? {};

  return {
    name: copy.name || product.name,
    description: copy.description || product.description,
    habitat: copy.habitat || '',
    howToUse: copy.howToUse || product.howToUse,
  };
}
