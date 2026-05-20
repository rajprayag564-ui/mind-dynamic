import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { flagshipCourse } from "@/lib/course-data";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default function CoursePage({ params }: Props) {
  const slug = params.slug;
  const course = flagshipCourse.courseOffers.find((c) => c.id === slug);

  if (!course) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
        <Navbar />
        <main className="mx-auto w-full max-w-4xl px-4 py-20">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="mt-4">We couldn&apos;t find the course you requested.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-20">
        <div className="rounded-lg bg-slate-900/40 p-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-3 text-blue-100">A focused short course from Dynamic Fast Mind.</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm text-blue-200 line-through">₹{course.originalPriceInr}</span>
            <span className="text-2xl font-extrabold">₹{course.priceInr}</span>
          </div>

          <div className="mt-8">
            <Link href={`/checkout?productId=${course.id}`} className="inline-block rounded bg-blue-600 px-5 py-3 font-semibold">
              Buy Now
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
