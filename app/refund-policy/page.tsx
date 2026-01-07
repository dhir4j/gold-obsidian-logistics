import { BRAND } from "@/lib/config";
import { DollarSign } from "lucide-react";

export const metadata = {
  title: `Refund & Cancellation Policy - ${BRAND.name}`,
  description: "Our policies on cancellations, refunds, and claims for lost or damaged goods.",
};

export default function RefundPolicyPage() {
  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-6">
              <DollarSign className="text-brand-gold" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Refund & Cancellation Policy
            </h1>
            <p className="text-gray-400 font-sans">
              Last updated: January 6, 2026
            </p>
          </div>

          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Cancellation Policy
              </h3>
              <ul className="space-y-4 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">Full Refund:</strong> Shipments
                    cancelled 2 or more hours before scheduled pickup are eligible for
                    a full refund
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">25% Cancellation Fee:</strong>{" "}
                    Shipments cancelled less than 2 hours before pickup will incur a
                    25% cancellation fee
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1 font-semibold">•</span>
                  <div>
                    <strong className="text-white">No Cancellation:</strong> Once the
                    package has been picked up, the shipment cannot be cancelled, but
                    may be eligible for return to sender (additional fees apply)
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Refund Processing
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                Approved refunds are processed within 5-7 business days and will be
                credited to the original payment method used for the transaction.
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Credit card refunds may take 3-5 business days to appear on your statement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Bank transfers may take up to 7-10 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Digital wallet refunds are typically instant to 48 hours</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Service Refunds
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                Partial or full refunds may be issued in the following circumstances:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Significant delivery delays caused by {BRAND.name}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Service failures or non-delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Billing errors or overcharges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Lost or damaged shipments (subject to investigation)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Lost or Damaged Goods Claims
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                To file a claim for lost or damaged goods:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Claims must be submitted within 30 days of the delivery date (or
                    expected delivery date for lost packages)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Provide the tracking number, shipment details, description of
                    damage, proof of value, and photos if applicable
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Claims are investigated within 14 business days, and you will be
                    notified of the outcome
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Liability is limited to the declared value or $100 per shipment,
                    whichever is less, unless additional insurance was purchased
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Non-Refundable Situations
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                Refunds will not be issued in the following cases:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Delays or failures due to incorrect or incomplete address
                    information provided by the customer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Force majeure events (natural disasters, extreme weather,
                    pandemics, war, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Customs delays or regulatory holds for international shipments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Shipments of prohibited items</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    Delivery refusals by the recipient (unless return to sender was
                    arranged)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Refund Request Process
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                To request a refund, please contact our customer support team with
                your tracking number and reason for the refund request. Our team will
                review your case and respond within 2-3 business days.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-2xl font-serif text-white mb-4">
                Contact Customer Support
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                For refund or cancellation inquiries, please reach out to us:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-400 font-sans text-sm">
                  Email:{" "}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-brand-gold hover:underline"
                  >
                    {BRAND.email}
                  </a>
                </p>
                <p className="text-gray-400 font-sans text-sm">
                  Phone:{" "}
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="text-brand-gold hover:underline"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
