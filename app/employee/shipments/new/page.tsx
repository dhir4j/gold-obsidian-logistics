"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import {
  Package,
  User,
  MapPin,
  ArrowRight,
  Calculator,
  Scale,
  Ruler,
  Phone,
  Globe,
  Wallet,
  FileText,
  Download,
  Check,
} from "lucide-react";

interface IntlOption {
  destination: string;
  country: string;
  service: string;
  max_weight: number;
}

interface PriceDetails {
  total_price?: number;
  total_with_tax_18_percent?: number;
  zone?: string;
  rounded_weight?: number;
  mode?: string;
  [key: string]: any;
}

export default function CreateShipmentPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [createdShipment, setCreatedShipment] = useState<any>(null);
  const { session } = useSession();
  const router = useRouter();

  // International options
  const [intlOptions, setIntlOptions] = useState<IntlOption[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedIntlOption, setSelectedIntlOption] = useState<IntlOption | null>(null);
  const [intlLoading, setIntlLoading] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPincode: "",
    senderCountry: "India",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPincode: "",
    receiverCountry: "India",
    weight: "",
    length: "",
    width: "",
    height: "",
    goodsDescription: "",
    goodsValue: "",
    serviceType: "Express",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";

  // Fetch employee balance
  useEffect(() => {
    if (!session?.email) return;
    fetch(`${apiUrl}/api/employee/day-end-stats`, {
      headers: { "X-User-Email": session.email },
    })
      .then((res) => res.json())
      .then((data) => setBalance(data.current_balance ?? 0))
      .catch(() => {});
  }, [session?.email, apiUrl]);

  // Fetch international options when switching to international tab
  useEffect(() => {
    if (activeTab === "international") {
      setIntlLoading(true);
      fetch(`${apiUrl}/api/international/options`)
        .then((res) => res.json())
        .then((data) => {
          if (data.options) setIntlOptions(data.options);
        })
        .catch(() => {})
        .finally(() => setIntlLoading(false));
    }
  }, [activeTab, apiUrl]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredIntlOptions = intlOptions.filter((o) => {
    const label = `${o.country} (${o.service})`.toLowerCase();
    return label.includes(countrySearch.toLowerCase());
  });

  const formatService = (service: string) => {
    if (service === "SELF") return "Self Clearance";
    if (service === "DDP") return "Duty Paid";
    return service;
  };

  // Weight calculations
  const actualWeight = parseFloat(formData.weight) || 0;
  const lengthVal = parseFloat(formData.length) || 0;
  const widthVal = parseFloat(formData.width) || 0;
  const heightVal = parseFloat(formData.height) || 0;
  const volumetricWeight =
    lengthVal > 0 && widthVal > 0 && heightVal > 0
      ? (lengthVal * widthVal * heightVal) / 5000
      : 0;
  const chargeableWeight = Math.max(actualWeight, volumetricWeight);
  const showWeightComparison = actualWeight > 0 && volumetricWeight > 0;
  const intlMaxWeight = selectedIntlOption?.max_weight || 0;
  const weightExceeded =
    activeTab === "international" && intlMaxWeight > 0 && chargeableWeight > intlMaxWeight;

  const totalPrice = priceDetails
    ? priceDetails.total_price ?? priceDetails.total_with_tax_18_percent ?? 0
    : 0;
  const hasSufficientBalance = balance !== null && balance >= totalPrice;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset price when relevant fields change
    if (["weight", "length", "width", "height", "receiverCity", "receiverState", "serviceType"].includes(e.target.name)) {
      setPriceDetails(null);
    }
  };

  const handleCalculatePrice = async () => {
    if (actualWeight <= 0) return;

    if (activeTab === "domestic" && (!formData.receiverCity || !formData.serviceType)) return;
    if (activeTab === "international" && !selectedIntlOption) return;
    if (weightExceeded) return;

    setIsCalculating(true);
    setPriceDetails(null);

    try {
      let url = "";
      let body = {};

      if (activeTab === "domestic") {
        url = `${apiUrl}/api/domestic/price`;
        body = {
          city: formData.receiverCity,
          state: formData.receiverState,
          weight: chargeableWeight,
          mode: formData.serviceType,
        };
      } else {
        url = `${apiUrl}/api/international/calculate`;
        body = {
          destination: selectedIntlOption!.destination,
          service: selectedIntlOption!.service,
          weight: chargeableWeight,
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        setPriceDetails(data);
      } else {
        alert(data.error || "Could not calculate price");
      }
    } catch {
      alert("Failed to calculate price. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!priceDetails || totalPrice <= 0) {
      alert("Please calculate the price first.");
      return;
    }

    if (!hasSufficientBalance) {
      alert("Insufficient balance. Please top up your balance first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        activeTab === "domestic"
          ? `${apiUrl}/api/shipments/domestic`
          : `${apiUrl}/api/shipments/international`;

      const shipmentData = {
        user_email: session?.email || "",
        sender_name: formData.senderName,
        sender_phone: formData.senderPhone,
        sender_address_street: formData.senderAddress,
        sender_address_city: formData.senderCity,
        sender_address_state: formData.senderState,
        sender_address_pincode: formData.senderPincode,
        sender_address_country: formData.senderCountry,
        receiver_name: formData.receiverName,
        receiver_phone: formData.receiverPhone,
        receiver_address_street: formData.receiverAddress,
        receiver_address_city: formData.receiverCity,
        receiver_address_state: formData.receiverState,
        receiver_address_pincode: formData.receiverPincode,
        receiver_address_country:
          activeTab === "domestic" ? "India" : formData.receiverCountry,
        service_type:
          activeTab === "domestic"
            ? `Domestic ${formData.serviceType}`
            : "International Express",
        pickup_date: new Date().toISOString().split("T")[0],
        package_weight_kg: chargeableWeight,
        package_length_cm: lengthVal || 1,
        package_width_cm: widthVal || 1,
        package_height_cm: heightVal || 1,
        goods: [
          {
            description: formData.goodsDescription,
            weight: parseFloat(formData.weight),
            length: lengthVal,
            width: widthVal,
            height: heightVal,
            value: parseFloat(formData.goodsValue),
          },
        ],
        final_total_price_with_tax: totalPrice,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipmentData),
      });

      const result = await response.json();

      if (response.ok) {
        setCreatedShipment(result.data);
        // Update balance locally
        if (balance !== null) {
          setBalance(balance - totalPrice);
        }
      } else {
        alert(result.error || "Failed to create shipment.");
      }
    } catch {
      alert("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!createdShipment) return;

    const priceWithoutTax = (totalPrice / 1.18).toFixed(2);
    const taxAmount = (totalPrice - parseFloat(priceWithoutTax)).toFixed(2);

    const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Invoice - ${createdShipment.shipment_id_str}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; background: #fff; padding: 40px; }
  .invoice { max-width: 800px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #C5A059; padding-bottom: 20px; margin-bottom: 30px; }
  .logo { font-size: 28px; font-weight: 700; color: #C5A059; letter-spacing: 2px; }
  .logo-sub { font-size: 11px; color: #666; letter-spacing: 1px; margin-top: 4px; }
  .invoice-title { text-align: right; }
  .invoice-title h1 { font-size: 32px; color: #1a1a1a; font-weight: 300; letter-spacing: 3px; }
  .invoice-title .inv-num { font-size: 13px; color: #666; margin-top: 4px; }
  .meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
  .meta-block h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #C5A059; margin-bottom: 8px; }
  .meta-block p { font-size: 13px; color: #333; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  thead th { background: #1a1a1a; color: #C5A059; padding: 12px 16px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  tbody td { padding: 14px 16px; border-bottom: 1px solid #eee; font-size: 13px; }
  .totals { width: 320px; margin-left: auto; }
  .totals .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
  .totals .row.total { border-top: 2px solid #C5A059; padding-top: 12px; margin-top: 4px; font-size: 18px; font-weight: 700; color: #1a1a1a; }
  .status-badge { display: inline-block; padding: 4px 14px; border-radius: 4px; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .status-booked { background: #d4edda; color: #155724; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 11px; color: #999; }
  @media print { body { padding: 20px; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="invoice">
  <div class="header">
    <div>
      <div class="logo">WAYNEX</div>
      <div class="logo-sub">SHIPPING & LOGISTICS</div>
    </div>
    <div class="invoice-title">
      <h1>INVOICE</h1>
      <div class="inv-num">INV-${createdShipment.shipment_id_str}</div>
      <div class="inv-num">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
    </div>
  </div>

  <div class="meta">
    <div class="meta-block">
      <h3>From</h3>
      <p><strong>${formData.senderName}</strong><br>
      ${formData.senderAddress}<br>
      ${formData.senderCity}, ${formData.senderState} ${formData.senderPincode}<br>
      ${formData.senderPhone}</p>
    </div>
    <div class="meta-block">
      <h3>To</h3>
      <p><strong>${formData.receiverName}</strong><br>
      ${formData.receiverAddress}<br>
      ${formData.receiverCity}, ${formData.receiverState} ${formData.receiverPincode}<br>
      ${activeTab === "international" ? formData.receiverCountry + "<br>" : ""}
      ${formData.receiverPhone}</p>
    </div>
    <div class="meta-block">
      <h3>Shipment Info</h3>
      <p>
        <strong>Tracking ID:</strong> ${createdShipment.shipment_id_str}<br>
        <strong>Service:</strong> ${activeTab === "domestic" ? `Domestic ${formData.serviceType}` : "International Express"}<br>
        <strong>Weight:</strong> ${chargeableWeight.toFixed(2)} kg<br>
        <strong>Status:</strong> <span class="status-badge status-booked">${createdShipment.status}</span>
      </p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Weight</th>
        <th>Declared Value</th>
        <th style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${formData.goodsDescription || "Shipment"}</td>
        <td>${chargeableWeight.toFixed(2)} kg</td>
        <td>₹${parseFloat(formData.goodsValue || "0").toLocaleString("en-IN")}</td>
        <td style="text-align:right">₹${parseFloat(priceWithoutTax).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="row"><span>Subtotal</span><span>₹${parseFloat(priceWithoutTax).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span></div>
    <div class="row"><span>GST (18%)</span><span>₹${parseFloat(taxAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span></div>
    <div class="row total"><span>Total</span><span>₹${totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span></div>
  </div>

  <div style="margin-top:20px; padding:12px 16px; background:#d4edda; border-radius:4px; font-size:13px; color:#155724;">
    <strong>Payment:</strong> Paid via Employee Balance Deduction
  </div>

  <div class="footer">
    <p>Waynex Shipping & Logistics | This is a computer-generated invoice and does not require a signature.</p>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([invoiceHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  // Success screen after shipment creation
  if (createdShipment) {
    const priceWithoutTax = (totalPrice / 1.18).toFixed(2);
    const taxAmount = (totalPrice - parseFloat(priceWithoutTax)).toFixed(2);

    return (
      <div className="p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-gray p-8 border border-white/10 rounded text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-400" size={32} />
            </div>
            <h1 className="text-2xl font-serif text-white mb-2">
              Shipment Created Successfully!
            </h1>
            <p className="text-gray-400 font-sans mb-4">
              Tracking ID:{" "}
              <span className="text-brand-gold font-mono font-semibold">
                {createdShipment.shipment_id_str}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              ₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })} has been deducted from your balance.
            </p>
          </div>

          {/* Invoice Preview */}
          <div className="bg-brand-gray p-6 border border-white/10 rounded mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="text-brand-gold" size={20} />
                <h2 className="text-lg font-serif text-white">Invoice</h2>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                INV-{createdShipment.shipment_id_str}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Service</span>
                <span className="text-white">
                  {activeTab === "domestic"
                    ? `Domestic ${formData.serviceType}`
                    : "International Express"}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Weight</span>
                <span className="text-white">{chargeableWeight.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Route</span>
                <span className="text-white">
                  {formData.senderCity} → {formData.receiverCity}
                  {activeTab === "international" && `, ${formData.receiverCountry}`}
                </span>
              </div>
              <div className="border-t border-white/10 my-3" />
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">
                  ₹{parseFloat(priceWithoutTax).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST (18%)</span>
                <span className="text-white">
                  ₹{parseFloat(taxAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-t border-white/10 my-3" />
              <div className="flex justify-between text-white font-semibold">
                <span>Total</span>
                <span className="text-brand-gold">
                  ₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 text-xs">
                <span>Payment</span>
                <span className="text-green-400">Paid via Balance Deduction</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDownloadInvoice}
              className="flex-1 px-6 py-4 bg-brand-gray border border-white/10 text-white hover:border-brand-gold/50 transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Print / Save Invoice
            </button>
            <button
              onClick={() => router.push("/employee/shipments")}
              className="flex-1 px-6 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2"
            >
              View Shipments
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
            Create New Shipment
          </h1>
          <p className="text-gray-400 font-sans">
            Fill in the details to create a new shipment
          </p>
        </div>
        {balance !== null && (
          <div className="flex items-center gap-3 bg-brand-gray px-5 py-3 border border-white/10 rounded">
            <Wallet className="text-brand-gold" size={20} />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Balance</p>
              <p className="text-lg font-serif text-brand-gold">
                ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          type="button"
          onClick={() => {
            setActiveTab("domestic");
            setFormData({ ...formData, receiverCountry: "India", serviceType: "Express" });
            setPriceDetails(null);
            setSelectedIntlOption(null);
            setCountrySearch("");
          }}
          className={`flex-1 md:flex-none px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
            activeTab === "domestic"
              ? "bg-brand-gold text-black border-brand-gold font-semibold"
              : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
          }`}
        >
          Domestic Shipping
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("international");
            setFormData({ ...formData, receiverCountry: "" });
            setPriceDetails(null);
            setSelectedIntlOption(null);
            setCountrySearch("");
          }}
          className={`flex-1 md:flex-none px-6 py-3 font-sans text-sm tracking-wider transition-all duration-300 border ${
            activeTab === "international"
              ? "bg-brand-gold text-black border-brand-gold font-semibold"
              : "bg-transparent text-gray-400 border-white/20 hover:border-white/40"
          }`}
        >
          International Shipping
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sender Section */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <User className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Sender Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Name *</label>
              <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Phone *</label>
              <input type="tel" name="senderPhone" value={formData.senderPhone} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="+91 98765 43210" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">Email</label>
              <input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleChange} className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="john@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">Address *</label>
              <textarea name="senderAddress" value={formData.senderAddress} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none" placeholder="Street address, building, apartment" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">City *</label>
              <input type="text" name="senderCity" value={formData.senderCity} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="Mumbai" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">State *</label>
              <input type="text" name="senderState" value={formData.senderState} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="Maharashtra" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Pincode *</label>
              <input type="text" name="senderPincode" value={formData.senderPincode} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="400001" />
            </div>
          </div>
        </div>

        {/* Receiver Section */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <MapPin className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Receiver Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Name *</label>
              <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Phone *</label>
              <input type="tel" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="+91 87654 32109" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">Email</label>
              <input type="email" name="receiverEmail" value={formData.receiverEmail} onChange={handleChange} className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="jane@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">Address *</label>
              <textarea name="receiverAddress" value={formData.receiverAddress} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none" placeholder="Street address, building, apartment" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">City *</label>
              <input type="text" name="receiverCity" value={formData.receiverCity} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="Delhi" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">State *</label>
              <input type="text" name="receiverState" value={formData.receiverState} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="Delhi" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">Pincode *</label>
              <input type="text" name="receiverPincode" value={formData.receiverPincode} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="110001" />
            </div>
            {activeTab === "international" && (
              <div ref={countryDropdownRef}>
                <label className="block text-gray-400 text-sm font-sans mb-2">
                  Country & Service *
                </label>
                {intlLoading ? (
                  <div className="flex items-center gap-2 text-gray-400 py-3 text-sm">
                    <div className="h-4 w-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                    Loading destinations...
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={countrySearch}
                      onChange={(e) => {
                        setCountrySearch(e.target.value);
                        setShowCountryDropdown(true);
                        setSelectedIntlOption(null);
                        setFormData((f) => ({ ...f, receiverCountry: "" }));
                        setPriceDetails(null);
                      }}
                      onFocus={() => setShowCountryDropdown(true)}
                      className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans"
                      placeholder="Type to search country..."
                    />
                    {showCountryDropdown && countrySearch && filteredIntlOptions.length > 0 && (
                      <div className="absolute z-20 w-full mt-1 max-h-56 overflow-y-auto bg-[#1a1a1a] border border-brand-gold/30 rounded shadow-xl">
                        {filteredIntlOptions.map((opt, i) => (
                          <button
                            key={`${opt.destination}-${opt.service}-${i}`}
                            type="button"
                            onClick={() => {
                              setCountrySearch(`${opt.country} (${formatService(opt.service)})`);
                              setSelectedIntlOption(opt);
                              setFormData((f) => ({ ...f, receiverCountry: opt.country }));
                              setShowCountryDropdown(false);
                              setPriceDetails(null);
                            }}
                            className="w-full text-left px-4 py-3 text-white hover:bg-brand-gold/20 transition-colors border-b border-white/5 last:border-b-0"
                          >
                            <span className="font-medium">{opt.country}</span>
                            <span className="ml-2 text-sm text-brand-gold">
                              ({formatService(opt.service)})
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              max {opt.max_weight} kg
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {selectedIntlOption && (
                  <p className="mt-2 text-xs text-brand-gold/70">
                    Max weight: {selectedIntlOption.max_weight} kg | Service:{" "}
                    {formatService(selectedIntlOption.service)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-brand-gray p-6 md:p-8 border border-white/10 rounded">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <Package className="text-brand-gold" size={20} />
            </div>
            <h2 className="text-xl font-serif text-white">Package Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Weight (kg) *
              </label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} required step="0.01" min="0.01" className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="2.5" />
            </div>
            {activeTab === "domestic" && (
              <div>
                <label className="block text-gray-400 text-sm font-sans mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white focus:outline-none focus:border-brand-gold transition-colors font-sans"
                >
                  <option value="Express">Express</option>
                  <option value="Surface">Surface Cargo</option>
                  <option value="Air">Air Cargo</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Goods Value (₹) *
              </label>
              <input type="number" name="goodsValue" value={formData.goodsValue} onChange={handleChange} required step="0.01" min="0" className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="5000" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Length (cm)
              </label>
              <input type="number" name="length" value={formData.length} onChange={handleChange} step="0.1" min="0" className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="30" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Width (cm)
              </label>
              <input type="number" name="width" value={formData.width} onChange={handleChange} step="0.1" min="0" className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="20" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Height (cm)
              </label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} step="0.1" min="0" className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans" placeholder="15" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm font-sans mb-2">
                Goods Description *
              </label>
              <textarea name="goodsDescription" value={formData.goodsDescription} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-brand-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors font-sans resize-none" placeholder="Describe the contents of the package" />
            </div>
          </div>

          {/* Weight Comparison */}
          {showWeightComparison && (
            <div
              className={`mt-6 p-4 rounded border ${
                weightExceeded
                  ? "border-red-500/50 bg-red-900/10"
                  : "border-brand-gold/30 bg-brand-gold/5"
              }`}
            >
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Actual</p>
                  <p className="text-white font-semibold">{actualWeight.toFixed(2)} kg</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Volumetric</p>
                  <p className="text-white font-semibold">{volumetricWeight.toFixed(2)} kg</p>
                </div>
                <div>
                  <p
                    className={`text-xs mb-1 font-semibold ${
                      weightExceeded ? "text-red-400" : "text-brand-gold"
                    }`}
                  >
                    Chargeable
                  </p>
                  <p
                    className={`font-semibold ${
                      weightExceeded ? "text-red-400" : "text-brand-gold"
                    }`}
                  >
                    {chargeableWeight.toFixed(2)} kg
                  </p>
                </div>
              </div>
              {weightExceeded && (
                <p className="mt-2 text-xs text-red-400 text-center">
                  Exceeds max {intlMaxWeight} kg for {selectedIntlOption?.country}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Calculate Price Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculatePrice}
            disabled={
              isCalculating ||
              weightExceeded ||
              actualWeight <= 0 ||
              (activeTab === "domestic" && !formData.receiverCity) ||
              (activeTab === "international" && !selectedIntlOption)
            }
            className="px-8 py-4 bg-brand-gray border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Calculator size={18} />
            {isCalculating ? "Calculating..." : "Calculate Price"}
          </button>
        </div>

        {/* Price Display */}
        {priceDetails && (
          <div className="bg-brand-gray p-6 border border-brand-gold/30 rounded">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                Estimated Price
              </p>
              <p className="text-3xl font-serif text-brand-gold">
                ₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Chargeable weight: {chargeableWeight.toFixed(2)} kg (incl. 18% GST)
              </p>
            </div>

            {balance !== null && (
              <div
                className={`mt-4 p-3 rounded border text-center text-sm ${
                  hasSufficientBalance
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {hasSufficientBalance ? (
                  <>
                    <Wallet className="inline mr-2" size={16} />
                    Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })} — Sufficient
                  </>
                ) : (
                  <>
                    <Wallet className="inline mr-2" size={16} />
                    Balance: ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })} — Insufficient (need ₹{(totalPrice - balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })} more)
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !priceDetails || !hasSufficientBalance || weightExceeded}
            className="px-8 py-4 bg-brand-gold text-black hover:bg-white transition-all duration-300 font-sans text-sm tracking-widest uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              "Creating Shipment..."
            ) : (
              <>
                Create & Pay from Balance
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
