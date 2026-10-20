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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { SPAIN_PROVINCES } from '@/lib/woocommerce/spain-provinces';
import {
  PHONE_COUNTRY_CODES,
  buildInternationalPhone,
} from '@/lib/phone-country-codes';

const shippingSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  phoneDialCode: z.string().min(2, { message: 'Código de país requerido.' }),
  phoneNumber: z
    .string()
    .min(6, { message: 'El teléfono es requerido.' })
    .regex(/^[\d\s\-().]+$/, { message: 'Solo números en el teléfono.' }),
  firstName: z.string().min(1, { message: 'El nombre es requerido.' }),
  lastName: z.string().min(1, { message: 'El apellido es requerido.' }),
  address: z.string().min(1, { message: 'La dirección es requerida.' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'La ciudad es requerida.' }),
  province: z.string().min(1, { message: 'La provincia es requerida.' }),
  country: z.string().min(1, { message: 'El país es requerido.' }),
  postalCode: z.string().min(1, { message: 'El código postal es requerido.' }),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

function toFullPhone(data: Pick<ShippingFormValues, 'phoneDialCode' | 'phoneNumber'>) {
  return buildInternationalPhone(data.phoneDialCode, data.phoneNumber);
}

export function CheckoutForm() {
  const {
    cartItems,
    cartMode,
    clearCart,
    updateShippingAddress,
  } = useCart();
  const locale = useLocale();
  const t = useTranslations('Checkout');
  const [error, setError] = useState<string | null>(null);
  const lastAddressKey = useRef('');

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: '',
      phoneDialCode: '+34',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      country: locale === 'en' ? 'Spain' : 'España',
      postalCode: '',
    },
  });

  const watchedCity = form.watch('city');
  const watchedCountry = form.watch('country');
  const watchedPostalCode = form.watch('postalCode');
  const watchedAddress = form.watch('address');
  const watchedEmail = form.watch('email');
  const watchedPhoneDialCode = form.watch('phoneDialCode');
  const watchedPhoneNumber = form.watch('phoneNumber');
  const watchedFirstName = form.watch('firstName');
  const watchedLastName = form.watch('lastName');
  const watchedApartment = form.watch('apartment');
  const watchedProvince = form.watch('province');

  useEffect(() => {
    if (cartMode !== 'woocommerce') return;
    if (
      !watchedCity?.trim() ||
      !watchedCountry?.trim() ||
      !watchedPostalCode?.trim() ||
      !watchedProvince?.trim()
    ) {
      return;
    }

    const phone = buildInternationalPhone(
      watchedPhoneDialCode || '+34',
      watchedPhoneNumber || ''
    );

    const key = [
      watchedEmail,
      phone,
      watchedFirstName,
      watchedLastName,
      watchedAddress,
      watchedApartment,
      watchedCity,
      watchedProvince,
      watchedCountry,
      watchedPostalCode,
    ].join('|');

    if (key === lastAddressKey.current) return;

    const timer = window.setTimeout(() => {
      lastAddressKey.current = key;
      void updateShippingAddress({
        email: watchedEmail || undefined,
        phone: phone || undefined,
        firstName: watchedFirstName || undefined,
        lastName: watchedLastName || undefined,
        address: watchedAddress || undefined,
        apartment: watchedApartment || undefined,
        city: watchedCity.trim(),
        province: watchedProvince.trim(),
        country: watchedCountry.trim(),
        postalCode: watchedPostalCode.trim(),
      }).catch((err) => {
        console.error('[checkout] shipping calc failed', err);
      });
    }, 600);

    return () => window.clearTimeout(timer);
  }, [
    cartMode,
    updateShippingAddress,
    watchedAddress,
    watchedApartment,
    watchedCity,
    watchedCountry,
    watchedEmail,
    watchedFirstName,
    watchedLastName,
    watchedPhoneDialCode,
    watchedPhoneNumber,
    watchedPostalCode,
    watchedProvince,
  ]);

  async function onSubmit(data: ShippingFormValues) {
    setError(null);

    if (cartItems.length === 0) {
      setError(t('emptyCart'));
      return;
    }

    const phone = toFullPhone(data);

    try {
      // Re-check server cart mode: local checkout cannot create WC orders.
      const cartProbe = await fetch('/api/cart')
        .then((r) => r.json())
        .catch(() => null);
      if (!cartProbe || cartProbe.mode !== 'woocommerce') {
        setError(t('wooRequired'));
        return;
      }

      // If UI was on local cart but WC is configured, push lines into WC first.
      if (cartMode !== 'woocommerce') {
        for (const item of cartItems) {
          const wooId = item.product.wooId;
          if (!wooId) {
            setError(t('wooRequired'));
            return;
          }
          const added = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: wooId, quantity: item.quantity }),
          });
          if (!added.ok) {
            setError(t('wooRequired'));
            return;
          }
        }
      }

      await updateShippingAddress({
        email: data.email,
        phone,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        province: data.province,
        country: data.country,
        postalCode: data.postalCode,
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          phone,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          apartment: data.apartment || undefined,
          city: data.city,
          province: data.province,
          country: data.country,
          postalCode: data.postalCode,
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
        <div className="space-y-2">
          <FormLabel>{t('phone')}</FormLabel>
          <div className="grid grid-cols-[minmax(8.5rem,11rem)_1fr] gap-2">
            <FormField
              control={form.control}
              name="phoneDialCode"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label={t('phoneCountryCode')}>
                        <SelectValue placeholder="+34" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PHONE_COUNTRY_CODES.map((item) => (
                        <SelectItem key={item.iso} value={item.dial}>
                          {item.dial} {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder={t('phonePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('province')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('provincePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SPAIN_PROVINCES.map((province) => (
                      <SelectItem key={province.code} value={province.code}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
