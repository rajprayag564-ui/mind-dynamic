"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Success", href: "/success-stories" },
    { label: "Contact", href: "/contact" },
  ];

  const showBack = pathname && pathname !== "/";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0F2C]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="mr-1 rounded-md bg-white/5 p-2 text-sm text-blue-100 hover:bg-white/10"
            >
              ←
            </button>
          ) : null}

          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-mark.svg" alt="DFM" width={40} height={40} />
            <Image src="/logo.svg" alt="Dynamic Fast Mind" width={120} height={28} className="hidden md:block" />
          </Link>
        </div>

        <div className="hidden items-center gap-4 text-sm text-blue-100 md:flex">
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

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="rounded-md bg-white/5 p-2 text-blue-100 hover:bg-white/10"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open ? (
          <div className="absolute left-4 right-4 top-16 z-50 rounded-xl bg-[#071033] p-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-blue-100 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm text-white bg-white/5">
                    Dashboard
                  </Link>
                  <Link href="/logout" className="block rounded-md px-3 py-2 text-sm text-white bg-blue-600">
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="block rounded-md px-3 py-2 text-sm text-white bg-white/5">
                    Login
                  </Link>
                  <Link href="/enroll" className="block rounded-md px-3 py-2 text-sm text-white bg-blue-600">
                    Enroll Now
                  </Link>
                  <a
                    href="https://wa.me/918889935635?text=Hello%20I%20am%20interested%20in%20the%20Dynamic%20Fast%20Mind%20course"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-3 py-2 text-sm text-green-400"
                  >
                    Message/WhatsApp
                  </a>
                </>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
