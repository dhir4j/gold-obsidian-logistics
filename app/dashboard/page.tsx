"use client";

import { useEffect, useState } from "react";
import { Package, Truck, CheckCircle2, Clock, TrendingUp, PlusCircle } from "lucide-react";
import Link from "next/link";

interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  receiver_address_city: string;
  booking_date: string;
  status: string;
  total_with_tax_18_percent: number;
}

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get or set test user
    let email = localStorage.getItem("userEmail");
    if (!email) {
      email = "test@waynex.com";
      localStorage.setItem("userEmail", email);
    }
    setUserEmail(email);
    fetchShipments(email);
  }, []);

  const fetchShipments = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/shipments?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setShipments(data);
      } else {
        // If API call fails, set empty array
        setShipments([]);
      }
    } catch (error) {
      console.error("Failed to fetch shipments", error);
      // Set empty array on error for testing
      setShipments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: shipments.length,
    inTransit: shipments.filter(
      (s) => s.status === "In Transit" || s.status === "Out for Delivery"
    ).length,
    delivered: shipments.filter((s) => s.status === "Delivered").length,
    pending: shipments.filter((s) => s.status === "Pending Payment").length,
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
            Dashboard
          </h1>
          <p className="text-[#F5F5F0]/60">
            Welcome back! Here's an overview of your shipping activity.
          </p>
        </div>
        <Link
          href="/booking"
          className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          New Shipment
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Shipments */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 hover:border-[#C5A059]/40 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                Total Shipments
              </p>
              <Package className="h-8 w-8 text-[#C5A059]/30" />
            </div>
            <p className="text-4xl font-bold text-[#F5F5F0] font-serif">
              {stats.total}
            </p>
          </div>
        </div>

        {/* In Transit */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                In Transit
              </p>
              <Truck className="h-8 w-8 text-blue-400/30" />
            </div>
            <p className="text-4xl font-bold text-[#F5F5F0] font-serif">
              {stats.inTransit}
            </p>
          </div>
        </div>

        {/* Delivered */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-green-500/20 p-6 hover:border-green-500/40 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                Delivered
              </p>
              <CheckCircle2 className="h-8 w-8 text-green-400/30" />
            </div>
            <p className="text-4xl font-bold text-[#F5F5F0] font-serif">
              {stats.delivered}
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-orange-500/20 p-6 hover:border-orange-500/40 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                Pending
              </p>
              <Clock className="h-8 w-8 text-orange-400/30" />
            </div>
            <p className="text-4xl font-bold text-[#F5F5F0] font-serif">
              {stats.pending}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 overflow-hidden">
        <div className="border-b border-[#C5A059]/20 p-6">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0]">
            Recent Shipments
          </h2>
          <p className="text-sm text-[#F5F5F0]/60 mt-1">
            Your 5 most recent shipments
          </p>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
                <p className="text-[#F5F5F0]/60">Loading shipments...</p>
              </div>
            </div>
          ) : shipments.length > 0 ? (
            <table className="w-full">
              <thead className="bg-[#2A2A2A]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Destination
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
                {shipments.slice(0, 5).map((shipment) => (
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
                        href={`/tracking?id=${shipment.shipment_id_str}`}
                        className="inline-flex items-center px-4 py-2 border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-all duration-200"
                      >
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
              <p className="text-[#F5F5F0]/60 mb-2">No shipments yet</p>
              <p className="text-sm text-[#F5F5F0]/40 mb-4">
                Create your first shipment to get started
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Shipment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/booking"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 hover:border-[#C5A059]/40 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F0] mb-2">
                New Booking
              </h3>
              <p className="text-sm text-[#F5F5F0]/60">
                Create a new shipment request
              </p>
            </div>
            <PlusCircle className="h-8 w-8 text-[#C5A059]/50 group-hover:text-[#C5A059] transition-colors" />
          </div>
        </Link>

        <Link
          href="/tracking"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 hover:border-[#C5A059]/40 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F0] mb-2">
                Track Shipment
              </h3>
              <p className="text-sm text-[#F5F5F0]/60">
                Track your package in real-time
              </p>
            </div>
            <Truck className="h-8 w-8 text-[#C5A059]/50 group-hover:text-[#C5A059] transition-colors" />
          </div>
        </Link>

        <Link
          href="/pricing"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 hover:border-[#C5A059]/40 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#F5F5F0] mb-2">
                Get Quote
              </h3>
              <p className="text-sm text-[#F5F5F0]/60">
                Calculate shipping costs
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-[#C5A059]/50 group-hover:text-[#C5A059] transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
