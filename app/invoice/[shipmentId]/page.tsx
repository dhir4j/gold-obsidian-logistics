"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import InvoiceSheet from "@/components/InvoiceSheet";

interface ShipmentData {
  shipment_id_str: string;
  booking_date: string;
  sender_name: string;
  sender_address_street: string;
  sender_address_city: string;
  sender_address_state: string;
  sender_address_pincode: string;
  sender_address_country: string;
  sender_phone: string;
  receiver_name: string;
  receiver_address_street: string;
  receiver_address_city: string;
  receiver_address_state: string;
  receiver_address_pincode: string;
  receiver_address_country: string;
  receiver_phone: string;
  price_without_tax: number;
  tax_amount_18_percent: number;
  total_with_tax_18_percent: number;
  goods_details: { description: string; quantity: number; hsn_code: string; value: number }[];
}

export default function InvoicePage({ params }: { params: Promise<{ shipmentId: string }> }) {
  const { shipmentId } = use(params);
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
        const res = await fetch(`${apiUrl}/api/shipments/${shipmentId}`);
        if (!res.ok) throw new Error("Shipment not found");
        const data = await res.json();
        setShipment(data);
      } catch {
        setError("Failed to load shipment data");
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [shipmentId]);

  const handleSave = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="h-8 w-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
        <p className="text-red-500">{error || "Shipment not found"}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#C5A059] text-white rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Invoice Sheet */}
      <div className="max-w-4xl mx-auto pt-8 px-6">
        <InvoiceSheet shipment={shipment} />
      </div>

      {/* Action Buttons below the sheet */}
      <div className="no-print max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#b8933f] transition-colors text-sm font-semibold"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
