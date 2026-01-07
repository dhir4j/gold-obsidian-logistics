import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: `${BRAND.name} - ${BRAND.tagline}`,
  description: "Global logistics solutions powered by innovation and reliability. Express delivery, international shipping, and freight services worldwide.",
  keywords: "logistics, shipping, freight, express delivery, international shipping, warehousing, supply chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Loader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
