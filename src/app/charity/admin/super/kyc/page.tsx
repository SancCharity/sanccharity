"use client";

import {
  FileText,
  X,
  Check,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useState } from "react";

const tabs = ["All", "Pending", "Approved", "Rejected"];

const applications = [
  {
    name: "Hope Foundation",
    status: "Pending",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#D97706]",
    wallet: "0x1a3B...9f2E",
    submitted: "Apr 9, 2026",
    tier: "Gold Tier",
    tierBg: "bg-[#FEF3C7]",
    tierColor: "text-[#D97706]",
    docs: ["Business Registration", "Tax ID Certificate", "Proof of Address"],
  },
  {
    name: "Clean Water Initiative",
    status: "Pending",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#D97706]",
    wallet: "0x4c5D...7e8F",
    submitted: "Apr 8, 2026",
    tier: "Bronze Tier",
    tierBg: "bg-[#FEF2F2]",
    tierColor: "text-[#92400E]",
    docs: ["Business Registration", "Tax ID Certificate", "Proof of Address"],
  },
  {
    name: "Education For All",
    status: "Pending",
    statusBg: "bg-[#FEF3C7]",
    statusColor: "text-[#D97706]",
    wallet: "0x8a9C...1d2E",
    submitted: "Apr 6, 2026",
    tier: "Bronze Tier",
    tierBg: "bg-[#FEF2F2]",
    tierColor: "text-[#92400E]",
    docs: ["Business Registration", "Tax ID Certificate", "Proof of Address"],
  },
];

export default function KYCQueuePage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-8 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">KYC Review Queue</h1>
          <span className="text-xs font-semibold text-[#D97706] bg-[#FEF3C7] rounded-full px-3 py-1">3 pending</span>
        </div>
        <span className="text-sm text-fg-muted">Review and approve charity KYC submissions</span>
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

      {/* Applications */}
      <div className="flex flex-col gap-6">
        {applications.map((app) => (
          <div key={app.name} className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-base sm:text-lg font-bold text-fg-primary">{app.name}</span>
                <span className={`text-[11px] font-semibold ${app.statusColor} ${app.statusBg} rounded-full px-3 py-1`}>{app.status}</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-fg-muted">Submitted: {app.submitted}</span>
                <span className={`text-[11px] font-semibold ${app.tierColor} ${app.tierBg} rounded-full px-3 py-1`}>{app.tier}</span>
              </div>
            </div>

            {/* Wallet */}
            <span className="text-xs font-mono text-fg-muted">{app.wallet}</span>

            {/* Documents */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-fg-secondary">Documents:</span>
              {app.docs.map((doc) => (
                <div key={doc} className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-accent-primary" />
                  <span className="text-[13px] text-fg-secondary">{doc}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <ComingSoonOverlay action={`Reject ${app.name}`}>
                <button className="flex items-center gap-1.5 text-[#EF4444] text-sm font-semibold">
                  <X className="h-4 w-4" />
                  Reject
                </button>
              </ComingSoonOverlay>
              <ComingSoonOverlay action={`Approve ${app.name}`}>
                <button className="flex items-center gap-1.5 bg-[#22C55E] text-white rounded-lg px-4 py-2 text-sm font-semibold">
                  <Check className="h-4 w-4" />
                  Approve
                </button>
              </ComingSoonOverlay>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
