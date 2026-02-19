# Bouletmushrooms

Bouletmushrooms es un storefront moderno construido con Next.js 15 para una marca de suplementos a base de hongos funcionales. El proyecto combina contenidos educativos, un cuestionario guiado y una experiencia de compra completa con autenticación en Firebase.

## 🚀 Características principales

- **Landing page orientada a conversión.** Componentes como el hero con CTA dual, la sección "Comprar por beneficio" y el bloque educativo permiten presentar la propuesta de valor y dirigir al usuario a las colecciones relevantes.【F:src/components/home/Hero.tsx†L1-L38】【F:src/components/home/ShopByBenefit.tsx†L1-L37】【F:src/components/home/EducationalBlock.tsx†L1-L47】
- **Catálogo y colecciones dinámicas.** Las colecciones permiten navegar por tipo de producto o por beneficio, reutilizando las tarjetas de producto y datos estáticos centralizados.【F:src/app/(main)/collections/[slug]/page.tsx†L1-L68】【F:src/components/products/ProductCard.tsx†L1-L47】【F:src/lib/data.tsx†L45-L175】
- **Ficha de producto con upsell.** Cada PDP muestra dosis, resultados de laboratorio, preguntas frecuentes, reseñas y un stack recomendado utilizando componentes reutilizables y datos estructurados.【F:src/app/(main)/products/[slug]/page.tsx†L1-L52】【F:src/components/products/ProductDetails.tsx†L1-L112】
- **Carrito persistente en el cliente.** El `CartContext` gestiona los artículos con almacenamiento en `localStorage`, notificaciones y un panel lateral responsive para revisar el pedido.【F:src/context/CartContext.tsx†L1-L87】【F:src/components/cart/CartSheet.tsx†L1-L70】
- **Autenticación con Google y perfil básico.** El proyecto expone login con Google, escucha el estado del usuario vía `FirebaseProvider` y muestra un panel de perfil con cierre de sesión.【F:src/app/login/page.tsx†L1-L62】【F:src/firebase/provider.tsx†L1-L160】【F:src/app/profile/page.tsx†L1-L63】
- **Quiz para recomendaciones personalizadas.** Un formulario paso a paso calcula el beneficio prioritario y sugiere productos o packs compatibles con un CTA de suscripción.【F:src/components/quiz/QuizForm.tsx†L1-L99】
- **Contenido educativo y storytelling.** Se incluyen páginas informativas y secciones dedicadas a la historia de la marca y su compromiso con la sostenibilidad.【F:src/app/(main)/about/page.tsx†L1-L104】【F:src/app/(main)/learn/page.tsx†L1-L42】

## 🧱 Pila tecnológica

- [Next.js 15](https://nextjs.org/) con la App Router y soporte para Turbopack en desarrollo.
- [React 18](https://react.dev/) y componentes UI basados en [shadcn/ui](https://ui.shadcn.com/).
- [Tailwind CSS](https://tailwindcss.com/) para estilos utilitarios y animaciones sutiles.
- [Firebase](https://firebase.google.com/) (Auth + Firestore) inicializado con `initializeApp` compatible con Firebase App Hosting.【F:src/firebase/index.ts†L1-L41】
- [Genkit](https://firebase.google.com/docs/genkit) preparado para futuras integraciones AI mediante Gemini Flash.【F:src/ai/genkit.ts†L1-L7】

## 📁 Organización del código

- `src/app/(main)`: rutas públicas (home, colecciones, quiz, páginas informativas).
- `src/app/login` y `src/app/profile`: flujo de autenticación y perfil de usuario.
- `src/components`: UI compartida, cart, layout y bloques específicos de la landing.
- `src/context/CartContext.tsx`: estado global del carrito con persistencia local.
- `src/lib/data.tsx`: catálogo, beneficios, reseñas y preguntas del quiz centralizados en TypeScript.【F:src/lib/data.tsx†L1-L206】
- `src/lib/placeholder-images.(json|ts)`: enlaces a imágenes temporales y pistas para generación AI.【F:src/lib/placeholder-images.ts†L1-L9】【F:src/lib/placeholder-images.json†L1-L73】
- `src/firebase`: inicialización cliente, provider con hooks y utilidades comunes para Firestore/Auth.【F:src/firebase/provider.tsx†L1-L160】【F:src/firebase/index.ts†L1-L41】

## ⚙️ Requisitos previos

- Node.js 18+ (Next.js 15 requiere `node >= 18.17`).
- npm (incluido con Node) o tu gestor favorito.
- Una cuenta de Firebase con proyecto configurado si deseas conectar servicios reales.

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

## 🔐 Configuración de Firebase

El archivo `src/firebase/config.ts` incluye credenciales de ejemplo. Sustitúyelas por las variables de tu proyecto o confía en las variables inyectadas por Firebase App Hosting en producción.【F:src/firebase/config.ts†L1-L7】【F:src/firebase/index.ts†L5-L38】

Si utilizas variables de entorno en local, crea un `.env.local` en la raíz con los valores estándar de Firebase (`NEXT_PUBLIC_FIREBASE_API_KEY`, etc.) y adapta `firebaseConfig` según corresponda.

## 🤖 Configuración del Chat con IA

El asistente virtual del chat utiliza [Genkit](https://firebase.google.com/docs/genkit) con Google AI (Gemini 2.5 Flash). Para habilitar esta funcionalidad:

1. Obtén una API key de Google AI desde [Google AI Studio](https://makersuite.google.com/app/apikey).
2. Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Edita `.env.local` y reemplaza `your_google_ai_api_key_here` con tu API key real:
   ```
   GOOGLE_GENAI_API_KEY=tu_api_key_aqui
   ```
4. Reinicia el servidor de desarrollo para que Next.js cargue las nuevas variables de entorno.

> **Nota**: El archivo `.env.local` está en `.gitignore` y no se subirá al repositorio.

## 🛠️ Scripts disponibles

- `npm run dev`: servidor Next.js con Turbopack.
- `npm run build`: compilación para producción.
- `npm run start`: arranca el servidor construido.
- `npm run lint`: ejecuta `next lint`.
- `npm run typecheck`: verificación de tipos sin emisión.
- `npm run genkit:dev`: inicia el entorno de Genkit ejecutando `src/ai/dev.ts`.

## 🎯 Personalización rápida

- Actualiza textos, precios y beneficios en `src/lib/data.tsx` para reflejar tu catálogo real.【F:src/lib/data.tsx†L45-L175】
- Sustituye las imágenes de `placeholder-images.json` por tus activos finales o URLs desde tu CDN.【F:src/lib/placeholder-images.json†L1-L73】
- Ajusta la paleta de colores y tipografías en `tailwind.config.ts` y `src/app/globals.css`.
- Revisa `docs/blueprint.md` para entender la visión de producto original y extender funcionalidades.【F:docs/blueprint.md†L1-L18】

## ✅ Estado actual

El proyecto incluye datos mock y lógica de UI completa, pero no hay integración de pago ni sincronización real del carrito con Firestore. Usa este repositorio como punto de partida para conectar tus servicios (checkout, inventario, newsletters, etc.).

---

¿Necesitas profundizar en una sección específica? Abre un issue o extiende la documentación dentro de `docs/`.
