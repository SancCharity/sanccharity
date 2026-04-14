"use client";

import { useState } from "react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useAdmin } from "@/hooks/useAdmin";
import { Search, Download, Users, Heart, Coins, Building2, TriangleAlert, Shield } from "lucide-react";

const TABS = ["All", "Donors", "Stakers", "Charities"] as const;
type Tab = (typeof TABS)[number];

const TAB_ROLE: Record<Tab, string | undefined> = {
  All: undefined,
  Donors: "donor",
  Stakers: "staker",
  Charities: "charity",
};

const ROLE_STYLE: Record<string, { bg: string; text: string }> = {
  donor:   { bg: "bg-[#E0F2FE]", text: "text-accent-primary" },
  staker:  { bg: "bg-[#EDE9FE]", text: "text-[#7C3AED]" },
  charity: { bg: "bg-[#FEF9C3]", text: "text-[#CA8A04]" },
};

const fmtDate = (ts: number) =>
  new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const fmtSanc = (raw: string) => {
  const n = Number(raw) / 1e9;
  return n === 0 ? "—" : `${n.toLocaleString()} SANC`;
};

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const {
    users, totalUsers, dashboard,
    userFilters, setUserFilters,
    handleFlagUser,
    showComingSoon, setShowComingSoon, comingSoonMessage,
  } = useAdmin();

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setUserFilters({ page: 1, role: TAB_ROLE[tab], search: userFilters.search });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setUserFilters({ page: 1, role: TAB_ROLE[activeTab], search: value || undefined });
  };

  const stats = [
    { label: "Total Users",    value: totalUsers.toLocaleString(), sub: `${dashboard?.totalCharities ?? 0} charities`, icon: Users,    iconBg: "bg-[#E0F2FE]", iconColor: "text-accent-primary", subColor: "text-fg-muted" },
    { label: "Active Donors",  value: "—",                         sub: "Donors on platform",                          icon: Heart,    iconBg: "bg-[#F0FDF4]", iconColor: "text-[#16A34A]",    subColor: "text-[#16A34A]" },
    { label: "Stakers",        value: "—",                         sub: "Governance participants",                     icon: Coins,    iconBg: "bg-[#EDE9FE]", iconColor: "text-[#7C3AED]",   subColor: "text-[#7C3AED]" },
    { label: "Charity Orgs",   value: String(dashboard?.totalCharities ?? "—"), sub: "Registered organisations",       icon: Building2, iconBg: "bg-[#FEF9C3]", iconColor: "text-[#CA8A04]",  subColor: "text-[#CA8A04]" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:px-10 lg:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">User Management</h1>
          <p className="text-sm text-fg-muted">Monitor donors, stakers, and platform users</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-white border border-line-subtle px-3.5 py-2.5">
            <Search className="h-4 w-4 text-fg-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search address or name..."
              className="text-[13px] text-fg-primary bg-transparent outline-none w-52 placeholder:text-fg-muted"
            />
          </div>
          <ComingSoonOverlay action="Export users">
            <button className="flex items-center gap-2 rounded-lg bg-accent-primary px-3.5 py-2.5">
              <Download className="h-4 w-4 text-fg-inverse" />
              <span className="text-[13px] font-medium text-fg-inverse">Export</span>
            </button>
          </ComingSoonOverlay>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-card border border-black/[0.04]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-fg-muted">{s.label}</span>
              <div className={`h-9 w-9 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                <s.icon className={`h-[18px] w-[18px] ${s.iconColor}`} />
              </div>
            </div>
            <p className="text-xl sm:text-2xl lg:text-[28px] font-bold text-fg-primary">{s.value}</p>
            <p className={`text-xs mt-1 ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-black/[0.04] overflow-hidden">
        {/* Tabs */}
        <div className="flex px-5 border-b border-line-subtle overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 text-[13px] transition-colors ${
                activeTab === tab
                  ? "text-accent-primary font-semibold border-b-2 border-accent-primary"
                  : "text-fg-muted"
              }`}
            >
              {tab === "All" ? `All Users` : tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="flex items-center px-5 py-3 bg-surface-sage text-[11px] font-semibold text-fg-muted uppercase">
              <span className="w-[220px]">User</span>
              <span className="w-[160px]">Wallet</span>
              <span className="w-[90px]">Role</span>
              <span className="w-[100px]">Donations</span>
              <span className="w-[130px]">Staked</span>
              <span className="w-[110px]">Joined</span>
              <span className="flex-1">Actions</span>
            </div>

            {/* Rows */}
            {users.length === 0 && (
              <div className="flex items-center justify-center h-20">
                <span className="text-[13px] text-fg-muted">No users found.</span>
              </div>
            )}
            {users.map((user) => {
              const roleStyle = ROLE_STYLE[user.role] ?? { bg: "bg-surface-sage", text: "text-fg-muted" };
              return (
                <div key={user.address} className="flex items-center px-5 py-3.5 border-t border-line-subtle">
                  {/* Avatar + name */}
                  <div className="w-[220px] flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-full ${roleStyle.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-[11px] font-bold ${roleStyle.text}`}>
                        {(user.displayName || user.address)[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[13px] font-medium text-fg-primary truncate">{user.displayName || "—"}</span>
                      {user.flagged && (
                        <span className="flex items-center gap-1 text-[10px] text-[#DC2626]">
                          <TriangleAlert className="h-2.5 w-2.5" /> Flagged
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="w-[160px] text-xs font-mono text-accent-primary truncate">{user.address.slice(0, 6)}...{user.address.slice(-4)}</span>
                  <span className="w-[90px]">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleStyle.bg} ${roleStyle.text}`}>
                      {user.role}
                    </span>
                  </span>
                  <span className="w-[100px] text-[13px] text-fg-primary">{user.donationCount > 0 ? user.donationCount : "—"}</span>
                  <span className="w-[130px] text-[13px] text-fg-primary">{fmtSanc(user.stakedAmount)}</span>
                  <span className="w-[110px] text-xs text-fg-muted">{fmtDate(user.registeredAt)}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <ComingSoonOverlay action="View user details">
                      <button className="text-[12px] text-fg-secondary border border-line-subtle rounded-md px-2.5 py-1">View</button>
                    </ComingSoonOverlay>
                    <ComingSoonOverlay action={user.flagged ? "Unflag user" : "Flag user"}>
                      <button
                        onClick={() => handleFlagUser(user.address, !user.flagged)}
                        className={`text-[12px] border rounded-md px-2.5 py-1 ${
                          user.flagged
                            ? "text-[#16A34A] border-[#BBF7D0]"
                            : "text-[#DC2626] border-[#FECACA]"
                        }`}
                      >
                        {user.flagged ? "Unflag" : "Flag"}
                      </button>
                    </ComingSoonOverlay>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 max-w-sm w-full mx-3 sm:mx-4 flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent-primary" />
            </div>
            <h3 className="text-lg font-bold text-fg-primary text-center">Coming Soon</h3>
            <p className="text-sm text-fg-muted text-center">{comingSoonMessage}</p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-2 rounded-lg bg-accent-primary px-6 py-2.5 text-sm font-semibold text-fg-inverse"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
