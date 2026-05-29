import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenpulse — Tech that fits your life",
  description: "Premium tech gadgets for the modern lifestyle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">Zenpulse</Link>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-black transition">Products</Link>
          </div>
        </nav>
        {children}
        <footer className="border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400 mt-auto">
          © 2026 Zenpulse. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
