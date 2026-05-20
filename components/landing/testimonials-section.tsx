import Image from "next/image";

import type { FlagshipCourse } from "@/lib/course-data";

type TestimonialsSectionProps = {
  course: FlagshipCourse;
};

export function TestimonialsSection({ course }: TestimonialsSectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold sm:text-3xl">Student Success Stories</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {course.testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-5"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/avatar.svg"
                alt={testimonial.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-[color:var(--color-text)]/10"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-xs text-blue-200">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-blue-100">
              &ldquo;{testimonial.feedback}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
