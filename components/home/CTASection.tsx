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
        {/* Desktop: World Map (60%) Left, CTA Card (40%) Right */}
        <div className="hidden lg:grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">

          {/* Left Side - World Map with Enhanced Dots (60% width) */}
          <div className="relative">
            <div className="relative">
              <img
                src="/world-map.png"
                alt="Global network coverage"
                className="w-full h-auto"
              />

              {/* Enhanced Location dots overlay with better positioning */}
              <div className="absolute inset-0">
                {/* North America - USA (West Coast) */}
                <div className="absolute top-[32%] left-[13%] group">
                  <div className="w-4 h-4 bg-brand-gold rounded-full animate-pulse shadow-lg shadow-brand-gold/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-brand-gold rounded-full animate-ping opacity-75"></div>
                </div>

                {/* North America - USA (East Coast) */}
                <div className="absolute top-[30%] left-[20%] group">
                  <div className="w-3 h-3 bg-brand-gold/80 rounded-full shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* North America - Canada */}
                <div className="absolute top-[22%] left-[16%]">
                  <div className="w-2 h-2 bg-brand-gold/60 rounded-full"></div>
                </div>

                {/* South America - Brazil */}
                <div className="absolute top-[58%] left-[26%] group">
                  <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-700 shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Europe - UK */}
                <div className="absolute top-[24%] left-[47%] group">
                  <div className="w-4 h-4 bg-brand-gold rounded-full animate-pulse delay-200 shadow-lg shadow-brand-gold/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-brand-gold rounded-full animate-ping opacity-75 delay-200"></div>
                </div>

                {/* Europe - Germany */}
                <div className="absolute top-[25%] left-[50%]">
                  <div className="w-3 h-3 bg-brand-gold/80 rounded-full shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Europe - Spain */}
                <div className="absolute top-[30%] left-[47%]">
                  <div className="w-2 h-2 bg-brand-gold/60 rounded-full"></div>
                </div>

                {/* Middle East - UAE */}
                <div className="absolute top-[35%] left-[56%] group">
                  <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-500 shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Africa - South Africa */}
                <div className="absolute top-[62%] left-[51%]">
                  <div className="w-2 h-2 bg-brand-gold/60 rounded-full"></div>
                </div>

                {/* Asia - India */}
                <div className="absolute top-[35%] left-[64%] group">
                  <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-300 shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Asia - China */}
                <div className="absolute top-[30%] left-[70%] group">
                  <div className="w-4 h-4 bg-brand-gold rounded-full animate-pulse delay-400 shadow-lg shadow-brand-gold/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-brand-gold rounded-full animate-ping opacity-75 delay-400"></div>
                </div>

                {/* Asia - Japan */}
                <div className="absolute top-[32%] left-[78%]">
                  <div className="w-3 h-3 bg-brand-gold/80 rounded-full shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Asia - Singapore */}
                <div className="absolute top-[45%] left-[71%] group">
                  <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse delay-600 shadow-md shadow-brand-gold/40"></div>
                </div>

                {/* Australia - Sydney */}
                <div className="absolute top-[68%] left-[82%] group">
                  <div className="w-4 h-4 bg-brand-gold rounded-full animate-pulse delay-800 shadow-lg shadow-brand-gold/50"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-brand-gold rounded-full animate-ping opacity-75 delay-800"></div>
                </div>

                {/* Additional secondary dots for network effect */}
                <div className="absolute top-[40%] left-[67%] w-1.5 h-1.5 bg-brand-gold/40 rounded-full"></div>
                <div className="absolute top-[28%] left-[53%] w-1.5 h-1.5 bg-brand-gold/40 rounded-full"></div>
                <div className="absolute top-[50%] left-[22%] w-1.5 h-1.5 bg-brand-gold/40 rounded-full"></div>
              </div>

              {/* Global Coverage Label */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded border border-brand-gold/30">
                <p className="text-brand-gold font-serif text-sm">Global Network</p>
                <p className="text-gray-400 text-xs font-sans">50+ Countries</p>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Content Card (40% width) */}
          <div className="border border-white/10 backdrop-blur-sm bg-white/5 p-10 rounded-sm">
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-sm mb-4">
              Get Started Today
            </h4>
            <h2 className="font-serif text-white text-4xl mb-6">
              Ready to Ship?
            </h2>
            <p className="text-gray-300 font-sans font-light mb-8 leading-relaxed">
              Join thousands of businesses that trust Waynex Logistics for their
              shipping needs. Get a free quote today.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <Link
                href="/contact"
                className="bg-brand-gold text-black font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 px-8 py-4 hover:bg-white text-sm"
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>

              <a
                href={`tel:${BRAND.phone}`}
                className="border border-white text-white font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 px-8 py-4 hover:bg-white hover:text-black text-sm"
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center text-gray-400 hover:text-brand-gold transition-colors"
              >
                <Phone className="text-brand-gold mr-3" size={18} />
                <span className="font-sans text-sm">{BRAND.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center text-gray-400 hover:text-brand-gold transition-colors font-sans text-sm"
              >
                <span className="text-brand-gold mr-3">✉</span>
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden">
          <div className={`border border-white/10 backdrop-blur-sm bg-white/5 ${
            isMobile ? "p-6 text-center" : "p-10 text-center"
          }`}>
            <h4 className={`text-brand-gold uppercase tracking-[0.3em] mb-4 ${
              isMobile ? "text-[10px]" : "text-sm"
            }`}>
              Get Started Today
            </h4>
            <h2 className={`font-serif text-white mb-4 ${
              isMobile ? "text-3xl" : "text-4xl"
            }`}>
              Ready to Ship?
            </h2>
            <p className={`text-gray-300 font-sans font-light mb-6 ${
              isMobile ? "text-sm" : ""
            }`}>
              Join thousands of businesses that trust Waynex Logistics for their
              shipping needs. Get a free quote today.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <Link
                href="/contact"
                className={`bg-brand-gold text-black font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${
                  isMobile ? "px-6 py-3 text-xs active:scale-95 active:bg-white" : "px-8 py-4"
                }`}
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>

              <a
                href={`tel:${BRAND.phone}`}
                className={`border border-white text-white font-sans font-semibold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${
                  isMobile ? "px-6 py-3 text-xs active:scale-95 active:bg-white active:text-black" : "px-8 py-4"
                }`}
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>

            <div className={`border-t border-white/10 pt-6 flex flex-col space-y-3 ${
              isMobile ? "text-center" : ""
            }`}>
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center justify-center text-gray-400 active:text-brand-gold transition-colors"
              >
                <Phone className={`text-brand-gold ${isMobile ? "mr-2" : "mr-3"}`} size={isMobile ? 16 : 20} />
                <span className={`font-sans ${isMobile ? "text-xs" : "text-sm"}`}>{BRAND.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className={`flex items-center justify-center text-gray-400 active:text-brand-gold transition-colors ${
                  isMobile ? "text-xs" : "font-sans text-sm"
                }`}
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
