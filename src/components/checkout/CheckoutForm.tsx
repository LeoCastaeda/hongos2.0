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
  const { cartItems, cartMode, clearCart } = useCart();
  const locale = useLocale();
  const t = useTranslations('Checkout');
  const [error, setError] = useState<string | null>(null);

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

    if (cartItems.length === 0) {
      setError(t('emptyCart'));
      return;
    }

    if (cartMode !== 'woocommerce') {
      setError(t('wooRequired'));
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          apartment: data.apartment || undefined,
          locale: locale === 'en' ? 'en' : 'es',
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        url?: string;
      };

      if (!response.ok || result.error || !result.url) {
        setError(result.error ?? t('checkoutError'));
        return;
      }

      // Clear local view; WC cart is consumed by the order
      await clearCart().catch(() => undefined);
      window.location.href = result.url;
    } catch {
      setError(t('checkoutError'));
    }
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

        <div className="pt-4 space-y-2">
          <h3 className="text-xl font-headline font-bold">{t('payment')}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('payNote')}
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? t('redirecting') : t('continuePay')}
        </Button>
      </form>
    </Form>
  );
}
