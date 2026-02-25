"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/hooks/use-session";
import { Gift, DollarSign, ArrowRight } from "lucide-react";

export default function BalancePage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { session } = useSession();

  const fetchBalance = useCallback(async () => {
    if (!session?.email) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com"}/api/employee/day-end-stats`,
        { headers: { "X-User-Email": session.email } }
      );
      if (res.ok) {
        const data = await res.json();
        setBalance(data.current_balance);
      }
    } catch {}
  }, [session?.email]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      setMessage({
        type: "error",
        text: "Please enter a top-up code.",
      });
      return;
    }

    if (!session) {
      setMessage({
        type: "error",
        text: "You must be logged in to redeem a code.",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com"}/api/employee/redeem-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email: session.email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: result.message || "Code redeemed successfully!",
        });
        setCode("");
        if (result.new_balance !== undefined) {
          setBalance(result.new_balance);
        } else {
          fetchBalance();
        }
      } else {
        setMessage({
          type: "error",
          text: result.error || "An unexpected error occurred.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Could not connect to the server. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
          Balance & Top-up
        </h1>
        <p className="text-gray-400 font-sans">
          Manage your account balance and redeem top-up codes
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-brand-gray p-8 border border-white/10 rounded mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded">
            <DollarSign className="text-brand-gold" size={32} />
          </div>
          <div>
            <p className="text-sm font-sans text-gray-400 uppercase tracking-wider mb-1">
              Current Balance
            </p>
            <p className="text-4xl font-serif text-brand-gold">
              {balance !== null ? `₹${balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` : "Loading..."}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-sans mt-4">
          Your balance is deducted automatically when you create shipments.
          Contact your administrator for balance top-ups.
        </p>
      </div>

      {/* Redeem Code Section */}
      <div className="max-w-2xl">
        <div className="bg-brand-gray p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <Gift className="text-brand-gold" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif text-white">
                Redeem Balance Code
              </h2>
              <p className="text-sm text-gray-400 font-sans">
                Enter the code provided by your administrator
              </p>
            </div>
          </div>

          <form onSubmit={handleRedeem} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-gray-400 text-sm font-sans mb-2"
              >
                Top-up Code *
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                disabled={isLoading}
                className="w-full px-4 py-4 bg-brand-dark border border-white/10 text-white text-center text-lg tracking-widest font-mono placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors uppercase"
                placeholder="ENTER CODE HERE"
                maxLength={20}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded border ${
                  message.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                <p className="text-sm font-sans">{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !code}
              className="w-full px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "Redeeming..."
              ) : (
                <>
                  Redeem Code
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400 font-sans text-center">
              Need a top-up code?{" "}
              <a
                href="mailto:support@waynexshipping.com"
                className="text-brand-gold hover:underline font-semibold"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
