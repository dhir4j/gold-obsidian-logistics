"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND } from "@/lib/config";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CTASection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="contact"
      className={`bg-gradient-to-br from-gray-900 to-black relative overflow-hidden ${
        isMobile ? "py-16" : "py-24"
      }`}
    >
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>

      <div className={`max-w-7xl mx-auto relative z-10 ${isMobile ? "px-4" : "px-6"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - CTA Content */}
          <div className={`border border-white/10 backdrop-blur-sm bg-white/5 ${
            isMobile ? "p-6 text-center" : "text-center lg:text-left p-10 md:p-16 rounded-sm"
          }`}>
            <h4 className={`text-brand-gold uppercase tracking-[0.3em] mb-4 ${
              isMobile ? "text-[10px]" : "text-sm"
            }`}>
              Get Started Today
            </h4>
            <h2 className={`font-serif text-white mb-4 md:mb-6 ${
              isMobile ? "text-3xl" : "text-4xl md:text-6xl"
            }`}>
              Ready to Ship?
            </h2>
            <p className={`text-gray-300 font-sans font-light mb-6 md:mb-10 ${
              isMobile ? "text-sm" : ""
            }`}>
              Join thousands of businesses that trust Waynex Logistics for their
              shipping needs. Get a free quote today.
            </p>

            <div className={`flex gap-3 md:gap-4 ${
              isMobile ? "flex-col" : "flex-col sm:flex-row"
            }`}>
              <Link
                href="/contact"
                className={`bg-brand-gold text-black font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${
                  isMobile
                    ? "px-6 py-3 text-xs active:scale-95 active:bg-white"
                    : "px-10 py-4 hover:bg-white"
                }`}
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>

              <a
                href={`tel:${BRAND.phone}`}
                className={`border border-white text-white font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${
                  isMobile
                    ? "px-6 py-3 text-xs active:scale-95 active:bg-white active:text-black"
                    : "px-10 py-4 hover:bg-white hover:text-black"
                }`}
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>

            <div className={`border-t border-white/10 flex items-center space-y-0 ${
              isMobile
                ? "mt-6 pt-6 flex-col space-y-3 text-center"
                : "mt-10 pt-8 flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8"
            }`}>
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center text-gray-400 active:text-brand-gold transition-colors"
              >
                <Phone className={`text-brand-gold ${isMobile ? "mr-2" : "mr-3"}`} size={isMobile ? 16 : 20} />
                <span className={`font-sans ${isMobile ? "text-xs" : "text-sm"}`}>{BRAND.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className={`flex items-center text-gray-400 active:text-brand-gold transition-colors ${
                  isMobile ? "text-xs" : "font-sans text-sm"
                }`}
              >
                {BRAND.email}
              </a>
            </div>
          </div>

          {/* Right Side - World Map with Dots */}
          <div className="relative hidden lg:block">
            <div className="relative">
              <img
                src="/world-map.png"
                alt="Global network coverage"
                className="w-full h-auto"
              />
              {/* Location dots overlay */}
              <div className="absolute inset-0">
                {/* North America */}
                <div className="absolute top-[30%] left-[15%] w-3 h-3 bg-brand-gold rounded-full animate-pulse"></div>
                <div className="absolute top-[35%] left-[18%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>

                {/* Europe */}
                <div className="absolute top-[25%] left-[48%] w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-100"></div>
                <div className="absolute top-[28%] left-[50%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>

                {/* Asia */}
                <div className="absolute top-[32%] left-[75%] w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-200"></div>
                <div className="absolute top-[35%] left-[72%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>
                <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>

                {/* Middle East */}
                <div className="absolute top-[38%] left-[55%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>

                {/* South America */}
                <div className="absolute top-[60%] left-[25%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>

                {/* Australia */}
                <div className="absolute top-[65%] left-[82%] w-2 h-2 bg-brand-gold/60 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
