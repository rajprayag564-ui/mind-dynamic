import Image from "next/image";
import Link from "next/link";

import type { FlagshipCourse } from "@/lib/course-data";

type HeroSectionProps = {
  course: FlagshipCourse;
};

export function HeroSection({ course }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0A0F2C_50%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <div className="animate-fade-up">
          <p className="mb-3 inline-flex rounded-full border border-blue-300/40 bg-blue-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100">
            {course.tagline}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Learn faster with a calmer, clearer study system.
          </h1>
          <p className="mt-5 max-w-xl text-base text-blue-100 sm:text-lg">
            {course.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/enroll"
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
        </div>

        <div className="relative animate-float">
          <Image
            src="/images/hero-illustration.svg"
            alt="Dynamic Fast Mind student transformation"
            width={720}
            height={520}
            className="w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}