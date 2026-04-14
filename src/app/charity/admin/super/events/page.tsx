"use client";

import {
  Activity,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const stats = [
  { label: "Sync Height", value: "19,847,523", icon: "📦" },
  { label: "Block Delay", value: "2 blocks", icon: "⏱" },
  { label: "Events Processed", value: "1,247", icon: "📊" },
  { label: "Failed Events", value: "3", valueColor: "text-[#EF4444]", icon: "⚠️" },
];

const contracts = [
  { name: "DonationEscrow", address: "0x1a2B...3c4D", lastEvent: "DonationReceived", block: "19,847,521", active: true },
  { name: "CampaignManager", address: "0x5e6F...7g8H", lastEvent: "CampaignCreated", block: "19,847,519", active: true },
  { name: "GovernanceVoting", address: "0x9i0J...1k2L", lastEvent: "VoteCast", block: "19,847,518", active: true },
  { name: "CharityRegistry", address: "0x3m4N...5o6P", lastEvent: "CharityRegistered", block: "19,847,510", active: true },
  { name: "BuybackBurn", address: "0x7q8R...9s0T", lastEvent: "BuybackExecuted", block: "19,847,505", active: false },
];

const recentEvents = [
  { time: "14:23:45", event: "DonationReceived", contract: "DonationEscrow", hash: "0xab12...cd34", status: "OK" },
  { time: "14:23:12", event: "MilestoneApproved", contract: "DonationEscrow", hash: "0xef56...gh78", status: "OK" },
  { time: "14:22:58", event: "VoteCast", contract: "GovernanceVoting", hash: "0xij90...kl12", status: "Failed" },
  { time: "14:22:30", event: "CampaignCreated", contract: "CampaignManager", hash: "0xmn34...op56", status: "Failed" },
  { time: "14:21:55", event: "DonationReceived", contract: "DonationEscrow", hash: "0xqr78...st90", status: "OK" },
  { time: "14:21:20", event: "BuybackExecuted", contract: "BuybackBurn", hash: "0xuv12...wx34", status: "OK" },
  { time: "14:20:45", event: "CharityRegistered", contract: "CharityRegistry", hash: "0xyz56...ab78", status: "OK" },
  { time: "14:20:10", event: "FundsReleased", contract: "DonationEscrow", hash: "0xcd90...ef12", status: "OK" },
];

const failedEvents = [
  { time: "14:22:30", event: "CampaignCreated", error: "RPC timeout", retries: "2/3" },
  { time: "14:20:10", event: "FundsReleased", error: "Gas estimation failed", retries: "1/3" },
  { time: "14:18:42", event: "VoteCast", error: "Decode error", retries: "3/3" },
];

export default function EventListenerPage() {
  return (
    <div className="flex flex-col gap-7 p-8 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-fg-primary">Event Listener Status</h1>
          <p className="text-sm text-fg-secondary">Monitor blockchain sync and event processing</p>
        </div>
        <ComingSoonOverlay action="Refresh Sync">
          <button className="flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2.5">
            <RefreshCw className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Refresh</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">{s.icon}</span>
              <span className="text-xs text-fg-muted">{s.label}</span>
            </div>
            <span className={`text-[28px] font-bold ${s.valueColor || "text-fg-primary"}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Sync Status */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-fg-primary">Sync Status</span>
          <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Syncing
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted">Current Block</span>
              <span className="text-xs font-mono text-fg-primary">19,847,523</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted">Latest Block</span>
              <span className="text-xs font-mono text-fg-primary">19,847,525</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted">RPC Endpoint</span>
              <span className="text-xs font-mono text-fg-secondary">BSC Mainnet</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted">Last Sync</span>
              <span className="text-xs font-mono text-fg-secondary">~3s ago</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-line-subtle rounded-lg bg-surface-sage px-3.5 py-2.5 flex-1">
            <span className="text-xs text-fg-muted">From Block:</span>
            <span className="text-xs font-mono text-fg-primary">19,847,520</span>
          </div>
          <ComingSoonOverlay action="Trigger Backfill">
            <button className="flex items-center gap-2 border border-line-subtle rounded-lg px-5 h-[44px]">
              <Activity className="h-3.5 w-3.5 text-fg-secondary" />
              <span className="text-sm text-fg-secondary">Trigger Backfill</span>
            </button>
          </ComingSoonOverlay>
        </div>
      </div>

      {/* Contract Listeners */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-base font-semibold text-fg-primary">Contract Listeners</span>
          <span className="text-[13px] text-fg-muted">5 contracts monitored</span>
        </div>
        {/* Table Header */}
        <div className="flex items-center bg-surface-primary px-6 py-2.5 text-xs font-semibold text-fg-muted">
          <span className="flex-1">Contract Name</span>
          <span className="flex-1">Address</span>
          <span className="flex-1">Last Event</span>
          <span className="w-[100px]">Block #</span>
          <span className="w-[80px]">Status</span>
        </div>
        {contracts.map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center px-6 py-3.5">
              <span className="flex-1 text-[13px] font-medium text-fg-primary">{c.name}</span>
              <span className="flex-1 text-xs font-mono text-fg-secondary">{c.address}</span>
              <span className="flex-1 text-[13px] text-fg-secondary">{c.lastEvent}</span>
              <span className="w-[100px] text-xs font-mono text-fg-secondary">{c.block}</span>
              <span className="w-[80px]">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${c.active ? "text-[#16A34A] bg-[#DCFCE7]" : "text-[#EF4444] bg-[#FEF2F2]"}`}>
                  {c.active ? "Active" : "Paused"}
                </span>
              </span>
            </div>
            {i < contracts.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-base font-semibold text-fg-primary">Recent Events</span>
          <ComingSoonOverlay action="Trigger Backfill">
            <button className="flex items-center gap-1.5 border border-line-subtle rounded-lg px-3.5 py-2 text-xs text-fg-secondary">
              <Activity className="h-3.5 w-3.5" />
              Trigger Backfill
            </button>
          </ComingSoonOverlay>
        </div>
        <div className="flex items-center bg-surface-primary px-6 py-2.5 text-xs font-semibold text-fg-muted">
          <span className="w-[140px]">Time</span>
          <span className="flex-1">Event</span>
          <span className="flex-1">Contract</span>
          <span className="flex-1">Tx Hash</span>
          <span className="w-[80px]">Status</span>
        </div>
        {recentEvents.map((e, i) => (
          <div key={`${e.time}-${e.event}`}>
            <div className="flex items-center px-6 py-3">
              <span className="w-[140px] text-xs font-mono text-fg-muted">{e.time}</span>
              <span className="flex-1 text-[13px] text-fg-primary">{e.event}</span>
              <span className="flex-1 text-[13px] text-fg-secondary">{e.contract}</span>
              <span className="flex-1 text-xs font-mono text-accent-primary">{e.hash}</span>
              <span className="w-[80px]">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${e.status === "OK" ? "text-[#16A34A] bg-[#DCFCE7]" : "text-[#EF4444] bg-[#FEF2F2]"}`}>
                  {e.status}
                </span>
              </span>
            </div>
            {i < recentEvents.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}
      </div>

      {/* Failed Events */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-[#FEF2F2] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
            <span className="text-base font-semibold text-fg-primary">Failed Events (3)</span>
          </div>
          <ComingSoonOverlay action="Retry All Failed Events">
            <button className="flex items-center gap-1.5 bg-[#EF4444] rounded-lg px-3.5 py-2">
              <RotateCcw className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white">Retry All</span>
            </button>
          </ComingSoonOverlay>
        </div>
        <div className="flex items-center bg-[#FEF2F2] px-6 py-2.5 text-xs font-semibold text-fg-muted">
          <span className="w-[140px]">Time</span>
          <span className="flex-1">Event</span>
          <span className="flex-1">Error</span>
          <span className="w-[60px]">Retries</span>
          <span className="w-[80px]">Action</span>
        </div>
        {failedEvents.map((f, i) => (
          <div key={`${f.time}-${f.event}`}>
            <div className="flex items-center px-6 py-3">
              <span className="w-[140px] text-xs font-mono text-fg-muted">{f.time}</span>
              <span className="flex-1 text-[13px] text-fg-primary">{f.event}</span>
              <span className="flex-1 text-[13px] text-[#EF4444]">{f.error}</span>
              <span className="w-[60px] text-xs font-mono text-fg-secondary">{f.retries}</span>
              <span className="w-[80px]">
                <ComingSoonOverlay action="Retry Event">
                  <button className="text-[11px] font-medium text-accent-primary hover:underline">Retry</button>
                </ComingSoonOverlay>
              </span>
            </div>
            {i < failedEvents.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}
      </div>
    </div>
  );
}
