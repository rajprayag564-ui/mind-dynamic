import Link from "next/link";
import { cookies } from "next/headers";

export function Navbar() {
  const isLoggedIn = cookies().get("dfm_session")?.value === "1";

  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Success", href: "/success-stories" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0F2C]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-mark.svg" alt="DFM" className="h-10 w-10" />
          <img src="/logo.svg" alt="Dynamic Fast Mind" className="hidden h-8 md:block" />
        </Link>

        <div className="flex items-center gap-5 text-sm text-blue-100">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/logout"
                className="rounded-full bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/enroll"
                className="rounded-full bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Enroll Now
              </Link>
              <a
                href="https://wa.me/918889935635?text=Hello%20I%20am%20interested%20in%20the%20Dynamic%20Fast%20Mind%20course"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-green-500 px-4 py-2 text-sm font-semibold text-green-400 transition hover:bg-green-900/20"
              >
                Message/WhatsApp
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}