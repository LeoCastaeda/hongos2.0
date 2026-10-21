# Conexión WooCommerce

## Checklist Vercel (Production) — hacer YA

Sin esto el storefront cae a catálogo/carrito **local**.

1. Vercel → proyecto → **Settings → Environment Variables**
2. En **Production** (y Preview si quieres):

| Key | Valor |
|-----|--------|
| `WC_BASE_URL` | `https://bouletmushrooms.com` |
| `WC_CONSUMER_KEY` | `ck_…` (mismo que `.env` local) |
| `WC_CONSUMER_SECRET` | `cs_…` |
| `WC_PAYMENT_METHOD` | `square_credit_card` |
| `NEXT_PUBLIC_APP_URL` | `https://hongos2-0.vercel.app` |
| `NEXT_PUBLIC_SQUARE_APPLICATION_ID` | (opcional) embed tarjeta en Next |
| `NEXT_PUBLIC_SQUARE_LOCATION_ID` | (opcional) Location ID Square |

3. **Deployments → ⋯ → Redeploy**
4. Comprueba: `/api/woocommerce/health`  
   - Debe: `"configured": true`, `"ok": true`  
   - Si falla: mira el array `missing` (nombres de vars, sin secretos)

5. Prueba compra: producto → carrito → checkout (ES o IT) → Square

## Fases

### Hecho

- **Fase 1** Catálogo REST + fallback local + `catalog-map`
- **Fase 2** Carrito Store API, checkout WC, envío, teléfono, ES/IT
- **GEO** `llms.txt`, robots IA, JSON-LD

### En curso / pendiente

1. Estabilizar `WC_*` en Vercel (arriba)
2. Validar pago Square headless (redirect o SDK si hace falta)
3. Cupones / selector multi-tarifa de envío
4. Retirar código Stripe legacy (`src/lib/stripe.ts`, webhook, `CreditCardPreview`)
5. Cutover DNS: `bouletmushrooms.com` → Next; WP en subdominio

## Catálogo real (bouletmushrooms.com)

| WC ID | Producto | Precio | Slug Next |
|------:|----------|-------:|-----------|
| 867 | Chaga | €27 | `chaga-tincture` |
| 785 | Tremella | €27 | `tremella-tincture` |
| 753 | Cordyceps | €27 | `cordyceps-tincture` |
| 553 | Wellness Bundle | €76 | `3-product-bundle` |
| 475 | Lion’s Mane | €27 | `lions-mane-tincture` |
| 154 | Reishi | €27 | `reishi-tincture` |

Mapeo: `src/lib/woocommerce/catalog-map.ts`.

## APIs

- `GET /api/woocommerce/health`
- `GET|POST /api/cart`, `/api/cart/add|update|remove|address`
- `POST /api/checkout`
- `GET /llms.txt`, `/llms-full.txt`

## Gateways

En WP activos típicos: `square_credit_card`, `cod`.  
Forzar en env: `WC_PAYMENT_METHOD=square_credit_card`.

### Square (headless)

#### Sin `NEXT_PUBLIC_SQUARE_*` (por defecto)

1. Pedido **pendiente** vía REST (`/wc/v3/orders`) — clave **Read/Write**
2. Página puente Next (`/checkout/pay`) con marca Boulet
3. Pasarela WP `…/checkout/order-pay/…` (formulario Square)

Suavizar WP: ver **[wp-checkout.md](./wp-checkout.md)** (CSS + thank-you → Next).

#### Con Square embed (`NEXT_PUBLIC_SQUARE_APPLICATION_ID` + `LOCATION_ID`)

1. [Square Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview) en el checkout Next
2. Token → Store API `payment_data` (`wc-square-credit-card-payment-nonce`, etc.)
3. Éxito → `/checkout/success` sin salir del storefront

**Cobra en production** si las keys son live. Usa sandbox (`sandbox-sq0idb-…`) para pruebas.
