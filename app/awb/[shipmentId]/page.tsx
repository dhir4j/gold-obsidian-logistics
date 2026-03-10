"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Printer, Download, Loader2 } from "lucide-react";
import AwbSheet from "@/components/AwbSheet";

interface ShipmentData {
  shipment_id_str: string;
  service_type: string;
  booking_date: string;
  total_with_tax_18_percent: number;
  sender_name: string;
  sender_address_street: string;
  sender_address_city: string;
  sender_address_state: string;
  sender_address_pincode: string;
  sender_address_country: string;
  sender_phone: string;
  user_email: string;
  receiver_name: string;
  receiver_address_street: string;
  receiver_address_city: string;
  receiver_address_state: string;
  receiver_address_pincode: string;
  receiver_address_country: string;
  receiver_phone: string;
  package_weight_kg: number;
  package_length_cm: number;
  package_width_cm: number;
  package_height_cm: number;
  goods_details: { description: string; quantity: number; hsn_code: string; value: number }[];
}

export default function AwbPage({ params }: { params: Promise<{ shipmentId: string }> }) {
  const { shipmentId } = use(params);
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!sheetRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(sheetRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AWB-${shipmentId}.pdf`);
    } catch {
      alert("Failed to generate PDF. Please try printing instead.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="h-8 w-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] gap-4">
        <p className="text-red-400">{error || "Shipment not found"}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#C5A059] text-[#121212] rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Action Bar */}
      <div className="no-print sticky top-0 z-10 bg-[#121212] border-b border-[#C5A059]/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="font-serif text-xl font-bold text-[#F5F5F0]">
              AWB — {shipment.shipment_id_str}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-[#C5A059]/30 text-[#C5A059] rounded-lg hover:bg-[#C5A059]/10 transition-colors text-sm font-medium"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] text-[#121212] rounded-lg hover:bg-[#C5A059]/90 transition-colors text-sm font-semibold disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* AWB Sheet */}
      <div className="max-w-4xl mx-auto p-6">
        <div ref={sheetRef}>
          <AwbSheet shipment={shipment} />
        </div>
      </div>
    </div>
  );
}
