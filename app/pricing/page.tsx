import Link from "next/link";
import { BRAND } from "@/lib/config";
import { COUNTRY_PRICING } from "@/lib/pricing-data";
import { Package, Clock, Shield, ArrowRight } from "lucide-react";

export const metadata = {
  title: `International Shipping Rates - ${BRAND.name}`,
  description: "Competitive international courier rates to over 50 countries. Get instant quotes for shipping to USA, UK, Canada, Australia, Dubai, and more.",
};

export default function PricingPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mt-4 mb-6">
              International <span className="italic text-brand-gold">Shipping Rates</span>
            </h1>
            <p className="text-gray-300 font-sans font-light text-base md:text-lg leading-relaxed">
              Competitive rates for shipping to over 50 countries worldwide.
              Choose your destination to view detailed pricing and delivery times.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-4">
                <Package className="text-brand-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">
                Volume Discounts
              </h3>
              <p className="text-gray-400 text-sm">
                Better rates for heavier shipments
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-4">
                <Clock className="text-brand-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-400 text-sm">
                Express options available
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-4">
                <Shield className="text-brand-gold" size={32} />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">
                Fully Insured
              </h3>
              <p className="text-gray-400 text-sm">
                Complete shipment protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Pricing Grid */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              Select Destination
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mt-4 text-white">
              Shipping Rates by Country
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {COUNTRY_PRICING.map((country) => (
              <Link
                key={country.slug}
                href={`/pricing/${country.slug}`}
                className="group bg-brand-gray border border-white/10 overflow-hidden hover:border-brand-gold/50 transition-all duration-300"
              >
                {/* Country Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.image_url}
                    alt={`Courier to ${country.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-serif text-white group-hover:text-brand-gold transition-colors">
                      {country.country}
                    </h3>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Starting From
                    </span>
                    <span className="text-xs text-brand-gold uppercase tracking-wider">
                      {country.delivery_time}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-serif text-brand-gold">
                      ₹{country.rates[country.rates.length - 1].price_per_kg.replace("/Kg", "")}
                      <span className="text-sm text-gray-400">/Kg</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {country.rates[country.rates.length - 1].weight_slab}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-brand-gold text-sm font-sans uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                    View Rates
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-brand-gray border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
            Need a Custom Quote?
          </h3>
          <p className="text-gray-400 mb-8">
            For bulk shipments, special cargo, or destinations not listed,
            contact our team for personalized pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-black font-sans text-sm tracking-widest uppercase font-semibold hover:bg-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
