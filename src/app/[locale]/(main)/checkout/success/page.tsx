import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ClearCart } from '@/components/checkout/ClearCart';
import { Button } from '@/components/ui/button';
import { confirmPaidSession } from '@/lib/orders';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: '/checkout/success',
    title: 'Pago confirmado',
    description: 'Confirmación de pedido.',
    noIndex: true,
  });
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const order = sessionId ? await confirmPaidSession(sessionId).catch(() => null) : null;

  return (
    <div className="container mx-auto max-w-lg px-4 py-20 text-center">
      {order ? (
        <>
          <ClearCart />
          <h1 className="text-3xl font-headline font-bold mb-4">Pago confirmado</h1>
          <p className="text-muted-foreground mb-2">
            Hemos registrado tu pedido para {order.email}.
          </p>
          <p className="font-medium mb-8">
            Total: {(order.totalCents / 100).toFixed(2)}€
          </p>
          <ul className="mb-8 space-y-2 text-left">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{((item.unitPriceCents * item.quantity) / 100).toFixed(2)}€</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-headline font-bold mb-4">No hemos podido confirmar el pago</h1>
          <p className="text-muted-foreground mb-8">
            Si el cargo se ha realizado, el pedido quedará marcado en cuanto Stripe nos avise.
          </p>
        </>
      )}
      <Button asChild>
        <Link href="/">Volver a la tienda</Link>
      </Button>
    </div>
  );
}
