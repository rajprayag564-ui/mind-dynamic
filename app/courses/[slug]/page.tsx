import Image from "next/image";
import { cookies } from "next/headers";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import { flagshipCourse } from "@/lib/course-data";
import Link from "next/link";
import { Lock, PlayCircle } from "lucide-react";

type Props = {
  params: { slug: string };
};

export default function CoursePage({ params }: Props) {
  const slug = params.slug;
  const course = flagshipCourse.courseOffers.find((c) => c.id === slug);
  const isLoggedIn = !!cookies().get("dfm_session")?.value;

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
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-20">
        <div className="overflow-hidden rounded-3xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
          <div className="relative">
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={1400}
              height={800}
              className={`h-72 w-full object-cover sm:h-[440px] ${isLoggedIn ? "" : "brightness-[0.82]"}`}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                {course.sections.length} Sections • {course.lessons.length} Videos • {course.pdfs.length} PDFs
              </span>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{course.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100 sm:text-base">{course.description}</p>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <section>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-blue-200 line-through">₹{course.originalPriceInr}</span>
                <span className="text-3xl font-extrabold">₹{course.priceInr}</span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Limited offer
                </span>
              </div>

              <p className="mt-4 text-sm text-blue-100">
                {isLoggedIn
                  ? "You are logged in and can purchase this course now."
                  : "Login is only required for purchase and playback. The full course structure is visible below."}
              </p>

              <div className="mt-6 space-y-6">
                {course.sections.map((section) => (
                  <div key={section.id} className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[#0f153c] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                        <p className="mt-1 text-sm text-blue-100">{section.lessons.length} videos in this section</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                        Section Preview
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {section.lessons.map((lesson, index) => (
                        <article
                          key={lesson.id}
                          className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                        >
                          <div className="relative aspect-video bg-[#091238]">
                            <Image
                              src={course.imageUrl}
                              alt={lesson.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
                            <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                              Video {index + 1}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              {isLoggedIn ? (
                                <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                              ) : (
                                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                              )}
                              <div>
                                <h3 className="text-sm font-semibold text-white">{lesson.title}</h3>
                                <p className="mt-1 text-xs text-blue-100">{lesson.duration}</p>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {course.pdfs.length ? (
                <div className="mt-6 rounded-2xl border border-[color:var(--color-text)]/10 bg-[#0f153c] p-5">
                  <h2 className="text-lg font-semibold">Included PDFs</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {course.pdfs.map((pdf) => (
                      <div key={pdf.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-blue-100">
                        {pdf.title}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[#0f153c] p-5">
              <h2 className="text-lg font-semibold">Enroll now</h2>
              <p className="mt-2 text-sm text-blue-100">
                Secure checkout, automatic activation, and lesson access after payment.
              </p>
              <Link
                href={`/checkout?productId=${course.id}`}
                className="mt-6 inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Buy Now
              </Link>
              <p className="mt-3 text-xs text-blue-200">
                Guests can browse the full structure, but playback is reserved for enrolled students.
              </p>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
