"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  Coins, Flame, PieChart, TrendingUp, ShieldCheck, Users,
  ArrowDownUp, Wallet, Lock, Zap, Target, Gift,
  BarChart3, Vote, Building2, RefreshCw, ArrowRight,
} from "lucide-react";

const supply = {
  total: "777,777,777,777,777",
  label: "777.7T SANC",
  network: "BNB Smart Chain (BEP-20)",
  decimals: 9,
  contract: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF",
  burnAddress: "0x000000000000000000000000000000000000dEaD",
  auditor: "SourceHat",
};

const distribution = [
  { label: "Liquidity Pool", pct: 40, color: "#0EA5E9", icon: ArrowDownUp, desc: "Locked in PancakeSwap to ensure deep trading liquidity from day one." },
  { label: "Charity Matching Fund", pct: 20, color: "#22C55E", icon: Gift, desc: "Funds charitable donation matching — amplifying every donor's impact." },
  { label: "Team & Development", pct: 15, color: "#8B5CF6", icon: Wallet, desc: "Vested allocation for core team salaries, audits, and ongoing development." },
  { label: "Community Rewards", pct: 10, color: "#F59E0B", icon: Users, desc: "Airdrops, staking rewards, and incentives for active community members." },
  { label: "Marketing & Partnerships", pct: 10, color: "#EC4899", icon: Target, desc: "Exchange listings, influencer campaigns, and strategic charity partnerships." },
  { label: "Reserve", pct: 5, color: "#64748B", icon: Lock, desc: "Emergency reserve for unforeseen opportunities or black-swan events." },
];

const taxBreakdown = [
  { label: "Buy Tax", value: "5%", items: ["1% Liquidity Pool", "1% Marketing", "1% Development", "1% Charity", "1% Burn"] },
  { label: "Sell Tax", value: "5%", items: ["1% Liquidity Pool", "1% Marketing", "1% Development", "1% Charity", "1% Burn"] },
];

const taxItemColors: Record<string, string> = {
  "1% Liquidity Pool": "#0EA5E9",
  "1% Marketing": "#EC4899",
  "1% Development": "#8B5CF6",
  "1% Charity": "#22C55E",
  "1% Burn": "#EF4444",
};

const burnMechanics = [
  { icon: Flame, title: "1% Auto-Burn on Every Trade", desc: "1% of every buy and sell is sent to the dead address (0x...dEaD), permanently removing tokens from circulation with every transaction." },
  { icon: TrendingUp, title: "Platform Fee Buyback & Burn", desc: "40% of BNB/USDT/BUSD platform fees (1.5%) are used to buy back SANC from the open market and burn it — amplifying deflationary pressure." },
  { icon: ShieldCheck, title: "Donation Tax Exemption", desc: "The DonationManager contract is excluded from the 5% buy/sell tax. SANC donations pass through at 0% fee — no tax, no platform fee." },
  { icon: Zap, title: "Auto Liquidity", desc: "1% of every buy/sell transaction is automatically added to the PancakeSwap liquidity pool, deepening the trading floor over time." },
];

const feeAllocation = [
  { label: "Buyback & Burn", pct: 40, color: "#EF4444" },
  { label: "Matching Fund", pct: 30, color: "#22C55E" },
  { label: "Operations", pct: 30, color: "#0EA5E9" },
];

const ecosystemCards = [
  {
    icon: Gift,
    title: "Zero-Fee Donations",
    desc: "Donate with SANC and pay 0% platform fee. The DonationManager contract is excluded from the 5% token tax via excludeFromFee().",
    accent: "#22C55E",
  },
  {
    icon: Vote,
    title: "Governance Voting Power",
    desc: "Stake SANC to vote on milestone fund releases. Tier system: 1M (1x), 10M (2x), 50M (3x) voting weight.",
    accent: "#8B5CF6",
  },
  {
    icon: Building2,
    title: "Charity Registration Stake",
    desc: "Charities stake a USD-equivalent amount of SANC to register. Exact tokens returned on good-standing exit. Oracle-checked at registration.",
    accent: "#0EA5E9",
  },
  {
    icon: RefreshCw,
    title: "Buyback & Burn Loop",
    desc: "40% of platform fees from BNB/USDT/BUSD donations are used to buy SANC on PancakeSwap and burn it — creating constant deflationary pressure as volume grows.",
    accent: "#EF4444",
  },
];

