"use client";

import {
  Coins, Flame, TrendingUp, Users, Globe, Lock, AlertTriangle,
  ArrowRight, ChevronRight,
} from "lucide-react";
import {
  mockTokenEconomics,
  mockNFTMintStats,
  mockOrgTypeStats,
  mockStakeValueTracker,
} from "@/services/mockData/tokenEconomics";

const TOKEN_COLORS: Record<string, string> = {
  BNB: "#F59E0B",
  SANC: "#8B5CF6",
  USDT: "#22C55E",
};

export default function TokenEconomicsPage() {
  const te = mockTokenEconomics;

  const headerStats = [
    { label: "SANC % of Donations", value: `${te.donationSplit.find((d) => d.symbol === "SANC")?.percentage ?? 23}%`, sub: "of total donation volume", icon: Coins, accent: "#8B5CF6", bg: "bg-[#F5F3FF]" },
    { label: "Total SANC Burned", value: `${(te.sancBurnedLifetime / 1_000_000).toFixed(1)}M`, sub: "SANC removed from supply", icon: Flame, accent: "#EF4444", bg: "bg-[#FEF2F2]" },
    { label: "Fee Discount Uptake", value: `${te.feeDiscountUptakePercent}%`, sub: "of donors used SANC for fees", icon: TrendingUp, accent: "#22C55E", bg: "bg-[#DCFCE7]" },
    { label: "Unique Stakers", value: te.stakingConcentration.uniqueStakers.toLocaleString(), sub: "active registration stakes", icon: Users, accent: "#0EA5E9", bg: "bg-[#E0F2FE]" },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 p-4 sm:p-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold text-fg-primary">Token Economics</h1>
        <p className="text-sm text-fg-secondary">SANC utility, donation split, staking concentration, and burn pipeline</p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {headerStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`flex flex-col gap-2 p-5 ${s.bg} rounded-2xl border border-black/[0.04]`}>
              <div className="h-9 w-9 rounded-full flex items-center justify-center bg-white/60">
                <Icon className="h-[18px] w-[18px]" style={{ color: s.accent }} />
              </div>
              <span className="text-[12px] font-medium text-fg-muted">{s.label}</span>
              <span className="text-[26px] font-bold text-fg-primary">{s.value}</span>
              <span className="text-[11px] text-fg-muted">{s.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Donation Token Split */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <span className="text-base font-semibold text-fg-primary">Donation Token Split</span>

        {/* Visual bar */}
        <div className="flex h-5 rounded-full overflow-hidden">
          {te.donationSplit.map((d) => (
            <div
              key={d.symbol}
              style={{ width: `${d.percentage}%`, backgroundColor: TOKEN_COLORS[d.symbol] ?? "#94A3B8" }}
              title={`${d.symbol}: ${d.percentage}%`}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {te.donationSplit.map((d) => (
            <div key={d.symbol} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TOKEN_COLORS[d.symbol] ?? "#94A3B8" }} />
              <span className="text-[12px] text-fg-secondary">{d.symbol} {d.percentage}%</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="flex items-center py-2.5 px-3 bg-surface-sage rounded-lg text-[11px] font-semibold text-fg-muted uppercase mb-1">
              <span className="flex-1">Token</span>
              <span className="w-[120px] text-right">Volume (USD)</span>
              <span className="w-[90px] text-right">% of Total</span>
              <span className="w-[100px] text-right">Donor Count</span>
            </div>
            {te.donationSplit.map((d, i) => (
              <div key={d.symbol}>
                <div className="flex items-center px-3 py-3">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TOKEN_COLORS[d.symbol] ?? "#94A3B8" }} />
                    <span className="text-[13px] font-medium text-fg-primary">{d.token}</span>
                  </div>
                  <span className="w-[120px] text-right text-[13px] font-semibold text-fg-primary">${(d.amountUSD / 1000).toFixed(0)}K</span>
                  <span className="w-[90px] text-right text-[13px] text-fg-secondary">{d.percentage}%</span>
                  <span className="w-[100px] text-right text-[13px] text-fg-secondary">{d.donorCount.toLocaleString()}</span>
                </div>
                {i < te.donationSplit.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Discount Adoption */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
        <span className="text-base font-semibold text-fg-primary">Fee Discount Adoption</span>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2 p-4 bg-[#F5F3FF] rounded-xl">
            <span className="text-[12px] text-fg-muted">Donors choosing SANC to save on fees</span>
            <span className="text-[32px] font-bold text-[#8B5CF6]">{te.feeDiscountUptakePercent}%</span>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: `${te.feeDiscountUptakePercent}%` }} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2 p-4 bg-[#DCFCE7] rounded-xl">
            <span className="text-[12px] text-fg-muted">Total fees saved by using SANC</span>
            <span className="text-[32px] font-bold text-[#16A34A]">${te.totalFeeSavedUSD.toLocaleString()}</span>
            <span className="text-[11px] text-[#16A34A]">compared to BNB/USDT fee rate</span>
          </div>
        </div>
      </div>

      {/* SANC Staking Concentration */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-fg-primary">SANC Staking Concentration</span>
          {te.stakingConcentration.topTenPercent > 50 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] rounded-lg">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706]" />
              <span className="text-[11px] font-semibold text-[#92400E]">Centralisation risk</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Unique Stakers", value: te.stakingConcentration.uniqueStakers.toLocaleString(), sub: "charities staking", color: "#0EA5E9" },
            { label: "Top 10% Hold", value: `${te.stakingConcentration.topTenPercent}%`, sub: "of total staked SANC", color: te.stakingConcentration.topTenPercent > 50 ? "#EF4444" : "#22C55E" },
            { label: "Avg Stake Value", value: `$${te.stakingConcentration.avgStakeUSD.toLocaleString()}`, sub: "per charity", color: "#8B5CF6" },
            { label: "Gini Coefficient", value: te.stakingConcentration.giniCoefficient.toFixed(2), sub: "0 = equal, 1 = concentrated", color: te.stakingConcentration.giniCoefficient > 0.6 ? "#F59E0B" : "#22C55E" },
          ].map((c) => (
            <div key={c.label} className="flex flex-col gap-2 p-4 bg-surface-primary rounded-xl border border-line-subtle">
              <span className="text-[12px] text-fg-muted">{c.label}</span>
              <span className="text-[22px] font-bold" style={{ color: c.color }}>{c.value}</span>
              <span className="text-[11px] text-fg-muted">{c.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Stake Value Tracker */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <span className="text-base font-semibold text-fg-primary">Registration Stake Value Tracker</span>
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="flex items-center py-2.5 px-3 bg-surface-sage rounded-lg text-[11px] font-semibold text-fg-muted uppercase mb-1">
              <span className="flex-1">Charity</span>
              <span className="w-[110px] text-right">SANC Staked</span>
              <span className="w-[100px] text-right">USD Value</span>
              <span className="w-[90px] text-right">30d Change</span>
              <span className="w-[120px] text-right">Tier</span>
            </div>
            {mockStakeValueTracker.map((row, i) => (
              <div key={row.name}>
                <div className="flex items-center px-3 py-3">
                  <span className="flex-1 text-[13px] font-medium text-fg-primary">{row.name}</span>
                  <span className="w-[110px] text-right text-[12px] text-fg-secondary font-mono">{row.sancStaked}</span>
                  <span className="w-[100px] text-right text-[13px] font-semibold text-fg-primary">${row.currentUSD.toLocaleString()}</span>
                  <span className={`w-[90px] text-right text-[12px] font-semibold ${row.change30d >= 0 ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                    {row.change30d >= 0 ? "+" : ""}{row.change30d}%
                  </span>
                  <span className={`w-[120px] text-right text-[11px] font-medium ${row.tier.includes("⚠") ? "text-[#DC2626]" : "text-fg-secondary"}`}>{row.tier}</span>
                </div>
                {i < mockStakeValueTracker.length - 1 && <div className="h-px bg-line-subtle" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SANC Velocity Pipeline */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <span className="text-base font-semibold text-fg-primary">SANC Velocity Pipeline</span>
        <p className="text-[12px] text-fg-muted">How SANC flows through the platform ecosystem</p>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1">
          {[
            { label: "Registration Stake", sub: "$23.5K locked", color: "bg-[#E0F2FE]", text: "text-[#0EA5E9]" },
            { label: "Governance Power", sub: "1,847 stakers", color: "bg-[#F5F3FF]", text: "text-[#8B5CF6]" },
            { label: "Fee Collection", sub: "$8.2K saved", color: "bg-[#DCFCE7]", text: "text-[#16A34A]" },
            { label: "Buyback Swap", sub: "via DEX", color: "bg-[#FEF3C7]", text: "text-[#D97706]" },
            { label: "SANC Burned", sub: "4.2M burned", color: "bg-[#FEF2F2]", text: "text-[#DC2626]" },
          ].map((stage, i, arr) => (
            <div key={stage.label} className="flex sm:flex-col items-center gap-1 sm:gap-0 flex-1">
              <div className={`w-full flex flex-col items-center gap-1 px-3 py-3 ${stage.color} rounded-xl`}>
                <span className={`text-[12px] font-semibold text-center ${stage.text}`}>{stage.label}</span>
                <span className="text-[11px] text-fg-muted">{stage.sub}</span>
              </div>
              {i < arr.length - 1 && (
                <div className="sm:hidden flex items-center justify-center">
                  <ChevronRight className="h-4 w-4 text-fg-muted" />
                </div>
              )}
              {i < arr.length - 1 && (
                <div className="hidden sm:flex justify-center py-1">
                  <ArrowRight className="h-4 w-4 text-fg-muted" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stake History Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-fg-primary">Stake Value History (USD)</span>
          <span className="text-xs text-fg-muted">Last 6 months</span>
        </div>
        <div className="flex items-end gap-3 h-[180px]">
          {te.stakeHistory.map((d) => {
            const max = Math.max(...te.stakeHistory.map((x) => x.valueUSD));
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
                <span className="text-[10px] text-fg-muted">${(d.valueUSD / 1000).toFixed(1)}K</span>
                <div className="w-full rounded-t bg-[#8B5CF6]" style={{ height: `${(d.valueUSD / max) * 150}px` }} />
                <span className="text-[11px] text-fg-muted">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* NFT Receipt Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <span className="text-base font-semibold text-fg-primary">NFT Receipt Distribution</span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Minted", value: mockNFTMintStats.totalMinted.toLocaleString(), emoji: "🏅", sub: "donation receipts" },
            { label: "Bronze", value: mockNFTMintStats.bronze.toLocaleString(), emoji: "🥉", sub: "< 100 USDT" },
            { label: "Silver", value: mockNFTMintStats.silver.toLocaleString(), emoji: "🥈", sub: "100–999 USDT" },
            { label: "Gold", value: mockNFTMintStats.gold.toLocaleString(), emoji: "🥇", sub: "≥ 1000 USDT" },
          ].map((tier) => (
            <div key={tier.label} className="flex flex-col gap-2 p-4 bg-surface-primary rounded-xl border border-line-subtle">
              <span className="text-xl">{tier.emoji}</span>
              <span className="text-[12px] text-fg-muted">{tier.label}</span>
              <span className="text-[22px] font-bold text-fg-primary">{tier.value}</span>
              <span className="text-[11px] text-fg-muted">{tier.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Org-Type Impact Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
        <span className="text-base font-semibold text-fg-primary">Donation Volume by Organization Type</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockOrgTypeStats.map((org) => (
            <div key={org.orgType} className="flex flex-col gap-3 p-4 bg-surface-primary rounded-xl border border-line-subtle">
              <span className="text-[13px] font-semibold text-fg-primary">{org.label}</span>
              <span className="text-[24px] font-bold text-accent-primary">${(org.totalRaisedUSD / 1_000_000).toFixed(2)}M</span>
              <div className="flex justify-between text-[11px] text-fg-muted">
                <span>{org.charityCount} orgs</span>
                <span className="text-[#22C55E] font-medium">{org.milestoneApprovalRate}% MS rate</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
