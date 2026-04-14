"use client";

import {
  Flame,
  ChartPie,
  History,
  TrendingUp,
  Info,
  Link as LinkIcon,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const stats = [
  { label: "BNB Fee Pool", value: "12.5 BNB", sub: "Available for buyback" },
  { label: "USDT Fee Pool", value: "8,432 USDT", sub: "Available for buyback" },
  { label: "BUSD Fee Pool", value: "3,180 BUSD", sub: "Available for buyback" },
  { label: "SANC Fee Pool", value: "145K SANC", sub: "From platform fees" },
  { label: "Total SANC Burned", value: "2.4M SANC", sub: "Lifetime burn amount", valueColor: "text-[#EF4444]" },
  { label: "Last Buyback", value: "Apr 8, 2026", sub: "2 days ago" },
];

const feeDistribution = [
  { label: "Buyback & Burn Pool (40%)", value: "5.0 BNB" },
  { label: "Matching Fund (30%)", value: "3.75 BNB" },
  { label: "Operations Fund (30%)", value: "3.75 BNB" },
];

const burnHistory = [
  { date: "Apr 8, 2026", token: "BNB", amountIn: "8.2 BNB", burned: "320,000 SANC", hash: "0x3f7a...c92d" },
  { date: "Mar 25, 2026", token: "USDT", amountIn: "5,200 USDT", burned: "180,000 SANC", hash: "0x8b2e...f41a" },
  { date: "Mar 12, 2026", token: "BNB", amountIn: "10.0 BNB", burned: "410,000 SANC", hash: "0x1d4c...a87b" },
  { date: "Feb 28, 2026", token: "BNB", amountIn: "5.0 BNB", burned: "Failed", hash: "0x9c1f...b23e", failed: true },
];

const burnTrend = [
  { month: "Nov", height: 35 },
  { month: "Dec", height: 43 },
  { month: "Jan", height: 60 },
  { month: "Feb", height: 54 },
  { month: "Mar", height: 80 },
  { month: "Apr", height: 62 },
];

export default function BuybackBurnPage() {
  return (
    <div className="flex flex-col gap-7 p-4 sm:p-6 lg:px-10 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Buyback & Burn</h1>
          <p className="text-sm text-fg-muted">Manage fee pools, execute buybacks, and track SANC burns</p>
        </div>
        <ComingSoonOverlay action="Execute Buyback">
          <button className="flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2.5">
            <Flame className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Execute Buyback</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-1.5 sm:gap-2 min-w-0">
            <span className="text-[11px] sm:text-xs text-fg-muted truncate">{s.label}</span>
            <span className={`text-base sm:text-lg lg:text-[22px] font-bold ${s.valueColor || "text-fg-primary"} truncate`}>{s.value}</span>
            <span className="text-[10px] sm:text-[11px] text-fg-muted">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Execute Buyback Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-[#EF4444]" />
            <h2 className="text-base sm:text-lg font-bold text-fg-primary">Execute Buyback</h2>
          </div>
          <span className="text-[11px] font-semibold text-[#EF4444] bg-[#FEF2F2] rounded-full px-3 py-1 self-start sm:self-auto">Manual Trigger Required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-fg-secondary">Source Token</span>
            <div className="flex items-center justify-between border border-line-subtle rounded-lg px-4 py-3">
              <span className="text-sm text-fg-primary">BNB</span>
              <ChevronDown className="h-4 w-4 text-fg-muted" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-fg-secondary">Amount</span>
            <div className="flex items-center border border-line-subtle rounded-lg px-4 py-3">
              <span className="text-sm text-fg-primary">12.5</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-fg-secondary">Min SANC Out (Slippage)</span>
            <div className="flex items-center border border-line-subtle rounded-lg px-4 py-3">
              <span className="text-sm text-fg-primary">450,000</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F9FF] rounded-xl px-4 py-3 flex flex-col gap-1">
          <span className="text-sm font-semibold text-fg-primary">Estimated Output: ~320,000 SANC</span>
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3 text-fg-muted" />
            <span className="text-[11px] text-fg-muted">Based on current PancakeSwap pool price</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#F0F9FF] rounded-lg px-4 py-2.5">
          <LinkIcon className="h-3.5 w-3.5 text-accent-primary" />
          <span className="text-xs text-fg-secondary font-mono">PancakeSwap Router: 0x10ED...4752</span>
        </div>
      </div>

      {/* Fee Distribution + Burn History Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Distribution */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ChartPie className="h-5 w-5 text-accent-primary" />
            <h3 className="text-base font-bold text-fg-primary">Fee Distribution</h3>
          </div>
          {feeDistribution.map((item, i) => (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-2 py-1">
                <span className="text-[12px] sm:text-[13px] text-fg-secondary min-w-0">{item.label}</span>
                <span className="text-[13px] font-semibold text-fg-primary">{item.value}</span>
              </div>
              {i < feeDistribution.length - 1 && <div className="h-px bg-line-subtle mt-2" />}
            </div>
          ))}
        </div>

        {/* Burn History */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-accent-primary" />
            <h3 className="text-base font-bold text-fg-primary">Burn History</h3>
          </div>
          {/* Table Header */}
          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="flex items-center py-2 text-[11px] font-semibold text-fg-muted">
                <span className="w-[100px]">Date</span>
                <span className="w-[80px]">Token</span>
                <span className="w-[100px]">Amount In</span>
                <span className="w-[120px]">SANC Burned</span>
                <span className="flex-1">Tx Hash</span>
              </div>
              <div className="h-px bg-line-subtle" />
              {burnHistory.map((row, i) => (
                <div key={row.hash}>
                  <div className="flex items-center py-2.5">
                    <span className="w-[100px] text-xs text-fg-secondary">{row.date}</span>
                    <span className="w-[80px] text-xs text-fg-primary">{row.token}</span>
                    <span className="w-[100px] text-xs font-semibold text-fg-primary">{row.amountIn}</span>
                    <span className={`w-[120px] text-xs font-semibold ${row.failed ? "text-[#EF4444] font-bold" : "text-[#EF4444]"}`}>{row.burned}</span>
                    <span className="flex-1 text-xs text-accent-primary font-mono">{row.hash}</span>
                  </div>
                  {i < burnHistory.length - 1 && <div className="h-px bg-line-subtle" />}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-line-subtle" />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-fg-muted">Showing 1-4 of 24 entries</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-fg-muted">Previous</span>
              <span className="h-7 w-7 rounded bg-accent-primary text-white text-xs font-bold flex items-center justify-center">1</span>
              <span className="h-7 w-7 rounded text-fg-secondary text-xs flex items-center justify-center">2</span>
              <span className="h-7 w-7 rounded text-fg-secondary text-xs flex items-center justify-center">3</span>
              <span className="text-xs text-fg-muted">Next</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <ExternalLink className="h-3.5 w-3.5 text-accent-primary shrink-0" />
            <span className="text-[11px] sm:text-xs text-accent-primary font-mono font-medium">Burn Address: 0x000...dEaD</span>
            <span className="text-[11px] sm:text-xs text-accent-primary font-medium">View on BscScan</span>
          </div>
        </div>
      </div>

      {/* SANC Burn Trend Chart */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#EF4444]" />
            <h3 className="text-base font-bold text-fg-primary">SANC Burn Trend</h3>
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium text-fg-muted">Total Burned: 1.72M SANC</span>
        </div>
        <div className="flex items-end gap-2 sm:gap-4 h-[150px] sm:h-[200px]">
          {burnTrend.map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
              <div className="w-full rounded-t bg-[#EF4444]" style={{ height: `${bar.height}%` }} />
              <span className="text-[11px] font-medium text-fg-muted">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
