"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Lock, Save, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressPincode: string;
  addressCountry: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressPincode: "",
    addressCountry: "India",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (session) {
      setProfile((prev) => ({
        ...prev,
        firstName: session.firstName || "",
        lastName: session.lastName || "",
        email: session.email || "",
        phone: session.phone || "",
      }));
    }
  }, [session]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // In production, send update to API
      // await fetch(`${API_URL}/api/user/profile`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: userEmail, ...profile }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    setIsSaving(true);
    try {
      // In production, send to API
      // await fetch(`${API_URL}/api/user/change-password`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: userEmail,
      //     currentPassword: passwordData.currentPassword,
      //     newPassword: passwordData.newPassword,
      //   }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5F5F0] mb-2">
            Profile Settings
          </h1>
          <p className="text-[#F5F5F0]/60">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300"
          >
            <Edit2 className="mr-2 h-5 w-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-[#C5A059]/30 text-[#C5A059] rounded-lg hover:bg-[#C5A059]/10 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-50"
            >
              <Save className="mr-2 h-5 w-5" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-[#C5A059]/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C5A059] to-[#8B7239]">
            <User className="h-10 w-10 text-[#121212]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0]">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-[#F5F5F0]/60">{profile.email}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="text"
                value={profile.addressStreet}
                onChange={(e) => handleInputChange("addressStreet", e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              City
            </label>
            <input
              type="text"
              value={profile.addressCity}
              onChange={(e) => handleInputChange("addressCity", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              State/Province
            </label>
            <input
              type="text"
              value={profile.addressState}
              onChange={(e) => handleInputChange("addressState", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Postal/ZIP Code
            </label>
            <input
              type="text"
              value={profile.addressPincode}
              onChange={(e) => handleInputChange("addressPincode", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Country
            </label>
            <input
              type="text"
              value={profile.addressCountry}
              onChange={(e) => handleInputChange("addressCountry", e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2A2A2A] border border-[#C5A059]/20 p-8">
        <h2 className="font-serif text-2xl font-semibold text-[#F5F5F0] mb-6">
          Change Password
        </h2>

        <div className="grid gap-6 md:grid-cols-1 max-w-2xl">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="Enter current password"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#F5F5F0]/60 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C5A059]/50" />
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#C5A059]/20 rounded-lg text-[#F5F5F0] focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#8B7239] text-[#121212] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="mr-2 h-5 w-5" />
            {isSaving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
