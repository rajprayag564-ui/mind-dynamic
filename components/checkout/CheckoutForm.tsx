"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
  title: string;
  amount: number;
};

export default function CheckoutForm({ productId, title, amount }: Props) {
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, utr }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Server error");
      }

      const data = await res.json();
      // redirect to dashboard or thank you
      router.push(`/thank-you?purchaseId=${data.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/95 p-6">
      <h2 className="text-lg font-semibold">Checkout — {title}</h2>
      <p className="mt-2 text-sm text-blue-100">Amount payable: ₹{amount}</p>

      <div className="mt-4 flex gap-4">
        <div className="w-40 rounded bg-[color:var(--color-surface)]/90 p-3 text-center">
          <img src="/images/hero-illustration.svg" alt="UPI QR" className="mx-auto h-36 w-36 object-contain" />
          <p className="mt-2 text-xs text-blue-200">Scan and pay via UPI</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          <label className="block text-sm font-medium text-blue-100">UTR / Transaction ID</label>
          <input
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)] px-3 py-2 text-[color:var(--color-text)] outline-none"
            placeholder="Enter UTR or TXN ID"
          />

          {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Submitting…" : `Submit Payment ₹${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}
