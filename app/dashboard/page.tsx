import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlayCircle, UserCircle2 } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { flagshipCourse } from "@/lib/course-data";
import { getFirestore } from "@/lib/firebase/admin";
import PlayerShell from "@/components/video/PlayerShell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const uid = cookies().get("dfm_session")?.value || null;
  const productId = "powerful-public-speaking";

  if (!uid) {
    redirect(`/login?next=${encodeURIComponent("/dashboard")}`);
  }

  const activeCourse = flagshipCourse.courseOffers.find((course) => course.id === productId) || null;
  if (!activeCourse) {
    redirect("/courses");
  }

  let isActive = false;

  try {
    const db = getFirestore();
    const q = await db
      .collection("purchases")
      .where("userId", "==", uid)
      .where("productId", "==", productId)
      .where("status", "==", "active")
      .limit(1)
      .get();

    isActive = !q.empty;
  } catch {
    isActive = false;
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {!isActive ? (
          <section className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-10">
            <div className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
              Purchase Required
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">Course access locked</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
              Aapne yeh course abhi tak nahi kharida hai. Kripya video tutorials aur PDFs dekhne ke liye pehle course purchase karein.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/checkout?productId=powerful-public-speaking"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Go to Checkout
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-3xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-4 text-white sm:p-6">
              <PlayerShell productId={activeCourse.id} isActive={isActive} />
            </section>

            <aside className="rounded-3xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)] p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                Course Structure
              </p>
              <h2 className="mt-2 text-2xl font-bold">{activeCourse.title}</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                {activeCourse.sections.length} sections, {activeCourse.lessons.length} videos, and {activeCourse.pdfs.length} downloadable PDF resources.
              </p>

              <div className="mt-6 space-y-4">
                {activeCourse.sections.map((section) => (
                  <div key={section.id} className="rounded-2xl border border-white/10 bg-[#0f153c] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                        {section.lessons.length} videos
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-blue-100">
                      {section.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                          <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                          <span>{lesson.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f153c] p-4">
                <h3 className="text-lg font-semibold text-white">PDF Resources</h3>
                <div className="mt-4 space-y-3">
                  {activeCourse.pdfs.map((pdf) => (
                    <a
                      key={pdf.id}
                      href={pdf.url}
                      download
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-blue-100 transition hover:bg-white/10"
                    >
                      <span>{pdf.title}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                        Download
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-bg)] px-3 py-2 text-xs text-[color:var(--color-text)]">
                <UserCircle2 className="h-4 w-4" />
                Active access unlocks the full video playlist and PDF resources.
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
