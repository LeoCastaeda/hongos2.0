/**
 * Maps a Square Web Payments token into the $_POST-shaped keys that
 * WooCommerce Square expects via Store API `payment_data`.
 *
 * @see Gateway.php — `wc-{id_dasherized}-payment-nonce` etc.
 * Gateway id `square_credit_card` → dasherized `square-credit-card`.
 */

export type SquarePaymentPayload = {
  nonce: string;
  cardType?: string;
  lastFour?: string;
  expMonth?: string;
  expYear?: string;
  postalCode?: string;
  buyerVerificationToken?: string;
};

const PREFIX = 'wc-square-credit-card';

export function buildSquarePaymentData(
  payment: SquarePaymentPayload
): Array<{ key: string; value: string }> {
  const entries: Array<[string, string | undefined]> = [
    [`${PREFIX}-payment-nonce`, payment.nonce],
    [`${PREFIX}-card-type`, payment.cardType || 'CARD'],
    [`${PREFIX}-last-four`, payment.lastFour || '0000'],
    [`${PREFIX}-exp-month`, payment.expMonth || '01'],
    [`${PREFIX}-exp-year`, payment.expYear || '2099'],
    [`${PREFIX}-payment-postcode`, payment.postalCode || ''],
    [
      `${PREFIX}-buyer-verification-token`,
      payment.buyerVerificationToken || '',
    ],
  ];

  return entries
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => ({ key, value: String(value) }));
}
