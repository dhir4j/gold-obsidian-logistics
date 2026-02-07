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
  Moon,
  Sun,
  MapPin
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // For testing: Auto-login with test credentials if not logged in
    const email = localStorage.getItem("userEmail");
    if (!email) {
      // Set test user
      const testEmail = "test@waynex.com";
      localStorage.setItem("userEmail", testEmail);
      setUserEmail(testEmail);
    } else {
      setUserEmail(email);
    }
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Shipments", href: "/dashboard/my-shipments", icon: Package },
    { name: "Track Shipment", href: "/dashboard/tracking", icon: MapPin },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Address Book", href: "/dashboard/address-book", icon: BookUser },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
          <Link href="/dashboard" className="flex items-center justify-center">
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
                Test User
              </p>
              <p className="truncate text-xs text-[#F5F5F0]/50">{userEmail}</p>
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
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[#F5F5F0]/70 hover:bg-[#2A2A2A] hover:text-[#C5A059] transition-all"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="relative rounded-lg p-2 text-[#F5F5F0]/70 hover:bg-[#2A2A2A] hover:text-[#C5A059] transition-all"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#C5A059] ring-2 ring-[#1a1a1a]" />
            </button>

            {/* User Profile Icon */}
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8B7239] hover:shadow-lg hover:shadow-[#C5A059]/30 transition-all duration-300"
              title="Profile Settings"
            >
              <User className="h-5 w-5 text-[#121212]" />
            </Link>
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
