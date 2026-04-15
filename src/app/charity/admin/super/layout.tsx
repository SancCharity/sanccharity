"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils";
import {
  Shield, ShieldAlert, ShieldOff, LayoutDashboard, BarChart3, ScrollText,
  UserCheck, Building2, Megaphone, Flame, Vault, Activity, Key, Menu, X, Users,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  badgeColor?: string;
  isEmergency?: boolean;
}

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "OVERVIEW",
    items: [
      { label: "Dashboard",        href: "/charity/admin/super",          icon: LayoutDashboard },
      { label: "Platform Metrics", href: "/charity/admin/super/metrics",  icon: BarChart3 },
      { label: "Activity Log",     href: "/charity/admin/super/activity", icon: ScrollText },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "KYC Queue",   href: "/charity/admin/super/kyc",        icon: UserCheck, badge: 8, badgeColor: "bg-error" },
      { label: "Charities",   href: "/charity/admin/super/charities",   icon: Building2 },
      { label: "Campaigns",   href: "/charity/admin/super/campaigns",   icon: Megaphone },
      { label: "Users",       href: "/charity/admin/super/users",       icon: Users },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Buyback & Burn",  href: "/charity/admin/super/buyback",   icon: Flame },
      { label: "Treasury",        href: "/charity/admin/super/treasury",  icon: Vault },
      { label: "Event Listener",  href: "/charity/admin/super/events",    icon: Activity },
    ],
  },
  {
    label: "EMERGENCY",
    items: [
      { label: "Circuit Breaker", href: "/charity/admin/super/emergency", icon: ShieldOff, isEmergency: true },
    ],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { address } = useAccount();

  const isActive = (href: string) =>
    href === "/charity/admin/super" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex flex-col h-full" style={{ padding: "32px 20px", gap: "24px" }}>
      {/* Logo */}
      <Link href="/charity" className="flex items-center gap-2.5 whitespace-nowrap" onClick={onNavigate}>
        <Shield className="h-6 w-6 text-accent-primary flex-shrink-0" />
        <span className="text-lg font-bold text-fg-primary">SancCharity</span>
      </Link>

      {/* Super Admin Badge */}
      <div className="flex items-center gap-2 bg-error-bg border border-error/20 rounded-lg px-3 py-2.5 whitespace-nowrap">
        <ShieldAlert className="h-4 w-4 text-error flex-shrink-0" />
        <span className="text-xs font-semibold text-error">Super Admin</span>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-fg-muted">Owner</span>
      </div>

      {/* Navigation */}
      {navSections.map((section) => (
        <div key={section.label}>
          <p className="text-[10px] font-bold text-fg-muted uppercase mb-3 whitespace-nowrap" style={{ letterSpacing: "1.2px" }}>
            {section.label}
          </p>
          <nav className="flex flex-col gap-1">
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm whitespace-nowrap",
                    active
                      ? item.isEmergency ? "text-error" : "text-fg-primary font-semibold"
                      : item.isEmergency
                        ? "text-error/70"
                        : "text-fg-muted"
                  )}
                >
                  {/* Icon with glow */}
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] flex-shrink-0 transition-all duration-200",
                      active
                        ? item.isEmergency
                          ? "text-error [filter:drop-shadow(0_0_6px_rgba(220,38,38,0.7))]"
                          : "text-accent-primary [filter:drop-shadow(0_0_6px_rgba(14,165,233,0.65))]"
                        : item.isEmergency
                          ? "text-error/70 group-hover:text-error group-hover:[filter:drop-shadow(0_0_5px_rgba(220,38,38,0.5))]"
                          : "text-fg-muted group-hover:text-accent-primary group-hover:[filter:drop-shadow(0_0_5px_rgba(14,165,233,0.45))]"
                    )}
                  />
                  {/* Label with slide */}
                  <span className={cn(
                    "transition-transform duration-200",
                    active ? "translate-x-1" : "group-hover:translate-x-1"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <>
                      <div className="flex-1" />
                      <span className={cn("px-2 py-0.5 rounded-full text-white text-[10px] font-bold", item.badgeColor || "bg-warning")}>
                        {item.badge}
                      </span>
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="flex-1" />

      {/* Connected Wallet */}
      <div className="flex items-center gap-2 bg-surface-primary border border-line-subtle rounded-lg px-3.5 py-3 whitespace-nowrap">
        <span className="h-2 w-2 rounded-full bg-success flex-shrink-0" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[11px] text-fg-muted">Connected</span>
          <span className="text-xs font-mono font-semibold text-fg-primary">{formatAddress(address || "0x7F3a...9B2c")}</span>
        </div>
      </div>

      {/* Owner Status */}
      <div className="flex flex-col gap-2 bg-surface-primary border border-line-subtle rounded-lg px-3.5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-fg-muted">Owner Status</span>
          <span className="text-[9px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2 py-0.5">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Key className="h-3.5 w-3.5 text-[#EAB308] flex-shrink-0" />
          <span className="text-[11px] font-mono font-semibold text-fg-primary">{formatAddress(address || "0x7F3a...9B2c")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-fg-muted">Pending Transfer:</span>
          <span className="text-[10px] text-fg-muted">None</span>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "bg-white border-r border-line-subtle flex-shrink-0 hidden lg:flex flex-col overflow-hidden transition-all duration-300",
        sidebarOpen ? "w-[260px]" : "w-0 border-r-0"
      )}>
        {/* Fade content out before width collapses */}
        <div className={cn("flex-1 flex flex-col min-h-0 transition-opacity duration-150", sidebarOpen ? "opacity-100" : "opacity-0")}>
          <SidebarContent />
        </div>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          left:      sidebarOpen ? "260px" : "0px",
          top:       sidebarOpen ? "72px"  : "0px",
          transform: sidebarOpen ? "translate(-50%, -50%)" : "none",
        }}
        className={cn(
          "hidden lg:flex absolute z-30 items-center bg-white transition-all duration-300 overflow-hidden hover:shadow-md",
          sidebarOpen
            ? "justify-center h-6 w-6 rounded-full border border-line-subtle shadow-sm"
            : "justify-start h-10 pl-3 pr-4 gap-2 rounded-br-xl border-b border-r border-line-subtle shadow-sm"
        )}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-3.5 w-3.5 text-fg-muted flex-shrink-0" />
        ) : (
          <>
            <Shield className="h-[18px] w-[18px] text-accent-primary flex-shrink-0" />
            <span className="text-[13px] font-bold text-fg-primary whitespace-nowrap">SancCharity</span>
            <ChevronRight className="h-3.5 w-3.5 text-fg-muted flex-shrink-0 ml-0.5" />
          </>
        )}
      </button>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-line-subtle flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-surface-primary transition-colors" aria-label="Open menu">
          <Menu className="h-5 w-5 text-fg-primary" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent-primary" />
          <span className="font-bold text-fg-primary text-sm">SancCharity Admin</span>
        </div>
        <div className="flex-1" />
        <span className="text-[10px] font-semibold text-error bg-error-bg px-2 py-1 rounded">SUPER</span>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 modal-backdrop">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer absolute left-0 top-0 h-full w-[280px] bg-white overflow-y-auto">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-primary" aria-label="Close menu">
                <X className="h-5 w-5 text-fg-muted" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-surface-primary pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
