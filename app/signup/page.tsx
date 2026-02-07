"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { User, Mail, Lock, Phone, Building } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    accountType: "individual",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate signup (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to dashboard or login
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Create Your <span className="text-brand-gold italic">Account</span>
            </h1>
            <p className="text-gray-400 font-sans">
              Join Waynex Logistics and start shipping smarter today
            </p>
          </div>

          {/* Employee Notice */}
          <div className="mb-6 p-4 bg-brand-gold/10 border border-brand-gold/30 rounded">
            <p className="text-sm text-gray-300 font-sans text-center">
              <span className="font-semibold text-brand-gold">Note:</span> Employee accounts are created by administrators only.
              <br />
              <span className="text-xs mt-1 block">
                To become a partner, contact{" "}
                <a
                  href="mailto:sales@waynexshipping.com"
                  className="text-brand-gold hover:underline font-semibold"
                >
                  sales@waynexshipping.com
                </a>
              </span>
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type */}
              <div>
                <label className="block text-gray-400 text-sm font-sans mb-3">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, accountType: "individual" })
                    }
                    className={`px-6 py-3 border font-sans text-sm uppercase tracking-wider transition-all ${
                      formData.accountType === "individual"
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                        : "border-white/20 text-gray-400 hover:border-white/40"
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, accountType: "business" })
                    }
                    className={`px-6 py-3 border font-sans text-sm uppercase tracking-wider transition-all ${
                      formData.accountType === "business"
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                        : "border-white/20 text-gray-400 hover:border-white/40"
                    }`}
                  >
                    Business
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    First Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Last Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Company Name (if business) */}
              {formData.accountType === "business" && (
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={formData.accountType === "business"}
                      className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-400 text-sm font-sans mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-400 text-sm font-sans mb-2"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-400 text-sm font-sans mb-2"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 accent-brand-gold"
                />
                <label htmlFor="terms" className="text-gray-400 text-sm font-sans">
                  I agree to the{" "}
                  <Link href="/terms-of-service" className="text-brand-gold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-brand-gold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 font-sans text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-gold hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
