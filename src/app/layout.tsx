import type { Metadata } from "next";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrantFlow - Grant Management Platform",
  description: "Centralized grant management platform for researching, writing, tracking, and managing grants end-to-end.",
  keywords: ["GrantFlow", "Grant Management", "Grant Writing", "Grant Tracking", "Financials"],
  authors: [{ name: "GrantFlow Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GrantFlow - Grant Management Platform",
    description: "Centralized grant management platform for researching, writing, tracking, and managing grants end-to-end.",
    siteName: "GrantFlow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${baskerville.variable} ${lato.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
