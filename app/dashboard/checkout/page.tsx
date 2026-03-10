"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  Loader2,
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
type Step = "select" | "pay" | "success";

export default function CheckoutPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [step, setStep] = useState<Step>("select");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleUtrChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    setUtr(cleaned);
    setUtrError("");
    setSubmitError("");
  };

  const handleSubmitPayment = async () => {
    if (utr.length !== 12) {
      setUtrError("Please enter a valid 12-digit UTR number");
      return;
    }
    if (!order) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";

      const res = await fetch(`${apiUrl}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": session.email || "",
        },
        body: JSON.stringify({
          shipment_id_str: order.shipmentId,
          amount: order.totalPrice,
          utr,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to submit payment");
        return;
      }

      setStep("success");
      sessionStorage.removeItem("checkoutOrder");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Success screen
  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto space-y-8 text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-3">
            Payment Submitted
          </h1>
          <p className="text-[#F5F5F0]/60 text-lg mb-2">
            Awaiting Payment Confirmation
          </p>
          <p className="text-[#F5F5F0]/40 text-sm max-w-md mx-auto">
            Your payment details have been submitted for verification.
            Once approved, your shipment status will be updated to &ldquo;Booked&rdquo;.
          </p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 text-left">
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">Shipment ID</span>
            <span className="text-[#C5A059] font-mono font-bold">{order.shipmentId}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/5">
            <span className="text-[#F5F5F0]/60">Amount</span>
            <span className="text-[#F5F5F0] font-medium">₹{order.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#F5F5F0]/60">UTR Number</span>
            <span className="text-[#F5F5F0] font-mono">{utr}</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/dashboard/my-shipments")}
          className="px-8 py-3 bg-[#C5A059] text-[#121212] rounded-lg font-semibold hover:bg-[#C5A059]/90 transition-colors"
        >
          View My Shipments
        </button>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "upi" as const,
      label: "UPI",
      icon: Smartphone,
      description: "Pay using Google Pay, PhonePe, Paytm, or any UPI app",
      available: true,
    },
    {
      id: "card" as const,
      label: "Credit / Debit Card",
      icon: CreditCard,
      description: "Pay securely with Visa, Mastercard, or RuPay",
      available: false,
    },
    {
      id: "bank" as const,
      label: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfer via NEFT, RTGS, or IMPS",
      available: false,
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
                onClick={() => {
                  setSelectedMethod(isSelected ? null : method.id);
                  if (method.available && !isSelected) {
                    setStep("pay");
                  } else {
                    setStep("select");
                  }
                }}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all duration-300 relative ${
                  isSelected
                    ? method.available
                      ? "border-[#C5A059] bg-[#C5A059]/10"
                      : "border-[#C5A059]/40 bg-[#C5A059]/5"
                    : "border-[#C5A059]/20 hover:border-[#C5A059]/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isSelected ? "bg-[#C5A059]/20" : "bg-[#121212]"}`}>
                    <Icon className={`h-6 w-6 ${isSelected ? "text-[#C5A059]" : "text-[#F5F5F0]/50"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold ${isSelected ? "text-[#C5A059]" : "text-[#F5F5F0]"}`}>
                        {method.label}
                      </p>
                      {!method.available && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059]/70 border border-[#C5A059]/20 font-medium">
                          Coming Soon
                        </span>
                      )}
                    </div>
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

        {/* Coming Soon for card/bank */}
        {selectedMethod && !paymentMethods.find((m) => m.id === selectedMethod)?.available && (
          <div className="mt-6 p-8 rounded-lg border border-[#C5A059]/20 bg-[#121212]/80 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C5A059]/10 mb-4">
              <Clock className="h-8 w-8 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#F5F5F0] mb-2">
              Coming Soon
            </h3>
            <p className="text-[#F5F5F0]/60 max-w-md mx-auto">
              This payment method is currently under development. Please use UPI to complete your payment.
            </p>
          </div>
        )}

        {/* UPI Payment Section */}
        {selectedMethod === "upi" && step === "pay" && (
          <div className="mt-6 space-y-6">
            {/* QR Code */}
            <div className="p-6 rounded-lg border border-[#C5A059]/20 bg-[#121212]/80">
              <div className="text-center space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#F5F5F0]">
                  Scan QR Code to Pay
                </h3>
                <div className="inline-block p-4 bg-white rounded-xl">
                  <Image
                    src="/images/qrcode.png"
                    alt="UPI QR Code"
                    width={220}
                    height={220}
                    className="rounded"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[#C5A059] font-bold text-2xl">
                    ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-[#F5F5F0]/40 text-sm">
                    Scan with Google Pay, PhonePe, Paytm, or any UPI app
                  </p>
                </div>
              </div>
            </div>

            {/* UTR Input */}
            <div className="p-6 rounded-lg border border-[#C5A059]/20 bg-[#121212]/80 space-y-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#F5F5F0] mb-1">
                  Enter UTR Number
                </h3>
                <p className="text-[#F5F5F0]/40 text-sm">
                  After completing payment, enter the 12-digit UTR (transaction reference) number from your UPI app.
                </p>
              </div>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={utr}
                  onChange={(e) => handleUtrChange(e.target.value)}
                  placeholder="Enter 12-digit UTR number"
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/30 rounded-lg text-[#F5F5F0] font-mono text-lg tracking-widest placeholder:text-[#F5F5F0]/20 placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                  maxLength={12}
                />
                <div className="flex justify-between mt-2">
                  {utrError ? (
                    <p className="text-red-400 text-sm">{utrError}</p>
                  ) : (
                    <p className="text-[#F5F5F0]/30 text-sm">
                      {utr.length}/12 digits
                    </p>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              <button
                onClick={handleSubmitPayment}
                disabled={submitting || utr.length !== 12}
                className="w-full py-3 bg-[#C5A059] text-[#121212] rounded-lg font-semibold hover:bg-[#C5A059]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Payment"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-[#121212] border border-white/5 text-[#F5F5F0]/40 text-sm">
        <Shield className="h-5 w-5 text-[#C5A059]/50 flex-shrink-0" />
        <p>
          Your payment is securely processed. The UTR number is used to verify
          your transaction. Your shipment will be confirmed once payment is
          approved.
        </p>
      </div>
    </div>
  );
}
