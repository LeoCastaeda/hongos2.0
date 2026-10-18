'use client';

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^(6011|65|64[4-9])/.test(digits)) return 'discover';
  return 'unknown';
}

export function formatCardNumber(value: string, brand: CardBrand): string {
  const digits = value.replace(/\D/g, '').slice(0, brand === 'amex' ? 15 : 16);
  if (brand === 'amex') {
    return digits
      .replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(' ')
      )
      .trim();
  }
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const BRAND_LABELS: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  discover: 'Discover',
  unknown: '',
};

interface CreditCardPreviewProps {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  flipped: boolean;
}

export function CreditCardPreview({
  number,
  holder,
  expiry,
  cvv,
  flipped,
}: CreditCardPreviewProps) {
  const brand = detectCardBrand(number);
  const displayNumber =
    formatCardNumber(number, brand) ||
    (brand === 'amex' ? '•••• •••••• •••••' : '•••• •••• •••• ••••');
  const displayHolder = holder.trim() || 'NOMBRE APELLIDO';
  const displayExpiry = expiry.trim() || 'MM/AA';
  const cvvLength = brand === 'amex' ? 4 : 3;
  const displayCvv = cvv.padEnd(cvvLength, '•').slice(0, cvvLength);

  return (
    <div className={`credit-card-scene${flipped ? ' is-flipped' : ''}`}>
      <div className={`credit-card brand-${brand}`}>
        <div className="credit-card-face credit-card-front">
          <div className="credit-card-top">
            <div className="credit-card-chip" aria-hidden />
            {brand !== 'unknown' && (
              <span className="credit-card-brand">{BRAND_LABELS[brand]}</span>
            )}
          </div>
          <p className="credit-card-number">{displayNumber}</p>
          <div className="credit-card-bottom">
            <div>
              <span className="credit-card-label">Titular</span>
              <p className="credit-card-holder">{displayHolder}</p>
            </div>
            <div>
              <span className="credit-card-label">Caduca</span>
              <p className="credit-card-expiry">{displayExpiry}</p>
            </div>
          </div>
        </div>
        <div className="credit-card-face credit-card-back">
          <div className="credit-card-stripe" aria-hidden />
          <div className="credit-card-cvv-row">
            <span className="credit-card-label">CVV</span>
            <div className="credit-card-cvv">{displayCvv}</div>
          </div>
          {brand !== 'unknown' && (
            <span className="credit-card-brand credit-card-brand-back">
              {BRAND_LABELS[brand]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
