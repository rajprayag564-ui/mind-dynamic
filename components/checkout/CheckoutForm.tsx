"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Props = {
  productId: string;
  title: string;
  amount: number;
};

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutForm({ productId, title, amount }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        throw new Error("Unable to load Razorpay Checkout");
      }

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ courseId: productId }),
      });

      if (!orderRes.ok) {
        const body = await orderRes.json().catch(() => ({}));
        throw new Error(body?.message || "Unable to create Razorpay order");
      }

      const orderData = await orderRes.json();
      const { keyId, orderId, purchaseId, amount: paiseAmount, currency } = orderData;
      if (!keyId || !orderId || !purchaseId || !paiseAmount) {
        throw new Error("Invalid order response");
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        amount: paiseAmount,
        currency: currency || "INR",
        name: "Dynamic Fast Mind",
        description: title,
        order_id: orderId,
        prefill: {},
        theme: { color: "#2563eb" },
        handler: async (response: { razorpay_payment_id?: string; razorpay_order_id?: string; razorpay_signature?: string }) => {
          if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
            throw new Error("Missing payment confirmation");
          }

          const successRes = await fetch("/api/purchases/success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({
              purchaseId,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          if (!successRes.ok) {
            const body = await successRes.json().catch(() => ({}));
            throw new Error(body?.message || "Payment succeeded but activation failed");
          }

          router.push(`/thank-you?purchaseId=${purchaseId}`);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.open();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Payment initiation failed");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/95 p-6">
      <h2 className="text-lg font-semibold">Checkout — {title}</h2>
      <p className="mt-2 text-sm text-blue-100">Pay securely with Razorpay. Amount payable: ₹{amount}</p>

      <div className="mt-4 flex gap-4">
        <div className="w-40 rounded bg-[color:var(--color-surface)]/90 p-3 text-center">
          <img src="/images/hero-illustration.svg" alt="Payment illustration" className="mx-auto h-36 w-36 object-contain" />
          <p className="mt-2 text-xs text-blue-200">Card, UPI, netbanking, wallets</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          <label className="block text-sm font-medium text-blue-100">Secure Razorpay Checkout</label>
          <p className="mt-1 text-sm text-blue-200">Your payment will be verified server-side and the purchase will activate automatically.</p>

          {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Opening Checkout…" : `Pay ₹${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}
