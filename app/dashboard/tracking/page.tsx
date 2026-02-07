"use client";

import { useState } from "react";
import { Search, Package, MapPin, CheckCircle2, Clock, Truck } from "lucide-react";

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface ShipmentTracking {
  shipment_id_str: string;
  status: string;
  sender_name: string;
  receiver_name: string;
  receiver_address_city: string;
  service_type: string;
  booking_date: string;
  tracking_history: TrackingEvent[];
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [trackingData, setTrackingData] = useState<ShipmentTracking | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsSearching(true);
    setError("");
    setTrackingData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/shipments/${trackingId}`);

      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Shipment not found");
      }
    } catch (err) {
      console.error("Tracking error:", err);
      setError("Failed to fetch tracking information. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Transit":
      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Booked":
        return "bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="h-6 w-6 text-green-400" />;
      case "In Transit":
      case "Out for Delivery":
        return <Truck className="h-6 w-6 text-blue-400" />;
      case "Booked":
        return <Package className="h-6 w-6 text-[#C5A059]" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
          Track Shipment
        </h1>
        <p className="text-[#F5F5F0]/60">
          Enter your tracking ID to view real-time shipment status
        </p>
      </div>

      {/* Search Form */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID (e.g., WNX001234)"
              className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Track"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="space-y-6">
          {/* Shipment Overview */}
          <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-2">
                  Shipment Details
                </h2>
                <p className="text-[#F5F5F0]/60">Tracking ID: {trackingData.shipment_id_str}</p>
              </div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                  trackingData.status
                )}`}
              >
                {getStatusIcon(trackingData.status)}
                <span className="ml-2">{trackingData.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#F5F5F0]/60 mb-1">From</p>
                  <p className="text-[#F5F5F0] font-medium">{trackingData.sender_name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F5F0]/60 mb-1">To</p>
                  <p className="text-[#F5F5F0] font-medium">{trackingData.receiver_name}</p>
                  <p className="text-sm text-[#F5F5F0]/50">
                    {trackingData.receiver_address_city}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#F5F5F0]/60 mb-1">Service Type</p>
                  <p className="text-[#F5F5F0] font-medium">{trackingData.service_type}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F5F0]/60 mb-1">Booking Date</p>
                  <p className="text-[#F5F5F0] font-medium">
                    {new Date(trackingData.booking_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
            <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
              Tracking History
            </h2>

            {trackingData.tracking_history && trackingData.tracking_history.length > 0 ? (
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#C5A059]/20" />

                <div className="space-y-6">
                  {trackingData.tracking_history.map((event, index) => (
                    <div key={index} className="relative pl-12">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8B7239] flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-[#121212]" />
                      </div>

                      <div className="rounded-lg bg-[#121212]/50 p-4 hover:bg-[#121212]/70 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-[#F5F5F0]">{event.status}</h3>
                          <span className="text-sm text-[#F5F5F0]/60">
                            {new Date(event.timestamp).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-[#F5F5F0]/70 mb-1">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-[#C5A059] flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-[#F5F5F0]/20 mx-auto mb-4" />
                <p className="text-[#F5F5F0]/60">No tracking history available yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!trackingData && !error && (
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-12 text-center">
          <Package className="h-20 w-20 text-[#F5F5F0]/20 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold text-[#F5F5F0] mb-2">
            Track Your Shipment
          </h3>
          <p className="text-[#F5F5F0]/60">
            Enter a tracking ID above to view shipment details and tracking history
          </p>
        </div>
      )}
    </div>
  );
}
