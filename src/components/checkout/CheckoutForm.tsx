'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { startCheckout } from '@/app/actions/checkout';
import {
  CreditCardPreview,
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
} from '@/components/checkout/CreditCardPreview';

const shippingSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  firstName: z.string().min(1, { message: 'El nombre es requerido.' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido.' }),
  address: z.string().min(1, { message: 'La dirección es requerida.' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'La ciudad es requerida.' }),
  country: z.string().min(1, { message: 'El país es requerido.' }),
  postalCode: z.string().min(1, { message: 'El código postal es requerido.' }),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export function CheckoutForm() {
  const { cartItems } = useCart();
  const locale = useLocale();
  const t = useTranslations('Checkout');
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cvvFocused, setCvvFocused] = useState(false);

  const brand = detectCardBrand(cardNumber);
  const cvvMax = brand === 'amex' ? 4 : 3;

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      country: locale === 'en' ? 'Spain' : 'España',
      postalCode: '',
    },
  });

  async function onSubmit(data: ShippingFormValues) {
    setError(null);
    const result = await startCheckout({
      ...data,
      apartment: data.apartment || undefined,
      locale: locale === 'en' ? 'en' : 'es',
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    });

    if (result.error || !result.url) {
      setError(result.error ?? 'No se pudo iniciar el pago.');
      return;
    }

    window.location.href = result.url;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstName')}</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastName')}</FormLabel>
                <FormControl>
                  <Input placeholder="Tus apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('address')}</FormLabel>
              <FormControl>
                <Input placeholder="Calle, número, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('apartment')}</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Piso 3, Puerta A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('city')}</FormLabel>
                <FormControl>
                  <Input placeholder="Tu ciudad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('country')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('postalCode')}</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 28001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-6 space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-xl font-headline font-bold">{t('payment')}</h3>
            <p className="text-xs text-muted-foreground">{t('payDemo')}</p>
          </div>
          <CreditCardPreview
            number={cardNumber}
            holder={cardHolder}
            expiry={cardExpiry}
            cvv={cardCvv}
            flipped={cvvFocused}
          />
          <div className="space-y-3">
            <div>
              <label htmlFor="card-number" className="text-sm font-medium leading-none">
                {t('cardNumber')}
              </label>
              <Input
                id="card-number"
                className="mt-2"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="Número de tarjeta"
                value={formatCardNumber(cardNumber, brand)}
                onChange={(e) => {
                  const nextBrand = detectCardBrand(e.target.value);
                  setCardNumber(formatCardNumber(e.target.value, nextBrand));
                }}
              />
            </div>
            <div>
              <label htmlFor="card-holder" className="text-sm font-medium leading-none">
                {t('cardHolder')}
              </label>
              <Input
                id="card-holder"
                className="mt-2"
                autoComplete="cc-name"
                placeholder={t('cardHolderPlaceholder')}
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-expiry" className="text-sm font-medium leading-none">
                  {t('expiry')}
                </label>
                <Input
                  id="card-expiry"
                  className="mt-2"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="card-cvv" className="text-sm font-medium leading-none">
                  {t('cvv')}
                </label>
                <Input
                  id="card-cvv"
                  className="mt-2"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder={brand === 'amex' ? '1234' : '123'}
                  maxLength={cvvMax}
                  value={cardCvv}
                  onChange={(e) =>
                    setCardCvv(e.target.value.replace(/\D/g, '').slice(0, cvvMax))
                  }
                  onFocus={() => setCvvFocused(true)}
                  onBlur={() => setCvvFocused(false)}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{t('payNote')}</p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full mt-6" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('redirecting') : t('continueStripe')}
        </Button>
      </form>
    </Form>
  );
}
