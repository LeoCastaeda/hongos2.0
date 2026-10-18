import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

export async function markOrderPaid(orderId: string, stripeSessionId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return null;
  if (order.stripeSessionId && order.stripeSessionId !== stripeSessionId) {
    return null;
  }
  if (order.status === 'PAID') return order;

  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'PAID',
      stripeSessionId,
    },
  });
}

export async function confirmPaidSession(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const orderId = session.metadata?.orderId;
  if (!orderId || session.payment_status !== 'paid') {
    return null;
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order || session.amount_total !== order.totalCents) {
    return null;
  }

  const paid = await markOrderPaid(order.id, session.id);
  if (!paid) return null;

  return prisma.order.findUnique({
    where: { id: order.id },
    include: { items: true },
  });
}
