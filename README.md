# Bouletmushrooms

Bouletmushrooms es un storefront moderno construido con Next.js 15 para una marca de suplementos a base de hongos funcionales. El proyecto combina contenidos educativos, un cuestionario guiado y un checkout que guarda el pedido en PostgreSQL y cobra con Stripe.

## 🚀 Características principales

- **Landing page orientada a conversión.** Componentes como el hero con CTA dual, la sección "Comprar por beneficio" y el bloque educativo permiten presentar la propuesta de valor y dirigir al usuario a las colecciones relevantes.【F:src/components/home/Hero.tsx†L1-L38】【F:src/components/home/ShopByBenefit.tsx†L1-L37】【F:src/components/home/EducationalBlock.tsx†L1-L47】
- **Catálogo y colecciones dinámicas.** Las colecciones permiten navegar por tipo de producto o por beneficio, reutilizando las tarjetas de producto y datos estáticos centralizados.【F:src/app/(main)/collections/[slug]/page.tsx†L1-L68】【F:src/components/products/ProductCard.tsx†L1-L47】【F:src/lib/data.tsx†L45-L175】
- **Ficha de producto con upsell.** Cada PDP muestra dosis, resultados de laboratorio, preguntas frecuentes, reseñas y un stack recomendado utilizando componentes reutilizables y datos estructurados.【F:src/app/(main)/products/[slug]/page.tsx†L1-L52】【F:src/components/products/ProductDetails.tsx†L1-L112】
- **Carrito persistente en el cliente.** El `CartContext` gestiona los artículos con almacenamiento en `localStorage`, notificaciones y un panel lateral responsive para revisar el pedido.【F:src/context/CartContext.tsx†L1-L87】【F:src/components/cart/CartSheet.tsx†L1-L70】
- **Checkout con pedido y pago.** El formulario de envío crea un pedido en PostgreSQL y redirige a Stripe Checkout. El precio se calcula en el servidor a partir del catálogo.
- **Quiz para recomendaciones personalizadas.** Un formulario paso a paso calcula el beneficio prioritario y sugiere productos o packs compatibles con un CTA de suscripción.【F:src/components/quiz/QuizForm.tsx†L1-L99】
- **Contenido educativo y storytelling.** Se incluyen páginas informativas y secciones dedicadas a la historia de la marca y su compromiso con la sostenibilidad.【F:src/app/(main)/about/page.tsx†L1-L104】【F:src/app/(main)/learn/page.tsx†L1-L42】

## 🧱 Pila tecnológica

- [Next.js 15](https://nextjs.org/) con la App Router y soporte para Turbopack en desarrollo.
- [React 18](https://react.dev/) y componentes UI basados en [shadcn/ui](https://ui.shadcn.com/).
- [Tailwind CSS](https://tailwindcss.com/) para estilos utilitarios y animaciones sutiles.
- [Prisma](https://www.prisma.io/) y PostgreSQL para suscriptores y pedidos.
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) para el cobro.

## 📁 Organización del código

- `src/app/(main)`: rutas públicas (home, colecciones, quiz, páginas informativas).
- `src/components`: UI compartida, cart, layout y bloques específicos de la landing.
- `src/context/CartContext.tsx`: estado global del carrito con persistencia local.
- `src/lib/data.tsx`: catálogo, beneficios, reseñas y preguntas del quiz centralizados en TypeScript.【F:src/lib/data.tsx†L1-L206】
- `src/lib/placeholder-images.(json|ts)`: enlaces a imágenes temporales y pistas para generación AI.【F:src/lib/placeholder-images.ts†L1-L9】【F:src/lib/placeholder-images.json†L1-L73】
- `src/app/actions/checkout.ts`: crea el pedido y la sesión de Stripe.
- `prisma/schema.prisma`: modelos `Subscriber`, `Order` y `OrderItem`.

## ⚙️ Requisitos previos

- Node.js 18+ (Next.js 15 requiere `node >= 18.17`).
- npm (incluido con Node) o tu gestor favorito.
- PostgreSQL y una cuenta de Stripe en modo test para cobrar pedidos.

## 🧑‍💻 Puesta en marcha

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Lanza el servidor de desarrollo (puerto `9002`):
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:9002` en tu navegador.

Para construir una versión optimizada:
```bash
npm run build
npm start
```

## 🔐 Base de datos, pago y WooCommerce

Copia `.env.example` a `.env` y rellena:

- `DATABASE_URL`: conexión a PostgreSQL.
- `STRIPE_SECRET_KEY`: clave secreta de test (`sk_test_...`) — checkout demo actual.
- `STRIPE_WEBHOOK_SECRET`: secreto del endpoint `checkout.session.completed` apuntando a `/api/stripe/webhook`.
- `NEXT_PUBLIC_APP_URL`: origen público, en local `http://localhost:9003`.
- `WC_BASE_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`: API REST de WooCommerce (opcional).

### WooCommerce (catálogo headless)

Si las variables `WC_*` están definidas, home / colecciones / PDP cargan productos desde WooCommerce.  
Si faltan o la API falla, se usa el catálogo local en `src/lib/data.tsx`.

1. En WordPress: **WooCommerce → Ajustes → Avanzado → REST API → Añadir clave** (lectura).
2. Pon la URL del sitio (ej. `https://bouletmushrooms.com`) y las claves en `.env`.
3. Comprueba la conexión:

```bash
curl http://localhost:9003/api/woocommerce/health
```

Código relevante: `src/lib/woocommerce/`.

Después de cambiar el schema Prisma:

```bash
npx prisma migrate dev
```

## 🛠️ Scripts disponibles

- `npm run dev`: servidor Next.js con Turbopack.
- `npm run build`: compilación para producción.
- `npm run start`: arranca el servidor construido.
- `npm run lint`: ejecuta `next lint`.
- `npm run typecheck`: verificación de tipos sin emisión.

## 🎯 Personalización rápida

- Actualiza textos, precios y beneficios en `src/lib/data.tsx` para reflejar tu catálogo real.【F:src/lib/data.tsx†L45-L175】
- Sustituye las imágenes de `placeholder-images.json` por tus activos finales o URLs desde tu CDN.【F:src/lib/placeholder-images.json†L1-L73】
- Ajusta la paleta de colores y tipografías en `tailwind.config.ts` y `src/app/globals.css`.
- Revisa `docs/blueprint.md` para entender la visión de producto original y extender funcionalidades.【F:docs/blueprint.md†L1-L18】

## ✅ Estado actual

- Catálogo: WooCommerce si hay `WC_*`, si no `src/lib/data.tsx`.
- Carrito: `localStorage` (aún no Store API de WC).
- Checkout demo: PostgreSQL + Stripe (fase posterior: pedidos en WooCommerce).

---

¿Necesitas profundizar en una sección específica? Abre un issue o extiende la documentación dentro de `docs/`.
