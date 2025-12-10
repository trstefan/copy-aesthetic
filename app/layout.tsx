import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copy Aesthetic – Theme Preview & UI Style Prompts",
  description:
    "Preview curated UI themes, see them applied to a live mock interface, and instantly copy ready-made aesthetic prompts for your design or AI workflow.",
  keywords: [
    "UI themes",
    "design prompts",
    "aesthetic prompts",
    "theme preview",
    "mockup UI",
    "copy prompts",
    "AI design",
    "Tailwind themes",
    "UI inspiration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
