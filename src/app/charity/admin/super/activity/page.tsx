"use client";

import {
  Download,
  ChevronDown,
  Search,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const activities = [
  { timestamp: "2024-03-15 14:30", admin: "0x1a3B...9f2E", action: "Verified", actionBg: "bg-[#DCFCE7]", actionColor: "text-[#16A34A]", target: "Clean Water Initiative", details: "KYC approved, stake confirmed", hash: "0x4a2...f3d" },
  { timestamp: "2024-03-15 13:15", admin: "0x1a3B...5m3d", action: "Paused", actionBg: "bg-[#FEF2F2]", actionColor: "text-[#EF4444]", target: "DonationEscrow", details: "Scheduled maintenance downtime", hash: "0x1c2...3de" },
  { timestamp: "2024-03-15 11:48", admin: "0x4e5F...1p3k", action: "Buyback", actionBg: "bg-[#FEF3C7]", actionColor: "text-[#D97706]", target: "SANC Token", details: "50,000 SANC burned at $0.042", hash: "0x3a...f5c" },
  { timestamp: "2024-03-14 16:20", admin: "0x1a3B...5m3d", action: "Suspended", actionBg: "bg-[#FEF3C7]", actionColor: "text-[#D97706]", target: "Hope Foundation", details: "Suspicious withdrawal pattern", hash: "0xe4...1f3" },
  { timestamp: "2024-03-14 15:30", admin: "0xBuser...1g9J", action: "Resumed", actionBg: "bg-[#DCFCE7]", actionColor: "text-[#16A34A]", target: "GreenEarth Org", details: "Timed suspension ended", hash: "0xab...c12" },
  { timestamp: "2024-03-13 17:48", admin: "0x1a3B...5m3d", action: "Resumed", actionBg: "bg-[#DCFCE7]", actionColor: "text-[#16A34A]", target: "DonationEscrow", details: "Maintenance complete", hash: "0x7e...d34" },
  { timestamp: "2024-03-13 14:18", admin: "0x4e5F...1p3k", action: "Verified", actionBg: "bg-[#DCFCE7]", actionColor: "text-[#16A34A]", target: "Education For All", details: "KYC approved, stake confirmed", hash: "0x9f...e56" },
];

export default function ActivityLogPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Activity Log</h1>
          <p className="text-sm text-fg-muted">Audit trail of all admin actions</p>
        </div>
        <ComingSoonOverlay action="Export CSV">
          <button className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-4 py-2">
            <Download className="h-4 w-4 text-fg-secondary" />
            <span className="text-sm text-fg-secondary">Export CSV</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2 text-sm text-fg-muted whitespace-nowrap">
          <span>Mar 1 – Mar 15, 2024</span>
        </div>
        <button className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2 text-sm text-fg-secondary whitespace-nowrap">
          All Actions
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2 flex-1 min-w-0">
          <Search className="h-4 w-4 text-fg-muted flex-shrink-0" />
          <span className="text-sm text-fg-muted truncate">Search by admin, target, or tx hash...</span>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="flex items-center bg-surface-inverse px-6 py-3 text-[11px] font-semibold text-fg-muted">
              <span className="w-[140px]">Timestamp</span>
              <span className="w-[130px]">Admin</span>
              <span className="w-[100px]">Action</span>
              <span className="flex-1">Target</span>
              <span className="flex-1">Details</span>
              <span className="w-[100px]">Tx Hash</span>
            </div>
            {activities.map((a, i) => (
              <div key={`${a.timestamp}-${a.target}`}>
                <div className="flex items-center px-6 py-3.5">
                  <span className="w-[140px] text-xs font-mono text-fg-muted">{a.timestamp}</span>
                  <span className="w-[130px] text-xs font-mono text-fg-secondary">{a.admin}</span>
                  <span className="w-[100px]">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${a.actionBg} ${a.actionColor}`}>{a.action}</span>
                  </span>
                  <span className="flex-1 text-[13px] text-fg-primary">{a.target}</span>
                  <span className="flex-1 text-xs text-fg-secondary">{a.details}</span>
                  <span className="w-[100px] text-xs font-mono text-accent-primary">{a.hash}</span>
                </div>
                {i < activities.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-line-subtle">
          <span className="text-xs text-fg-muted">Showing 1-7 of 156 entries</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-fg-muted">Previous</span>
            <span className="text-xs text-fg-muted">Page 1 of 24</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-accent-primary bg-accent-light rounded-lg px-3 py-1">
              Next →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
