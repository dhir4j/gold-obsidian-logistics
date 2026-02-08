"use client";

import { useState, useEffect, useMemo } from "react";
import { Package, Search, Filter } from "lucide-react";
import Link from "next/link";

interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  receiver_address_city: string;
  sender_name: string;
  service_type: string;
  booking_date: string;
  status: string;
  total_with_tax_18_percent: number;
}

export default function MyShipmentsPage() {
  const [allShipments, setAllShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ongoing" | "delivered" | "pending">("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetchShipments(email);
    }
  }, []);

  const fetchShipments = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com"}/api/shipments?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setAllShipments(data);
      }
    } catch (error) {
      console.error("Failed to fetch shipments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredShipments = useMemo(() => {
    const ongoingStatuses = ["Booked", "In Transit", "Out for Delivery"];
    return {
      ongoing: allShipments.filter((s) => ongoingStatuses.includes(s.status)),
      delivered: allShipments.filter((s) => s.status === "Delivered"),
      pending: allShipments.filter((s) => s.status === "Pending Payment"),
    };
  }, [allShipments]);

  const getFilteredBySearch = (shipments: Shipment[]) => {
    if (!searchQuery) return shipments;
    return shipments.filter(
      (s) =>
        s.shipment_id_str.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.receiver_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.receiver_address_city.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

  const ShipmentsTable = ({ shipments }: { shipments: Shipment[] }) => {
    const displayShipments = getFilteredBySearch(shipments);

    return (
      <div className="overflow-x-auto">
        {displayShipments.length > 0 ? (
          <table className="w-full">
            <thead className="bg-[#2A2A2A]/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Receiver
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A059]/10">
              {displayShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="hover:bg-[#2A2A2A]/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-[#C5A059]">
                      {shipment.shipment_id_str}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#F5F5F0]">
                      {shipment.receiver_name}
                    </div>
                    <div className="text-xs text-[#F5F5F0]/50">
                      {shipment.receiver_address_city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F5F5F0]/70">
                    {shipment.service_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F5F5F0]/70">
                    {new Date(shipment.booking_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      href={`/dashboard/tracking?id=${shipment.shipment_id_str}`}
                      className="inline-flex items-center px-4 py-2 border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-all duration-200"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Package className="h-16 w-16 text-[#F5F5F0]/20 mb-4" />
            <p className="text-[#F5F5F0]/60">No shipments in this category</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
          My Shipments
        </h1>
        <p className="text-[#F5F5F0]/60">
          View and track all your ongoing and past shipments
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5F5F0]/40" />
        <input
          type="text"
          placeholder="Search by tracking ID, receiver name, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]/40 transition-colors"
        />
      </div>

      {/* Tabs and Content */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-[#C5A059]/20 p-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "ongoing"
                  ? "bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border border-[#C5A059]/30"
                  : "text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:bg-[#2A2A2A]/50"
              }`}
            >
              Ongoing ({filteredShipments.ongoing.length})
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "delivered"
                  ? "bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border border-[#C5A059]/30"
                  : "text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:bg-[#2A2A2A]/50"
              }`}
            >
              Delivered ({filteredShipments.delivered.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "pending"
                  ? "bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border border-[#C5A059]/30"
                  : "text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:bg-[#2A2A2A]/50"
              }`}
            >
              Pending ({filteredShipments.pending.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
                <p className="text-[#F5F5F0]/60">Loading shipments...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "ongoing" && (
                <ShipmentsTable shipments={filteredShipments.ongoing} />
              )}
              {activeTab === "delivered" && (
                <ShipmentsTable shipments={filteredShipments.delivered} />
              )}
              {activeTab === "pending" && (
                <ShipmentsTable shipments={filteredShipments.pending} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
