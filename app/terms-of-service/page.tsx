import { BRAND } from "@/lib/config";
import { FileText } from "lucide-react";

export const metadata = {
  title: `Terms of Service - ${BRAND.name}`,
  description: "Terms and conditions for using our logistics services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-6">
              <FileText className="text-brand-gold" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400 font-sans">
              Last updated: January 6, 2026
            </p>
          </div>

          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                1. Acceptance of Terms
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                By accessing or using {BRAND.name} services, you agree to be bound by
                these Terms of Service. If you do not agree with any part of these
                terms, you may not use our services.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                2. Services Description
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                {BRAND.name} provides domestic and international logistics, courier,
                and freight services. We reserve the right to refuse service for
                prohibited items including hazardous materials, illegal substances,
                and items that violate local, state, or federal regulations.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                3. User Accounts
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You must not disclose your password to any third party and
                must notify us immediately of any unauthorized access.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                4. Shipment Responsibility
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                As the shipper, you are responsible for:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Providing accurate and complete shipment information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Proper packaging to prevent damage during transit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Declaring the contents and value of shipments accurately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Compliance with all applicable laws and regulations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                5. Limitation of Liability
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                {BRAND.name} shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible
                losses. Our liability is limited to the declared value of the
                shipment or the amount paid for the service, whichever is less,
                unless additional insurance is purchased.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                6. Force Majeure
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                We are not responsible for delays or failures in performance
                resulting from acts beyond our reasonable control, including but not
                limited to acts of God, natural disasters, war, terrorism, riots,
                labor disputes, or governmental actions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                7. Prohibited Items
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                The following items are strictly prohibited from shipment:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Illegal drugs and controlled substances</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Explosives, firearms, and ammunition</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Hazardous materials without proper documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Counterfeit goods or items that violate intellectual property rights</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                8. Governing Law
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the United States of America, without
                regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                9. Changes to Terms
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We
                will provide notice of any significant changes. Your continued use of
                our services after such modifications constitutes acceptance of the
                updated Terms.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-2xl font-serif text-white mb-4">Contact Us</h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-brand-gold hover:underline"
                >
                  {BRAND.email}
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
