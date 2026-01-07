"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, MapPin, Calendar, Weight } from "lucide-react";

export default function DeliveryPage() {
  const router = useRouter();
  const [isAuthenticated] = useState(false); // Check if user is logged in

  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "document",
    weight: "",
    deliveryDate: "",
  });

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

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to signup page if not logged in
      router.push("/signup");
      return;
    }

    // If authenticated, proceed to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="pt-20 min-h-screen bg-brand-dark">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              Book Your Shipment
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-6">
              Create a New <span className="text-brand-gold italic">Delivery</span>
            </h1>
            <p className="text-gray-400 font-sans font-light max-w-2xl mx-auto">
              Fill in the details below to create your shipment. We'll provide you with instant quotes and delivery options.
            </p>
          </div>

          {/* Delivery Form */}
          <div className="bg-brand-gray p-8 md:p-12 border border-white/10 rounded">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pickup Location */}
              <div>
                <label
                  htmlFor="pickupAddress"
                  className="block text-white text-base font-sans font-semibold mb-3"
                >
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold"
                    size={20}
                  />
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    placeholder="Enter pickup address"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Where should we collect your package?
                </p>
              </div>

              {/* Delivery Location */}
              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="block text-white text-base font-sans font-semibold mb-3"
                >
                  Delivery Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold"
                    size={20}
                  />
                  <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    placeholder="Enter delivery address"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Where should we deliver your package?
                </p>
              </div>

              {/* Package Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Package Type */}
                <div>
                  <label
                    htmlFor="packageType"
                    className="block text-white text-base font-sans font-semibold mb-3"
                  >
                    Package Type
                  </label>
                  <div className="relative">
                    <Package
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold"
                      size={20}
                    />
                    <select
                      id="packageType"
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-brand-dark border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors font-sans appearance-none"
                    >
                      <option value="document">Document</option>
                      <option value="parcel">Parcel</option>
                      <option value="freight">Freight</option>
                      <option value="pallet">Pallet</option>
                    </select>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-white text-base font-sans font-semibold mb-3"
                  >
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Weight
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold"
                      size={20}
                    />
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      min="0.1"
                      step="0.1"
                      className="w-full pl-12 pr-4 py-4 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="0.0"
                    />
                  </div>
                </div>

                {/* Delivery Date */}
                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block text-white text-base font-sans font-semibold mb-3"
                  >
                    Delivery Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold"
                      size={20}
                    />
                    <input
                      type="date"
                      id="deliveryDate"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-12 pr-4 py-4 bg-brand-dark border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-brand-dark p-6 border border-white/5 rounded">
                <h3 className="text-white font-sans font-semibold mb-4">
                  Additional Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-brand-gold" />
                    <span className="text-gray-400 font-sans text-sm">
                      Insurance Coverage
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-brand-gold" />
                    <span className="text-gray-400 font-sans text-sm">
                      Signature Required
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-brand-gold" />
                    <span className="text-gray-400 font-sans text-sm">
                      Fragile Handling
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-brand-gold" />
                    <span className="text-gray-400 font-sans text-sm">
                      Express Delivery
                    </span>
                  </label>
                </div>
              </div>

              {/* Info Message */}
              {!isAuthenticated && (
                <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded">
                  <p className="text-brand-gold font-sans text-sm">
                    <strong>Note:</strong> You'll need to sign up or log in to continue with your booking.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold"
              >
                {isAuthenticated ? "Continue to Checkout" : "Sign Up to Continue"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
