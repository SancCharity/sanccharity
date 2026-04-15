"use client";

import {
  Search,
  ChevronDown,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useState } from "react";

const tabs = ["All (47)", "Verified (38)", "Suspended (6)", "Revoked (3)"];

const stats = [
  { label: "Total Registered", value: "47", color: "text-fg-primary" },
  { label: "KYC Verified", value: "38", color: "text-[#22C55E]" },
  { label: "Suspended", value: "6", color: "text-[#F59E0B]" },
  { label: "Revoked", value: "3", color: "text-[#EF4444]" },
];

const charities = [
  { name: "Kenya Education Trust", wallet: "0x4a07...4C3d", status: "Verified", statusBg: "bg-[#DCFCE7]", statusColor: "text-[#16A34A]", stake: "18,000,000", campaigns: "5", registered: "Jun 15, 2025", action: "Revoke" },
  { name: "Hope Foundation", wallet: "0x9TA2...6b9c", status: "Verified", statusBg: "bg-[#DCFCE7]", statusColor: "text-[#16A34A]", stake: "58,000,000", campaigns: "3", registered: "Feb 2, 2025", action: "Revoke" },
  { name: "Community Aid Network", wallet: "0x8E3d...u77s", status: "Suspended", statusBg: "bg-[#FEF3C7]", statusColor: "text-[#D97706]", stake: "5,000,000", campaigns: "2", registered: "Mar 20, 2025", action: "Reinstate" },
  { name: "Global Relief Fund", wallet: "0x4C2F...8b0c", status: "Revoked", statusBg: "bg-[#FEF2F2]", statusColor: "text-[#EF4444]", stake: "0 (slashed)", campaigns: "0", registered: "Dec 1, 2024", action: "Reinstatement rejected" },
  { name: "Rural Health Initiative", wallet: "0x6Qa...3B4T", status: "Verified", statusBg: "bg-[#DCFCE7]", statusColor: "text-[#16A34A]", stake: "1,000,000", campaigns: "2", registered: "Apr 2, 2025", action: "Revoke" },
];

export default function CharitiesPage() {
  const [activeTab, setActiveTab] = useState("All (47)");

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Charity Management</h1>
          <p className="text-sm text-fg-muted">Verify, suspend, or revoke registered charity organizations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2">
            <Search className="h-4 w-4 text-fg-muted" />
            <span className="text-sm text-fg-muted">Search charities...</span>
          </div>
          <button className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2 text-sm text-fg-secondary">
            All Statuses
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-accent-primary text-white"
                : "text-fg-secondary hover:bg-surface-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-2">
            <span className="text-xs text-fg-muted">{s.label}</span>
            <span className={`text-xl sm:text-2xl lg:text-[28px] font-bold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Charities Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            {/* Header */}
            <div className="flex items-center bg-surface-primary px-6 py-3 text-[11px] font-semibold text-fg-muted">
              <span className="flex-1">Charity Name</span>
              <span className="w-[120px]">Status</span>
              <span className="w-[120px]">SANC Staked</span>
              <span className="w-[100px]">Campaigns</span>
              <span className="w-[120px]">Registered</span>
              <span className="w-[100px]">Actions</span>
            </div>
            {charities.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center px-6 py-4">
                  <div className="flex-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-fg-primary">{c.name}</span>
                      <span className="text-[11px] font-mono text-fg-muted">{c.wallet}</span>
                    </div>
                  </div>
                  <span className="w-[120px]">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.statusBg} ${c.statusColor}`}>{c.status}</span>
                  </span>
                  <span className="w-[120px] text-xs text-fg-primary">{c.stake}</span>
                  <span className="w-[100px] text-xs text-fg-primary">{c.campaigns}</span>
                  <span className="w-[120px] text-xs text-fg-muted">{c.registered}</span>
                  <span className="w-[100px]">
                    <ComingSoonOverlay action={`${c.action} ${c.name}`}>
                      <button className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                        c.action === "Revoke" ? "text-[#EF4444] bg-[#FEF2F2]" :
                        c.action === "Reinstate" ? "text-[#22C55E] bg-[#DCFCE7]" :
                        "text-fg-muted bg-surface-primary"
                      }`}>
                        {c.action}
                      </button>
                    </ComingSoonOverlay>
                  </span>
                </div>
                {i < charities.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-line-subtle">
          <span className="text-xs text-fg-muted">Showing 1-5 of 47 charities</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-fg-muted">Previous</span>
            <span className="h-7 w-7 rounded bg-accent-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="h-7 w-7 rounded text-fg-secondary text-xs flex items-center justify-center">2</span>
            <span className="h-7 w-7 rounded text-fg-secondary text-xs flex items-center justify-center">3</span>
            <span className="text-xs text-fg-muted">Next</span>
          </div>
        </div>
      </div>
    </div>
  );
}
