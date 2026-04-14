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
      { label: "KYC Queue",   href: "/charity/admin/super/kyc",        icon: UserCheck, badge: 8, badgeColor: "bg-[#EF4444]" },
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
      <Link href="/charity" className="flex items-center gap-2.5" onClick={onNavigate}>
        <Shield className="h-6 w-6 text-accent-primary" />
        <span className="text-lg font-bold text-fg-inverse">SancCharity</span>
      </Link>

      {/* Super Admin Badge */}
      <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg px-3 py-2.5">
        <ShieldAlert className="h-4 w-4 text-[#EF4444]" />
        <span className="text-xs font-semibold text-[#EF4444]">Super Admin</span>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-fg-muted">Owner</span>
      </div>

      {/* Navigation */}
      {navSections.map((section) => (
        <div key={section.label}>
          <p className="text-[10px] font-bold text-[#64748B] uppercase mb-3" style={{ letterSpacing: "1.2px" }}>
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
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    active
                      ? "bg-[#1E293B] text-fg-inverse font-semibold"
                      : item.isEmergency
                        ? "text-[#EF4444] hover:bg-[#1E293B]/50"
                        : "text-fg-muted hover:bg-[#1E293B]/50 hover:text-fg-inverse"
                  )}
                >
                  <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0", active ? "text-accent-primary" : item.isEmergency ? "text-[#EF4444]" : "text-fg-muted")} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <>
                      <div className="flex-1" />
                      <span className={cn("px-2 py-0.5 rounded-full text-fg-inverse text-[10px] font-bold", item.badgeColor || "bg-[#F97316]")}>
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
      <div className="flex items-center gap-2 bg-[#1E293B] rounded-lg px-3.5 py-3">
        <span className="h-2 w-2 rounded-full bg-success flex-shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-fg-muted">Connected</span>
          <span className="text-xs font-mono font-semibold text-fg-inverse">{formatAddress(address || "0x7F3a...9B2c")}</span>
        </div>
      </div>

      {/* Owner Transfer */}
      <div className="flex flex-col gap-2 bg-[#1E293B] rounded-lg px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-fg-muted">Owner Status</span>
          <span className="text-[9px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2 py-0.5">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Key className="h-3.5 w-3.5 text-[#EAB308]" />
          <span className="text-[11px] font-mono font-semibold text-fg-inverse">{formatAddress(address || "0x7F3a...9B2c")}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-fg-muted">Pending Transfer:</span>
          <span className="text-[10px] text-[#64748B]">None</span>
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] bg-surface-inverse flex-shrink-0 hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface-inverse flex items-center px-4 gap-3 border-b border-[#1E293B]">
        <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-[#1E293B] transition-colors" aria-label="Open menu">
          <Menu className="h-5 w-5 text-fg-inverse" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent-primary" />
          <span className="font-bold text-fg-inverse text-sm">SancCharity Admin</span>
        </div>
        <div className="flex-1" />
        <span className="text-[10px] font-semibold text-[#EF4444] bg-[#1E293B] px-2 py-1 rounded">SUPER</span>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 modal-backdrop">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="mobile-drawer absolute left-0 top-0 h-full w-[280px] bg-surface-inverse overflow-y-auto">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-[#1E293B]" aria-label="Close menu">
                <X className="h-5 w-5 text-fg-muted" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-surface-primary min-h-screen lg:min-h-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
