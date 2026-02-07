"use client";

import { useSession } from "@/hooks/use-session";
import { useApi } from "@/hooks/use-api";
import { DollarSign, Package, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

interface EmployeeStats {
  current_balance: number;
  total_shipments_count: number;
  total_shipments_value: number;
  all_shipments: {
    id: number;
    shipment_id_str: string;
    receiver_name: string;
    status: string;
    created_at: string;
  }[];
}

export default function EmployeeDashboard() {
  const { session } = useSession();
  const { data: stats, isLoading, error } = useApi<EmployeeStats>(
    session ? `/api/employee/day-end-stats` : null
  );

  const statCards = [
    {
      title: "Current Balance",
      value: stats?.current_balance,
      icon: DollarSign,
      isCurrency: true,
      color: "brand-gold",
    },
    {
      title: "Total Shipments",
      value: stats?.total_shipments_count,
      icon: Package,
      color: "blue-500",
    },
    {
      title: "Total Volume",
      value: stats?.total_shipments_value,
      icon: TrendingUp,
      isCurrency: true,
      color: "green-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          Employee Dashboard
        </h1>
        <p className="text-gray-400 font-sans">
          Overview of your account and recent activity
        </p>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Link
          href="/employee/shipments/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-wider uppercase font-semibold"
        >
          <Plus size={18} />
          Create New Shipment
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-brand-gray p-6 border border-white/10 rounded"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-sans text-gray-400 uppercase tracking-wider">
                {card.title}
              </h3>
              <card.icon className={`text-${card.color}`} size={24} />
            </div>
            <div className="text-3xl font-serif text-white">
              {isLoading ? (
                <div className="h-9 w-24 bg-white/10 animate-pulse rounded"></div>
              ) : error ? (
                <span className="text-red-500 text-sm">Error</span>
              ) : card.isCurrency ? (
                `₹${Number(card.value ?? 0).toFixed(2)}`
              ) : (
                card.value ?? 0
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments */}
      <div className="bg-brand-gray border border-white/10 rounded">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-serif text-white">Recent Activity</h2>
          <p className="text-sm text-gray-400 font-sans mt-1">
            Your latest shipments
          </p>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-8">
              Could not load recent activity.
            </p>
          ) : stats && stats.all_shipments.length > 0 ? (
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
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-sans text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.all_shipments.slice(0, 10).map((shipment) => (
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
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 text-xs font-sans bg-brand-gold/20 text-brand-gold border border-brand-gold/30 rounded-full">
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/tracking?id=${shipment.shipment_id_str}`}
                          className="text-brand-gold hover:underline text-sm font-sans"
                        >
                          View
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
              <p className="text-gray-400 font-sans">
                No shipments created yet.
              </p>
              <Link
                href="/employee/shipments/new"
                className="inline-block mt-4 text-brand-gold hover:underline font-sans text-sm"
              >
                Create your first shipment
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
