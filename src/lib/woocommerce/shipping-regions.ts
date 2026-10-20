import { SPAIN_PROVINCES, normalizeSpainState } from './spain-provinces';
import { ITALY_PROVINCES, normalizeItalyState } from './italy-provinces';

export type CheckoutCountry = {
  code: 'ES' | 'IT';
  dial: string;
  labelEs: string;
  labelEn: string;
};

export const CHECKOUT_COUNTRIES: CheckoutCountry[] = [
  { code: 'ES', dial: '+34', labelEs: 'España', labelEn: 'Spain' },
  { code: 'IT', dial: '+39', labelEs: 'Italia', labelEn: 'Italy' },
];

export function getProvincesForCountry(countryCode: string) {
  const code = countryCode.toUpperCase();
  if (code === 'IT') return ITALY_PROVINCES;
  return SPAIN_PROVINCES;
}

export function normalizeStateForCountry(
  countryCode: string,
  province: string | undefined | null
): string {
  const code = countryCode.toUpperCase();
  if (code === 'IT') return normalizeItalyState(province);
  if (code === 'ES') return normalizeSpainState(province);
  return (province || '').trim();
}

export function defaultDialForCountry(countryCode: string): string {
  const match = CHECKOUT_COUNTRIES.find(
    (c) => c.code === countryCode.toUpperCase()
  );
  return match?.dial ?? '+34';
}
