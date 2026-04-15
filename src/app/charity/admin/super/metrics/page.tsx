"use client";

import {
  DollarSign,
  Megaphone,
  Building2,
  Coins,
  Users,
  Download,
  TriangleAlert,
  Vote,
  Trophy,
  Funnel,
  Flame,
  ChevronDown,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const stats = [
  { label: "Total Donations", value: "$2.4M", sub: "1,247 donations", icon: DollarSign, iconColor: "text-[#22C55E]" },
  { label: "Active Campaigns", value: "124", sub: "+12 this month", subColor: "text-[#22C55E]", icon: Megaphone, iconColor: "text-accent-primary" },
  { label: "Registered Charities", value: "47", sub: "+5 this month", subColor: "text-[#22C55E]", icon: Building2, iconColor: "text-[#F59E0B]" },
  { label: "Platform Fees", value: "$48.2K", sub: "SANC tokens", icon: Coins, iconColor: "text-accent-primary" },
  { label: "Active Users", value: "84", sub: "+12% vs last week", subColor: "text-[#22C55E]", icon: Users, iconColor: "text-[#8B5CF6]" },
];

const donationBars = [
  { month: "Nov", height: 45 },
  { month: "Dec", height: 55 },
  { month: "Jan", height: 70 },
  { month: "Feb", height: 60 },
  { month: "Mar", height: 85 },
  { month: "Apr", height: 75 },
];

const campaignPerf = [
  { label: "Active", value: "89", dot: "bg-[#22C55E]" },
  { label: "Completed", value: "24", dot: "bg-accent-primary" },
  { label: "Near Deadline", value: "8", dot: "bg-[#F59E0B]" },
  { label: "Flagged", value: "3", dot: "bg-[#EF4444]" },
];

const regBars = [
  { month: "Nov", height: 30 },
  { month: "Dec", height: 45 },
  { month: "Jan", height: 55 },
  { month: "Feb", height: 40 },
  { month: "Mar", height: 65 },
  { month: "Apr", height: 50 },
];

const feeRows = [
  { label: "Donation Matching Pool", value: "$5,240", pct: "42.1%" },
  { label: "Operations & Dev", value: "$3,980", pct: "31.9%" },
  { label: "Buyback & Burn", value: "$3,230", pct: "25.9%" },
];

const tokenRevenue = [
  { token: "BNB", value: "$5,240" },
  { token: "USDT", value: "$3,980" },
  { token: "BUSD", value: "$2,110" },
  { token: "SANC", value: "$1,120" },
];

const flaggedActivity = [
  { label: "Unusual donation pattern detected", time: "2 hours ago" },
  { label: "Suspicious withdrawal pattern", time: "5 hours ago" },
  { label: "Failed marketplace auction", time: "1 day ago" },
];

const govStats = [
  { label: "Total Proposals", value: "1,847" },
  { label: "Avg Participation", value: "32.1%" },
  { label: "Pass Rate", value: "78%" },
];

const topCampaigns = [
  { name: "Clean Water Initiative", charity: "Kenya Trust", raised: "$45.2K", goal: "$50K", pct: "90%" },
  { name: "School Building", charity: "Hope Foundation", raised: "$38.1K", goal: "$40K", pct: "95%" },
  { name: "Mobile Health Clinics", charity: "Rural Health", raised: "$22.8K", goal: "$30K", pct: "76%" },
  { name: "Youth Education", charity: "EduForAll", raised: "$18.5K", goal: "$25K", pct: "74%" },
];

const funnelStages = [
  { label: "Wallet Connected", value: "4,280", bar: "w-full", color: "bg-accent-primary" },
  { label: "First Donation", value: "1,847", bar: "w-[60%]", color: "bg-accent-primary" },
  { label: "Repeat Donor", value: "642", bar: "w-[35%]", color: "bg-[#22C55E]" },
  { label: "Staker", value: "284", bar: "w-[18%]", color: "bg-[#F59E0B]" },
];

const burnBars = [
  { month: "Nov", height: 35 },
  { month: "Dec", height: 43 },
  { month: "Jan", height: 60 },
  { month: "Feb", height: 54 },
  { month: "Mar", height: 80 },
  { month: "Apr", height: 62 },
];

export default function PlatformMetricsPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-8 lg:py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Platform Metrics</h1>
          <p className="text-sm text-fg-secondary">Admin-level analytics and platform performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-line-subtle rounded-lg bg-white px-3 py-2 text-sm text-fg-secondary">
            Last 30 Days
            <ChevronDown className="h-4 w-4" />
          </button>
          <ComingSoonOverlay action="Export Report">
            <button className="flex items-center gap-2 bg-accent-primary rounded-lg px-4 py-2">
              <Download className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">Export</span>
            </button>
          </ComingSoonOverlay>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.iconColor}`} />
            </div>
            <span className="text-xl sm:text-2xl lg:text-[28px] font-bold text-fg-primary">{s.value}</span>
            <span className={`text-xs ${s.subColor || "text-fg-muted"}`}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Donation Volume Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-fg-primary">Donation Volume</span>
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-medium text-white bg-accent-primary rounded px-2 py-0.5">BNB</span>
            <span className="text-[11px] font-medium text-fg-muted bg-surface-primary rounded px-2 py-0.5">USDT</span>
            <span className="text-[11px] font-medium text-fg-muted bg-surface-primary rounded px-2 py-0.5">BUSD</span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-[220px] px-5">
          {donationBars.map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
              <div className="w-full rounded-t bg-accent-primary" style={{ height: `${bar.height}%` }} />
              <span className="text-[11px] font-medium text-fg-muted">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Performance + Registration Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
          <span className="text-base font-semibold text-fg-primary">Campaign Performance</span>
          <div className="grid grid-cols-2 gap-6">
            {campaignPerf.map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${c.dot}`} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-fg-primary">{c.value}</span>
                  <span className="text-xs text-fg-muted">{c.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-fg-primary">Registration Trends</span>
            <span className="text-xs text-fg-muted">Last 6 months</span>
          </div>
          <div className="flex items-end gap-3 h-[180px] px-2">
            {regBars.map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
                <div className="w-full rounded-t bg-[#22C55E]" style={{ height: `${bar.height}%` }} />
                <span className="text-[11px] font-medium text-fg-muted">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Revenue Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-fg-primary">Fee Revenue Breakdown</span>
          <span className="text-sm font-semibold text-accent-primary">Total: $12,450</span>
        </div>
        {feeRows.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-[13px] text-fg-secondary">{row.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold text-fg-primary">{row.value}</span>
                <span className="text-xs text-fg-muted">{row.pct}</span>
              </div>
            </div>
            {i < feeRows.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}
        {/* Progress bar */}
        <div className="flex h-3 rounded-md overflow-hidden">
          <div className="bg-accent-primary" style={{ width: "42%" }} />
          <div className="bg-[#22C55E]" style={{ width: "32%" }} />
          <div className="bg-[#F59E0B]" style={{ width: "26%" }} />
        </div>
        {/* Token Revenue */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold text-fg-secondary">Revenue by Token</span>
          {tokenRevenue.map((t, i) => (
            <div key={t.token}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-fg-secondary">{t.token}</span>
                <span className="text-[13px] font-semibold text-fg-primary">{t.value}</span>
              </div>
              {i < tokenRevenue.length - 1 && <div className="h-px bg-line-subtle mt-3" />}
            </div>
          ))}
        </div>
      </div>

      {/* Flagged Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <TriangleAlert className="h-5 w-5 text-[#F59E0B]" />
          <span className="text-base font-semibold text-fg-primary">Flagged Activity</span>
        </div>
        {flaggedActivity.map((a, i) => (
          <div key={a.label}>
            <div className="flex items-center justify-between py-3">
              <span className="text-[13px] text-fg-secondary">{a.label}</span>
              <span className="text-xs text-fg-muted">{a.time}</span>
            </div>
            {i < flaggedActivity.length - 1 && <div className="h-px bg-line-subtle" />}
          </div>
        ))}
      </div>

      {/* Governance Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <Vote className="h-5 w-5 text-accent-primary" />
          <span className="text-base font-semibold text-fg-primary">Governance Overview</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {govStats.map((g) => (
            <div key={g.label} className="bg-surface-primary rounded-xl p-4 flex flex-col gap-2">
              <span className="text-xs text-fg-muted">{g.label}</span>
              <span className="text-xl font-bold text-fg-primary">{g.value}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-fg-muted">Based on 24 governance proposals</span>
      </div>

      {/* Top Campaigns */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <Trophy className="h-5 w-5 text-[#F59E0B]" />
          <span className="text-base font-semibold text-fg-primary">Top Campaigns by Amount Raised</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-center py-3 text-[11px] font-semibold text-fg-muted">
              <span className="flex-1">Campaign</span>
              <span className="w-[120px]">Charity</span>
              <span className="w-[100px] text-right">Raised</span>
              <span className="w-[100px] text-right">Goal</span>
              <span className="w-[80px] text-right">Progress</span>
            </div>
            <div className="h-px bg-line-subtle" />
            {topCampaigns.map((c, i) => (
              <div key={c.name}>
                <div className="flex items-center py-3">
                  <span className="flex-1 text-[13px] font-medium text-fg-primary">{c.name}</span>
                  <span className="w-[120px] text-xs text-fg-secondary">{c.charity}</span>
                  <span className="w-[100px] text-right text-[13px] font-semibold text-fg-primary">{c.raised}</span>
                  <span className="w-[100px] text-right text-xs text-fg-muted">{c.goal}</span>
                  <span className="w-[80px] text-right text-xs font-semibold text-[#22C55E]">{c.pct}</span>
                </div>
                {i < topCampaigns.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donor Acquisition Funnel */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <Funnel className="h-5 w-5 text-accent-primary" />
          <span className="text-base font-semibold text-fg-primary">Donor Acquisition Funnel</span>
        </div>
        <div className="flex flex-col gap-4">
          {funnelStages.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-fg-secondary">{s.label}</span>
                <span className="text-[13px] font-semibold text-fg-primary">{s.value}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-primary">
                <div className={`h-full rounded-full ${s.color} ${s.bar}`} />
              </div>
              {i < funnelStages.length - 1 && (
                <div className="flex justify-center">
                  <span className="text-[11px] text-fg-muted">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SANC Burned Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Flame className="h-5 w-5 text-[#EF4444]" />
            <span className="text-base font-semibold text-fg-primary">SANC Burned Over Time</span>
          </div>
          <span className="text-sm font-semibold text-[#EF4444]">Total: 1.72M SANC</span>
        </div>
        <div className="flex items-end gap-4 h-[220px] px-5">
          {burnBars.map((bar) => (
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
