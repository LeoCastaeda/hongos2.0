export type PhoneCountryCode = {
  iso: string;
  dial: string;
  label: string;
};

/** Common dial codes for EU / neighbors (Spain first). */
export const PHONE_COUNTRY_CODES: PhoneCountryCode[] = [
  { iso: 'ES', dial: '+34', label: 'España' },
  { iso: 'PT', dial: '+351', label: 'Portugal' },
  { iso: 'FR', dial: '+33', label: 'Francia' },
  { iso: 'DE', dial: '+49', label: 'Alemania' },
  { iso: 'IT', dial: '+39', label: 'Italia' },
  { iso: 'GB', dial: '+44', label: 'Reino Unido' },
  { iso: 'IE', dial: '+353', label: 'Irlanda' },
  { iso: 'BE', dial: '+32', label: 'Bélgica' },
  { iso: 'NL', dial: '+31', label: 'Países Bajos' },
  { iso: 'CH', dial: '+41', label: 'Suiza' },
  { iso: 'AT', dial: '+43', label: 'Austria' },
  { iso: 'AD', dial: '+376', label: 'Andorra' },
  { iso: 'US', dial: '+1', label: 'EE. UU. / Canadá' },
  { iso: 'MX', dial: '+52', label: 'México' },
  { iso: 'AR', dial: '+54', label: 'Argentina' },
  { iso: 'CO', dial: '+57', label: 'Colombia' },
  { iso: 'CL', dial: '+56', label: 'Chile' },
  { iso: 'PE', dial: '+51', label: 'Perú' },
  { iso: 'MA', dial: '+212', label: 'Marruecos' },
];

export function buildInternationalPhone(
  dialCode: string,
  nationalNumber: string
): string {
  const digits = nationalNumber.replace(/[^\d]/g, '');
  const dial = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return digits ? `${dial}${digits}` : '';
}
