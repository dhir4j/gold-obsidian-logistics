"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Eye } from "lucide-react";
import Link from "next/link";

interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  booking_date: string;
  status: string;
}

export default function DocumentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        // Filter only shipments that are not pending payment
        const validShipments = data.filter(
          (s: Shipment) => s.status !== "Pending Payment"
        );
        setShipments(validShipments);
      }
    } catch (error) {
      console.error("Failed to fetch shipments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Transit":
      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
          Documents & Invoices
        </h1>
        <p className="text-[#F5F5F0]/60">
          View and download invoices, AWB labels, and shipping documents
        </p>
      </div>

      {/* Documents Table */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 overflow-hidden">
        <div className="border-b border-[#C5A059]/20 p-6">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0]">
            Available Documents
          </h2>
          <p className="text-sm text-[#F5F5F0]/60 mt-1">
            Download shipping labels and invoices for your shipments
          </p>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
                <p className="text-[#F5F5F0]/60">Loading documents...</p>
              </div>
            </div>
          ) : shipments.length > 0 ? (
            <table className="w-full">
              <thead className="bg-[#2A2A2A]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Shipment ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Receiver
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A059]/10">
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="hover:bg-[#2A2A2A]/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-[#C5A059]">
                        {shipment.shipment_id_str}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#F5F5F0]">
                      {shipment.receiver_name}
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
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/awb/${shipment.id}`}
                          target="_blank"
                          className="inline-flex items-center px-3 py-2 text-sm border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-all duration-200"
                          title="View AWB Label"
                        >
                          <Eye className="mr-1.5 h-4 w-4" />
                          AWB
                        </Link>
                        <Link
                          href={`/invoice/${shipment.id}`}
                          target="_blank"
                          className="inline-flex items-center px-3 py-2 text-sm border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 rounded-lg transition-all duration-200"
                          title="Download Invoice"
                        >
                          <Download className="mr-1.5 h-4 w-4" />
                          Invoice
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="h-16 w-16 text-[#F5F5F0]/20 mb-4" />
              <p className="text-[#F5F5F0]/60 mb-2">No documents available</p>
              <p className="text-sm text-[#F5F5F0]/40">
                Documents will be available once you create shipments
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6">
        <h3 className="text-lg font-semibold text-[#F5F5F0] mb-4">
          About Your Documents
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#C5A059]">AWB Label</h4>
            <p className="text-sm text-[#F5F5F0]/60">
              Air Waybill label contains the barcode and tracking information. Print
              and attach this to your package.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#C5A059]">Invoice</h4>
            <p className="text-sm text-[#F5F5F0]/60">
              Commercial invoice with shipment details, pricing breakdown, and tax
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
