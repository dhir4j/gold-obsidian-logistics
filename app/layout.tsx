"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { BRAND } from "@/lib/config";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isEmployee = pathname?.startsWith('/employee');
  const hideChrome = isDashboard || isEmployee;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/forsvg.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <Loader />
        {!hideChrome && <Navbar />}
        {children}
        {!hideChrome && <Footer />}
      </body>
    </html>
  );
}
