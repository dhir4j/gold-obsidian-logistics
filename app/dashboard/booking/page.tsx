"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Package, MapPin, User, Phone, Calendar, Truck, Globe, PlusCircle, Trash2, Calculator, Scale, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

interface GoodsItem {
  description: string;
  quantity: number;
  hsn_code: string;
  value: number;
}

interface HSNResult {
  code: string;
  description: string;
}

export default function DashboardBookingPage() {
  const router = useRouter();
  const { session } = useSession();
  const [shipmentType, setShipmentType] = useState<"domestic" | "international">("domestic");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceDetails, setPriceDetails] = useState<any>(null);

  // Sender Details
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderState, setSenderState] = useState("");
  const [senderPincode, setSenderPincode] = useState("");
  const [senderCountry, setSenderCountry] = useState("India");

  // Receiver Details
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverStreet, setReceiverStreet] = useState("");
  const [receiverCity, setReceiverCity] = useState("");
  const [receiverState, setReceiverState] = useState("");
  const [receiverPincode, setReceiverPincode] = useState("");
  const [receiverCountry, setReceiverCountry] = useState("India");

  // Package Details
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  // International - country autocomplete
  const [intlCountries, setIntlCountries] = useState<string[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [intlLoading, setIntlLoading] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Goods Details
  const [goods, setGoods] = useState<GoodsItem[]>([
    { description: "", quantity: 1, hsn_code: "", value: 0 },
  ]);

  // HSN autocomplete
  const [hsnDropdownIndex, setHsnDropdownIndex] = useState<number | null>(null);
  const [hsnResults, setHsnResults] = useState<HSNResult[]>([]);
  const [hsnLoading, setHsnLoading] = useState(false);
  const hsnDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hsnDropdownRef = useRef<HTMLDivElement>(null);

  // Volumetric weight calculation
  const actualWeight = parseFloat(packageWeight) || 0;
  const length = parseFloat(packageLength) || 0;
  const width = parseFloat(packageWidth) || 0;
  const height = parseFloat(packageHeight) || 0;
  const volumetricWeight = length > 0 && width > 0 && height > 0 ? (length * width * height) / 5000 : 0;
  const chargeableWeight = Math.max(actualWeight, volumetricWeight);
  const showWeightComparison = actualWeight > 0 && volumetricWeight > 0;

  useEffect(() => {
    setPriceDetails(null);
    setServiceType("");
    setCountrySearch("");
    if (shipmentType === "domestic") {
      setReceiverCountry("India");
    } else {
      setReceiverCountry("");
      setServiceType("International Express");
      const fetchOptions = async () => {
        setIntlLoading(true);
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
          const res = await fetch(`${apiUrl}/api/international/options`);
          const data = await res.json();
          if (data.options) {
            const countries: string[] = [...new Set<string>(data.options.map((o: any) => o.country as string))].sort();
            setIntlCountries(countries);
          }
        } catch (err) {
          console.error("Failed to fetch international options:", err);
        } finally {
          setIntlLoading(false);
        }
      };
      fetchOptions();
    }
  }, [shipmentType]);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (hsnDropdownRef.current && !hsnDropdownRef.current.contains(e.target as Node)) {
        setHsnDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = intlCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // HSN search with debounce
  const searchHSN = useCallback((query: string, itemIndex: number) => {
    if (hsnDebounceRef.current) clearTimeout(hsnDebounceRef.current);

    if (query.length < 2) {
      setHsnResults([]);
      setHsnDropdownIndex(null);
      return;
    }

    hsnDebounceRef.current = setTimeout(async () => {
      setHsnLoading(true);
      setHsnDropdownIndex(itemIndex);
      try {
        const res = await fetch(`/api/hsn?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setHsnResults(data.results || []);
      } catch {
        setHsnResults([]);
      } finally {
        setHsnLoading(false);
      }
    }, 300);
  }, []);

  const addGoodsItem = () => {
    setGoods([...goods, { description: "", quantity: 1, hsn_code: "", value: 0 }]);
  };

  const removeGoodsItem = (index: number) => {
    if (goods.length > 1) {
      setGoods(goods.filter((_, i) => i !== index));
    }
  };

  const updateGoodsItem = (index: number, field: keyof GoodsItem, value: any) => {
    const updatedGoods = [...goods];
    updatedGoods[index] = { ...updatedGoods[index], [field]: value };
    setGoods(updatedGoods);
  };

  const handleCalculatePrice = async () => {
    if (actualWeight <= 0) {
      alert("Please enter a valid package weight");
      return;
    }

    if (length <= 0 || width <= 0 || height <= 0) {
      alert("Please enter valid package dimensions (length, width, height)");
      return;
    }

    if (shipmentType === "domestic" && (!receiverCity || !serviceType)) {
      alert("Please fill receiver city and select service type");
      return;
    }

    if (shipmentType === "international" && !receiverCountry) {
      alert("Please select a destination country");
      return;
    }

    setIsCalculating(true);
    setPriceDetails(null);

    // Use chargeable weight (max of actual vs volumetric)
    const weightForPricing = chargeableWeight;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
      let url = "";
      let body = {};

      if (shipmentType === "domestic") {
        url = `${apiUrl}/api/domestic/price`;
        body = {
          city: receiverCity,
          state: receiverState,
          weight: weightForPricing,
          mode: serviceType,
        };
      } else {
        url = `${apiUrl}/api/international/price`;
        body = {
          country: receiverCountry,
          weight: weightForPricing,
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
        alert(`Price calculated: ₹${data.total_price?.toFixed(2) || data.total_with_tax_18_percent?.toFixed(2)}`);
      } else {
        alert(data.error || "Could not calculate price");
      }
    } catch (error) {
      console.error("Pricing error:", error);
      alert("Failed to calculate price. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!priceDetails) {
      alert("Please calculate price before booking");
      return;
    }

    const userEmail = session?.email || localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please login to create a booking");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
      const url =
        shipmentType === "domestic"
          ? `${apiUrl}/api/shipments/domestic`
          : `${apiUrl}/api/shipments/international`;

      const shipmentData = {
        user_email: userEmail,
        sender_name: senderName,
        sender_phone: senderPhone,
        sender_address_street: senderStreet,
        sender_address_city: senderCity,
        sender_address_state: senderState,
        sender_address_pincode: senderPincode,
        sender_address_country: senderCountry,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        receiver_address_street: receiverStreet,
        receiver_address_city: receiverCity,
        receiver_address_state: receiverState,
        receiver_address_pincode: receiverPincode,
        receiver_address_country: receiverCountry,
        package_weight_kg: chargeableWeight,
        package_length_cm: length,
        package_width_cm: width,
        package_height_cm: height,
        service_type: serviceType,
        pickup_date: pickupDate || new Date().toISOString().split("T")[0],
        goods: goods,
        final_total_price_with_tax: priceDetails.total_price || priceDetails.total_with_tax_18_percent,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Email": userEmail,
        },
        body: JSON.stringify(shipmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Booking created successfully! Shipment ID: ${data.shipment_id_str}`);
        router.push("/dashboard/my-shipments");
      } else {
        alert(data.error || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors";
  const inputWithIconClass = "w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors";
  const labelClass = "block text-sm font-medium text-[#F5F5F0]/60 mb-2";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
          Create New Booking
        </h1>
        <p className="text-[#F5F5F0]/60">
          Book your domestic or international shipment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipment Type Selector */}
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
            Shipment Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setShipmentType("domestic")}
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                shipmentType === "domestic"
                  ? "border-[#C5A059] bg-[#C5A059]/10"
                  : "border-[#C5A059]/20 hover:border-[#C5A059]/40"
              }`}
            >
              <Truck className="h-8 w-8 text-[#C5A059] mb-3" />
              <h3 className="font-semibold text-[#F5F5F0] mb-2">Domestic Shipping</h3>
              <p className="text-sm text-[#F5F5F0]/60">Within India</p>
            </button>
            <button
              type="button"
              onClick={() => setShipmentType("international")}
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                shipmentType === "international"
                  ? "border-[#C5A059] bg-[#C5A059]/10"
                  : "border-[#C5A059]/20 hover:border-[#C5A059]/40"
              }`}
            >
              <Globe className="h-8 w-8 text-[#C5A059] mb-3" />
              <h3 className="font-semibold text-[#F5F5F0] mb-2">International Shipping</h3>
              <p className="text-sm text-[#F5F5F0]/60">Worldwide delivery</p>
            </button>
          </div>
        </div>

        {/* Sender Details */}
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
            Sender Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)} className={inputWithIconClass} placeholder="Enter sender name" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="tel" required value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} className={inputWithIconClass} placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Street Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#C5A059]/50" />
                <input type="text" required value={senderStreet} onChange={(e) => setSenderStreet(e.target.value)} className={inputWithIconClass} placeholder="123 Main Street" />
              </div>
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" required value={senderCity} onChange={(e) => setSenderCity(e.target.value)} className={inputClass} placeholder="Mumbai" />
            </div>
            <div>
              <label className={labelClass}>State *</label>
              <input type="text" required value={senderState} onChange={(e) => setSenderState(e.target.value)} className={inputClass} placeholder="Maharashtra" />
            </div>
            <div>
              <label className={labelClass}>Pincode *</label>
              <input type="text" required value={senderPincode} onChange={(e) => setSenderPincode(e.target.value)} className={inputClass} placeholder="400001" />
            </div>
            <div>
              <label className={labelClass}>Country *</label>
              <input type="text" required value={senderCountry} onChange={(e) => setSenderCountry(e.target.value)} className={inputClass} placeholder="India" />
            </div>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
            Receiver Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="text" required value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className={inputWithIconClass} placeholder="Enter receiver name" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="tel" required value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} className={inputWithIconClass} placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Street Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#C5A059]/50" />
                <input type="text" required value={receiverStreet} onChange={(e) => setReceiverStreet(e.target.value)} className={inputWithIconClass} placeholder="456 Destination Road" />
              </div>
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" required value={receiverCity} onChange={(e) => setReceiverCity(e.target.value)} className={inputClass} placeholder="Delhi" />
            </div>
            <div>
              <label className={labelClass}>State *</label>
              <input type="text" required value={receiverState} onChange={(e) => setReceiverState(e.target.value)} className={inputClass} placeholder="Delhi" />
            </div>
            <div>
              <label className={labelClass}>Pincode *</label>
              <input type="text" required value={receiverPincode} onChange={(e) => setReceiverPincode(e.target.value)} className={inputClass} placeholder="110001" />
            </div>
            {shipmentType === "domestic" ? (
              <div>
                <label className={labelClass}>Country *</label>
                <input type="text" required value={receiverCountry} disabled className={`${inputClass} opacity-50`} placeholder="India" />
              </div>
            ) : (
              <div className="md:col-span-2" ref={countryDropdownRef}>
                <label className={labelClass}>Destination Country *</label>
                {intlLoading ? (
                  <div className="flex items-center gap-2 text-[#F5F5F0]/60 py-3">
                    <div className="h-4 w-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                    Loading available countries...
                  </div>
                ) : (
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50 z-10" />
                    <input
                      type="text"
                      required
                      value={countrySearch}
                      onChange={(e) => {
                        setCountrySearch(e.target.value);
                        setShowCountryDropdown(true);
                        setReceiverCountry("");
                        setPriceDetails(null);
                      }}
                      onFocus={() => setShowCountryDropdown(true)}
                      className={inputWithIconClass}
                      placeholder="Type to search country..."
                    />
                    {showCountryDropdown && countrySearch && filteredCountries.length > 0 && (
                      <div className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-[#1a1a1a] border border-[#C5A059]/30 rounded-lg shadow-xl">
                        {filteredCountries.map((country) => (
                          <button
                            key={country}
                            type="button"
                            onClick={() => {
                              setCountrySearch(country);
                              setReceiverCountry(country);
                              setShowCountryDropdown(false);
                              setPriceDetails(null);
                            }}
                            className="w-full text-left px-4 py-3 text-[#F5F5F0] hover:bg-[#C5A059]/20 transition-colors border-b border-[#C5A059]/10 last:border-b-0"
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    )}
                    {showCountryDropdown && countrySearch && filteredCountries.length === 0 && (
                      <div className="absolute z-20 w-full mt-1 bg-[#1a1a1a] border border-[#C5A059]/30 rounded-lg shadow-xl px-4 py-3 text-[#F5F5F0]/40 text-sm">
                        No matching countries found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Package Details */}
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
            Package Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Actual Weight (kg) *</label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="number" step="0.1" min="0.01" required value={packageWeight} onChange={(e) => { setPackageWeight(e.target.value); setPriceDetails(null); }} className={inputWithIconClass} placeholder="0.5" />
              </div>
            </div>
            {shipmentType === "domestic" && (
              <div>
                <label className={labelClass}>Service Type *</label>
                <select required value={serviceType} onChange={(e) => { setServiceType(e.target.value); setPriceDetails(null); }} className={inputClass}>
                  <option value="">Select service</option>
                  <option value="Express">Express (up to 5 kg)</option>
                  <option value="Surface">Surface Cargo</option>
                  <option value="Air">Air Cargo</option>
                </select>
              </div>
            )}
            <div>
              <label className={labelClass}>Length (cm) *</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="number" step="0.1" min="0.1" required value={packageLength} onChange={(e) => { setPackageLength(e.target.value); setPriceDetails(null); }} className={inputWithIconClass} placeholder="30" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Width (cm) *</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="number" step="0.1" min="0.1" required value={packageWidth} onChange={(e) => { setPackageWidth(e.target.value); setPriceDetails(null); }} className={inputWithIconClass} placeholder="20" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Height (cm) *</label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="number" step="0.1" min="0.1" required value={packageHeight} onChange={(e) => { setPackageHeight(e.target.value); setPriceDetails(null); }} className={inputWithIconClass} placeholder="10" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Pickup Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputWithIconClass} />
              </div>
            </div>
          </div>

          {/* Volumetric Weight Comparison */}
          {showWeightComparison && (
            <div className="mt-6 p-5 rounded-lg border border-[#C5A059]/30 bg-[#C5A059]/5">
              <h3 className="text-sm font-semibold text-[#C5A059] mb-3 uppercase tracking-wider">Weight Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-3 rounded-lg text-center ${chargeableWeight === actualWeight && volumetricWeight !== actualWeight ? "bg-[#C5A059]/20 border border-[#C5A059]/40" : "bg-[#121212]/50 border border-white/5"}`}>
                  <p className="text-xs text-[#F5F5F0]/50 mb-1">Actual Weight</p>
                  <p className="text-lg font-bold text-[#F5F5F0]">{actualWeight.toFixed(2)} kg</p>
                </div>
                <div className={`p-3 rounded-lg text-center ${chargeableWeight === volumetricWeight && volumetricWeight !== actualWeight ? "bg-[#C5A059]/20 border border-[#C5A059]/40" : "bg-[#121212]/50 border border-white/5"}`}>
                  <p className="text-xs text-[#F5F5F0]/50 mb-1">Volumetric Weight</p>
                  <p className="text-lg font-bold text-[#F5F5F0]">{volumetricWeight.toFixed(2)} kg</p>
                  <p className="text-[10px] text-[#F5F5F0]/30 mt-1">({length} x {width} x {height}) / 5000</p>
                </div>
                <div className="p-3 rounded-lg text-center bg-[#C5A059]/20 border border-[#C5A059]/50">
                  <p className="text-xs text-[#C5A059] mb-1 font-semibold">Chargeable Weight</p>
                  <p className="text-lg font-bold text-[#C5A059]">{chargeableWeight.toFixed(2)} kg</p>
                  <p className="text-[10px] text-[#F5F5F0]/40 mt-1">
                    {volumetricWeight > actualWeight ? "Volumetric is higher" : volumetricWeight < actualWeight ? "Actual is higher" : "Both are equal"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Goods Details */}
        <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0]">
              Goods Details
            </h2>
            <button
              type="button"
              onClick={addGoodsItem}
              className="inline-flex items-center px-4 py-2 bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] rounded-lg hover:bg-[#C5A059]/30 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Item
            </button>
          </div>

          <div className="space-y-6" ref={hsnDropdownRef}>
            {goods.map((item, index) => (
              <div key={index} className="p-6 rounded-lg border border-[#C5A059]/10 bg-[#121212]/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#F5F5F0] font-medium">Item {index + 1}</h3>
                  {goods.length > 1 && (
                    <button type="button" onClick={() => removeGoodsItem(index)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Description with HSN autocomplete */}
                  <div className="md:col-span-2 relative">
                    <label className={labelClass}>Description *</label>
                    <input
                      type="text"
                      required
                      value={item.description}
                      onChange={(e) => {
                        updateGoodsItem(index, "description", e.target.value);
                        searchHSN(e.target.value, index);
                      }}
                      onFocus={() => {
                        if (item.description.length >= 2) searchHSN(item.description, index);
                      }}
                      className={inputClass}
                      placeholder="Type to search HSN items..."
                      autoComplete="off"
                    />
                    {/* HSN Dropdown */}
                    {hsnDropdownIndex === index && (hsnResults.length > 0 || hsnLoading) && (
                      <div className="absolute z-30 w-full mt-1 max-h-56 overflow-y-auto bg-[#1a1a1a] border border-[#C5A059]/30 rounded-lg shadow-xl">
                        {hsnLoading ? (
                          <div className="flex items-center gap-2 px-4 py-3 text-[#F5F5F0]/60 text-sm">
                            <div className="h-3 w-3 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                            Searching HSN codes...
                          </div>
                        ) : (
                          hsnResults.map((result, ri) => (
                            <button
                              key={`${result.code}-${ri}`}
                              type="button"
                              onClick={() => {
                                updateGoodsItem(index, "description", result.description);
                                updateGoodsItem(index, "hsn_code", result.code);
                                setHsnDropdownIndex(null);
                                setHsnResults([]);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-[#C5A059]/20 transition-colors border-b border-[#C5A059]/10 last:border-b-0"
                            >
                              <span className="text-[#F5F5F0] text-sm">{result.description}</span>
                              <span className="ml-2 text-xs text-[#C5A059] font-mono">({result.code})</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Quantity *</label>
                    <input type="number" required min="1" value={item.quantity} onChange={(e) => updateGoodsItem(index, "quantity", parseInt(e.target.value))} className={inputClass} placeholder="1" />
                  </div>
                  <div>
                    <label className={labelClass}>HSN Code *</label>
                    <input type="text" required value={item.hsn_code} onChange={(e) => updateGoodsItem(index, "hsn_code", e.target.value)} className={inputClass} placeholder="e.g. 01012100" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Value (₹) *</label>
                    <input type="number" required step="0.01" value={item.value} onChange={(e) => updateGoodsItem(index, "value", parseFloat(e.target.value))} className={inputClass} placeholder="0.00" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Price Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculatePrice}
            disabled={isCalculating}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-50"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {isCalculating ? "Calculating..." : "Calculate Price"}
          </button>
        </div>

        {/* Price Display */}
        {priceDetails && (
          <div className="rounded-xl bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 p-8 text-center">
            <h3 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-2">
              Estimated Price
            </h3>
            <p className="text-4xl font-bold text-green-400">
              ₹{priceDetails.total_price?.toFixed(2) || priceDetails.total_with_tax_18_percent?.toFixed(2)}
            </p>
            <p className="text-[#F5F5F0]/60 mt-2">
              Based on chargeable weight of {chargeableWeight.toFixed(2)} kg (incl. taxes)
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !priceDetails}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-[#C5A059]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Package className="mr-2 h-6 w-6" />
            {isSubmitting ? "Creating Booking..." : "Create Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
