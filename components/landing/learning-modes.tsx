"use client";

import { useMemo, useState } from "react";

const modes = [
  {
    id: "focus",
    label: "Focus",
    title: "Deep Focus Sessions",
    description:
      "Short guided sessions that train attention and reduce distraction loops.",
  },
  {
    id: "memory",
    label: "Memory",
    title: "Memory Mapping",
    description:
      "Visual recall systems to remember topics quickly and retain them longer.",
  },
  {
    id: "career",
    label: "Career",
    title: "Career Clarity",
    description:
      "Decision frameworks to choose direction based on strengths and opportunities.",
  },
] as const;

export function LearningModes() {
  const [activeModeId, setActiveModeId] = useState<(typeof modes)[number]["id"]>(
    "focus"
  );

  const activeMode = useMemo(
    () => modes.find((mode) => mode.id === activeModeId) ?? modes[0],
    [activeModeId]
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
          Interactive Learning Modes
        </p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Choose Your Learning Lens</h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveModeId(mode.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeModeId === mode.id
                  ? "bg-[color:var(--color-accent)] text-white"
                  : "bg-[color:var(--color-surface)] text-blue-100 hover:opacity-90"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-5 animate-fade-up">
          <h3 className="text-xl font-semibold">{activeMode.title}</h3>
          <p className="mt-2 text-blue-100">{activeMode.description}</p>
        </div>
      </div>
    </section>
  );
}
