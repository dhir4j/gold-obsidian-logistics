"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND, COMPANY_INFO, SOCIAL_LINKS } from "@/lib/config";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className={`bg-black border-t border-white/10 ${isMobile ? "py-8" : "py-12"}`}>
      <div className={`max-w-7xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
        <div className={`grid gap-8 mb-6 md:mb-8 ${
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4 gap-12"
        }`}>
          {/* Column 1 - Brand Info */}
          <div className={isMobile ? "text-center" : ""}>
            <Link href="/" className={`inline-block mb-4 ${isMobile ? "mx-auto" : ""}`}>
              <Image
                src="/new_gold_logo.png"
                alt={BRAND.name}
                width={isMobile ? 120 : 150}
                height={isMobile ? 40 : 50}
                className={isMobile ? "h-8 w-auto" : "h-10 w-auto"}
              />
            </Link>
            <p className={`text-gray-400 leading-relaxed mb-4 ${
              isMobile ? "text-xs" : "text-sm"
            }`}>
              {COMPANY_INFO.tagline}
            </p>
            <p className={`text-gray-400 font-medium ${isMobile ? "text-[10px]" : "text-xs"}`}>
              Waynex Travels &amp; Logistics Opc Pvt Ltd
            </p>
            <p className={`text-gray-500 ${isMobile ? "text-[10px]" : "text-xs"}`}>
              GST: {COMPANY_INFO.gst}
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className={isMobile ? "text-center" : ""}>
            <h3 className={`text-white font-sans font-semibold uppercase tracking-widest mb-4 ${
              isMobile ? "text-xs" : "text-sm"
            }`}>
              Quick Links
            </h3>
            <ul className={isMobile ? "space-y-2" : "space-y-3"}>
              <li>
                <Link
                  href="/about"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/tracking"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div className={isMobile ? "text-center" : ""}>
            <h3 className={`text-white font-sans font-semibold uppercase tracking-widest mb-4 ${
              isMobile ? "text-xs" : "text-sm"
            }`}>
              Legal
            </h3>
            <ul className={isMobile ? "space-y-2" : "space-y-3"}>
              <li>
                <Link
                  href="/privacy-policy"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className={`text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className={isMobile ? "text-center" : ""}>
            <h3 className={`text-white font-sans font-semibold uppercase tracking-widest mb-4 ${
              isMobile ? "text-xs" : "text-sm"
            }`}>
              Head Office
            </h3>
            <address className={`not-italic text-gray-400 leading-relaxed mb-4 ${
              isMobile ? "text-xs" : "text-sm"
            }`}>
              {COMPANY_INFO.address}
            </address>
            <div className={`space-y-2 text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${BRAND.phone}`}
                  className="hover:text-brand-gold active:text-brand-gold transition-colors"
                >
                  {BRAND.phoneDisplay}
                </a>
              </p>
              <p className={isMobile ? "break-all" : ""}>
                Email:{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-brand-gold active:text-brand-gold transition-colors"
                >
                  {BRAND.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-white/10 flex items-center ${
          isMobile
            ? "pt-6 flex-col gap-4"
            : "pt-8 flex-col md:flex-row justify-between"
        }`}>
          <p className={`text-gray-500 font-sans tracking-wider text-center ${
            isMobile ? "text-[10px]" : "text-xs"
          }`}>
            &copy; {currentYear} {BRAND.name}. All Rights Reserved.
          </p>

          <div className={`flex space-x-4 md:space-x-6 ${isMobile ? "" : "mt-4 md:mt-0"}`}>
            <a
              href={SOCIAL_LINKS.github}
              className="text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors active:scale-95"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={isMobile ? 18 : 20} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              className="text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors active:scale-95"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={isMobile ? 18 : 20} />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              className="text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors active:scale-95"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={isMobile ? 18 : 20} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              className="text-gray-400 hover:text-brand-gold active:text-brand-gold transition-colors active:scale-95"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={isMobile ? 18 : 20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
