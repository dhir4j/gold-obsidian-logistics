import { BRAND } from "@/lib/config";
import { Truck } from "lucide-react";

export const metadata = {
  title: `Shipping & Delivery Policy - ${BRAND.name}`,
  description: "Information about our shipping options, delivery times, and procedures.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-6">
              <Truck className="text-brand-gold" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Shipping & Delivery Policy
            </h1>
            <p className="text-gray-400 font-sans">
              Last updated: January 6, 2026
            </p>
          </div>

          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Shipping Options
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                {BRAND.name} offers multiple shipping options to meet your needs:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-brand-dark border border-white/5 rounded">
                  <h4 className="text-white font-sans font-semibold mb-2">
                    Standard Domestic
                  </h4>
                  <p className="text-gray-400 text-sm font-sans font-light">
                    Economical shipping for non-urgent deliveries within the United States
                  </p>
                </div>
                <div className="p-4 bg-brand-dark border border-white/5 rounded">
                  <h4 className="text-white font-sans font-semibold mb-2">
                    Express Domestic
                  </h4>
                  <p className="text-gray-400 text-sm font-sans font-light">
                    Fast delivery for time-sensitive shipments with priority handling
                  </p>
                </div>
                <div className="p-4 bg-brand-dark border border-white/5 rounded">
                  <h4 className="text-white font-sans font-semibold mb-2">
                    International Shipping
                  </h4>
                  <p className="text-gray-400 text-sm font-sans font-light">
                    Worldwide delivery to over 50 countries with customs clearance assistance
                  </p>
                </div>
                <div className="p-4 bg-brand-dark border border-white/5 rounded">
                  <h4 className="text-white font-sans font-semibold mb-2">
                    Freight Services
                  </h4>
                  <p className="text-gray-400 text-sm font-sans font-light">
                    Full truckload (FTL) and less-than-truckload (LTL) options for large shipments
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Delivery Timeframes
              </h3>
              <ul className="space-y-4 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">Domestic Standard:</strong> 3-5
                    business days from pickup
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">Domestic Express:</strong> 1-2
                    business days from pickup (next-day and same-day options available
                    in select areas)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">International:</strong> 7-14 business
                    days, subject to customs clearance and local regulations
                  </div>
                </li>
              </ul>
              <p className="text-gray-400 font-sans font-light leading-relaxed mt-4 text-sm">
                * Delivery times are estimates and may vary due to weather, customs
                delays, remote locations, or other factors beyond our control.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Tracking Your Shipment
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                All shipments include a unique tracking number. You can track your
                package in real-time using our online tracking system. Tracking
                updates are provided at each major checkpoint, including pickup,
                transit, out for delivery, and delivery confirmation.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Delivery Procedure
              </h3>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Our courier will attempt delivery to the address provided during
                    booking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    If the recipient is not available, a delivery notice will be left
                    with instructions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Signature may be required for high-value shipments or as requested
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    For failed delivery attempts, packages may be held at the nearest
                    distribution center for pickup
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Address Changes
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                Address changes can be requested before the shipment is out for
                delivery. Additional fees may apply for address corrections or
                rerouting. Contact customer support immediately if you need to modify
                delivery details.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Customs and International Shipments
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                For international shipments, the sender is responsible for providing
                accurate customs documentation. Customs duties, taxes, and clearance
                fees are the responsibility of the receiver unless otherwise arranged.
                Delays may occur due to customs inspection or documentation issues.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-2xl font-serif text-white mb-4">Questions?</h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                For questions about shipping and delivery, please contact us at{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-brand-gold hover:underline"
                >
                  {BRAND.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-brand-gold hover:underline"
                >
                  {BRAND.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
