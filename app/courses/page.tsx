import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { flagshipCourse } from "@/lib/course-data";

export default function CoursesPage() {
  const courses = flagshipCourse.courseOffers;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Course Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Explore the full course catalog</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Review the flagship program and see which upcoming courses are being built next.
          </p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const isFeatured = course.status === "active";
              const lessonCount = course.lessons.length;
              const resourceCount = course.pdfs.length;

              return (
                <article
                  key={course.id}
                  className={`overflow-hidden rounded-3xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] shadow-[0_18px_50px_rgba(0,0,0,0.16)] ${
                    isFeatured ? "md:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <div className={`grid ${isFeatured ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                    <div className="relative min-h-[240px] bg-[#091238]">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        sizes={isFeatured ? "(max-width: 1280px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
                        className="object-cover"
                        priority={isFeatured}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/30 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                        {isFeatured ? "Featured" : "Coming Soon"}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 sm:p-7">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                          {flagshipCourse.brand}
                        </p>
                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{course.title}</h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                          {isFeatured ? course.description : "This course is currently in production and will launch soon."}
                        </p>

                        {isFeatured ? (
                          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                              Structure preview
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {lessonCount} Videos &amp; {resourceCount} PDF Resources
                            </p>
                            <div className="mt-4 flex items-end gap-3">
                              <span className="text-3xl font-extrabold text-white">₹{course.priceInr}</span>
                              <span className="pb-1 text-sm text-blue-200 line-through">
                                ₹{course.originalPriceInr}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-5 flex items-center gap-3 text-sm text-blue-200">
                            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-white">
                              Coming Soon
                            </span>
                            <span>We are preparing this course for launch.</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        {isFeatured ? (
                          <>
                            <Link
                              href="/courses/powerful-public-speaking"
                              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                              View Details
                            </Link>
                            <Link
                              href="/checkout?productId=powerful-public-speaking"
                              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                            >
                              Buy Now
                            </Link>
                            <Link
                              href="/checkout?productId=powerful-public-speaking"
                              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                              Enroll
                            </Link>
                          </>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/50"
                          >
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
