"use client";

import { useState, useEffect } from "react";
import { Package, MapPin, User, Phone, Calendar, Truck, Globe, PlusCircle, Trash2, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoodsItem {
  description: string;
  quantity: number;
  hsn_code: string;
  value: number;
}

export default function BookingPage() {
  const router = useRouter();
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

  // Goods Details
  const [goods, setGoods] = useState<GoodsItem[]>([
    { description: "", quantity: 1, hsn_code: "", value: 0 },
  ]);

  useEffect(() => {
    // Reset fields when shipment type changes
    setPriceDetails(null);
    setServiceType("");
    if (shipmentType === "domestic") {
      setReceiverCountry("India");
    } else {
      setReceiverCountry("");
      setServiceType("International Express");
    }
  }, [shipmentType]);

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
    const weight = parseFloat(packageWeight);

    if (!weight || weight <= 0) {
      alert("Please enter a valid package weight");
      return;
    }

    if (shipmentType === "domestic" && (!receiverCity || !serviceType)) {
      alert("Please fill receiver city and select service type");
      return;
    }

    if (shipmentType === "international" && !receiverCountry) {
      alert("Please fill receiver country");
      return;
    }

    setIsCalculating(true);
    setPriceDetails(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";
      let url = "";
      let body = {};

      if (shipmentType === "domestic") {
        url = `${apiUrl}/api/domestic/price`;
        body = {
          city: receiverCity,
          state: receiverState,
          weight: weight,
          mode: serviceType,
        };
      } else {
        url = `${apiUrl}/api/international/price`;
        body = {
          country: receiverCountry,
          weight: weight,
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

    const userEmail = localStorage.getItem("userEmail");
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
        package_weight_kg: parseFloat(packageWeight),
        package_length_cm: parseFloat(packageLength) || 0,
        package_width_cm: parseFloat(packageWidth) || 0,
        package_height_cm: parseFloat(packageHeight) || 0,
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

  return (
    <div className="min-h-screen bg-[#121212] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F5F0] mb-4">
            Create New Booking
          </h1>
          <p className="text-[#F5F5F0]/60 text-lg">
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
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="Enter sender name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="text"
                    required
                    value={senderStreet}
                    onChange={(e) => setSenderStreet(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="123 Main Street"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={senderState}
                  onChange={(e) => setSenderState(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={senderPincode}
                  onChange={(e) => setSenderPincode(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="400001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={senderCountry}
                  onChange={(e) => setSenderCountry(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="India"
                />
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
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="Enter receiver name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="tel"
                    required
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="text"
                    required
                    value={receiverStreet}
                    onChange={(e) => setReceiverStreet(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="456 Destination Road"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={receiverCity}
                  onChange={(e) => setReceiverCity(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">State *</label>
                <input
                  type="text"
                  required
                  value={receiverState}
                  onChange={(e) => setReceiverState(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={receiverPincode}
                  onChange={(e) => setReceiverPincode(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="110001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={receiverCountry}
                  onChange={(e) => setReceiverCountry(e.target.value)}
                  disabled={shipmentType === "domestic"}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50"
                  placeholder={shipmentType === "domestic" ? "India" : "Country name"}
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
            <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
              Package Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Weight (kg) *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={packageWeight}
                    onChange={(e) => {
                      setPackageWeight(e.target.value);
                      setPriceDetails(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="0.5"
                  />
                </div>
              </div>
              {shipmentType === "domestic" && (
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                    Service Type *
                  </label>
                  <select
                    required
                    value={serviceType}
                    onChange={(e) => {
                      setServiceType(e.target.value);
                      setPriceDetails(null);
                    }}
                    className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  >
                    <option value="">Select service</option>
                    <option value="Express">Express (up to 5 kg)</option>
                    <option value="Surface">Surface Cargo</option>
                    <option value="Air">Air Cargo</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Length (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={packageLength}
                  onChange={(e) => setPackageLength(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Width (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={packageWidth}
                  onChange={(e) => setPackageWidth(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={packageHeight}
                  onChange={(e) => setPackageHeight(e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>
              </div>
            </div>
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

            <div className="space-y-6">
              {goods.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-[#C5A059]/10 bg-[#121212]/50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#F5F5F0] font-medium">Item {index + 1}</h3>
                    {goods.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGoodsItem(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                        Description *
                      </label>
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) =>
                          updateGoodsItem(index, "description", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                        placeholder="Item description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateGoodsItem(index, "quantity", parseInt(e.target.value))
                        }
                        className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                        HSN Code {shipmentType === "international" ? "*" : ""}
                      </label>
                      <input
                        type="text"
                        required={shipmentType === "international"}
                        value={item.hsn_code}
                        onChange={(e) => updateGoodsItem(index, "hsn_code", e.target.value)}
                        className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                        placeholder="HSN Code"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
                        Value (₹) {shipmentType === "international" ? "*" : ""}
                      </label>
                      <input
                        type="number"
                        required={shipmentType === "international"}
                        step="0.01"
                        value={item.value}
                        onChange={(e) =>
                          updateGoodsItem(index, "value", parseFloat(e.target.value))
                        }
                        className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                        placeholder="0.00"
                      />
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
                ₹
                {priceDetails.total_price?.toFixed(2) ||
                  priceDetails.total_with_tax_18_percent?.toFixed(2)}
              </p>
              <p className="text-[#F5F5F0]/60 mt-2">Including all taxes and charges</p>
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
    </div>
  );
}
