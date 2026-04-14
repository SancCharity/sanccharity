"use client";

import {
  ShieldOff,
  TriangleAlert,
  Pause,
  Play,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

interface ContractControl {
  name: string;
  address: string;
  status: "Active" | "Paused";
  lastPaused: string;
  lastPausedColor?: string;
}

const contracts: ContractControl[] = [
  { name: "DonationEscrow", address: "0x1a2B...3c4D", status: "Active", lastPaused: "Never" },
  { name: "CampaignManager", address: "0x5e6F...7g8H", status: "Active", lastPaused: "Never" },
  { name: "GovernanceVoting", address: "0x9i0J...1k2L", status: "Paused", lastPaused: "2 hours ago", lastPausedColor: "text-[#EF4444]" },
  { name: "CharityRegistry", address: "0x3m4N...5o6P", status: "Active", lastPaused: "3 days ago" },
  { name: "DonationNFT", address: "0x5Q6r...7S8t", status: "Active", lastPaused: "Never" },
];

const pauseHistory = [
  { timestamp: "Apr 10, 14:05", contract: "GovernanceVoting", action: "Paused", initiatedBy: "0xAdmin...1234", hash: "0xabc1...def2" },
  { timestamp: "Apr 7, 09:30", contract: "CharityRegistry", action: "Resumed", initiatedBy: "0xAdmin...1234", hash: "0x3456...7890" },
  { timestamp: "Apr 7, 08:15", contract: "CharityRegistry", action: "Paused", initiatedBy: "0xAdmin...5678", hash: "0xfedc...ba98" },
  { timestamp: "Mar 28, 16:42", contract: "DonationEscrow", action: "Resumed", initiatedBy: "0xAdmin...1234", hash: "0x7654...3210" },
  { timestamp: "Mar 28, 15:10", contract: "DonationEscrow", action: "Paused", initiatedBy: "0xAdmin...5678", hash: "0xabcd...ef01" },
  { timestamp: "Mar 15, 11:20", contract: "All Contracts", action: "Resumed", initiatedBy: "0xAdmin...1234", hash: "0x2345...6789" },
];

export default function CircuitBreakerPage() {
  return (
    <div className="flex flex-col gap-7 p-4 sm:p-6 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ShieldOff className="h-6 w-6 text-[#EF4444] flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Emergency Circuit Breaker</h1>
            <p className="text-sm text-fg-secondary">Pause/unpause smart contracts in case of emergency</p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="flex items-center gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-5 py-3.5">
          <TriangleAlert className="h-5 w-5 text-[#EF4444] flex-shrink-0" />
          <span className="text-[13px] text-[#991B1B]">
            Pausing contracts will immediately halt all on-chain transactions. This action should only be used in genuine emergencies.
          </span>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#22C55E]" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-fg-primary">System Status</span>
            <span className="text-[13px] text-fg-secondary">All contracts operational · 1 paused</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#CA8A04] bg-[#FEF9C3] rounded-full px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#CA8A04]" />
          Partial
        </span>
      </div>

      {/* Contract Controls */}
      <div className="flex flex-col gap-4">
        <span className="text-base font-semibold text-fg-primary">Contract Controls</span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contracts.map((c) => (
            <div
              key={c.name}
              className={`bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-4 ${
                c.status === "Paused" ? "border-2 border-[#FCA5A5]" : "border border-black/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-fg-primary">{c.name}</span>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                  c.status === "Active" ? "text-[#16A34A] bg-[#DCFCE7]" : "text-[#EF4444] bg-[#FEF2F2]"
                }`}>{c.status}</span>
              </div>
              <span className="text-xs font-mono text-fg-muted">{c.address}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-fg-muted">Last paused</span>
                <span className={`text-xs ${c.lastPausedColor || "text-fg-secondary"}`}>{c.lastPaused}</span>
              </div>
              <ComingSoonOverlay action={c.status === "Paused" ? `Resume ${c.name}` : `Pause ${c.name}`}>
                {c.status === "Paused" ? (
                  <button className="w-full text-center py-2.5 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[13px] font-semibold text-[#16A34A]">
                    Resume Contract
                  </button>
                ) : (
                  <button className="w-full text-center py-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[13px] font-semibold text-[#EF4444]">
                    Pause Contract
                  </button>
                )}
              </ComingSoonOverlay>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-[#FEF2F2] flex flex-col gap-4">
        <span className="text-base font-semibold text-fg-primary">Emergency Actions</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ComingSoonOverlay action="Pause All Contracts">
            <button className="w-full flex items-center justify-center gap-2 bg-[#EF4444] rounded-xl py-3.5 text-white">
              <Pause className="h-4 w-4" />
              <span className="text-sm font-semibold">Pause All Contracts</span>
            </button>
          </ComingSoonOverlay>
          <ComingSoonOverlay action="Resume All Contracts">
            <button className="w-full flex items-center justify-center gap-2 bg-[#22C55E] rounded-xl py-3.5 text-white">
              <Play className="h-4 w-4" />
              <span className="text-sm font-semibold">Resume All Contracts</span>
            </button>
          </ComingSoonOverlay>
        </div>
        <p className="text-xs text-fg-muted">
          ⚠ Pausing all contracts will immediately halt donations, campaigns, governance, and buyback operations across the entire platform.
        </p>
      </div>

      {/* Pause History */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="px-6 py-5">
          <span className="text-base font-semibold text-fg-primary">Pause History</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="flex items-center bg-surface-primary px-6 py-2.5 text-xs font-semibold text-fg-muted">
              <span className="flex-1">Timestamp</span>
              <span className="flex-1">Contract</span>
              <span className="w-[100px]">Action</span>
              <span className="flex-1">Initiated By</span>
              <span className="flex-1">Tx Hash</span>
            </div>
            {pauseHistory.map((h, i) => (
              <div key={`${h.timestamp}-${h.contract}-${h.action}`}>
                <div className="flex items-center px-6 py-3.5">
                  <span className="flex-1 text-xs font-mono text-fg-muted">{h.timestamp}</span>
                  <span className="flex-1 text-[13px] text-fg-primary">{h.contract}</span>
                  <span className="w-[100px]">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      h.action === "Paused" ? "text-[#EF4444] bg-[#FEF2F2]" : "text-[#16A34A] bg-[#DCFCE7]"
                    }`}>{h.action}</span>
                  </span>
                  <span className="flex-1 text-xs font-mono text-fg-secondary">{h.initiatedBy}</span>
                  <span className="flex-1 text-xs font-mono text-accent-primary">{h.hash}</span>
                </div>
                {i < pauseHistory.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
