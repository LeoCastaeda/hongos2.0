import {
  createWooOrder,
  getWooOrderPayUrl,
  type WooCreatedOrder,
} from './client';
import type { StoreAddress } from './store-checkout';
import type { StoreCart } from './store-cart';
import { clearStoreCart } from './store-cart';

/** Gateways that need a hosted WP payment form (no card SDK on Next). */
export function needsHostedPayment(methodId: string): boolean {
  return [
    'square_credit_card',
    'square_cash_app_pay',
    'sumup',
    'stripe',
    'woocommerce_payments',
  ].includes(methodId);
}

function minorToMajor(value: string | null | undefined, minorUnit = 2): number {
  if (value == null || value === '') return 0;
  const raw = Number.parseInt(value, 10);
  if (!Number.isFinite(raw)) return 0;
  return raw / 10 ** minorUnit;
}

function selectedShippingLine(cart: StoreCart) {
  const minor = cart.totals?.currency_minor_unit ?? 2;
  for (const pkg of cart.shipping_rates ?? []) {
    const selected = pkg.shipping_rates?.find((rate) => rate.selected);
    if (!selected) continue;
    const methodId = selected.rate_id.split(':')[0] || selected.rate_id;
    return {
      method_id: methodId,
      method_title: selected.name,
      total: minorToMajor(selected.price, minor).toFixed(2),
    };
  }

  const shippingTotal = minorToMajor(cart.totals?.total_shipping, minor);
  if (shippingTotal > 0) {
    return {
      method_id: 'flat_rate',
      method_title: 'Shipping',
      total: shippingTotal.toFixed(2),
    };
  }
  return null;
}

/**
 * Creates a pending WC order from the Store cart and returns the WP
 * order-pay URL (Square / card form lives there).
 */
export async function createHostedPaymentOrder(input: {
  cart: StoreCart;
  address: StoreAddress;
  paymentMethod: string;
  cartToken?: string | null;
}): Promise<{ order: WooCreatedOrder; payUrl: string }> {
  if (!input.cart.items?.length) {
    throw new Error('El carrito está vacío.');
  }

  const shippingLine = selectedShippingLine(input.cart);
  const billing = {
    first_name: input.address.first_name,
    last_name: input.address.last_name,
    address_1: input.address.address_1,
    address_2: input.address.address_2 || '',
    city: input.address.city,
    state: input.address.state || '',
    postcode: input.address.postcode,
    country: input.address.country,
    email: input.address.email || '',
    phone: input.address.phone || '',
  };
  const shipping = {
    first_name: input.address.first_name,
    last_name: input.address.last_name,
    address_1: input.address.address_1,
    address_2: input.address.address_2 || '',
    city: input.address.city,
    state: input.address.state || '',
    postcode: input.address.postcode,
    country: input.address.country,
    phone: input.address.phone || '',
  };

  let order: WooCreatedOrder;
  try {
    order = await createWooOrder({
      payment_method: input.paymentMethod,
      payment_method_title: input.paymentMethod,
      set_paid: false,
      billing,
      shipping,
      line_items: input.cart.items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      shipping_lines: shippingLine ? [shippingLine] : [],
      customer_note: '',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('401') || message.includes('woocommerce_rest_cannot')) {
      throw new Error(
        'La clave REST de WooCommerce necesita permiso Read/Write para crear pedidos. En WP: WooCommerce → REST API → edita la clave → Read/Write.'
      );
    }
    throw error;
  }

  // Best-effort clear of the headless cart
  await clearStoreCart(input.cartToken).catch(() => undefined);

  const payUrl =
    order.payment_url || getWooOrderPayUrl(order.id, order.order_key);

  return { order, payUrl };
}
