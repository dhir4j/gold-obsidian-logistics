"use client";

import { useState } from "react";
import { BRAND, COMPANY_INFO } from "@/lib/config";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mt-4 mb-6">
            Contact <span className="italic text-brand-gold">Us</span>
          </h1>
          <p className="text-gray-300 font-sans font-light text-lg leading-relaxed">
            Have questions or need a custom logistics solution? We're here to
            help. Reach out to our team today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-serif text-white mb-8">
                Let's Talk Logistics
              </h2>
              <p className="text-gray-400 font-sans font-light leading-relaxed mb-12">
                Whether you need a quote, have questions about our services, or
                want to discuss a custom logistics solution, our team is ready
                to assist you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-brand-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-sans font-semibold mb-2">
                      Phone
                    </h3>
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="text-gray-400 hover:text-brand-gold transition-colors font-sans"
                    >
                      {BRAND.phoneDisplay}
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      Mon-Fri, 8am-8pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-brand-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-sans font-semibold mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-gray-400 hover:text-brand-gold transition-colors font-sans"
                    >
                      {BRAND.email}
                    </a>
                    <p className="text-gray-500 text-sm mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-brand-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-sans font-semibold mb-2">
                      Head Office
                    </h3>
                    <address className="text-gray-400 font-sans not-italic">
                      {COMPANY_INFO.address}
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 glass-panel">
                <h3 className="text-white font-sans font-semibold mb-3">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between text-gray-400">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Saturday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-dark p-8 md:p-12 border border-white/10">
              <h3 className="text-3xl font-serif text-white mb-8">
                Send Us a Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded">
                  <p className="text-green-400 font-sans text-sm">
                    Thank you! Your message has been sent successfully. We'll get
                    back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-gray border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-400 text-sm font-sans mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-gray border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-400 text-sm font-sans mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-brand-gray border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-gray border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors font-sans"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Request a Quote</option>
                    <option value="tracking">Tracking Inquiry</option>
                    <option value="service">Service Information</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-brand-gray border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none"
                    placeholder="Tell us about your logistics needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="h-96 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-brand-gold mx-auto mb-4" size={48} />
            <p className="text-gray-400 font-sans">
              Map integration placeholder
            </p>
            <p className="text-gray-500 font-sans text-sm mt-2">
              {COMPANY_INFO.address}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
