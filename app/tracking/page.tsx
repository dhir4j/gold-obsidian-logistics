"use client";

import { useState } from "react";
import { BRAND } from "@/lib/config";
import { Search, Package, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface TrackingEvent {
  stage: string;
  location: string;
  date: string;
  activity: string;
  status?: string;
  timestamp?: string;
  description?: string;
}

interface TrackingData {
  shipment_id_str: string;
  status: string;
  sender_name: string;
  sender_address_city: string;
  receiver_name: string;
  receiver_address_city: string;
  service_type: string;
  booking_date: string;
  tracking_history: TrackingEvent[];
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsTracking(true);
    setError("");
    setTrackingData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
      const response = await fetch(`${apiUrl}/api/shipments/${trackingId.trim()}`);

      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Shipment not found. Please check your tracking number and try again.");
      }
    } catch (err) {
      console.error("Tracking error:", err);
      setError("Failed to fetch tracking information. Please try again.");
    } finally {
      setIsTracking(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-300 border-green-500/50";
      case "In Transit":
      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50";
      case "Booked":
        return "bg-brand-gold/20 text-brand-gold border-brand-gold/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            Track Your Shipment
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mt-4 mb-6">
            Real-Time <span className="italic text-brand-gold">Tracking</span>
          </h1>
          <p className="text-gray-300 font-sans font-light text-lg leading-relaxed">
            Enter your tracking number below to see the current status and
            location of your shipment.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <form onSubmit={handleTrack} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                placeholder="Enter Tracking Number (e.g., WNX001234)"
                className="flex-1 px-6 py-4 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                maxLength={20}
              />
              <button
                type="submit"
                disabled={isTracking || !trackingId.trim()}
                className="px-10 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isTracking ? (
                  "Tracking..."
                ) : (
                  <>
                    <Search size={18} />
                    Track
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error State */}
          {error && (
            <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-300 font-sans text-sm">{error}</p>
            </div>
          )}

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-8 animate-fade-in">
              {/* Status Card */}
              <div className="glass-panel p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-gray-400 text-sm font-sans mb-2">
                      Tracking Number
                    </p>
                    <p className="text-2xl font-serif text-white">
                      {trackingData.shipment_id_str}
                    </p>
                  </div>
                  <div className={`px-4 py-2 border rounded ${getStatusColor(trackingData.status)}`}>
                    <p className="font-sans text-sm uppercase tracking-wider">
                      {trackingData.status}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Package className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        From
                      </p>
                      <p className="text-white font-sans text-sm">
                        {trackingData.sender_name}
                      </p>
                      <p className="text-gray-500 font-sans text-xs">
                        {trackingData.sender_address_city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        To
                      </p>
                      <p className="text-white font-sans text-sm">
                        {trackingData.receiver_name}
                      </p>
                      <p className="text-gray-500 font-sans text-xs">
                        {trackingData.receiver_address_city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        Booking Date
                      </p>
                      <p className="text-white font-sans text-sm">
                        {new Date(trackingData.booking_date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-500 font-sans text-xs">
                        {trackingData.service_type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-brand-dark p-8 border border-white/10">
                <h3 className="text-2xl font-serif text-white mb-8">
                  Shipment Timeline
                </h3>

                {trackingData.tracking_history && trackingData.tracking_history.length > 0 ? (
                  <div className="space-y-6">
                    {trackingData.tracking_history.map(
                      (event, index) => (
                        <div key={index} className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-gold">
                              <CheckCircle className="text-black" size={20} />
                            </div>
                            {index < trackingData.tracking_history.length - 1 && (
                              <div className="w-0.5 h-12 bg-brand-gold"></div>
                            )}
                          </div>

                          <div className="flex-1 pb-6">
                            <p className="font-sans font-semibold mb-1 text-white">
                              {event.stage || event.status}
                            </p>
                            <p className="text-gray-400 font-sans text-sm mb-1">
                              {event.activity || event.description}
                            </p>
                            {event.location && (
                              <p className="text-gray-400 font-sans text-sm mb-1">
                                {event.location}
                              </p>
                            )}
                            <p className="text-gray-500 font-sans text-xs">
                              {new Date(event.date || event.timestamp || "").toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 font-sans text-sm">No tracking history available yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help Section */}
          {!trackingData && !error && (
            <div className="mt-12 text-center">
              <p className="text-gray-400 font-sans text-sm mb-4">
                Need help finding your tracking number?
              </p>
              <p className="text-gray-500 font-sans text-sm mb-6">
                Your tracking number can be found in your booking confirmation
                email or receipt.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-brand-gold hover:text-white transition-colors font-sans text-sm uppercase tracking-wider"
              >
                Contact Support
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
