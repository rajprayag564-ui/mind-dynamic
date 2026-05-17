import { Brain, GraduationCap, Rocket } from "lucide-react";

const features = [
  {
    title: "Fast Learning",
    description:
      "Use mental performance systems designed to reduce study time and improve memory recall.",
    icon: Brain,
  },
  {
    title: "Expert Mentors",
    description:
      "Learn from proven trainers who understand student pressure and career uncertainty.",
    icon: GraduationCap,
  },
  {
    title: "Real Results",
    description:
      "Follow action-based lessons that create measurable progress in academics and confidence.",
    icon: Rocket,
  },
];

export function FeaturesSection() {
  return (
    <section id="why-us" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold sm:text-3xl">Why Dynamic Fast Mind</h2>
      <p className="mt-2 text-blue-100">
        Structured transformation for students who want speed, clarity, and trust.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <feature.icon className="h-8 w-8 text-[#3B82F6]" />
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-blue-100">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
