export { getWooCommerceConfig, isWooCommerceConfigured } from './config';
export {
  fetchWooProducts,
  fetchWooProductBySlug,
  pingWooCommerce,
  WooCommerceError,
} from './client';
export { mapWooProductToProduct } from './mapper';
export {
  getCatalogProducts,
  getCatalogProductBySlug,
  getCatalogSource,
} from './catalog';
export type { WooProduct } from './types';
export { WOO_CATALOG, findCatalogEntry } from './catalog-map';
export type { WooCatalogEntry } from './catalog-map';
export {
  getStoreCart,
  addStoreCartItem,
  mapStoreCartToItems,
  getStoreCartTotal,
} from './store-cart';
export { isWooStoreConfigured, getWooStoreBaseUrl } from './config';
