"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  BookUser,
  FileText,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  MapPin,
  PlusCircle,
  DollarSign,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, clearSession, isLoading } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        router.push("/login");
      } else if (session.isAdmin) {
        window.location.href = "https://admin.waynexshipping.com";
      } else if (!session.isEmployee) {
        router.push("/login");
      }
    }
  }, [session, isLoading, router]);

  const handleLogout = () => {
    clearSession();
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  if (isLoading || !session || !session.isEmployee) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#121212]">
        <div className="w-12 h-12 border-4 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
      </div>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Shipments", href: "/employee/shipments", icon: Package },
    { name: "Track Shipment", href: "/employee/tracking", icon: MapPin },
    { name: "Payments", href: "/employee/payments", icon: CreditCard },
    { name: "Balance & Top-up", href: "/employee/balance", icon: DollarSign },
    { name: "Address Book", href: "/employee/address-book", icon: BookUser },
    { name: "Documents", href: "/employee/documents", icon: FileText },
    { name: "New Booking", href: "/employee/shipments/new", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-[#1a1a1a] border-r border-[#C5A059]/20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[#C5A059]/20 px-6">
          <Link href="/employee/dashboard" className="flex items-center justify-center">
            <img
              src="/gold_logo.png"
              alt="Waynex Logistics"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-[#F5F5F0]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border-l-2 border-[#C5A059]"
                    : "text-[#F5F5F0]/70 hover:bg-[#2A2A2A] hover:text-[#C5A059]"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-[#C5A059]" : "text-[#F5F5F0]/50"
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-[#C5A059]/20 p-4">
          <div className="flex items-center space-x-3 rounded-lg bg-[#2A2A2A] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C5A059] to-[#8B7239]">
              <User className="h-5 w-5 text-[#121212]" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-[#F5F5F0]">
                {session ? `${session.firstName} ${session.lastName}` : "Employee"}
              </p>
              <p className="truncate text-xs text-[#F5F5F0]/50">{session?.email || ""}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#F5F5F0]/50 hover:text-[#C5A059] transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#C5A059]/20 bg-[#1a1a1a]/95 backdrop-blur-sm px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-[#F5F5F0] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <span className="text-sm text-[#F5F5F0]/60">Employee Panel</span>
            {/* Notifications */}
            <button
              className="relative rounded-lg p-2 text-[#F5F5F0]/70 hover:bg-[#2A2A2A] hover:text-[#C5A059] transition-all"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>

            {/* User Profile Icon */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8B7239]">
              <User className="h-5 w-5 text-[#121212]" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
