'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { products } from '@/lib/data';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  apartment: z.string().optional(),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  locale: z.enum(['es', 'en']),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive().max(20),
      })
    )
    .min(1),
});

function eurosToCents(price: number) {
  return Math.round(price * 100);
}

async function appOrigin() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  const headerList = await headers();
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host');
  const proto = headerList.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

export async function startCheckout(input: unknown) {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Revisa los datos de envío.' };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return { error: 'El pago no está configurado. Falta STRIPE_SECRET_KEY.' };
  }

  const lines = parsed.data.items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return null;
    return { product, quantity: item.quantity };
  });

  if (lines.some((line) => line === null)) {
    return { error: 'Hay un producto que ya no está disponible.' };
  }

  const resolved = lines.filter((line): line is NonNullable<typeof line> => line !== null);
  const totalCents = resolved.reduce(
    (sum, line) => sum + eurosToCents(line.product.price) * line.quantity,
    0
  );

  try {
    const order = await prisma.order.create({
      data: {
        email: parsed.data.email,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        address: parsed.data.address,
        apartment: parsed.data.apartment || null,
        city: parsed.data.city,
        country: parsed.data.country,
        postalCode: parsed.data.postalCode,
        totalCents,
        currency: 'eur',
        items: {
          create: resolved.map((line) => ({
            productId: line.product.id,
            name: line.product.name,
            quantity: line.quantity,
            unitPriceCents: eurosToCents(line.product.price),
          })),
        },
      },
    });

    const origin = await appOrigin();
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: parsed.data.email,
      client_reference_id: order.id,
      metadata: { orderId: order.id },
      line_items: resolved.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: 'eur',
          unit_amount: eurosToCents(line.product.price),
          product_data: { name: line.product.name },
        },
      })),
      success_url: `${origin}/${parsed.data.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${parsed.data.locale}/checkout?cancelled=1`,
    });

    if (!session.url) {
      return { error: 'Stripe no devolvió la página de pago.' };
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error al iniciar el checkout:', error);
    return { error: 'No se pudo crear el pedido. Inténtalo de nuevo.' };
  }
}
