import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://dynamicfastmind.com"),
  title: {
    default: "Dynamic Fast Mind | Learn Fast. Think Dynamic.",
    template: "%s | Dynamic Fast Mind",
  },
  description:
    "Dynamic Fast Mind helps students learn faster, improve memory recall, and build confident communication through structured online training.",
  keywords: [
    "dynamic fast mind",
    "public speaking course",
    "student learning program",
    "memory improvement course",
    "focus training for students",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dynamic Fast Mind | Learn Fast. Think Dynamic.",
    description:
      "Structured online training to build focus, memory, and communication confidence for students.",
    siteName: "Dynamic Fast Mind",
    images: [
      {
        url: "/images/hero-illustration.svg",
        width: 1200,
        height: 630,
        alt: "Dynamic Fast Mind training platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic Fast Mind | Learn Fast. Think Dynamic.",
    description:
      "Structured online training to build focus, memory, and communication confidence for students.",
    images: ["/images/hero-illustration.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
