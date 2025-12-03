// Paddle.js Type Definitions
export interface PaddleCheckoutOptions {
  items: PaddleCheckoutItem[];
  customer?: PaddleCustomer;
  customData?: Record<string, any>;
  settings?: PaddleCheckoutSettings;
}

export interface PaddleCheckoutItem {
  priceId: string;
  quantity: number;
  title?: string;
  description?: string;
}

export interface PaddleCustomer {
  email?: string;
  name?: string;
  address?: PaddleAddress;
}

export interface PaddleAddress {
  countryCode?: string;
  postcode?: string;
  city?: string;
  line1?: string;
  line2?: string;
}

export interface PaddleCheckoutSettings {
  displayMode?: 'overlay' | 'inline' | 'redirect';
  frameTarget?: string;
  frameInitialHeight?: number;
  frameStyle?: string;
  allowLogout?: boolean;
  locale?: string;
  message?: string;
  successUrl?: string;
  closeUrl?: string;
}

export interface PaddleInstance {
  Initialize(options: PaddleInitializeOptions): void;
  Checkout: {
    open(options: PaddleCheckoutOptions): void;
    close(): void;
  };
  Event: {
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
  };
}

export interface PaddleInitializeOptions {
  token: string;
  environment?: 'sandbox' | 'production';
  eventCallback?: (data: any) => void;
  debug?: boolean;
}

// Global Window interface extension
declare global {
  interface Window {
    Paddle: any;
  }
}
