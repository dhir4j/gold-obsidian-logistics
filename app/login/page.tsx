"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/config";
import { Mail, Lock, ArrowRight, Briefcase } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"customer" | "employee">("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call for authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Invalid credentials.");
        setIsSubmitting(false);
        return;
      }

      const user = result.user;

      // Role validation based on active tab
      if (activeTab === "employee") {
        // Employee tab: only allow admin and employee accounts
        if (user.isAdmin) {
          // Admins redirect to admin panel
          window.location.href = "https://admin.waynexshipping.com";
          return;
        } else if (user.isEmployee) {
          // Employees go to employee dashboard
          localStorage.setItem('session', JSON.stringify(user));
          window.location.href = "/employee/dashboard";
          return;
        } else {
          // Regular customer tried to login as employee
          alert("This account is for customers only. Please use the Customer Login tab.");
          setIsSubmitting(false);
          return;
        }
      } else {
        // Customer tab: only allow regular customers
        if (user.isAdmin || user.isEmployee) {
          alert("Employee and Admin accounts must use the Employee Login tab.");
          setIsSubmitting(false);
          return;
        }

        // Regular customer login
        localStorage.setItem('session', JSON.stringify(user));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to the server. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16">
        <div className="max-w-md mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Welcome <span className="text-brand-gold italic">Back</span>
            </h1>
            <p className="text-gray-400 font-sans">
              Sign in to your Waynex Logistics account
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("customer")}
              className={`flex-1 px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
                activeTab === "customer"
                  ? "bg-brand-gold text-black border-brand-gold font-semibold"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Mail size={18} />
                Customer Login
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("employee")}
              className={`flex-1 px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
                activeTab === "employee"
                  ? "bg-brand-gold text-black border-brand-gold font-semibold"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Briefcase size={18} />
                Employee Login
              </span>
            </button>
          </div>

          {/* Login Form */}
          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded">
            {/* Employee Info Message */}
            {activeTab === "employee" && (
              <div className="mb-6 p-4 bg-brand-gold/10 border border-brand-gold/30 rounded">
                <p className="text-sm text-gray-300 font-sans text-center">
                  <span className="font-semibold text-brand-gold">Want to become a partner?</span>
                  <br />
                  Contact us at{" "}
                  <a
                    href="mailto:sales@waynexshipping.com"
                    className="text-brand-gold hover:underline font-semibold"
                  >
                    sales@waynexshipping.com
                  </a>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Password */}
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 accent-brand-gold"
                  />
                  <label htmlFor="rememberMe" className="text-gray-400 text-sm font-sans">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-brand-gold text-sm font-sans hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-brand-gray text-gray-500 font-sans">
                  OR
                </span>
              </div>
            </div>

            {/* Social Login (Optional - Can be enabled later) */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full px-8 py-3 border border-white/20 text-white hover:border-white/40 transition-all duration-300 font-sans text-sm tracking-wider flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full px-8 py-3 border border-white/20 text-white hover:border-white/40 transition-all duration-300 font-sans text-sm tracking-wider flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              {activeTab === "customer" ? (
                <p className="text-gray-400 font-sans text-sm">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-brand-gold hover:underline font-semibold">
                    Create Account
                  </Link>
                </p>
              ) : (
                <p className="text-gray-400 font-sans text-sm">
                  Employee accounts are created by administrators only.
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
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs font-sans">
              Need help? Contact our{" "}
              <Link href="/contact" className="text-brand-gold hover:underline">
                support team
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
