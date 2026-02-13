"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Building2,
  Smartphone,
  Package,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Copy,
  Shield,
} from "lucide-react";

interface OrderData {
  shipmentId: string;
  shipmentType: string;
  senderName: string;
  receiverName: string;
  receiverCountry: string;
  receiverCity: string;
  chargeableWeight: number;
  totalPrice: number;
  serviceType: string;
}

type PaymentMethod = "card" | "bank" | "upi" | null;

export default function CheckoutPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("checkoutOrder");
    if (!stored) {
      router.push("/dashboard/booking");
      return;
    }
    setOrder(JSON.parse(stored));
  }, [router]);

  const copyShipmentId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "card" as const,
      label: "Credit / Debit Card",
      icon: CreditCard,
      description: "Pay securely with Visa, Mastercard, or RuPay",
    },
    {
      id: "bank" as const,
      label: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfer via NEFT, RTGS, or IMPS",
    },
    {
      id: "upi" as const,
      label: "UPI",
      icon: Smartphone,
      description: "Pay using Google Pay, PhonePe, Paytm, or any UPI app",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/booking")}
          className="p-2 rounded-lg border border-[#C5A059]/20 text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5F5F0]">
            Checkout
          </h1>
          <p className="text-[#F5F5F0]/60">
            Complete your shipment booking
          </p>
        </div>
      </div>

      {/* Shipment ID Card */}
      <div className="rounded-xl bg-gradient-to-br from-[#C5A059]/10 to-[#C5A059]/5 border border-[#C5A059]/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#C5A059]/20">
              <Package className="h-6 w-6 text-[#C5A059]" />
            </div>
            <div>
              <p className="text-sm text-[#F5F5F0]/60">Shipment ID</p>
              <p className="text-2xl font-bold font-mono text-[#C5A059] tracking-wider">
                {order.shipmentId}
              </p>
            </div>
          </div>
          <button
            onClick={copyShipmentId}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors text-sm"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
        <h2 className="font-serif text-xl font-semibold text-[#F5F5F0] mb-6">
          Order Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">Type</span>
            <span className="text-[#F5F5F0] font-medium capitalize">{order.shipmentType}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">From</span>
            <span className="text-[#F5F5F0] font-medium">{order.senderName}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">To</span>
            <span className="text-[#F5F5F0] font-medium">
              {order.receiverName} — {order.receiverCity}, {order.receiverCountry}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">Service</span>
            <span className="text-[#F5F5F0] font-medium">{order.serviceType}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">Chargeable Weight</span>
            <span className="text-[#F5F5F0] font-medium">{order.chargeableWeight.toFixed(2)} kg</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-[#F5F5F0] font-semibold text-lg">Total Amount</span>
            <span className="text-[#C5A059] font-bold text-2xl">
              ₹{order.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
        <h2 className="font-serif text-xl font-semibold text-[#F5F5F0] mb-6">
          Select Payment Method
        </h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(isSelected ? null : method.id)}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-[#C5A059] bg-[#C5A059]/10"
                    : "border-[#C5A059]/20 hover:border-[#C5A059]/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isSelected ? "bg-[#C5A059]/20" : "bg-[#121212]"}`}>
                    <Icon className={`h-6 w-6 ${isSelected ? "text-[#C5A059]" : "text-[#F5F5F0]/50"}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isSelected ? "text-[#C5A059]" : "text-[#F5F5F0]"}`}>
                      {method.label}
                    </p>
                    <p className="text-sm text-[#F5F5F0]/50">{method.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-[#C5A059]" : "border-[#F5F5F0]/30"
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Coming Soon Overlay */}
        {selectedMethod && (
          <div className="mt-6 p-8 rounded-lg border border-[#C5A059]/20 bg-[#121212]/80 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C5A059]/10 mb-4">
              <Clock className="h-8 w-8 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#F5F5F0] mb-2">
              Coming Soon
            </h3>
            <p className="text-[#F5F5F0]/60 max-w-md mx-auto">
              Online payment integration is currently under development. Please
              contact our team to complete your booking.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@waynexshipping.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] rounded-lg hover:bg-[#C5A059]/30 transition-colors text-sm font-medium"
              >
                Email Support
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] rounded-lg hover:bg-[#C5A059]/30 transition-colors text-sm font-medium"
              >
                Call Us
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-[#121212] border border-white/5 text-[#F5F5F0]/40 text-sm">
        <Shield className="h-5 w-5 text-[#C5A059]/50 flex-shrink-0" />
        <p>
          Your shipment ID has been generated. Once payment is available, you
          can use this ID to complete your transaction. No charges have been
          applied.
        </p>
      </div>
    </div>
  );
}
