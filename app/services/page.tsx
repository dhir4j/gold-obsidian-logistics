import Link from "next/link";
import { BRAND, SERVICES, DELIVERY_TYPES } from "@/lib/config";
import {
  Zap,
  Globe,
  Truck,
  Warehouse,
  ShoppingCart,
  Package,
  Check,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  Zap,
  Globe,
  Truck,
  Warehouse,
  ShoppingCart,
  Package,
};

export const metadata = {
  title: `Services - ${BRAND.name}`,
  description:
    "Comprehensive logistics services including express delivery, international shipping, freight services, warehousing, and specialized cargo handling.",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            What We Offer
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mt-4 mb-6">
            Our <span className="italic text-brand-gold">Services</span>
          </h1>
          <p className="text-gray-300 font-sans font-light text-lg leading-relaxed max-w-3xl mx-auto">
            End-to-end logistics solutions designed to meet the unique needs of
            your business. From single packages to full freight, we deliver
            excellence.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {SERVICES.map((service) => {
              const IconComponent = iconMap[service.icon] || Package;
              return (
                <div
                  key={service.id}
                  className="bg-brand-dark p-10 border border-white/10 hover:border-brand-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <IconComponent
                          className="text-brand-gold"
                          size={32}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 font-sans font-light text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-gray-300 text-sm flex items-center gap-3"
                          >
                            <Check className="text-brand-gold flex-shrink-0" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold"
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              Industry Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">
              What We Deliver
            </h2>
            <p className="mt-5 text-gray-300/80 font-sans font-light max-w-2xl mx-auto">
              Specialized handling for diverse industries and cargo types
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DELIVERY_TYPES.map((type, index) => (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="font-serif text-white text-lg mb-1">
                    {type.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-sans font-light">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">
              Simple & Streamlined
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold text-black font-serif text-2xl flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-serif text-white mb-3">
                Book Your Shipment
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm">
                Request a quote online, via phone, or through our app
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold text-black font-serif text-2xl flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-serif text-white mb-3">
                We Pick Up
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm">
                Our team collects your shipment at your location
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold text-black font-serif text-2xl flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-serif text-white mb-3">
                Track Progress
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm">
                Monitor your shipment in real-time with GPS tracking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold text-black font-serif text-2xl flex items-center justify-center mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-serif text-white mb-3">
                Safe Delivery
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm">
                Secure delivery with proof of receipt and signature
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Ready to Ship?
          </h2>
          <p className="text-gray-300 font-sans font-light mb-10 max-w-2xl mx-auto">
            Get started with Waynex Logistics today. Contact us for a free quote
            or to discuss your specific logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold"
            >
              Request Quote
            </Link>
            <Link
              href="/tracking"
              className="px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold"
            >
              Track Shipment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
