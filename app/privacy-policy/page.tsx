import { BRAND } from "@/lib/config";
import { Shield } from "lucide-react";

export const metadata = {
  title: `Privacy Policy - ${BRAND.name}`,
  description: "Our commitment to protecting your privacy and personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-6">
              <Shield className="text-brand-gold" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 font-sans">
              Last updated: January 6, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Introduction
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                At {BRAND.name}, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy outlines how we collect, use, disclose, and safeguard your
                data when you use our services.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Information We Collect
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                We collect several types of information to provide and improve our
                services:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    <strong className="text-white">Personal Identification Information:</strong> Name,
                    email address, phone number, billing address, and shipping
                    addresses
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    <strong className="text-white">Shipment Information:</strong> Package details,
                    tracking numbers, delivery addresses, and shipment history
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    <strong className="text-white">Payment Information:</strong> Credit card details,
                    billing information (processed securely through encrypted
                    payment gateways)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>
                    <strong className="text-white">Usage Data:</strong> IP address, browser type,
                    device information, and pages visited
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                How We Use Your Information
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To provide, maintain, and improve our logistics services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To process shipments and track deliveries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To communicate with you about your shipments and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To provide customer support and respond to inquiries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To send service updates, promotional materials, and newsletters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To detect, prevent, and address fraud and security issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To comply with legal obligations and regulatory requirements</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Data Security
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information. However, please note that no method of
                transmission over the internet or electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your
                data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Data Sharing and Disclosure
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                We do not sell or rent your personal information to third parties. We
                may share your information in the following circumstances:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>With trusted service providers who assist in our operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>When required by law or to comply with legal processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>To protect our rights, property, or safety, or that of others</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>In connection with business transfers or mergers</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Your Rights
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="space-y-3 text-gray-400 font-sans font-light">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Access, update, or delete your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Request data portability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold mt-1">•</span>
                  <span>Lodge a complaint with data protection authorities</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-white mb-4">
                Updates to This Policy
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify
                you of any changes by posting the new policy on this page and
                updating the "Last updated" date. We encourage you to review this
                policy periodically.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-2xl font-serif text-white mb-4">Contact Us</h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
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
