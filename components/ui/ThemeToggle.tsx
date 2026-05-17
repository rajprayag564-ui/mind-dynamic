"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dfm_theme");
      if (stored) {
        document.documentElement.setAttribute("data-theme", stored);
        setTheme(stored);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", initial);
        localStorage.setItem("dfm_theme", initial);
        setTheme(initial);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("dfm_theme", next);
    } catch (e) {}
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-md bg-white/5 p-2 text-blue-100 hover:bg-white/10"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
