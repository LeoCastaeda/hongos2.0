/** Minimal WooCommerce REST product shape we consume. */
export type WooProductImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WooProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  categories: WooProductCategory[];
  tags: { id: number; name: string; slug: string }[];
  images: WooProductImage[];
  attributes: {
    id: number;
    name: string;
    options: string[];
  }[];
  meta_data?: { id: number; key: string; value: unknown }[];
};
