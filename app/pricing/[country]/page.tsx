import { notFound } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { getCountryBySlug, getAllCountrySlugs, COUNTRY_PRICING } from "@/lib/pricing-data";
import { ArrowLeft, Check, Clock, Package, Shield, Plane } from "lucide-react";

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({
    country: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const countryData = getCountryBySlug(country);

  if (!countryData) {
    return {
      title: "Country Not Found",
    };
  }

  return {
    title: `Courier to ${countryData.country} - Rates & Pricing | ${BRAND.name}`,
    description: `${countryData.description} Delivery time: ${countryData.delivery_time}. Get instant quotes for shipping to ${countryData.country}.`,
  };
}

export default async function CountryPricingPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const countryData = getCountryBySlug(country);

  if (!countryData) {
    notFound();
  }

  // Get related countries (other destinations)
  const relatedCountries = COUNTRY_PRICING.filter(
    (c) => c.slug !== country
  ).slice(0, 3);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-brand-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-brand-gold transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/pricing" className="text-gray-400 hover:text-brand-gold transition-colors">
              Pricing
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{countryData.country}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={countryData.image_url}
            alt={`Courier to ${countryData.country}`}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-8 text-sm uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Back to All Countries
          </Link>

          <div className="max-w-3xl">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              International Shipping
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mt-4 mb-6">
              Courier to <span className="italic text-brand-gold">{countryData.country}</span>
            </h1>
            <p className="text-gray-300 font-sans font-light text-base md:text-lg leading-relaxed">
              {countryData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 md:py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pricing */}
            <div className="lg:col-span-2">
              <div className="bg-brand-dark border border-white/10 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif text-white">
                    Shipping Rates
                  </h2>
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Clock size={20} />
                    <span className="text-sm font-sans">{countryData.delivery_time}</span>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="space-y-4">
                  {countryData.rates.map((rate, index) => (
                    <div
                      key={index}
                      className="bg-brand-gray border border-white/10 p-6 hover:border-brand-gold/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-serif text-white mb-2">
                            {rate.weight_slab}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Ideal for {index === 0 ? "small" : index === 1 ? "medium" : "bulk"} shipments
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-serif text-brand-gold">
                            ₹{rate.price_per_kg}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Per Kilogram</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-brand-gold/5 border border-brand-gold/20">
                  <p className="text-sm text-gray-300">
                    <strong className="text-brand-gold">Note:</strong> Rates are subject to volumetric weight calculations.
                    Customs duties and taxes (if applicable) are not included in the above rates.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Features & CTA */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-brand-dark border border-white/10 p-6">
                <h3 className="text-xl font-serif text-white mb-6">
                  Service Features
                </h3>
                <ul className="space-y-4">
                  {countryData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center mt-0.5">
                        <Check className="text-brand-gold" size={14} />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-brand-dark border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Plane className="text-brand-gold" size={24} />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Transit Time</p>
                      <p className="text-white font-serif">{countryData.delivery_time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="text-brand-gold" size={24} />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Max Weight</p>
                      <p className="text-white font-serif">No Limit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="text-brand-gold" size={24} />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Insurance</p>
                      <p className="text-white font-serif">Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="block w-full bg-brand-gold text-black text-center py-4 font-sans text-sm tracking-widest uppercase font-semibold hover:bg-white transition-colors"
              >
                Get a Quote
              </Link>

              <Link
                href="/tracking"
                className="block w-full border-2 border-white text-white text-center py-4 font-sans text-sm tracking-widest uppercase font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Track Shipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Countries */}
      {relatedCountries.length > 0 && (
        <section className="py-16 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-8 text-center">
              Other Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCountries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/pricing/${country.slug}`}
                  className="group bg-brand-gray border border-white/10 overflow-hidden hover:border-brand-gold/50 transition-all"
                >
                  <div className="relative h-32">
                    <img
                      src={country.image_url}
                      alt={`Courier to ${country.country}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors">
                        {country.country}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-brand-gold font-serif text-xl">
                      From ₹{country.rates[country.rates.length - 1].price_per_kg}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
