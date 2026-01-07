"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { ArrowRight, Plane, Clock, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="home"
      className={`relative w-full flex items-center justify-center overflow-hidden bg-black ${
        isMobile ? "min-h-[100dvh]" : "min-h-screen"
      }`}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: isMobile ? "none" : `translateY(${scrollY * 0.5}px)`,
          willChange: isMobile ? "auto" : "transform",
        }}
      >
        <div className={`absolute inset-0 z-10 ${
          isMobile
            ? "bg-gradient-to-b from-black/80 via-black/60 to-black"
            : "bg-gradient-to-b from-black/70 via-black/50 to-black"
        }`}></div>
        <img
          src="/hero_aeroplane.webp"
          alt="Waynex Logistics - Global Air Freight Solutions"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content Container */}
      <div className={`relative z-20 w-full max-w-7xl mx-auto ${
        isMobile ? "px-4 py-20" : "px-6 py-32"
      }`}>
        {/* Main Hero Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Message */}
          <div className={isMobile ? "space-y-6" : "space-y-8"}>
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <div className={`h-[1px] bg-brand-gold ${isMobile ? "w-8" : "w-12"}`}></div>
              <span className={`text-brand-gold font-sans uppercase ${
                isMobile ? "text-[10px] tracking-[0.2em]" : "text-xs md:text-sm tracking-[0.3em]"
              }`}>
                {BRAND.tagline}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`font-serif text-white leading-tight ${
              isMobile ? "text-4xl" : "text-5xl md:text-6xl lg:text-7xl"
            }`}>
              Connecting
              <br />
              <span className="text-brand-gold italic">the World</span>
              <br />
              Through Logistics
            </h1>

            {/* Description */}
            <p className={`text-gray-300 font-sans leading-relaxed max-w-xl ${
              isMobile ? "text-sm" : "text-lg"
            }`}>
              Experience seamless global shipping with cutting-edge technology,
              real-time tracking, and unmatched reliability.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col gap-3 ${isMobile ? "pt-2" : "sm:flex-row gap-4 pt-4"}`}>
              <Link
                href="/contact"
                className={`group relative inline-flex items-center justify-center bg-brand-gold text-black font-sans tracking-widest uppercase font-semibold overflow-hidden transition-all duration-300 ${
                  isMobile
                    ? "px-6 py-4 text-xs active:scale-95"
                    : "px-8 py-4 text-sm hover:bg-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight size={isMobile ? 16 : 18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/tracking"
                className={`group inline-flex items-center justify-center border-2 border-white text-white font-sans tracking-widest uppercase font-semibold transition-all duration-300 ${
                  isMobile
                    ? "px-6 py-4 text-xs active:scale-95 active:bg-white active:text-black"
                    : "px-8 py-4 text-sm hover:bg-white hover:text-black"
                }`}
              >
                Track Shipment
              </Link>
            </div>

            {/* Quick Stats */}
            <div className={`grid grid-cols-3 gap-4 border-t border-white/10 ${
              isMobile ? "pt-6" : "gap-6 pt-8"
            }`}>
              <div>
                <div className={`font-serif text-brand-gold mb-1 ${isMobile ? "text-2xl" : "text-3xl"}`}>
                  <AnimatedCounter start={5000} />
                </div>
                <div className={`text-gray-400 uppercase tracking-wider ${isMobile ? "text-[10px]" : "text-xs"}`}>
                  Deliveries
                </div>
              </div>
              <div>
                <div className={`font-serif text-brand-gold mb-1 ${isMobile ? "text-2xl" : "text-3xl"}`}>
                  50+
                </div>
                <div className={`text-gray-400 uppercase tracking-wider ${isMobile ? "text-[10px]" : "text-xs"}`}>
                  Countries
                </div>
              </div>
              <div>
                <div className={`font-serif text-brand-gold mb-1 ${isMobile ? "text-2xl" : "text-3xl"}`}>
                  24/7
                </div>
                <div className={`text-gray-400 uppercase tracking-wider ${isMobile ? "text-[10px]" : "text-xs"}`}>
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Highlights (Desktop Only) */}
          <div className="hidden lg:flex flex-col gap-6">
            {/* Feature Card 1 */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-brand-gold/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded">
                  <Plane className="text-brand-gold" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand-gold transition-colors">
                    Express Air Freight
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Global air cargo services with priority handling and expedited customs clearance.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-brand-gold/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded">
                  <Clock className="text-brand-gold" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand-gold transition-colors">
                    Real-Time Tracking
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Monitor your shipments every step of the way with live GPS tracking and updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-brand-gold/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-gold/10 rounded">
                  <Shield className="text-brand-gold" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-brand-gold transition-colors">
                    Secure & Insured
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Comprehensive insurance coverage and secure handling for complete peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Feature Cards - Horizontal Scroll */}
        {isMobile && (
          <div className="mt-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 w-[280px] active:scale-95 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-brand-gold/10 rounded">
                    <Plane className="text-brand-gold" size={24} />
                  </div>
                  <h4 className="text-sm font-sans uppercase tracking-wider text-white">
                    Air Freight
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Global air cargo with priority handling
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 w-[280px] active:scale-95 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-brand-gold/10 rounded">
                    <Clock className="text-brand-gold" size={24} />
                  </div>
                  <h4 className="text-sm font-sans uppercase tracking-wider text-white">
                    Live Tracking
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Real-time GPS tracking and updates
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 w-[280px] active:scale-95 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-brand-gold/10 rounded">
                    <Shield className="text-brand-gold" size={24} />
                  </div>
                  <h4 className="text-sm font-sans uppercase tracking-wider text-white">
                    Fully Insured
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Complete insurance coverage included
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tablet Feature Cards */}
        <div className="hidden sm:grid lg:hidden grid-cols-3 gap-4 mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
            <Plane className="text-brand-gold mx-auto mb-3" size={32} />
            <h4 className="text-sm font-sans uppercase tracking-wider text-white mb-2">
              Air Freight
            </h4>
            <p className="text-xs text-gray-400">Global express delivery</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
            <Clock className="text-brand-gold mx-auto mb-3" size={32} />
            <h4 className="text-sm font-sans uppercase tracking-wider text-white mb-2">
              Live Tracking
            </h4>
            <p className="text-xs text-gray-400">Real-time updates</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
            <Shield className="text-brand-gold mx-auto mb-3" size={32} />
            <h4 className="text-sm font-sans uppercase tracking-wider text-white mb-2">
              Fully Insured
            </h4>
            <p className="text-xs text-gray-400">Complete protection</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest mb-2 text-gray-400 font-sans">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>
      )}

      {/* Decorative Elements - Hidden on Mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 right-10 w-2 h-2 bg-brand-gold rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-32 w-1 h-1 bg-brand-gold rounded-full opacity-40"></div>
          <div className="absolute bottom-1/4 left-10 w-2 h-2 bg-brand-gold rounded-full opacity-50 animate-pulse delay-100"></div>
        </>
      )}
    </header>
  );
}
