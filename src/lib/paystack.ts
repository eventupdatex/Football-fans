/**
 * Paystack-ready checkout.
 * Set VITE_PAYSTACK_PUBLIC_KEY in .env to go live.
 * Until then, runs in demo mode (simulates successful payment).
 */
export type PaystackCustomer = {
  email: string;
  name: string;
  phone: string;
};

export type PaystackOrderMeta = {
  orderId: string;
  lines: { id: string; name: string; size: string; qty: number; price: number }[];
  address: string;
  city: string;
  note?: string;
};

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Paystack'));
    document.body.appendChild(s);
  });
}

export function nairaToKobo(naira: number) {
  return Math.round(naira * 100);
}

export const USD_TO_NGN = 1550;

export function priceToNaira(usdLike: number) {
  return Math.round(usdLike * USD_TO_NGN);
}

export async function startPaystackPayment(opts: {
  customer: PaystackCustomer;
  amountNaira: number;
  reference: string;
  metadata: PaystackOrderMeta;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}): Promise<'live' | 'demo'> {
  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;

  if (!key) {
    await new Promise((r) => setTimeout(r, 1200));
    opts.onSuccess(opts.reference);
    return 'demo';
  }

  await loadPaystackScript();
  if (!window.PaystackPop) throw new Error('Paystack not available');

  const handler = window.PaystackPop.setup({
    key,
    email: opts.customer.email,
    amount: nairaToKobo(opts.amountNaira),
    currency: 'NGN',
    ref: opts.reference,
    metadata: {
      custom_fields: [
        { display_name: 'Customer', variable_name: 'customer_name', value: opts.customer.name },
        { display_name: 'Phone', variable_name: 'phone', value: opts.customer.phone },
        { display_name: 'Order', variable_name: 'order_id', value: opts.metadata.orderId },
      ],
      ...opts.metadata,
    },
    callback: (response: { reference: string }) => {
      opts.onSuccess(response.reference);
    },
    onClose: () => opts.onClose(),
  });
  handler.openIframe();
  return 'live';
}

export function makeOrderRef() {
  return `FFT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
