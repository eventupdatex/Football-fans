import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck, MapPin, Phone, Mail, User } from 'lucide-react';
import type { CartLine } from './layout';
import { priceToNaira, startPaystackPayment, makeOrderRef } from '../lib/paystack';
import { addOrder, type StoreOrder } from '../lib/store';

function formatNaira(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
}

function CheckoutPage({
  lines,
  onBack,
  onPaid,
  onClearCart,
}: {
  lines: CartLine[];
  onBack: () => void;
  onPaid: (order: StoreOrder) => void;
  onClearCart: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const totalNaira = useMemo(
    () => lines.reduce((s, l) => s + priceToNaira(l.product.price) * l.qty, 0),
    [lines],
  );

  const valid =
    name.trim().length > 1 &&
    email.includes('@') &&
    phone.replace(/\D/g, '').length >= 10 &&
    address.trim().length > 5 &&
    city.trim().length > 1 &&
    lines.length > 0;

  const pay = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setError('');
    const reference = makeOrderRef();
    const orderId = reference;
    const metaLines = lines.map((l) => ({
      id: l.product.id,
      name: l.product.name,
      size: l.size,
      qty: l.qty,
      price: priceToNaira(l.product.price),
    }));

    try {
      const mode = await startPaystackPayment({
        customer: { email: email.trim(), name: name.trim(), phone: phone.trim() },
        amountNaira: totalNaira,
        reference,
        metadata: {
          orderId,
          lines: metaLines,
          address: address.trim(),
          city: city.trim(),
          note: note.trim() || undefined,
        },
        onSuccess: (ref) => {
          const order: StoreOrder = {
            id: orderId,
            reference: ref,
            createdAt: new Date().toISOString(),
            status: 'paid',
            customer: {
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              address: address.trim(),
              city: city.trim(),
              note: note.trim() || undefined,
            },
            lines: lines.map((l) => ({
              productId: l.product.id,
              name: l.product.name,
              size: l.size,
              qty: l.qty,
              unitPriceNaira: priceToNaira(l.product.price),
            })),
            totalNaira,
            paystackRef: ref,
            mode,
          };
          addOrder(order);
          onClearCart();
          onPaid(order);
        },
        onClose: () => setBusy(false),
      });
      if (mode === 'demo') {
        // onSuccess already called
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment failed. Try again.');
      setBusy(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-sm font-semibold text-slate-500">Your cart is empty.</p>
        <button type="button" onClick={onBack} className="text-sm font-black text-brand-600">
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </button>
      <div>
        <h1 className="text-xl font-black text-slate-900">Checkout</h1>
        <p className="text-sm text-slate-500 mt-0.5">Pay securely with Paystack (cards, transfer, USSD)</p>
      </div>
      <div className="rounded-2xl glass p-4 space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order summary</p>
        {lines.map((l, i) => (
          <div key={i} className="flex justify-between gap-3 text-sm">
            <span className="text-slate-700 font-semibold truncate">
              {l.product.name} <span className="text-slate-400 font-normal">×{l.qty} · {l.size}</span>
            </span>
            <span className="font-bold text-slate-900 shrink-0">
              {formatNaira(priceToNaira(l.product.price) * l.qty)}
            </span>
          </div>
        ))}
        <div className="pt-2 border-t border-slate-100 flex justify-between">
          <span className="text-sm font-bold text-slate-500">Total</span>
          <span className="text-lg font-black text-slate-900">{formatNaira(totalNaira)}</span>
        </div>
      </div>
      <div className="rounded-2xl glass p-4 space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery details</p>
        {(
          [
            { icon: User, label: 'Full name', value: name, set: setName, type: 'text', ph: 'Chinedu Okafor' },
            { icon: Mail, label: 'Email', value: email, set: setEmail, type: 'email', ph: 'you@email.com' },
            { icon: Phone, label: 'Phone (WhatsApp)', value: phone, set: setPhone, type: 'tel', ph: '0803 000 0000' },
            { icon: MapPin, label: 'Address', value: address, set: setAddress, type: 'text', ph: 'Street, area' },
          ] as const
        ).map((f) => (
          <label key={f.label} className="block">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 mb-1">
              <f.icon className="h-3.5 w-3.5" /> {f.label}
            </span>
            <input
              type={f.type}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.ph}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-brand-500"
            />
          </label>
        ))}
        <label className="block">
          <span className="text-[11px] font-bold text-slate-500 mb-1 block">City</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-brand-500"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-bold text-slate-500 mb-1 block">Note (optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Delivery instructions"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 resize-none"
          />
        </label>
      </div>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      <div className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2.5">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-emerald-800 leading-relaxed">
          Payments run through Paystack. Add <code className="font-bold">VITE_PAYSTACK_PUBLIC_KEY</code> in env to go live.
          Without it, checkout runs in demo mode so you can test the full flow.
        </p>
      </div>
      <button
        type="button"
        disabled={!valid || busy}
        onClick={pay}
        className="w-full rounded-xl bg-brand-600 py-3.5 text-xs font-black uppercase tracking-wide text-white disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {busy ? 'Processing…' : `Pay ${formatNaira(totalNaira)}`}
      </button>
    </div>
  );
}

function OrderSuccess({ order, onShop, onHome }: { order: StoreOrder; onShop: () => void; onHome: () => void }) {
  return (
    <div className="space-y-5 py-6 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle2 className="h-9 w-9 text-emerald-600" />
      </div>
      <div>
        <h1 className="text-xl font-black text-slate-900">Payment received</h1>
        <p className="text-sm text-slate-500 mt-1">Order <span className="font-bold text-slate-800">{order.reference}</span></p>
        <p className="text-sm font-black text-brand-600 mt-2">{formatNaira(order.totalNaira)}</p>
        {order.mode === 'demo' && (
          <p className="mt-2 text-[11px] font-semibold text-amber-700 bg-amber-50 inline-block px-2 py-1 rounded-lg">
            Demo mode — add Paystack key to take real payments
          </p>
        )}
      </div>
      <p className="text-sm text-slate-600 max-w-sm mx-auto">
        We will confirm on WhatsApp/email shortly. Track status in Admin → Orders.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <button type="button" onClick={onShop} className="rounded-xl bg-brand-600 px-5 py-3 text-xs font-black text-white">
          Continue shopping
        </button>
        <button type="button" onClick={onHome} className="rounded-xl glass px-5 py-3 text-xs font-black text-slate-700">
          Home
        </button>
      </div>
    </div>
  );
}

export { CheckoutPage, OrderSuccess, formatNaira };
