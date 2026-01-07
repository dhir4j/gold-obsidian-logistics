"use client";

import { useState } from "react";
import { BRAND } from "@/lib/config";
import { Search, Package, MapPin, Clock, CheckCircle } from "lucide-react";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // Simulate tracking (replace with actual API call)
    setIsTracking(true);
    setTimeout(() => {
      setTrackingData({
        id: trackingId.toUpperCase(),
        status: "In Transit",
        origin: "Atlanta, GA",
        destination: "New York, NY",
        estimatedDelivery: "Jan 8, 2026",
        currentLocation: "Charlotte, NC Distribution Center",
        timeline: [
          {
            status: "Delivered",
            location: "New York, NY",
            time: "Jan 8, 2026 - 2:30 PM",
            completed: false,
          },
          {
            status: "Out for Delivery",
            location: "New York, NY Hub",
            time: "Jan 8, 2026 - 8:00 AM",
            completed: false,
          },
          {
            status: "In Transit",
            location: "Charlotte, NC",
            time: "Jan 7, 2026 - 3:45 PM",
            completed: true,
          },
          {
            status: "Departed Facility",
            location: "Atlanta, GA Hub",
            time: "Jan 6, 2026 - 10:20 AM",
            completed: true,
          },
          {
            status: "Picked Up",
            location: "Atlanta, GA",
            time: "Jan 5, 2026 - 4:15 PM",
            completed: true,
          },
        ],
      });
      setIsTracking(false);
    }, 1500);
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
                placeholder="Enter Tracking Number (e.g., WX123456789)"
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
                      {trackingData.id}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-brand-gold/20 border border-brand-gold/50 rounded">
                    <p className="text-brand-gold font-sans text-sm uppercase tracking-wider">
                      {trackingData.status}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Package className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        Origin
                      </p>
                      <p className="text-white font-sans text-sm">
                        {trackingData.origin}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        Destination
                      </p>
                      <p className="text-white font-sans text-sm">
                        {trackingData.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-brand-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-gray-400 text-xs font-sans mb-1">
                        Est. Delivery
                      </p>
                      <p className="text-white font-sans text-sm">
                        {trackingData.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded">
                  <p className="text-gray-400 text-xs font-sans mb-1">
                    Current Location
                  </p>
                  <p className="text-white font-sans font-medium">
                    {trackingData.currentLocation}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-brand-dark p-8 border border-white/10">
                <h3 className="text-2xl font-serif text-white mb-8">
                  Shipment Timeline
                </h3>

                <div className="space-y-6">
                  {trackingData.timeline.map(
                    (event: any, index: number) => (
                      <div key={index} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              event.completed
                                ? "bg-brand-gold"
                                : "bg-white/10 border border-white/20"
                            }`}
                          >
                            {event.completed ? (
                              <CheckCircle
                                className="text-black"
                                size={20}
                              />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-white/40"></div>
                            )}
                          </div>
                          {index < trackingData.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                event.completed
                                  ? "bg-brand-gold"
                                  : "bg-white/10"
                              }`}
                            ></div>
                          )}
                        </div>

                        <div className="flex-1 pb-6">
                          <p
                            className={`font-sans font-semibold mb-1 ${
                              event.completed
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          >
                            {event.status}
                          </p>
                          <p className="text-gray-400 font-sans text-sm mb-1">
                            {event.location}
                          </p>
                          <p className="text-gray-500 font-sans text-xs">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!trackingData && (
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
