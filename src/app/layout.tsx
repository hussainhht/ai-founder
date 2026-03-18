import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AI Founder",
  description: "Discover AI tools for writing, coding, creativity, productivity, and research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
