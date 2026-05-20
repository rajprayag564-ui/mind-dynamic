import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import type { FlagshipCourse } from "@/lib/course-data";

type CurriculumSectionProps = {
  course: FlagshipCourse;
};

export function CurriculumSection({ course }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold sm:text-3xl">New Courses</h2>
      <p className="mt-2 text-blue-100">Paid courses in a quick card format.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {course.courseOffers.map((offer) => {
          const discountPercent = Math.round(
            ((offer.originalPriceInr - offer.priceInr) / offer.originalPriceInr) * 100
          );

          return (
            <article
              key={offer.id}
              className="group overflow-hidden rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={offer.imageUrl}
                alt={offer.title}
                width={720}
                height={420}
                className="h-44 w-full object-cover sm:h-52"
              />

              <div className="p-5">
                <div className="inline-flex rounded-full bg-blue-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-100">
                  New
                </div>

                <h3 className="mt-3 text-xl font-semibold">{offer.title}</h3>

                <div className="mt-4 flex items-end gap-3">
                  <span className="text-2xl font-bold text-[color:var(--color-text)]">₹{offer.priceInr}</span>
                  <span className="text-sm text-blue-200 line-through">
                    ₹{offer.originalPriceInr}
                  </span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-200">
                    {discountPercent}% off
                  </span>
                </div>

                <Link
                  href={`/courses/${offer.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[color:var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
