import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Thank you — Payment Submitted</h1>
        <p className="mt-4 text-blue-100">We have received your payment details. Verification is pending.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/dashboard" className="rounded bg-blue-600 px-4 py-2 font-semibold">
            Go to Dashboard
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
