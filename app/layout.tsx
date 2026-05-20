import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dynamic Fast Mind | Learn Fast. Think Dynamic.",
  description:
    "A premium single-program learning funnel for Dynamic Fast Mind.",
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setThemeScript = `try{const t=localStorage.getItem('dfm_theme');if(t){document.documentElement.setAttribute('data-theme',t);}else{const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',prefersDark?'dark':'light');localStorage.setItem('dfm_theme',prefersDark?'dark':'light');}}catch(e){}`;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[color:var(--color-bg)] text-[color:var(--color-text)] transition-colors duration-300">
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
        {children}
      </body>
    </html>
  );
}
