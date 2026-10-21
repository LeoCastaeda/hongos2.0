import { getWooStoreBaseUrl } from './config';
import { WooCommerceError } from './client';

export type StoreAddress = {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
};

export type StoreCheckoutResult = {
  orderId: number;
  orderKey: string;
  status: string;
  redirectUrl: string | null;
  paymentStatus: string | null;
  cartToken: string | null;
};

type StoreFetchResult<T> = {
  data: T;
  cartToken: string | null;
};

async function storeFetch<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    cartToken?: string | null;
  } = {}
): Promise<StoreFetchResult<T>> {
  const baseUrl = getWooStoreBaseUrl();
  if (!baseUrl) {
    throw new WooCommerceError('WooCommerce Store API is not configured', 503);
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (options.cartToken) {
    headers['Cart-Token'] = options.cartToken;
  }

  const response = await fetch(`${baseUrl}/wp-json/wc/store/v1${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  const cartToken =
    response.headers.get('Cart-Token') ||
    response.headers.get('cart-token') ||
    options.cartToken ||
    null;

  const data = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    code?: string;
  };

  if (!response.ok) {
    throw new WooCommerceError(
      data.message || `Store checkout ${response.status}`,
      response.status
    );
  }

  return { data, cartToken };
}

export async function updateStoreCustomer(
  address: StoreAddress,
  cartToken?: string | null
) {
  const billing = {
    ...address,
    email: address.email || '',
    phone: address.phone || '',
  };
  const shipping = {
    first_name: address.first_name,
    last_name: address.last_name,
    company: address.company || '',
    address_1: address.address_1,
    address_2: address.address_2 || '',
    city: address.city,
    state: address.state || '',
    postcode: address.postcode,
    country: address.country,
    // Some WC setups (Square, etc.) require phone on shipping too
    phone: address.phone || '',
  };

  return storeFetch('/cart/update-customer', {
    method: 'POST',
    cartToken,
    body: {
      billing_address: billing,
      shipping_address: shipping,
    },
  });
}

type PaymentMethod = {
  name?: string;
  id?: string;
  title?: string;
};

const FALLBACK_METHODS = [
  'stripe',
  'woocommerce_payments',
  'square_credit_card',
  'ppcp-gateway',
  'paypal',
  'bacs',
  'cod',
  'cheque',
] as const;

/** Online gateways first; COD last. */
export function pickPreferredPaymentMethod(methods: string[]): string | null {
  const env = process.env.WC_PAYMENT_METHOD?.trim();
  if (env && methods.includes(env)) return env;
  if (env) return env;

  const online = [
    'stripe',
    'woocommerce_payments',
    'square_credit_card',
    'ppcp-gateway',
    'paypal',
    'sumup',
    'bacs',
    'cheque',
  ];
  for (const id of online) {
    if (methods.includes(id)) return id;
  }
  return methods.find((m) => m !== 'cod') || methods[0] || null;
}

function normalizeMethodIds(
  methods: PaymentMethod[] | string[] | undefined
): string[] {
  return (methods ?? [])
    .map((method) =>
      typeof method === 'string' ? method : method.id || method.name || ''
    )
    .filter(Boolean);
}

function preferredOrder(ids: string[]): string[] {
  const env = process.env.WC_PAYMENT_METHOD?.trim();
  const unique = [...new Set(ids.filter(Boolean))];
  if (!env) return unique;
  return [env, ...unique.filter((id) => id !== env)];
}

export async function getStorePaymentMethods(cartToken?: string | null) {
  let token = cartToken ?? null;
  let storeIds: string[] = [];

  try {
    const { data, cartToken: nextToken } = await storeFetch<{
      payment_methods?: PaymentMethod[] | string[];
    }>('/checkout', { cartToken });
    token = nextToken ?? token;
    storeIds = normalizeMethodIds(data.payment_methods);
  } catch {
    // Store checkout GET can fail without a ready cart; keep going.
  }

  if (storeIds.length) {
    return { methods: preferredOrder(storeIds), cartToken: token };
  }

  // Store API often returns [] for classic-only gateways — use REST list.
  try {
    const { fetchEnabledPaymentGateways } = await import('./client');
    const restIds = await fetchEnabledPaymentGateways();
    if (restIds.length) {
      return { methods: preferredOrder(restIds), cartToken: token };
    }
  } catch {
    // Missing REST permissions or API error.
  }

  return {
    methods: preferredOrder([
      process.env.WC_PAYMENT_METHOD?.trim() || '',
      ...FALLBACK_METHODS,
    ]),
    cartToken: token,
  };
}

export async function processStoreCheckout(input: {
  billing: StoreAddress;
  shipping: StoreAddress;
  paymentMethod: string;
  cartToken?: string | null;
  customerNote?: string;
}): Promise<StoreCheckoutResult> {
  const { data, cartToken } = await storeFetch<{
    order_id: number;
    order_key: string;
    status: string;
    payment_result?: {
      payment_status?: string;
      redirect_url?: string;
    } | null;
  }>('/checkout', {
    method: 'POST',
    cartToken: input.cartToken,
    body: {
      billing_address: {
        ...input.billing,
        email: input.billing.email || '',
        phone: input.billing.phone || '',
      },
      shipping_address: {
        first_name: input.shipping.first_name,
        last_name: input.shipping.last_name,
        company: input.shipping.company || '',
        address_1: input.shipping.address_1,
        address_2: input.shipping.address_2 || '',
        city: input.shipping.city,
        state: input.shipping.state || '',
        postcode: input.shipping.postcode,
        country: input.shipping.country,
        phone: input.shipping.phone || '',
      },
      customer_note: input.customerNote || '',
      payment_method: input.paymentMethod,
      payment_data: [],
    },
  });

  return {
    orderId: data.order_id,
    orderKey: data.order_key,
    status: data.status,
    redirectUrl: data.payment_result?.redirect_url || null,
    paymentStatus: data.payment_result?.payment_status || null,
    cartToken,
  };
}

export function toCountryCode(country: string): string {
  const value = country.trim().toLowerCase();
  if (value === 'españa' || value === 'spain' || value === 'es') return 'ES';
  if (value === 'italia' || value === 'italy' || value === 'it') return 'IT';
  if (value === 'portugal' || value === 'pt') return 'PT';
  if (value === 'france' || value === 'francia' || value === 'fr') return 'FR';
  if (value.length === 2) return value.toUpperCase();
  return 'ES';
}
