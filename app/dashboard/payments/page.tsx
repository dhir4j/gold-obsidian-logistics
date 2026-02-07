"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, CheckCircle, Clock, XCircle } from "lucide-react";

interface Payment {
  id: number;
  shipment_id_str: string;
  amount: number;
  utr: string;
  status: string;
  created_at: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetchPayments(email);
    }
  }, []);

  const fetchPayments = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com"}/api/user/payments?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      }
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-orange-400" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Pending":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
          Billing & Payments
        </h1>
        <p className="text-[#F5F5F0]/60">
          View and manage your payment history and invoices
        </p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
              Total Payments
            </p>
            <CreditCard className="h-6 w-6 text-[#C5A059]/30" />
          </div>
          <p className="text-3xl font-bold text-[#F5F5F0] font-serif">
            {payments.length}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-green-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
              Approved
            </p>
            <CheckCircle className="h-6 w-6 text-green-400/30" />
          </div>
          <p className="text-3xl font-bold text-[#F5F5F0] font-serif">
            {payments.filter((p) => p.status === "Approved").length}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-orange-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
              Pending
            </p>
            <Clock className="h-6 w-6 text-orange-400/30" />
          </div>
          <p className="text-3xl font-bold text-[#F5F5F0] font-serif">
            {payments.filter((p) => p.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 overflow-hidden">
        <div className="border-b border-[#C5A059]/20 p-6">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0]">
            Payment History
          </h2>
          <p className="text-sm text-[#F5F5F0]/60 mt-1">
            All your payment transactions and their status
          </p>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
                <p className="text-[#F5F5F0]/60">Loading payments...</p>
              </div>
            </div>
          ) : payments.length > 0 ? (
            <table className="w-full">
              <thead className="bg-[#2A2A2A]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Shipment ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    UTR Reference
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#F5F5F0]/60 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A059]/10">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-[#2A2A2A]/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-[#C5A059]">
                        {payment.shipment_id_str}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-[#F5F5F0]/70">
                        {payment.utr}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#F5F5F0]">
                      ₹{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F5F5F0]/70">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(payment.status)}
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CreditCard className="h-16 w-16 text-[#F5F5F0]/20 mb-4" />
              <p className="text-[#F5F5F0]/60 mb-2">No payment history</p>
              <p className="text-sm text-[#F5F5F0]/40">
                Your payment transactions will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
