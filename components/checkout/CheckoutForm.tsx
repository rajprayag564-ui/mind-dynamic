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

  const digitCount = utrNumber.length;
  const isValidLength = digitCount === 12;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidLength) {
      setError("UTR/Reference Number must be exactly 12 digits");
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
        {/* QR Code Section */}
        <div className="rounded-xl bg-white p-6 text-center">
          <p className="mb-3 text-sm font-semibold text-gray-600">Mamta Anant</p>
          <Image src="/images/upi-qr-code.png" alt="UPI QR Code — anantmamta26@oksbi" className="mx-auto h-52 w-52 object-contain" width={208} height={208} />
          <p className="mt-4 text-xs font-medium text-gray-500">Scan to pay with any UPI app</p>
        </div>

        {/* UPI ID Display */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-950/40 p-4">
          <p className="text-sm">
            <span className="font-semibold text-blue-300">UPI ID:</span>{" "}
            <code className="ml-2 rounded bg-blue-900/50 px-2 py-0.5 font-mono text-sm font-bold text-white select-all">
              anantmamta26@oksbi
            </code>
          </p>
          <p className="mt-2 text-xs text-blue-300/70">Scan the QR code or enter the UPI ID manually in your UPI app and pay exactly ₹{amount}</p>
        </div>

        {/* UTR Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="utr" className="block text-sm font-medium">
              Enter 12-Digit UTR/Reference Number
            </label>
            <div className="relative mt-2">
              <input
                id="utr"
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={utrNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUtrNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g., 123456789012"
                className="w-full rounded-lg border-2 border-gray-600 bg-gray-900 px-4 py-3 text-base font-mono text-white tracking-widest placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all"
                disabled={isLoading || success}
              />
              {/* Live digit counter */}
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold tabular-nums ${
                  isValidLength
                    ? "text-green-400"
                    : digitCount > 0
                      ? "text-yellow-400"
                      : "text-gray-500"
                }`}
              >
                {digitCount}/12
              </span>
            </div>
            <p className="mt-1.5 text-xs text-blue-200">
              You&apos;ll receive this 12-digit number after completing the UPI payment. It cannot be reused.
            </p>
          </div>

          {error && <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400">{error}</p>}

          {success && (
            <p className="rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-sm text-green-400">
              ✓ Payment submitted for verification. Admin will approve shortly.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || success || !isValidLength}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting…" : success ? "Payment Submitted ✓" : `Submit Payment (₹${amount})`}
          </button>
        </form>
      </div>
    </div>
  );
}
