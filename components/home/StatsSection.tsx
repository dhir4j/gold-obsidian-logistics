"use client";

import { STATS } from "@/lib/config";

export default function StatsSection() {
  return (
    <section className="relative py-32 bg-fixed bg-center bg-cover" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')"
    }} aria-label="Company Statistics">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-8">
          "Delivering Excellence, Every Mile."
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <span
                className="block text-4xl md:text-5xl font-serif text-brand-gold"
                data-count={stat.value}
              >
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-white mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
