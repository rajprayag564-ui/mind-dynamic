import Link from "next/link";
import { Lock, PlayCircle, UserCircle2 } from "lucide-react";
import { flagshipCourse } from "@/lib/course-data";

export default function DashboardPage() {
  const mindLessons = flagshipCourse.curriculum.mindTraining;
  const careerLessons = flagshipCourse.curriculum.careerGuidance;

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h1 className="mb-4 text-lg font-bold">Dynamic Fast Mind</h1>
          <p className="mb-4 truncate text-xs text-blue-200">Logged in session</p>
          <nav className="space-y-2 text-sm">
            <a className="block rounded-lg bg-[#3B82F6]/20 px-3 py-2 font-medium text-blue-100">
              My Course
            </a>
            <a className="block rounded-lg px-3 py-2 text-blue-100 hover:bg-white/10">
              Profile
            </a>
            <a className="block rounded-lg px-3 py-2 text-blue-100 hover:bg-white/10">
              Support
            </a>
            <Link
              href="/logout"
              className="mt-4 flex w-full items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-left text-blue-100 transition hover:bg-white/10"
            >
              Logout
            </Link>
          </nav>
        </aside>

        <main className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6">
          <section className="rounded-xl border border-white/10 bg-[#0f153c] p-6">
            <div className="flex aspect-video flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#0b102f] text-center">
              <PlayCircle className="h-12 w-12 text-[#3B82F6]" />
              <p className="mt-3 text-lg font-semibold">Video coming soon</p>
              <p className="mt-1 text-sm text-blue-200">Your selected lesson will appear here.</p>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">Video Playlist</h2>

            <div className="mt-4 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
                  Mind Training
                </h3>
                <ul className="space-y-2">
                  {mindLessons.map((lesson, index) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-[#101943] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        {index === 0 ? (
                          <PlayCircle className="h-4 w-4 text-[#3B82F6]" />
                        ) : (
                          <Lock className="h-4 w-4 text-blue-300" />
                        )}
                        <span className="text-sm sm:text-base">{lesson.title}</span>
                      </div>
                      <span className="text-xs text-blue-200">
                        {index === 0 ? "Playing" : "Locked"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
                  Career Guidance
                </h3>
                <ul className="space-y-2">
                  {careerLessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-[#101943] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="h-4 w-4 text-blue-300" />
                        <span className="text-sm sm:text-base">{lesson.title}</span>
                      </div>
                      <span className="text-xs text-blue-200">Locked</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0e1438] px-3 py-2 text-xs text-blue-200">
              <UserCircle2 className="h-4 w-4" />
              Dashboard prototype: progress and playback are mock states.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
