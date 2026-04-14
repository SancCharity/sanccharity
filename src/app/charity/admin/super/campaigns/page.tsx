"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useState } from "react";

const tabs = ["All (124)", "Active (89)", "Featured (12)", "Flagged (5)"];

const stats = [
  { label: "Total Campaigns", value: "124", color: "text-fg-primary" },
  { label: "Total Raised", value: "$2.4M", color: "text-fg-primary" },
  { label: "Featured", value: "12", color: "text-[#22C55E]" },
  { label: "Flagged", value: "5", color: "text-[#EF4444]" },
];

interface Campaign {
  name: string;
  category: string;
  charity: string;
  status: string;
  statusBg: string;
  statusColor: string;
  raised: string;
  featured: boolean;
  actions: { label: string; color: string; bg: string }[];
}

const campaigns: Campaign[] = [
  {
    name: "Clean Water Initiative",
    category: "Humanitarian",
    charity: "Kenya Education Trust",
    status: "Active",
    statusBg: "bg-[#DCFCE7]",
    statusColor: "text-[#16A34A]",
    raised: "15.2 / 25 BNB",
    featured: false,
    actions: [{ label: "Unfeatured", color: "text-fg-muted", bg: "bg-surface-primary" }, { label: "Force Cancel", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" }],
  },
  {
    name: "School Building in Rural Kenya",
    category: "Education",
    charity: "Hope Foundation",
    status: "Active",
    statusBg: "bg-[#DCFCE7]",
    statusColor: "text-[#16A34A]",
    raised: "44.2 / 50 BNB",
    featured: false,
    actions: [{ label: "Unfeatured", color: "text-fg-muted", bg: "bg-surface-primary" }, { label: "Force Cancel", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" }],
  },
  {
    name: "Mobile Health Clinic Program",
    category: "Healthcare",
    charity: "Rural Health Initiative",
    status: "Active",
    statusBg: "bg-[#DCFCE7]",
    statusColor: "text-[#16A34A]",
    raised: "8.7 / 30 BNB",
    featured: false,
    actions: [{ label: "Feature", color: "text-accent-primary", bg: "bg-accent-light" }, { label: "Force Cancel", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" }],
  },
  {
    name: "Emergency Food Relief",
    category: "Food & Nutrition",
    charity: "Community Aid Network",
    status: "Paused",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#D97706]",
    raised: "3.1 / 50 BNB",
    featured: false,
    actions: [{ label: "Resume", color: "text-[#22C55E]", bg: "bg-[#DCFCE7]" }, { label: "Force Cancel", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" }],
  },
  {
    name: "Youth Education Scholarship",
    category: "Education",
    charity: "Global Relief Fund",
    status: "Active",
    statusBg: "bg-[#DCFCE7]",
    statusColor: "text-[#16A34A]",
    raised: "22.0 / 40 BNB",
    featured: false,
    actions: [{ label: "Unfeatured", color: "text-fg-muted", bg: "bg-surface-primary" }, { label: "Force Cancel", color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" }],
  },
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("All (124)");

  return (
    <div className="flex flex-col gap-7 p-8 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-fg-primary">Campaign Moderation</h1>
          <p className="text-sm text-fg-muted">Approve, withdraw, or force-cancel campaigns across the platform</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-2">
            <span className="text-xs text-fg-muted">{s.label}</span>
            <span className={`text-[28px] font-bold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center bg-surface-primary px-6 py-3 text-[11px] font-semibold text-fg-muted">
          <span className="flex-1">Campaign</span>
          <span className="w-[160px]">Charity</span>
          <span className="w-[80px]">Status</span>
          <span className="w-[140px]">Raised / Goal</span>
          <span className="w-[80px]">Featured</span>
          <span className="w-[200px] text-right">Actions</span>
        </div>
        {campaigns.map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center px-6 py-4">
              <div className="flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-fg-primary">{c.name}</span>
                  <span className="text-[11px] text-fg-muted">{c.category}</span>
                </div>
              </div>
              <span className="w-[160px] text-xs text-fg-secondary">{c.charity}</span>
              <span className="w-[80px]">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.statusBg} ${c.statusColor}`}>{c.status}</span>
              </span>
              <span className="w-[140px] text-xs font-medium text-fg-primary">{c.raised}</span>
              <span className="w-[80px] text-xs text-fg-muted">{c.featured ? "Yes" : "—"}</span>
              <div className="w-[200px] flex items-center justify-end gap-2">
                {c.actions.map((a) => (
                  <ComingSoonOverlay key={a.label} action={`${a.label} ${c.name}`}>
                    <button className={`text-[11px] font-semibold px-3 py-1 rounded-full ${a.color} ${a.bg}`}>
                      {a.label}
                    </button>
                  </ComingSoonOverlay>
                ))}
              </div>
            </div>
            {i < campaigns.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-line-subtle">
          <span className="text-xs text-fg-muted">Showing 1-5 of 124 campaigns</span>
          <div className="flex items-center gap-1">
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronLeft className="h-3 w-3" /></span>
            <span className="h-7 w-7 rounded-md bg-accent-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">2</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">3</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronRight className="h-3 w-3" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
