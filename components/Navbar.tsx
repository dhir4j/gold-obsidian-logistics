"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND, NAVIGATION } from "@/lib/config";
import { Menu, X, Home, Package, Phone, User } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock scroll when menu is open
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Icon mapping for mobile nav
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return <Home size={20} />;
      case "services":
        return <Package size={20} />;
      case "contact":
        return <Phone size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isMobile ? "px-4 py-3" : "px-6 py-4"
        } ${scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : ""}`}
        id="navbar"
        aria-label="Primary"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/new_gold_logo.png"
              alt={BRAND.name}
              width={isMobile ? 140 : 180}
              height={isMobile ? 47 : 60}
              className={isMobile ? "h-9 w-auto" : "h-12 w-auto"}
              priority
            />
          </Link>

          <div className="hidden md:flex space-x-8 text-sm font-sans tracking-widest uppercase">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/signup"
            className="hidden md:block px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 font-sans text-xs tracking-widest uppercase"
          >
            Sign Up
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white active:scale-95 transition-transform"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
          >
            <Menu size={isMobile ? 22 : 24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen App-like */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 z-[60] ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        >
          {/* Full screen menu content */}
          <div
            className="relative h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <Link href="/" onClick={closeMenu} className="flex items-center">
                <Image
                  src="/new_gold_logo.png"
                  alt={BRAND.name}
                  width={140}
                  height={47}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                onClick={closeMenu}
                className="text-white active:scale-95 transition-transform p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items - App-like Grid */}
            <div className="flex-1 overflow-y-auto px-4 py-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 active:scale-95 transition-all duration-200 active:bg-brand-gold/20"
                    onClick={closeMenu}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-brand-gold/10 rounded-full group-active:bg-brand-gold/20 transition-colors">
                        {getIcon(item.label) || <Package size={24} />}
                      </div>
                      <span className="font-sans text-sm uppercase tracking-wider text-white">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Additional Quick Actions */}
              <div className="space-y-3 mb-6">
                <Link
                  href="/tracking"
                  className="block w-full bg-brand-gold text-black py-4 px-6 font-sans text-sm tracking-widest uppercase font-semibold text-center active:scale-95 transition-transform"
                  onClick={closeMenu}
                >
                  Track Shipment
                </Link>

                <Link
                  href="/signup"
                  className="block w-full border-2 border-white text-white py-4 px-6 font-sans text-sm tracking-widest uppercase font-semibold text-center active:scale-95 transition-transform"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded">
                <h3 className="text-brand-gold uppercase tracking-wider text-xs mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3 text-sm">
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="flex items-center gap-3 text-gray-300 active:text-brand-gold transition-colors"
                  >
                    <Phone size={16} className="text-brand-gold" />
                    <span>{BRAND.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-3 text-gray-300 active:text-brand-gold transition-colors"
                  >
                    <span className="text-brand-gold">✉</span>
                    <span className="text-xs">{BRAND.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
