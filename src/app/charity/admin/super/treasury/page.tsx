"use client";

import {
  Coins,
  Lock,
  HeartHandshake,
  Settings,
  ArrowLeftRight,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const treasuryStats = [
  {
    icon: HeartHandshake,
    iconColor: "text-[#22C55E]",
    label: "Matching Fund",
    value: "52.3 BNB",
    badge: "+12.4% this month",
    badgeColor: "text-[#16A34A] bg-[#DCFCE7]",
  },
  {
    icon: Settings,
    iconColor: "text-accent-primary",
    label: "Operations Fund",
    value: "28.7 BNB",
    badge: "Covers ~6 months ops",
    badgeColor: "text-accent-primary bg-accent-light",
  },
  {
    icon: Lock,
    iconColor: "text-[#F59E0B]",
    label: "Total Escrowed",
    value: "105.5 BNB",
    badge: "Across 47 active campaigns",
    badgeColor: "text-[#D97706] bg-[#FEF3C7]",
  },
];

const tokenBalances = [
  { token: "BNB", symbol: "BNB", color: "#F0B90B", matching: "42.8 BNB", operations: "22.1 BNB", escrowed: "85.4 BNB", total: "$90,582" },
  { token: "USDT", symbol: "₮", color: "#26A17B", matching: "$6,240", operations: "$4,150", escrowed: "$2,060", total: "$12,450" },
  { token: "BUSD", symbol: "B", color: "#F0B90B", matching: "$3,100", operations: "$2,450", escrowed: "$2,650", total: "$8,200" },
  { token: "SANC", symbol: "S", color: "#0EA5E9", matching: "215K", operations: "—", escrowed: "4.98M", total: "$1,115" },
];

const escrowAccounts = [
  { campaign: "Clean Water Initiative", charity: "Kenya Education Trust", escrowed: "25.0 BNB", released: "15.2 BNB", releasedColor: "text-[#22C55E]", status: "Active", statusBg: "bg-[#DCFCE7]", statusColor: "text-[#16A34A]" },
  { campaign: "School Building Project", charity: "Hope Foundation", escrowed: "50.0 BNB", released: "45.2 BNB", releasedColor: "text-[#22C55E]", status: "Active", statusBg: "bg-[#DCFCE7]", statusColor: "text-[#16A34A]" },
  { campaign: "Mobile Health Clinics", charity: "Rural Health Initiative", escrowed: "30.0 BNB", released: "8.7 BNB", releasedColor: "text-[#22C55E]", status: "Pending", statusBg: "bg-[#FEF3C7]", statusColor: "text-[#D97706]" },
];

const recentMovements = [
  { label: "Milestone Release → Kenya Education Trust", date: "Apr 9, 2026 · 0x3f7a...c92d", amount: "-5.0 BNB", amountColor: "text-[#EF4444]" },
  { label: "Donation Received → Clean Water Initiative", date: "Apr 9, 2026 · 0x8b2e...f41a", amount: "+2.5 BNB", amountColor: "text-[#22C55E]" },
  { label: "Fee Split → Buyback Pool", date: "Apr 8, 2026 · 0x1d4c...a87b", amount: "+0.8 BNB", amountColor: "text-[#22C55E]" },
];

export default function TreasuryPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-8 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Treasury Overview</h1>
          <p className="text-sm text-fg-muted">Monitor fund balances, escrow status, and treasury health</p>
        </div>
        <ComingSoonOverlay action="Export Report">
          <button className="flex items-center gap-2 rounded-full border border-accent-primary px-5 py-2.5">
            <Download className="h-4 w-4 text-accent-primary" />
            <span className="text-sm font-semibold text-accent-primary">Export Report</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Total Treasury Value */}
      <div className="bg-surface-inverse rounded-2xl p-5 sm:p-8 flex flex-col items-center gap-2">
        <span className="text-sm text-fg-muted">Total Treasury Value</span>
        <span className="text-2xl sm:text-[32px] lg:text-[40px] font-bold text-white">186.5 BNB</span>
        <span className="text-base text-fg-muted">≈ $112,347 USD</span>
      </div>

      {/* Treasury Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {treasuryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <s.icon className={`h-[18px] w-[18px] ${s.iconColor}`} />
              <span className="text-xs text-fg-muted">{s.label}</span>
            </div>
            <span className="text-[22px] font-bold text-fg-primary">{s.value}</span>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${s.badgeColor}`}>{s.badge}</span>
          </div>
        ))}
      </div>

      {/* Token Balances */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-accent-primary" />
            <h3 className="text-base font-bold text-fg-primary">Token Balances</h3>
          </div>
          <span className="text-[11px] font-semibold text-accent-primary bg-accent-light rounded-full px-3 py-1">4 tokens</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header */}
            <div className="flex items-center py-2 text-[11px] font-semibold text-fg-muted">
              <span className="flex-1">Token</span>
              <span className="w-[140px] text-right">Matching Fund</span>
              <span className="w-[140px] text-right">Operations</span>
              <span className="w-[140px] text-right">Escrowed</span>
              <span className="w-[140px] text-right">Total (USD)</span>
            </div>
            <div className="h-px bg-line-subtle" />

            {tokenBalances.map((row, i) => (
              <div key={row.token}>
                <div className="flex items-center py-2.5">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: row.color }}>
                      {row.symbol}
                    </div>
                    <span className="text-[13px] font-medium text-fg-primary">{row.token}</span>
                  </div>
                  <span className="w-[140px] text-right text-[13px] text-fg-primary">{row.matching}</span>
                  <span className="w-[140px] text-right text-[13px] text-fg-primary">{row.operations}</span>
                  <span className="w-[140px] text-right text-[13px] text-fg-primary">{row.escrowed}</span>
                  <span className="w-[140px] text-right text-[13px] font-semibold text-fg-primary">{row.total}</span>
                </div>
                {i < tokenBalances.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Escrow Accounts */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#F59E0B]" />
            <h3 className="text-base font-bold text-fg-primary">Active Escrow Accounts</h3>
          </div>
          <span className="text-xs font-medium text-accent-primary bg-accent-light rounded-full px-3 py-1">47 campaigns</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[620px]">
            {/* Table Header */}
            <div className="flex items-center py-2 text-[11px] font-semibold text-fg-muted">
              <span className="flex-1">Campaign</span>
              <span className="w-[160px]">Charity</span>
              <span className="w-[100px]">Escrowed</span>
              <span className="w-[100px]">Released</span>
              <span className="w-[100px]">Status</span>
            </div>
            <div className="h-px bg-line-subtle" />

            {escrowAccounts.map((row, i) => (
              <div key={row.campaign}>
                <div className="flex items-center py-2">
                  <span className="flex-1 text-[13px] font-medium text-fg-primary">{row.campaign}</span>
                  <span className="w-[160px] text-xs text-fg-secondary">{row.charity}</span>
                  <span className="w-[100px] text-xs font-semibold text-fg-primary">{row.escrowed}</span>
                  <span className={`w-[100px] text-xs ${row.releasedColor}`}>{row.released}</span>
                  <div className="w-[100px]">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${row.statusBg} ${row.statusColor}`}>{row.status}</span>
                  </div>
                </div>
                {i < escrowAccounts.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-line-subtle" />
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-fg-muted">Showing 3 of 47 campaigns</span>
          <div className="flex items-center gap-1">
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronLeft className="h-3 w-3" /></span>
            <span className="h-7 w-7 rounded-md bg-accent-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">2</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">3</span>
            <span className="text-xs text-fg-muted">...</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">16</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronRight className="h-3 w-3" /></span>
          </div>
        </div>
      </div>

      {/* Recent Fund Movements */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-accent-primary" />
          <h3 className="text-base font-bold text-fg-primary">Recent Fund Movements</h3>
        </div>

        {recentMovements.map((tx) => (
          <div key={tx.label} className="flex items-center justify-between bg-surface-primary rounded-lg px-4 py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-fg-primary">{tx.label}</span>
              <span className="text-[11px] font-mono text-fg-muted">{tx.date}</span>
            </div>
            <span className={`text-sm font-semibold ${tx.amountColor}`}>{tx.amount}</span>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-fg-muted">Showing 3 of 124 movements</span>
          <div className="flex items-center gap-1">
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronLeft className="h-3 w-3" /></span>
            <span className="h-7 w-7 rounded-md bg-accent-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">2</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">3</span>
            <span className="text-xs text-fg-muted">...</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-secondary text-xs flex items-center justify-center">42</span>
            <span className="h-7 w-7 rounded-md border border-line-subtle text-fg-muted text-xs flex items-center justify-center"><ChevronRight className="h-3 w-3" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
