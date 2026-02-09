"use client";

import { useSession } from "@/hooks/use-session";
import { useApi } from "@/hooks/use-api";
import { Package, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  receiver_city: string;
  status: string;
  created_at: string;
  weight: number;
}

export default function MyShipmentsPage() {
  const { session } = useSession();
  const { data: shipments, isLoading, error } = useApi<Shipment[]>(
    session ? `/api/shipments?email=${session.email}` : null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShipments = shipments?.filter(
    (shipment) =>
      shipment.shipment_id_str.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          My Shipments
        </h1>
        <p className="text-gray-400 font-sans">
          View and track all your shipments
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by tracking ID, receiver name, or city..."
            className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
          />
        </div>
      </div>

      {/* Shipments List */}
      <div className="bg-brand-gray border border-white/10 rounded">
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-white/5 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-8">
              Could not load shipments. Please try again later.
            </p>
          ) : filteredShipments && filteredShipments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Receiver
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono text-sm text-white">
                        {shipment.shipment_id_str}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300 font-sans">
                        {shipment.receiver_name}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300 font-sans">
                        {shipment.receiver_city}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-300 font-sans">
                        {shipment.weight} kg
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 text-xs font-sans bg-brand-gold/20 text-brand-gold border border-brand-gold/30 rounded-full">
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/employee/tracking?id=${shipment.shipment_id_str}`}
                          className="text-brand-gold hover:underline text-sm font-sans"
                        >
                          Track
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 font-sans mb-2">
                {searchTerm
                  ? "No shipments found matching your search."
                  : "No shipments created yet."}
              </p>
              {!searchTerm && (
                <Link
                  href="/employee/shipments/new"
                  className="inline-block mt-4 text-brand-gold hover:underline font-sans text-sm"
                >
                  Create your first shipment
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