const deflationaryFlows = [
  {
    steps: ["BNB/USDT Donations", "1.5% Platform Fee", "40% Buyback", "SANC Burned \u{1F525}"],
    color: "#EF4444",
  },
  {
    steps: ["SANC Token Trades", "1% Auto-Burn", "Dead Wallet \u{1F525}"],
    color: "#F59E0B",
  },
];

export default function TokenomicsPage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <Coins className="h-3.5 w-3.5" /> Token Economics
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#0F172A] mb-3">SANC Tokenomics</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            A deflationary utility token that powers governance, eliminates donation fees, and funds charitable matching — all on BNB Smart Chain.
          </p>
        </div>

        {/* Supply Overview */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5 reveal">Supply Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {[
                { label: "Total Supply", value: supply.label },
                { label: "Network", value: "BSC (BEP-20)" },
                { label: "Decimals", value: String(supply.decimals) },
                { label: "Buy / Sell Tax", value: "5% / 5%" },
              ].map((s) => (
                <div key={s.label} className="bg-[#F8FAFC] rounded-xl px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">{s.label}</span>
                  <span className="text-sm font-bold text-[#0F172A]">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-[#F8FAFC] rounded-xl px-4 py-3">
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">Contract Address</span>
                <p className="text-xs sm:text-sm font-mono text-[#0EA5E9] mt-0.5 break-all">{supply.contract}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl px-4 py-3">
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">Burn Address</span>
                <p className="text-xs sm:text-sm font-mono text-[#EF4444] mt-0.5 break-all">{supply.burnAddress}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#F0FDF4] text-[#22C55E] px-3 py-1 rounded-full">
                <ShieldCheck className="h-3 w-3" /> Audited by {supply.auditor}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#F0F9FF] text-[#0EA5E9] px-3 py-1 rounded-full">
                <Lock className="h-3 w-3" /> Liquidity Locked
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#FEF2F2] text-[#EF4444] px-3 py-1 rounded-full">
                <Flame className="h-3 w-3" /> Deflationary
              </span>
            </div>
          </div>
        </div>

        {/* Supply Tracker */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2 reveal">
            <BarChart3 className="h-5 w-5 text-[#0EA5E9]" /> Supply Tracker
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 reveal-scale">
              <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">Total Supply</span>
              <p className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">{supply.total}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{supply.label}</p>
            </div>
            <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 reveal-scale">
              <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">Circulating Supply</span>
              <div className="mt-2 space-y-1.5">
                <div className="h-5 w-3/4 rounded bg-[#F1F5F9] animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-[#F1F5F9] animate-pulse" />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-2">Live data coming soon</p>
            </div>
            <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 reveal-scale">
              <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">Total Burned</span>
              <div className="mt-2 space-y-1.5">
                <div className="h-5 w-3/4 rounded bg-[#FEF2F2] animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-[#FEF2F2] animate-pulse" />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-2">Live data coming soon</p>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8] mt-3 text-center">
            Live supply data will be sourced from BSCScan API at launch.
          </p>
        </div>

        {/* Token Distribution */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5 flex items-center gap-2 reveal">
              <PieChart className="h-5 w-5 text-[#0EA5E9]" /> Token Distribution
            </h2>

            {/* Stacked horizontal bar */}
            <div className="flex h-10 sm:h-12 rounded-xl overflow-hidden mb-6">
              {distribution.map((d) => (
                <div
                  key={d.label}
                  className="h-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white transition-all duration-700"
                  style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                >
                  {d.pct}%
                </div>
              ))}
            </div>

            {/* Legend grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {distribution.map((d) => (
                <div key={d.label} className="flex items-start gap-3">
                  <span className="mt-1.5 h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0F172A]">{d.label}</span>
                      <span className="text-xs font-bold text-[#64748B]">{d.pct}%</span>
                    </div>
                    <p className="text-[12px] text-[#64748B] leading-relaxed mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {taxBreakdown.map((t) => (
              <div key={t.label} className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 reveal-scale">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#0F172A]">{t.label}</h3>
                  <span className="text-lg font-bold text-[#0EA5E9]">{t.value}</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {t.items.map((item) => (
                    <li key={item} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-[#475569]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: taxItemColors[item] || "#0EA5E9" }} />
                        {item}
                      </div>
                      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: "20%", backgroundColor: taxItemColors[item] || "#0EA5E9" }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#94A3B8] mt-3 text-center">
            Tax applies to PancakeSwap trades only. Direct wallet-to-wallet transfers are tax-free.
          </p>
        </div>

        {/* Burn & Deflationary Mechanics */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5 flex items-center gap-2 reveal">
              <Flame className="h-5 w-5 text-[#EF4444]" /> Burn & Deflationary Mechanics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {burnMechanics.map((b) => (
                <div key={b.title} className="bg-[#F8FAFC] rounded-xl p-5 flex flex-col gap-2 reveal-scale">
                  <div className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 text-[#0EA5E9]" />
                    <span className="text-sm font-bold text-[#0F172A]">{b.title}</span>
                  </div>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Fee Allocation */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-2 reveal">Platform Fee Allocation</h2>
            <p className="text-[13px] text-[#64748B] mb-5">How the 1.5% fee on BNB/USDT/BUSD donations is distributed.</p>
            <div className="flex gap-1 h-8 rounded-full overflow-hidden mb-4">
              {feeAllocation.map((f) => (
                <div key={f.label} className="h-full flex items-center justify-center text-[10px] font-bold text-white" style={{ width: `${f.pct}%`, backgroundColor: f.color }}>
                  {f.pct}%
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {feeAllocation.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: f.color }} />
                  <span className="text-xs text-[#475569]">{f.label} ({f.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Hold SANC */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-lg font-bold mb-5 reveal">Why Hold SANC?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Gift, title: "0% Donation Fee", desc: "Donate with SANC and pay zero platform fee. 100% reaches the charity." },
                { icon: Users, title: "Governance Power", desc: "Stake SANC to vote on proposals, milestone releases, and platform parameters." },
                { icon: Flame, title: "Deflationary Supply", desc: "Every BNB/USDT donation triggers a SANC buyback & burn. Holding rewards patience." },
              ].map((u) => (
                <div key={u.title} className="bg-white/10 rounded-xl p-5 flex flex-col gap-2 reveal-scale">
                  <u.icon className="h-5 w-5 text-[#38BDF8]" />
                  <span className="text-sm font-bold">{u.title}</span>
                  <p className="text-[13px] text-white/70 leading-relaxed">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SANC in the SancCharity Ecosystem */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2 reveal">
            <Coins className="h-5 w-5 text-[#0EA5E9]" /> SANC in the SancCharity Ecosystem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {ecosystemCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 flex flex-col gap-3 reveal-scale">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.accent + "14" }}>
                  <card.icon className="h-5 w-5" style={{ color: card.accent }} />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">{card.title}</h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deflationary Pressure Model */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2 reveal">
            <TrendingUp className="h-5 w-5 text-[#EF4444]" /> Deflationary Pressure Model
          </h2>
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 reveal-scale">
            <div className="flex flex-col gap-4 sm:gap-6">
              {deflationaryFlows.map((flow, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {flow.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 sm:gap-3">
                      <span
                        className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white whitespace-nowrap"
                        style={{ backgroundColor: flow.color }}
                      >
                        {step}
                      </span>
                      {sIdx < flow.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-[#94A3B8] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#94A3B8] mt-5 text-center">
              Both paths permanently remove SANC from circulation, creating compounding deflationary pressure as adoption grows.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
