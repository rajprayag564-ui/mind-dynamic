import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07112a] text-white">
      <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">Contact Dynamic Fast Mind</h1>
        <p className="mt-2 text-sm text-blue-200">Send a message and we will reach you on WhatsApp.</p>

        <section className="mt-8 rounded-2xl border border-[color:var(--color-text)]/10 bg-[color:var(--color-surface)]/95 p-6">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
