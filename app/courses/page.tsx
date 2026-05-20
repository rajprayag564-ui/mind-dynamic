import { CurriculumSection } from "@/components/landing/curriculum-section";
import { Navbar } from "@/components/landing/navbar";
import { PricingCtaSection } from "@/components/landing/pricing-cta-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { flagshipCourse } from "@/lib/course-data";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Course Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Choose Your Program</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Explore the current courses and pick the one that matches your immediate
            learning goal.
          </p>
        </section>

        <CurriculumSection course={flagshipCourse} />
        <PricingCtaSection course={flagshipCourse} />
      </main>

      <SiteFooter />
    </div>
  );
}
