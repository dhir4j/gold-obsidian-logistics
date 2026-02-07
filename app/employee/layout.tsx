"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/hooks/use-session";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, clearSession, isLoading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        router.push("/login");
      } else if (session.isAdmin) {
        // Admins should use admin panel
        window.location.href = "https://admin.waynexshipping.com";
      } else if (!session.isEmployee) {
        router.push("/login");
      }
    }
  }, [session, isLoading, router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  if (isLoading || !session || !session.isEmployee) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-brand-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  const navLinks = [
    {
      href: "/employee/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/employee/shipments/new",
      label: "Create Shipment",
      icon: Package,
    },
    {
      href: "/employee/balance",
      label: "Balance & Top-up",
      icon: DollarSign,
    },
  ];

  return (
    <div className="flex h-screen bg-brand-dark">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-brand-gray border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif text-brand-gold">
              Waynex Logistics
            </h2>
            <p className="text-xs text-gray-400 font-sans">Employee Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded font-sans text-sm transition-colors ${
                  isActive
                    ? "bg-brand-gold text-black font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded font-sans text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home size={18} />
            Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded font-sans text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-brand-gray border-b border-white/10 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="md:ml-0 ml-auto">
            <p className="text-sm font-sans text-gray-300">
              Welcome,{" "}
              <span className="text-brand-gold font-semibold">
                {session?.firstName || "Employee"}
              </span>
              !
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-brand-dark">{children}</main>
      </div>
    </div>
  );
}
