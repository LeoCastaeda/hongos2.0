export type SquareCardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'AMERICAN_EXPRESS'
  | 'DISCOVER'
  | 'DISCOVER_DINERS'
  | 'JCB'
  | 'CHINA_UNIONPAY'
  | 'OTHER_BRAND'
  | string;

export type SquareTokenizeResult = {
  status: 'OK' | 'Invalid' | 'Error' | string;
  token?: string;
  errors?: Array<{ message?: string; type?: string }>;
  details?: {
    card?: {
      brand?: SquareCardBrand;
      last4?: string;
      expMonth?: number;
      expYear?: number;
    };
    billing?: {
      postalCode?: string;
    };
  };
};

export type SquareVerifyBuyerResult = {
  token?: string;
  userChallenged?: boolean;
};

export type SquareBillingContact = {
  givenName?: string;
  familyName?: string;
  email?: string;
  phone?: string;
  addressLines?: string[];
  city?: string;
  state?: string;
  countryCode?: string;
  postalCode?: string;
};

export type SquareVerificationDetails = {
  amount: string;
  currencyCode: string;
  intent: 'CHARGE' | 'STORE' | 'CHARGE_AND_STORE';
  billingContact: SquareBillingContact;
  customerInitiated?: boolean;
  sellerKeyedIn?: boolean;
};

export type SquareCardOptions = {
  postalCode?: string;
};

export type SquareCard = {
  attach: (selector: string) => Promise<void>;
  destroy: () => Promise<void>;
  configure?: (options: SquareCardOptions) => Promise<void>;
  /** Optionally pass verificationDetails for SCA (EU). */
  tokenize: (
    verificationDetails?: SquareVerificationDetails
  ) => Promise<SquareTokenizeResult>;
};

export type SquarePayments = {
  card: (options?: SquareCardOptions) => Promise<SquareCard>;
  verifyBuyer: (
    sourceId: string,
    verificationDetails: SquareVerificationDetails
  ) => Promise<SquareVerifyBuyerResult>;
};

export type SquareSDK = {
  payments: (
    applicationId: string,
    locationId: string
  ) => Promise<SquarePayments>;
};

declare global {
  interface Window {
    Square?: SquareSDK;
  }
}

export {};
