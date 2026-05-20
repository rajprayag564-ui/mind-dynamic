import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-text)]/10 bg-[color:var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-blue-100 sm:flex-row sm:px-6">
        <p>Copyright © {new Date().getFullYear()} Dynamic Fast Mind</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-[color:var(--color-accent)]">
            Home
          </Link>
          <Link href="/courses" className="hover:text-[color:var(--color-accent)]">
            Courses
          </Link>
          <Link href="/success-stories" className="hover:text-[color:var(--color-accent)]">
            Success
          </Link>
          <Link href="/contact" className="hover:text-[color:var(--color-accent)]">
            Contact
          </Link>
          <a
            href="https://wa.me/918889935635?text=Hello%20I%20am%20interested%20in%20the%20Dynamic%20Fast%20Mind%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[color:var(--color-accent)]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
