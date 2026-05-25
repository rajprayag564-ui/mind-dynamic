import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[color:var(--color-text)]/10 bg-[color:var(--color-bg)]/95">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h3 className="text-lg font-semibold">Dynamic Fast Mind</h3>
            <p className="mt-3 max-w-xs text-sm text-blue-100">
              Learn fast, retain more, and perform at your peak with structured training designed for ambitious students.
            </p>
            <a
              href="https://wa.me/918889935635?text=Hello%20I%20am%20interested%20in%20the%20Dynamic%20Fast%20Mind%20course"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full border border-green-500/50 px-4 py-2 text-sm font-medium text-green-300 transition hover:bg-green-500/10"
            >
              Chat on WhatsApp
            </a>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/" className="transition hover:text-[color:var(--color-accent)]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="transition hover:text-[color:var(--color-accent)]">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="transition hover:text-[color:var(--color-accent)]">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-[color:var(--color-accent)]">
                  Contact
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Programs</h4>
            <ul className="mt-4 space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/courses/powerful-public-speaking" className="transition hover:text-[color:var(--color-accent)]">
                  Powerful Public Speaking
                </Link>
              </li>
              <li>
                <Link href="/enroll" className="transition hover:text-[color:var(--color-accent)]">
                  Enroll Now
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition hover:text-[color:var(--color-accent)]">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-blue-100">
              <li>
                <a href="mailto:hello@dynamicfastmind.com" className="transition hover:text-[color:var(--color-accent)]">
                  hello@dynamicfastmind.com
                </a>
              </li>
              <li>
                <a href="tel:+918889935635" className="transition hover:text-[color:var(--color-accent)]">
                  +91 88899 35635
                </a>
              </li>
              <li>
                <span className="text-blue-200">Mon-Sat, 10:00 AM-7:00 PM IST</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--color-text)]/10 pt-5 text-xs text-blue-200 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {year} Dynamic Fast Mind. All rights reserved.</p>
          <p>Built for focused learners. Fast, secure, and mobile-ready.</p>
        </div>
      </div>
    </footer>
  );
}
