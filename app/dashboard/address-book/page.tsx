"use client";

import { useState, useEffect } from "react";
import { BookUser, PlusCircle, Edit, Trash2, MapPin, Phone, User } from "lucide-react";

interface SavedAddress {
  id: number;
  nickname: string;
  name: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_pincode: string;
  address_country: string;
  phone: string;
  address_type: "sender" | "receiver";
}

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"sender" | "receiver">("sender");
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetchAddresses(email);
    }
  }, []);

  const fetchAddresses = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/customer/addresses`,
        {
          headers: {
            "X-User-Email": email,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (addressId: number) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/customer/addresses/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "X-User-Email": email,
          },
        }
      );
      if (response.ok) {
        fetchAddresses(email);
      }
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  const senderAddresses = addresses.filter((a) => a.address_type === "sender");
  const receiverAddresses = addresses.filter((a) => a.address_type === "receiver");

  const AddressCard = ({ address }: { address: SavedAddress }) => (
    <div className="group rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-6 hover:border-[#C5A059]/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C5A059]/10">
            <MapPin className="h-5 w-5 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#F5F5F0]">
              {address.nickname}
            </h3>
            <span className="text-xs text-[#F5F5F0]/50 uppercase tracking-wider">
              {address.address_type}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              setEditingAddress(address);
              setFormOpen(true);
            }}
            className="p-2 rounded-lg text-[#F5F5F0]/60 hover:text-[#C5A059] hover:bg-[#2A2A2A] transition-all"
            title="Edit address"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(address.id)}
            className="p-2 rounded-lg text-[#F5F5F0]/60 hover:text-red-400 hover:bg-[#2A2A2A] transition-all"
            title="Delete address"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <User className="h-4 w-4 text-[#C5A059]/50 mt-0.5" />
          <p className="text-sm text-[#F5F5F0]/80">{address.name}</p>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-4 w-4 text-[#C5A059]/50 mt-0.5" />
          <div className="text-sm text-[#F5F5F0]/60 flex-1">
            <p>{address.address_street}</p>
            <p>
              {address.address_city}, {address.address_state} {address.address_pincode}
            </p>
            <p>{address.address_country}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Phone className="h-4 w-4 text-[#C5A059]/50 mt-0.5" />
          <p className="text-sm text-[#F5F5F0]/60">{address.phone}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
            Address Book
          </h1>
          <p className="text-[#F5F5F0]/60">
            Save and manage your frequently used addresses
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAddress(null);
            setFormOpen(true);
          }}
          className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Address
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#C5A059]/20">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("sender")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "sender"
                ? "border-[#C5A059] text-[#C5A059]"
                : "border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]"
            }`}
          >
            Sender Addresses ({senderAddresses.length})
          </button>
          <button
            onClick={() => setActiveTab("receiver")}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === "receiver"
                ? "border-[#C5A059] text-[#C5A059]"
                : "border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]"
            }`}
          >
            Receiver Addresses ({receiverAddresses.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
            <p className="text-[#F5F5F0]/60">Loading addresses...</p>
          </div>
        </div>
      ) : (
        <div>
          {activeTab === "sender" && (
            <>
              {senderAddresses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {senderAddresses.map((address) => (
                    <AddressCard key={address.id} address={address} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20">
                  <BookUser className="h-16 w-16 text-[#F5F5F0]/20 mb-4" />
                  <p className="text-[#F5F5F0]/60 mb-2">No sender addresses saved</p>
                  <p className="text-sm text-[#F5F5F0]/40">
                    Add your frequently used sender addresses for quick booking
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "receiver" && (
            <>
              {receiverAddresses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {receiverAddresses.map((address) => (
                    <AddressCard key={address.id} address={address} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20">
                  <BookUser className="h-16 w-16 text-[#F5F5F0]/20 mb-4" />
                  <p className="text-[#F5F5F0]/60 mb-2">No receiver addresses saved</p>
                  <p className="text-sm text-[#F5F5F0]/40">
                    Add your frequently used receiver addresses for quick booking
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
