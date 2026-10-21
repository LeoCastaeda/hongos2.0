import { Suspense } from 'react';
import { CheckoutPayBridge } from '@/components/checkout/CheckoutPayBridge';

export default function CheckoutPayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] bg-[#0A0A0A] text-white flex items-center justify-center">
          <p className="text-white/60">…</p>
        </div>
      }
    >
      <CheckoutPayBridge />
    </Suspense>
  );
}
