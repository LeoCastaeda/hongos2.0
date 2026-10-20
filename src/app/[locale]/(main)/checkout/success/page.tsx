import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ClearCart } from '@/components/checkout/ClearCart';
import { Button } from '@/components/ui/button';
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
    title: 'Pedido recibido',
    description: 'Confirmación de pedido.',
    noIndex: true,
  });
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; key?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.order_id;
  const hasOrder = Boolean(orderId);

  return (
    <div className="container mx-auto max-w-lg px-4 py-20 text-center">
      {hasOrder ? (
        <>
          <ClearCart />
          <h1 className="text-3xl font-headline font-bold mb-4">Pedido recibido</h1>
          <p className="text-muted-foreground mb-2">
            Tu pedido #{orderId} se ha creado en WooCommerce.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Recibirás la confirmación y el estado del pago según el método
            configurado en la tienda.
          </p>
        </>
      ) : (
        <>
          <ClearCart />
          <h1 className="text-3xl font-headline font-bold mb-4">Gracias por tu compra</h1>
          <p className="text-muted-foreground mb-8">
            Si has completado el pago, el pedido aparecerá en WooCommerce en unos
            momentos.
          </p>
        </>
      )}
      <Button asChild>
        <Link href="/">Volver a la tienda</Link>
      </Button>
    </div>
  );
}
