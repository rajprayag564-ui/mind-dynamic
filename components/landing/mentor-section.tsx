import Image from "next/image";

export function MentorSection() {
  return (
    <section id="mentor" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2 md:items-center md:p-8">
        <Image
          src="/images/mentor-photo.svg"
          alt="Mentor behind Dynamic Fast Mind"
          width={640}
          height={460}
          className="h-full w-full rounded-xl object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Meet the Mentor</h2>
          <p className="mt-4 leading-7 text-blue-100">
            Dynamic Fast Mind is led by a mentor team focused on student cognition,
            exam performance, and career planning. The framework combines practical
            mental training with step-by-step decision guidance so students can move
            from confusion to control.
          </p>
          <p className="mt-4 leading-7 text-blue-100">
            This is not generic motivation. It is a proven learning system designed for
            measurable academic and career outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
