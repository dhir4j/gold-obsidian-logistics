import Link from "next/link";
import { SERVICES } from "@/lib/config";
import {
  Zap,
  Globe,
  Truck,
  Warehouse,
  ShoppingCart,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Zap,
  Globe,
  Truck,
  Warehouse,
  ShoppingCart,
  Package,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4">
            Our Services
          </h2>

          <p className="mt-5 text-gray-300/80 font-sans font-light max-w-2xl mx-auto text-sm md:text-base px-4">
            Comprehensive logistics solutions tailored to your business needs.
            From local deliveries to international shipping, we've got you
            covered.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Cards */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-8">
          <div className="flex gap-4 min-w-max">
            {SERVICES.map((service) => {
              const IconComponent = iconMap[service.icon] || Package;
              return (
                <div
                  key={service.id}
                  className="service-card group bg-brand-dark p-6 border border-white/5 active:border-brand-gold/50 transition-all duration-300 w-[280px] active:scale-95"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent
                      className="text-brand-gold flex-shrink-0"
                      size={32}
                    />
                    <h3 className="text-lg font-serif text-white group-active:text-brand-gold transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 font-sans font-light text-xs leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-[10px] text-gray-500 flex items-center gap-2"
                      >
                        <span className="text-brand-gold">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="inline-block text-[10px] uppercase tracking-widest border-b border-brand-gold pb-1 text-brand-gold"
                  >
                    Learn More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet & Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Package;
            return (
              <div
                key={service.id}
                className="service-card group bg-brand-dark p-6 md:p-8 border border-white/5 hover:border-brand-gold/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <IconComponent
                    className="text-brand-gold flex-shrink-0"
                    size={40}
                  />
                  <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-400 font-sans font-light text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-500 flex items-center gap-2"
                    >
                      <span className="text-brand-gold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="inline-block text-xs uppercase tracking-widest border-b border-brand-gold pb-1 text-brand-gold hover:border-brand-gold/50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-xs md:text-sm tracking-widest uppercase font-semibold active:scale-95"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
