"use client";

import { useState } from "react";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { Package, User, MapPin, FileText, ArrowRight } from "lucide-react";

export default function CreateShipmentPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Sender details
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPincode: "",
    senderCountry: "India",

    // Receiver details
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPincode: "",
    receiverCountry: activeTab === "domestic" ? "India" : "",

    // Package details
    weight: "",
    length: "",
    width: "",
    height: "",
    goodsDescription: "",
    goodsValue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const endpoint = activeTab === "domestic" 
        ? `${apiUrl}/api/shipments/domestic`
        : `${apiUrl}/api/shipments/international`;

      // Map form data to backend schema
      const shipmentData = {
        user_email: session?.email || "",
        sender_name: formData.senderName,
        sender_phone: formData.senderPhone,
        sender_email: formData.senderEmail || "",
        sender_address_line1: formData.senderAddress,
        sender_address_city: formData.senderCity,
        sender_address_state: formData.senderState,
        sender_address_pincode: formData.senderPincode,
        sender_address_country: formData.senderCountry,
        receiver_name: formData.receiverName,
        receiver_phone: formData.receiverPhone,
        receiver_email: formData.receiverEmail || "",
        receiver_address_line1: formData.receiverAddress,
        receiver_address_city: formData.receiverCity,
        receiver_address_state: formData.receiverState,
        receiver_address_pincode: formData.receiverPincode,
        receiver_address_country: formData.receiverCountry,
        service_type: activeTab === "domestic" ? "Domestic Express" : "International Express",
        pickup_date: new Date().toISOString().split('T')[0],
        goods: [{
          description: formData.goodsDescription,
          weight: parseFloat(formData.weight),
          length: formData.length ? parseFloat(formData.length) : 0,
          width: formData.width ? parseFloat(formData.width) : 0,
          height: formData.height ? parseFloat(formData.height) : 0,
          value: parseFloat(formData.goodsValue),
        }],
        final_total_price_with_tax: 0, // Will be calculated by backend based on employee balance
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Shipment created successfully! Tracking ID: ${result.data?.shipment_id_str || "N/A"}`);
        router.push("/employee/dashboard");
      } else {
        alert(result.error || "Failed to create shipment.");
      }
    } catch (error) {
      console.error("Error creating shipment:", error);
      alert("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          Create New Shipment
        </h1>
        <p className="text-gray-400 font-sans">
          Fill in the details to create a new shipment
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          type="button"
          onClick={() => {
            setActiveTab("domestic");
            setFormData({
              ...formData,
              receiverCountry: "India",
            });
          }}
          className={`flex-1 md:flex-none px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
            activeTab === "domestic"
              ? "bg-brand-gold text-black border-brand-gold font-semibold"
              : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
          }`}
        >
          Domestic Shipping
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("international");
            setFormData({
              ...formData,
              receiverCountry: "",
            });
          }}
          className={`flex-1 md:flex-none px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
            activeTab === "international"
              ? "bg-brand-gold text-black border-brand-gold font-semibold"
              : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
          }`}
        >
          International Shipping
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sender Section */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <User className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Sender Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Name *
              </label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Email
              </label>
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="john@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Address *
              </label>
              <textarea
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none"
                placeholder="Street address, building, apartment"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                City *
              </label>
              <input
                type="text"
                name="senderCity"
                value={formData.senderCity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="Mumbai"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                State *
              </label>
              <input
                type="text"
                name="senderState"
                value={formData.senderState}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="Maharashtra"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="senderPincode"
                value={formData.senderPincode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="400001"
              />
            </div>
          </div>
        </div>

        {/* Receiver Section */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <MapPin className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Receiver Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Name *
              </label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="+91 87654 32109"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Email
              </label>
              <input
                type="email"
                name="receiverEmail"
                value={formData.receiverEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="jane@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Address *
              </label>
              <textarea
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none"
                placeholder="Street address, building, apartment"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                City *
              </label>
              <input
                type="text"
                name="receiverCity"
                value={formData.receiverCity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="Delhi"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                State *
              </label>
              <input
                type="text"
                name="receiverState"
                value={formData.receiverState}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="Delhi"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="receiverPincode"
                value={formData.receiverPincode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="110001"
              />
            </div>
            {activeTab === "international" && (
              <div>
                <label className="block text-gray-400 text-sm font-sans mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="receiverCountry"
                  value={formData.receiverCountry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                  placeholder="United States"
                />
              </div>
            )}
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <Package className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Package Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                step="0.01"
                min="0.01"
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="2.5"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Goods Value (₹) *
              </label>
              <input
                type="number"
                name="goodsValue"
                value={formData.goodsValue}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Length (cm)
              </label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Width (cm)
              </label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                placeholder="15"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Goods Description *
              </label>
              <textarea
                name="goodsDescription"
                value={formData.goodsDescription}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none"
                placeholder="Describe the contents of the package"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              "Creating Shipment..."
            ) : (
              <>
                Create Shipment
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
