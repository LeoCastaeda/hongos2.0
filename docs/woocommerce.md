# Conexión WooCommerce

## Fase actual (preparada en código)

- Cliente REST `wc/v3`
- Mapper a `Product`
- Catálogo con fallback local
- Health check: `GET /api/woocommerce/health`
- Home, colecciones y PDP usan `getCatalogProducts` / `getCatalogProductBySlug`

## Cómo activarlo

1. WP Admin → WooCommerce → Ajustes → Avanzado → REST API → Añadir clave (Read).
2. Copia `.env.example` → `.env` y rellena:

```env
WC_BASE_URL=https://bouletmushrooms.com
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
```

3. Reinicia `npm run dev`.
4. Abre `/api/woocommerce/health` → debe devolver `"ok": true`.

## Catálogo real (bouletmushrooms.com)

| WC ID | Producto | SKU | Precio | Slug Next (local) |
|------:|----------|-----|-------:|-------------------|
| 867 | Chaga Double Extract 30ml | — | €27 | `chaga-tincture` |
| 785 | Tremella Double Extract 30ml | TF-0001-112024 | €27 | `tremella-tincture` |
| 753 | Cordyceps double extract 30ml | CM-0003-122024 | €27 | `cordyceps-tincture` |
| 553 | Wellness Bundle | — | €76 | `3-product-bundle` |
| 475 | Lion’s Mane Double Extract 30ml | LM-0001-112023 | €27 | `lions-mane-tincture` |
| 154 | Reishi double extract 30ml | GL-0001-112023 | €27 | `reishi-tincture` |

Mapeo en código: `src/lib/woocommerce/catalog-map.ts`.

Los slugs WC (`chaga-double-extract-30ml`, …) se resuelven al slug local para rutas Next e i18n. Beneficios / hábitat / FAQ salen de `data.tsx` + `messages`.

## Carrito (Store API) — activo

Proxy Next.js (lee/escribe `Cart-Token` en cookie httpOnly):

- `GET /api/cart`
- `POST /api/cart/add` `{ productId, quantity }`
- `POST /api/cart/update` `{ key, quantity }`
- `POST /api/cart/remove` `{ key }`

El `CartContext` usa estos endpoints cuando WC está configurado.

## Checkout (Store API) — activo

- UI sin demo de tarjeta Stripe
- `POST /api/checkout` → `update-customer` + `POST /wc/store/v1/checkout`
- Redirección al `payment_result.redirect_url` del gateway de WC
- Opcional: `WC_PAYMENT_METHOD=stripe` (u otro id) en `.env`

## Próximas fases

1. Refinar gateways / IVA / envíos según config WC
2. Retirar código Stripe demo si ya no se usa

## Publicación

- Preview: Vercel + subdominio `nueva.bouletmushrooms.com`
- WP/WC sigue en el dominio actual hasta el cutover
- Variables `WC_*` también en el proyecto de Vercel
