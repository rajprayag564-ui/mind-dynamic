import Link from "next/link";

import type { FlagshipCourse } from "@/lib/course-data";

type PricingCtaSectionProps = {
  course: FlagshipCourse;
};

export function PricingCtaSection({ course }: PricingCtaSectionProps) {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-blue-300/20 bg-gradient-to-br from-blue-500/20 to-transparent p-8 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Secure Your Spot Today</h2>
        <p className="mt-3 text-blue-100">
          Lifetime access to the complete Dynamic Fast Mind flagship program.
        </p>

        <div className="mt-6 flex items-end justify-center gap-3">
          <span className="text-lg text-blue-200 line-through">
            ₹{course.originalPriceInr}
          </span>
          <span className="text-4xl font-extrabold text-white">₹{course.priceInr}</span>
        </div>

        <Link
          href="/enroll"
          className="mt-8 inline-flex w-full max-w-md justify-center rounded-xl bg-[#3B82F6] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
}
