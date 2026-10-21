# WordPress: checkout limpio + vuelta a Next

La web antigua (`bouletmushrooms.com`) **sigue funcionando**. Los cambios de abajo no deben tocar su thank-you ni el checkout “normal”.

Storefront Next: `https://hongos2-0.vercel.app`

---

## Qué hacer ahora (seguro para la web antigua)

### Opción A — No tocar WP todavía

No hace falta pegar nada. Next sigue creando el pedido y abre `order-pay` en WP. La web antigua no cambia.

### Opción B — Solo thank-you para pedidos Next (recomendado)

Los pedidos del storefront Next llevan meta `_boulet_storefront = next`.  
Los de la tienda antigua **no** — su página de gracias sigue igual.

1. Plugin **Code Snippets** → Add New  
2. Título: `Boulet Next thank-you only`  
3. Pega y **Activa**:

```php
add_filter('allowed_redirect_hosts', function ($hosts) {
  $hosts[] = 'hongos2-0.vercel.app';
  return $hosts;
});

add_action('template_redirect', function () {
  if (!function_exists('is_wc_endpoint_url') || !is_wc_endpoint_url('order-received')) {
    return;
  }

  $order_id = absint(get_query_var('order-received'));
  if (!$order_id) {
    return;
  }

  $order = wc_get_order($order_id);
  if (!$order) {
    return;
  }

  // Solo pedidos creados desde el storefront Next
  if ($order->get_meta('_boulet_storefront') !== 'next') {
    return;
  }

  $url = sprintf(
    'https://hongos2-0.vercel.app/es/checkout/success?order_id=%d&key=%s',
    $order_id,
    rawurlencode($order->get_order_key())
  );

  wp_safe_redirect($url, 302);
  exit;
});
```

**Importante:** este meta se añade al crear el pedido desde Next. Si aún no has desplegado ese cambio, haz push/redeploy primero; si no, el redirect no se disparará (y la antigua sigue bien).

---

## CSS (opcional — afecta a todos los checkouts WP)

Oculta cabecera/pie en **cualquier** checkout/order-pay de WP (también el de la web antigua).  
Si quieres que la tienda antigua se vea igual que siempre, **no lo pegues**.

Solo si te da igual un checkout WP más minimal:

**Apariencia → Personalizar → CSS adicional**

```css
body.woocommerce-checkout .site-header,
body.woocommerce-checkout .main-navigation,
body.woocommerce-checkout .site-footer,
body.woocommerce-order-pay .site-header,
body.woocommerce-order-pay .main-navigation,
body.woocommerce-order-pay .site-footer,
body.woocommerce-order-received .site-header,
body.woocommerce-order-received .main-navigation,
body.woocommerce-order-received .site-footer {
  display: none !important;
}
```

---

## Square embed en Next

Eso es solo en Vercel (`NEXT_PUBLIC_SQUARE_*`). **No cambia** la web antigua.

---

## Resumen

| Cambio | ¿Rompe la web antigua? |
|--------|-------------------------|
| No tocar WP | No |
| Snippet thank-you **condicional** (`_boulet_storefront`) | No |
| Thank-you a Next **sin** condición | **Sí** — no lo uses |
| CSS checkout global | Solo cambia aspecto del checkout WP |
| Claves Square en Vercel | No |
