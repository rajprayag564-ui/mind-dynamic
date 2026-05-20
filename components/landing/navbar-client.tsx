"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Dialog, Transition } from "@headlessui/react";

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
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-accent)]/15 bg-[color:var(--color-bg)]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="mr-1 rounded-md bg-[color:var(--color-accent)]/10 p-2 text-sm text-[color:var(--color-text)] hover:bg-[color:var(--color-accent)]/15"
            >
              ←
            </button>
          ) : null}

          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-mark.svg" alt="DFM" width={40} height={40} />
            <Image src="/logo.svg" alt="Dynamic Fast Mind" width={120} height={28} className="hidden md:block" />
          </Link>
        </div>

        <div className="hidden items-center gap-4 text-sm text-[color:var(--color-text)]/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[color:var(--color-text)]">
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full border border-[color:var(--color-accent)]/20 px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-accent)]/10"
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
                className="rounded-full border border-[color:var(--color-accent)]/20 px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-accent)]/10"
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

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="ml-2 rounded-md bg-white/5 p-2 text-blue-100 hover:bg-white/10"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <Transition show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50 md:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-300"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-300"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                      <div className="flex h-full flex-col overflow-y-auto bg-[color:var(--color-bg)] py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-semibold text-[color:var(--color-text)]">Menu</h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-[color:var(--color-accent)]/10 p-1 text-[color:var(--color-text)] hover:bg-[color:var(--color-accent)]/15"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                          <div className="flex flex-col gap-3">
                            {links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-sm text-[color:var(--color-text)]/80 hover:bg-[color:var(--color-accent)]/10"
                              >
                                {link.label}
                              </Link>
                            ))}

                            {isLoggedIn ? (
                              <>
                                <Link href="/dashboard" className="block rounded-md px-3 py-2 text-sm text-[color:var(--color-text)] bg-[color:var(--color-accent)]/10">
                                  Dashboard
                                </Link>
                                <Link href="/logout" className="block rounded-md px-3 py-2 text-sm text-white bg-blue-600">
                                  Logout
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link href="/login" className="block rounded-md px-3 py-2 text-sm text-[color:var(--color-text)] bg-[color:var(--color-accent)]/10">
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
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </nav>
    </header>
  );
}
