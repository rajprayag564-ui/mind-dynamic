import Image from "next/image";
import Link from "next/link";

import type { FlagshipCourse } from "@/lib/course-data";

type HeroSectionProps = {
  course: FlagshipCourse;
};

export function HeroSection({ course }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-text)]/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,var(--color-bg)_50%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20 lg:gap-16">
        <div className="animate-fade-up">
          <p className="mb-3 inline-flex rounded-full border border-blue-300/40 bg-blue-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100">
            {course.tagline}
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-[color:var(--color-text)] sm:text-5xl lg:text-6xl">
            Unlock Peak Mental Focus &amp; Learn 3x Faster.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
            A premium video training program designed to slash your study time, boost memory recall, and help you crush your exams with zero burnout.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses/powerful-public-speaking"
              className="btn-primary"
            >
              Unlock the Training
            </Link>
            <Link
              href="/courses"
              className="btn-ghost"
            >
              Explore Courses
            </Link>
          </div>
          <p className="mt-2 text-xs text-blue-200">
            One-time payment. Lifetime access. 100% Secure.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-blue-100/90">
            <span className="text-base leading-none text-yellow-300">
              ⭐⭐⭐⭐⭐
            </span>
            <span className="font-medium">
              Trusted by 1,000+ Ambitious Students
            </span>
          </div>
        </div>

        <div className="relative animate-float">
          <div className="mx-auto w-full max-w-[620px] rounded-[2rem] border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/5 p-3 shadow-2xl shadow-blue-500/20 backdrop-blur-sm sm:p-4">
            <div className="overflow-hidden rounded-[1.6rem] border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs font-medium tracking-wide text-blue-100/70">
                  Dynamic Fast Mind Training Hub
                </span>
              </div>
              <div className="grid gap-0 md:grid-cols-[1.45fr_0.85fr]">
                <div className="relative min-h-[280px] sm:min-h-[340px]">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern dark-mode learning dashboard with video player interface"
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,44,0.08),rgba(10,15,44,0.5))]" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/85 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-blue-200/70">
                          Live Session
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[color:var(--color-text)]">
                          Focus Reset: Study Mode in 15 Minutes
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        24 min
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[color:var(--color-text)]/10">
                      <div className="h-2 w-[68%] rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="border-t border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-5 md:border-l md:border-t-0">
                  <div className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/90 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-blue-200/70">
                      Inside the Program
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl bg-[color:var(--color-surface)] px-4 py-3">
                        <p className="text-sm font-semibold text-[color:var(--color-text)]">
                          Laser Focus Protocol
                        </p>
                        <p className="mt-1 text-xs text-blue-100/70">
                          Build concentration that lasts.
                        </p>
                      </div>
                      <div className="rounded-xl bg-[color:var(--color-surface)] px-4 py-3">
                        <p className="text-sm font-semibold text-[color:var(--color-text)]">
                          Memory Recall System
                        </p>
                        <p className="mt-1 text-xs text-blue-100/70">
                          Retain more with less revision.
                        </p>
                      </div>
                      <div className="rounded-xl bg-[color:var(--color-surface)] px-4 py-3">
                        <p className="text-sm font-semibold text-[color:var(--color-text)]">
                          Exam Sprint Planner
                        </p>
                        <p className="mt-1 text-xs text-blue-100/70">
                          Ship your prep without burnout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}