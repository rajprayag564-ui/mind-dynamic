"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const phone = "918889935635"; // India +91
    const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${encodeURIComponent(message)}`;
    const url = `https://wa.me/${phone}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-blue-100">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
              className="mt-1 w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)] px-3 py-2 text-[color:var(--color-text)] outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-100">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
            className="mt-1 w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)] px-3 py-2 text-[color:var(--color-text)] outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-100">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
            className="mt-1 w-full rounded-lg border border-[color:var(--color-text)]/15 bg-[color:var(--color-surface)] px-3 py-2 text-[color:var(--color-text)] outline-none"
          rows={5}
          placeholder="Tell us what you need — course enquiry, consulting, live sessions..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Send via WhatsApp
        </button>
      </div>
    </form>
  );
}
