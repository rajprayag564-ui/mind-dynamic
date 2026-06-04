"use client";

import { useState } from "react";
import Image from "next/image";
import type { FormEvent, ChangeEvent } from "react";

type Props = {
  title: string;
  amount: number;
};

export default function CheckoutForm({ title, amount }: Props) {
  const [utrNumber, setUtrNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (utrNumber.length !== 12) {
      setError("UTR/Reference Number must be exactly 12 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          courseTitle: title,
          price: amount,
          utrNumber,
          status: "pending",
        }),
      });

      if (response.ok) {
        setUtrNumber("");
        setSuccess(true);
        setError("");
      } else {
        const body = await response.json().catch(() => ({}));
        setError(body?.message || "Failed to submit payment. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "An error occurred while processing your payment");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/95 p-6">
      <h2 className="text-lg font-semibold">Checkout — {title}</h2>
      <p className="mt-2 text-sm text-blue-100">Complete your payment via UPI. Amount payable: ₹{amount}</p>

      <div className="mt-6 flex flex-col gap-6">
        <div className="rounded bg-[color:var(--color-surface)]/90 p-6 text-center">
          <Image src="/qr-code.png" alt="UPI QR Code" className="mx-auto h-48 w-48 object-contain" width={192} height={192} />
          <p className="mt-4 text-sm font-medium text-blue-100">Scan the QR code to pay</p>
        </div>

        <div className="rounded bg-[color:var(--color-surface)]/90 p-4">
          <p className="text-sm text-blue-100">
            <span className="font-semibold">UPI ID:</span> <code className="ml-2 font-mono text-blue-200">your-upi-id@bank</code>
          </p>
          <p className="mt-2 text-xs text-blue-200">Please scan the QR code or enter the UPI ID manually in your UPI app and pay exactly ₹{amount}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="utr" className="block text-sm font-medium text-blue-100">
              Enter 12-Digit UTR/Reference Number
            </label>
            <input
              id="utr"
              type="text"
              maxLength={12}
              value={utrNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUtrNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g., 123456789012"
              className="mt-2 w-full rounded border border-[color:var(--color-text)]/20 bg-[color:var(--color-surface)]/50 px-3 py-2 text-white placeholder-blue-300/50 focus:border-blue-500 focus:outline-none"
              disabled={isLoading || success}
            />
            <p className="mt-1 text-xs text-blue-200">You&apos;ll receive this after completing the UPI payment</p>
          </div>

          {error && <p className="rounded bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

          {success && (
            <p className="rounded bg-green-500/10 px-3 py-2 text-sm text-green-400">
              Payment submitted for verification. Admin will approve shortly.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition disabled:opacity-60"
          >
            {isLoading ? "Submitting…" : success ? "Payment Submitted ✓" : `Submit Payment (₹${amount})`}
          </button>
        </form>
      </div>
    </div>
  );
}
