import Link from "next/link";

import { MentorSection } from "@/components/landing/mentor-section";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { flagshipCourse } from "@/lib/course-data";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white">
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Real Outcomes
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Trusted by Ambitious Students
          </h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            See the mentor approach and student transformations before joining.
          </p>
        </section>

        <MentorSection />
        <TestimonialsSection course={flagshipCourse} />

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
            <h2 className="text-2xl font-bold">Ready to Start?</h2>
            <p className="mt-2 text-blue-100">Join Dynamic Fast Mind and begin today.</p>
            <Link
              href="/enroll"
              className="mt-5 inline-flex rounded-lg bg-[#3B82F6] px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Enroll Now
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
