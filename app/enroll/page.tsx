"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { flagshipCourse } from "@/lib/course-data";

export default function EnrollPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-6">
          <p className="text-sm text-blue-200">Order Summary</p>
          <h1 className="mt-2 text-2xl font-bold">{flagshipCourse.title}</h1>
          <p className="mt-3 text-sm text-blue-100">{flagshipCourse.description}</p>

          <ul className="mt-6 space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" />
              Mind Training Module (3 Lessons)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" />
              Career Guidance Module (3 Lessons)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" />
              Lifetime demo access
            </li>
          </ul>

          <div className="mt-8 border-t border-[color:var(--color-text)]/10 pt-4">
            <div className="flex items-end gap-3">
              <span className="text-sm text-blue-200 line-through">
                ₹{flagshipCourse.originalPriceInr}
              </span>
              <span className="text-3xl font-extrabold">₹{flagshipCourse.priceInr}</span>
            </div>
            <p className="mt-1 text-xs text-blue-200">Total payable in INR.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-6">
          <h2 className="text-xl font-semibold">Complete Enrollment</h2>
          <p className="mt-1 text-sm text-blue-100">
            This is a static prototype checkout.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setIsDialogOpen(true);
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-blue-50">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[#111a46] px-3 py-2.5 outline-none transition focus:border-[#3B82F6]"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-blue-50">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[#111a46] px-3 py-2.5 outline-none transition focus:border-[#3B82F6]"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Complete Purchase
            </button>

            <a
              href={`https://wa.me/918889935635?text=I%20want%20to%20purchase%20${encodeURIComponent(
                flagshipCourse.title
              )}%20for%20₹${flagshipCourse.priceInr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block w-full rounded-lg border border-green-600 px-4 py-3 text-center font-semibold text-green-400 hover:bg-green-900/10"
            >
              Pay / Order via WhatsApp
            </a>
          </form>
        </section>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment integration coming soon!</DialogTitle>
            <DialogDescription>
              This checkout is currently a static demo experience for Dynamic Fast Mind.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link
              href="/dashboard"
              className="inline-flex w-full justify-center rounded-lg bg-[color:var(--color-accent)] px-4 py-2.5 font-semibold transition hover:opacity-90 sm:w-auto"
            >
              Go to Dashboard (Demo)
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
