"use client";

import { useState } from "react";
import Link from "next/link";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useCharity } from "@/hooks/useCharity";
import type { CampaignFilters } from "@/hooks/useCharity";
import { CampaignCategory, CharityStatus } from "@/types/charity";
import { CampaignCardSkeleton, StatCardSkeleton } from "@/components/ui/Skeleton";
import {
  Wallet, Search, Target, Flame, DollarSign, Users, Shield,
  Award, FileText, ExternalLink, Lock, Undo, BadgeCheck,
  Coins, UserCheck,
  CircleCheck, Hexagon, TriangleAlert,
} from "lucide-react";

const categories = ["All", "Education", "Health", "Environment", "Disaster Relief", "Animal Welfare", "Community", "Technology", "Arts & Culture"];

const impactCategories = [
  { label: "Education", value: "$420K" },
  { label: "Health", value: "$380K" },
  { label: "Environment", value: "$310K" },
  { label: "Disaster", value: "$280K" },
  { label: "Animals", value: "$190K" },
  { label: "Community", value: "$340K" },
  { label: "Technology", value: "$260K" },
  { label: "Arts", value: "$220K" },
];

const topDonors = [
  { rank: 1, addr: "0x7a3B...4f2E", total: "$48,200", count: 142 },
  { rank: 2, addr: "0xB4c1...3fA7", total: "$31,400", count: 89 },
  { rank: 3, addr: "0x2eD8...71cF", total: "$24,100", count: 67 },
];

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filters, setFilters] = useState<CampaignFilters>({ page: 1, pageSize: 9 });
  const { campaigns, platformStats, recentDonations, isLoading, isError } = useCharity(filters);
  const now = Math.floor(Date.now() / 1000);


  return (
    <div className="min-h-screen">
      {/* ===== 01 HERO ===== */}
      <section className="bg-white border-b border-line-subtle px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 bg-accent-light text-accent-primary rounded-full px-4 py-1.5 text-xs font-mono">
          <Hexagon className="h-3 w-3" />Transparent Charity on BSC
        </span>

        {/* Headline — no forced break on mobile, natural wrap */}
        <h1 className="text-[32px] sm:text-5xl lg:text-[64px] font-bold text-fg-primary text-center leading-[1.1] max-w-[800px]">
          Where Every Donation<span className="hidden sm:inline"><br /></span>{" "}Finds Its Purpose
        </h1>

        {/* Subtext */}
        <p className="text-[15px] lg:text-[18px] text-fg-secondary text-center max-w-[520px] leading-relaxed -mt-1">
          Milestone-based escrow. Community governance. NFT receipts. Full on-chain accountability.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <ComingSoonOverlay action="Connect wallet">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-primary text-white text-[15px] font-semibold rounded-full px-8 py-3.5 hover:bg-accent-primary/90 transition-colors shadow-[0_4px_24px_rgba(14,165,233,0.35)]">
              <Wallet className="h-4 w-4" />Start Donating
            </button>
          </ComingSoonOverlay>
          <Link href="#campaigns" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface-primary text-fg-primary text-[15px] rounded-full px-8 py-3.5 border border-line-subtle hover:bg-white transition-colors">
            <Search className="h-4 w-4" />Browse Campaigns
          </Link>
        </div>

        {/* Cards — stack on mobile (no transforms), arc on desktop */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full max-w-[860px] mt-1">
          {/* Card 1 — Donation receipt */}
          <div className="w-full sm:flex-1 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-black/[0.04] sm:[transform:rotate(-1.5deg)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                <CircleCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              </div>
              <span className="text-[12px] font-semibold text-fg-primary">Donation Confirmed</span>
            </div>
            <p className="text-[11px] text-fg-muted mb-2">School Building · Kenya</p>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-fg-primary">2.5</span>
              <span className="text-sm text-fg-muted">BNB</span>
            </div>
            <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-accent-primary rounded-full" />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-fg-muted">60% of goal</span>
              <span className="text-[10px] text-accent-primary font-mono">NFT #1247</span>
            </div>
          </div>

          {/* Card 2 — Platform stats (elevated on desktop only) */}
          <div className="w-full sm:flex-1 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_16px_60px_rgba(0,0,0,0.12)] border border-black/[0.04] sm:[transform:translateY(-16px)]">
            <p className="text-[10px] font-mono text-fg-muted uppercase tracking-wider mb-4">Platform Impact</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Total Donated",    value: isLoading ? "—" : (platformStats?.totalDonated       ?? "$2.4M+") },
                { label: "Unique Donors",    value: isLoading ? "—" : (platformStats?.totalDonors        ?? "12,847") },
                { label: "Campaigns Funded", value: isLoading ? "—" : (platformStats?.campaignsCompleted ?? "86")    },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-fg-muted">{s.label}</span>
                  <span className="text-[14px] font-bold text-fg-primary">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 — Governance vote */}
          <div className="w-full sm:flex-1 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-black/[0.04] sm:[transform:rotate(1.5deg)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                <Shield className="h-3.5 w-3.5 text-accent-primary" />
              </div>
              <span className="text-[12px] font-semibold text-fg-primary">Milestone Vote</span>
            </div>
            <p className="text-[11px] text-fg-muted mb-3">Clean Water Initiative · M2</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-fg-muted">Approval</span>
              <span className="text-[14px] font-bold text-accent-primary">72%</span>
            </div>
            <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-accent-primary rounded-full" />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-fg-muted">156 votes cast</span>
              <span className="text-[10px] text-fg-muted font-mono">8d 14h left</span>
            </div>
          </div>
        </div>

        {/* Trust row */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
          {["BNB", "SANC", "USDT", "BUSD"].map((t) => (
            <span key={t} className="text-[11px] sm:text-[12px] text-fg-muted font-mono">{t}</span>
          ))}
          <span className="text-fg-muted text-[11px]">·</span>
          <span className="text-[11px] sm:text-[12px] text-fg-muted">Audited by CertiK</span>
          <span className="text-fg-muted text-[11px]">·</span>
          <span className="text-[11px] sm:text-[12px] text-fg-muted">BSC Mainnet</span>
        </div>
      </section>

      {/* ===== 02 HOW IT WORKS ===== */}
      <section id="how" className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8 lg:gap-12">
        <span className="bg-white rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">How It Works</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Three Steps to Transparent Giving</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
          {[
            { icon: Wallet, num: "01", title: "Connect Your Wallet", desc: "Link your BSC wallet. We support BNB, SANC, USDT, and BUSD for maximum flexibility." },
            { icon: Search, num: "02", title: "Choose a Cause", desc: "Browse campaigns across 8 categories. Every charity stakes 10M SANC and passes KYC verification before listing." },
            { icon: Shield, num: "03", title: "Track Your Impact", desc: "Get an NFT receipt. Vote on milestone releases. Watch your donation create real, verified change on-chain." },
          ].map((step) => (
            <div key={step.num} className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
              <div className="h-12 w-12 rounded-full bg-accent-primary flex items-center justify-center">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-[40px] font-bold text-accent-primary">{step.num}</span>
              <span className="text-[20px] font-semibold text-fg-primary">{step.title}</span>
              <p className="text-[15px] text-fg-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 03 FEATURED CAMPAIGNS ===== */}
      <section id="campaigns" className="bg-surface-primary px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <span className="bg-white rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Featured Campaigns</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Verified Causes Making Real Impact</h2>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-fg-muted" />
            <span className="text-[13px] text-fg-muted">Search campaigns...</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setFilters(f => ({
                    ...f,
                    category: cat === "All" ? undefined : cat as CampaignCategory,
                  }));
                }}
                className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                  activeCategory === cat ? "bg-accent-primary text-white" : "bg-white text-fg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {isLoading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <CampaignCardSkeleton />
            </div>
          ))}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 w-full">
              <div className="h-12 w-12 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <TriangleAlert className="h-6 w-6 text-[#DC2626]" />
              </div>
              <p className="text-lg font-semibold text-fg-primary">Something went wrong</p>
              <p className="text-sm text-fg-muted">Failed to load campaigns. Please try again.</p>
            </div>
          )}
          {!isLoading && !isError && campaigns.map((c) => {
            const pct = Math.min(100, Math.max(0, (parseFloat(c.totalRaised) / parseFloat(c.totalGoal)) * 100));
            const daysLeft = Math.max(0, Math.ceil((c.deadline - now) / 86400));
            const raised = "$" + (c.totalRaisedUSD / 1000).toFixed(0) + "K";
            const goal = "$" + (c.totalGoalUSD / 1000).toFixed(0) + "K";
            return (
              <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                <div className="h-[200px] overflow-hidden">
                  <img src={c.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-surface-primary text-fg-secondary text-[11px] font-mono rounded-full px-3 py-1">{c.category}</span>
                    {c.charity.status === CharityStatus.Verified && (
                      <span className="flex items-center gap-1 text-accent-primary text-[11px] font-mono">
                        <CircleCheck className="h-3 w-3" />Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-fg-primary">{c.name}</h3>
                  <span className="text-[13px] text-fg-muted">{c.charity.name}</span>
                  {/* Progress */}
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2 bg-surface-primary rounded-full overflow-hidden">
                      <div className="h-full bg-accent-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-fg-primary">{raised} raised</span>
                      <span className="text-[11px] text-fg-muted font-mono">{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-fg-muted font-mono">
                    <span>Goal: {goal}</span>
                    <span>{c.donorCount} donors</span>
                    <span>{daysLeft}d left</span>
                  </div>
                  <Link href={`/charity/campaign/${c.id}`} className="flex items-center justify-center bg-accent-primary text-white text-sm font-semibold rounded-full py-3 mt-1">
                    Donate Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {["All Campaigns", "Active", "Completed", "Featured"].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-xs ${i === 0 ? "bg-accent-primary text-white font-semibold" : "bg-white text-fg-secondary border border-[#E2E8F0]"}`}>
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ===== 04 DONATION FLOW ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <span className="bg-white rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Donation Experience</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Donate in Any Token. Pay Less with SANC.</h2>
        <p className="text-base text-fg-secondary text-center max-w-2xl">Multi-token support with transparent fee breakdown. SANC holders get 50% off platform fees.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {/* Token Selector Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <span className="text-[11px] text-fg-muted font-mono">Select Token</span>
            <div className="flex gap-3">
              {["BNB", "SANC", "USDT", "BUSD"].map((t, i) => (
                <button key={t} className={`px-5 py-2 rounded-full text-sm ${i === 1 ? "bg-accent-primary text-white font-semibold" : "bg-surface-primary text-fg-secondary"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between bg-surface-primary rounded-xl h-14 px-4">
              <span className="text-2xl font-bold text-fg-primary">2,500,000</span>
              <span className="text-sm text-fg-muted">SANC</span>
            </div>
            <div className="flex gap-2">
              {["100K", "500K", "1M", "5M", "Max"].map((q) => (
                <button key={q} className="flex-1 bg-surface-primary text-fg-secondary text-xs rounded-full py-1.5">{q}</button>
              ))}
            </div>
            <ComingSoonOverlay action="Confirm donation">
              <button className="w-full bg-accent-primary text-white text-[15px] font-semibold rounded-full py-3.5">Confirm Donation</button>
            </ComingSoonOverlay>
            <div className="flex items-center justify-center gap-1.5">
              <Hexagon className="h-3.5 w-3.5 text-accent-primary" />
              <span className="text-[11px] text-fg-muted">You&apos;ll receive an ERC-721 NFT receipt</span>
            </div>
          </div>

          {/* Fee Breakdown Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <span className="text-lg font-semibold text-fg-primary">Fee Breakdown</span>
            <div className="flex flex-col gap-3">
              {[
                { label: "Platform Fee", val: "2%", note: "Standard rate" },
                { label: "With SANC Discount", val: "1%", note: "50% discount", highlight: true },
                { label: "Gas Estimate", val: "~0.002 BNB", note: "Network fee" },
              ].map((f) => (
                <div key={f.label} className={`flex items-center justify-between p-3.5 rounded-xl ${f.highlight ? "bg-[#DCFCE7]" : "bg-surface-primary"}`}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-fg-primary">{f.label}</span>
                    <span className="text-[11px] text-fg-muted">{f.note}</span>
                  </div>
                  <span className={`text-sm font-bold ${f.highlight ? "text-[#16A34A]" : "text-fg-primary"}`}>{f.val}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#FEF3C7] rounded-xl p-3.5 flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#D97706]" />
              <span className="text-xs text-[#92400E]">50% of fees are burned, reducing SANC supply</span>
            </div>
          </div>

          {/* NFT Receipt Preview */}
          <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-lg font-semibold text-white">Your NFT Receipt</span>
            <div className="flex-1 bg-gradient-to-b from-accent-primary/20 to-transparent rounded-xl flex flex-col items-center justify-center gap-4 py-8">
              <Award className="h-16 w-16 text-[#FFD700]" />
              <span className="text-white font-semibold">Donation #1,248</span>
              <span className="text-white/60 text-xs font-mono">ERC-721 · BEP-721</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Amount</span>
                <span className="text-xs text-white font-semibold">2,500,000 SANC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Campaign</span>
                <span className="text-xs text-white font-semibold">School Building</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-white/50">Date</span>
                <span className="text-xs text-white font-semibold">Apr 12, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Donation Warning */}
        <div className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-5 py-3 max-w-7xl mx-auto w-full">
          <Shield className="h-4 w-4 text-accent-primary flex-shrink-0" />
          <span className="text-xs text-fg-secondary">Large donations (&gt;100 BNB) trigger multi-sig approval for added security. All transactions are publicly verifiable on BSCScan.</span>
        </div>
      </section>

      {/* ===== 05 IMPACT DASHBOARD ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8 lg:gap-12">
        <span className="bg-surface-primary rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Platform Impact</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Transparency in Numbers</h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
          {isLoading ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) :
          [
            { icon: DollarSign, value: platformStats?.totalDonated ?? "$2.4M+", label: "Total Donated (USD)" },
            { icon: Users, value: platformStats?.totalDonors ?? "12,847", label: "Unique Donors" },
            { icon: Target, value: platformStats?.campaignsCompleted ?? "86", label: "Campaigns Funded" },
            { icon: Flame, value: platformStats?.sancBurned ?? "1.2B", label: "SANC Burned" },
          ].map((s) => (
            <div key={s.label} className="bg-surface-primary rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3">
              <s.icon className="h-7 w-7 text-fg-muted" />
              <span className="text-2xl sm:text-3xl lg:text-[44px] font-bold text-fg-primary">{s.value}</span>
              <span className="text-xs text-fg-muted">{s.label}</span>
            </div>
          ))}
        </div>


        {/* Category Row */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 max-w-7xl mx-auto w-full">
          {impactCategories.map((cat) => (
            <div key={cat.label} className="flex flex-col items-center gap-1 bg-surface-primary rounded-xl p-3 sm:p-4">
              <span className="text-[13px] font-semibold text-fg-primary">{cat.value}</span>
              <span className="text-[10px] text-fg-muted">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Top Donors */}
        <div className="max-w-7xl mx-auto w-full bg-surface-primary rounded-2xl p-6 flex flex-col gap-4">
          <span className="text-lg font-bold text-fg-primary">Top Donors</span>
          {topDonors.map((d) => (
            <div key={d.rank} className={`flex items-center justify-between ${d.rank % 2 === 0 ? "bg-[#F0F9FF]" : "bg-white"} rounded-xl px-5 py-3`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent-primary">#{d.rank}</span>
                <span className="text-sm font-mono text-fg-primary">{d.addr}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-fg-primary">{d.total}</span>
                <span className="text-xs text-fg-muted">{d.count} donations</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 06 GOVERNANCE & VOTING ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <span className="bg-white rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Governance &amp; Voting</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Community-Powered<br />Fund Releases</h2>
        <p className="text-base text-fg-secondary text-center max-w-2xl">Stake SANC tokens to gain voting power. Approve or reject milestone fund releases. 66% quorum required. 14-day voting windows.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto w-full">
          {/* Voter Tiers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <span className="text-[22px] font-bold text-fg-primary">Voter Tiers</span>
            <p className="text-sm text-fg-secondary">Stake more SANC to increase your voting power and unlock governance features.</p>
            <div className="flex flex-col gap-3">
              {[
                { tier: "Community", stake: "1M SANC", power: "1x", color: "bg-[#E0F2FE]" },
                { tier: "Guardian", stake: "10M SANC", power: "2x", color: "bg-[#E0F2FE]" },
              ].map((t) => (
                <div key={t.tier} className={`flex items-center justify-between ${t.color} rounded-xl px-5 py-4`}>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-fg-primary">{t.tier}</span>
                    <span className="text-xs text-fg-muted font-mono">{t.stake}</span>
                  </div>
                  <span className="text-[28px] font-bold text-accent-primary">{t.power}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Voting Works */}
          <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[20px] font-bold text-white">How Voting Works</span>
            <div className="bg-white/10 rounded-xl p-5 flex flex-col gap-3">
              <span className="text-[13px] text-fg-secondary">Clean Water Initiative — Milestone #2: Equipment Purchase</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Approval", val: "72%" },
                  { label: "Votes", val: "156" },
                  { label: "Quorum", val: "66%" },
                  { label: "Time Left", val: "8d 14h" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-white text-lg font-bold">{s.val}</span>
                    <span className="text-white/50 text-[10px] font-mono">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-accent-primary rounded-full" />
              </div>
              <div className="flex gap-3 mt-2">
                <button className="flex-1 bg-accent-primary text-white text-sm font-semibold rounded-full py-2.5">Approve</button>
                <button className="flex-1 bg-red-500/50 text-white text-sm font-semibold rounded-full py-2.5">Reject</button>
                <button className="flex-1 bg-white/10 text-white/80 text-sm font-semibold rounded-full py-2.5">Abstain</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 07 NFT & TRANSPARENCY ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <span className="bg-surface-primary rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">NFT Receipts &amp; Security</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center leading-[1.15]">Immutable Proof.<br />Audited Security.</h2>

        <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto w-full">
          {/* NFT Card Tile */}
          <div className="w-full lg:w-[400px] bg-surface-primary rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col">
            {/* NFT Art Image */}
            <div className="h-[200px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80" alt="NFT Art" className="w-full h-full object-cover" />
            </div>
            {/* NFT Body */}
            <div className="p-6 flex flex-col gap-3.5">
              <span className="self-start bg-[#E0F2FE] rounded-full px-3 py-1 text-[11px] font-semibold text-accent-primary font-mono">Donation Receipt #1247</span>
              <span className="text-[17px] font-semibold text-fg-primary">School Building in Rural Kenya</span>
              {/* Receipt Grid */}
              <div className="flex flex-col gap-2">
                {[
                  { label: "Amount", value: "2.5 BNB", color: "text-fg-primary font-semibold" },
                  { label: "Token", value: "BNB (Native)", color: "text-fg-primary font-semibold" },
                  { label: "Date", value: "Mar 28, 2026", color: "text-fg-primary font-semibold" },
                  { label: "Fee Paid", value: "2% (0.05 BNB)", color: "text-fg-secondary" },
                  { label: "Token ID", value: "#1247 (ERC-721)", color: "text-accent-primary font-semibold" },
                  { label: "Contract", value: "0x7a3B...9f2E", color: "text-accent-primary font-semibold" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-xs font-mono text-fg-muted">{r.label}</span>
                    <span className={`text-sm ${r.color}`}>{r.value}</span>
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1 bg-[#E0F2FE] rounded-full px-3 py-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent-primary" />
                  <span className="text-[11px] font-semibold text-accent-primary">Verified on BSC</span>
                </span>
                <span className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3 text-fg-muted" />
                  <span className="text-[11px] text-fg-muted">View on BscScan</span>
                </span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="flex-1 flex flex-col gap-4">
            {[
              { icon: Lock, title: "Smart Contract Escrow", desc: "DonationVault holds all funds. Released only after 66% community vote approval on milestone proof." },
              { icon: Shield, title: "SourceHat Audited", desc: "5 contracts audited with ReentrancyGuard, Ownable2Step, Pausable circuit breakers, and SafeERC20." },
              { icon: Undo, title: "Pull-Pattern Refunds", desc: "Cancelled campaigns trigger pro-rata refunds. Donors claim individually — no reentrancy risk." },
              { icon: FileText, title: "Tax Receipt NFTs", desc: "ERC-721 NFTs with on-chain metadata: donor, campaign, token, amount, timestamp, and tax receipt URI." },
            ].map((item) => (
              <div key={item.title} className="flex-1 bg-surface-primary rounded-2xl p-6 flex items-start gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-[18px] w-[18px] text-accent-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-fg-primary">{item.title}</span>
                  <p className="text-[13px] text-fg-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 08 FOR CHARITIES ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <span className="bg-white rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">For Charities</span>
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Register Your Charity.<br />Reach Global Donors.</h2>
        <p className="text-base text-fg-secondary text-center max-w-2xl">Stake 10M SANC to register. Pass KYC verification. Create milestone-based campaigns across 8 categories.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {[
            { icon: Coins, title: "Stake 10M SANC", desc: "Register by staking 10 million SANC tokens. Stake is slashed on revocation, returned on good standing." },
            { icon: UserCheck, title: "Pass KYC Verification", desc: "Submit KYC documents (stored on IPFS). Admin reviews and verifies your charity before it can create campaigns." },
            { icon: Target, title: "Create Campaigns", desc: "Define milestones that sum to your funding goal. Submit proof for each milestone. Community votes to release funds." },
          ].map((step) => (
            <div key={step.title} className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
              <step.icon className="h-5 w-5 text-accent-primary" />
              <span className="text-lg font-semibold text-fg-primary">{step.title}</span>
              <p className="text-sm text-fg-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories Row */}
        <div className="flex gap-3 flex-wrap justify-center">
          {["Education", "Health", "Environment", "Disaster Relief", "Animal Welfare", "Community", "Technology", "Arts & Culture"].map((cat) => (
            <span key={cat} className="bg-white text-fg-secondary text-xs rounded-full px-4 py-1.5">{cat}</span>
          ))}
        </div>

        {/* Register CTA */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <Link
            href="/charity/register"
            className="flex items-center gap-2 bg-accent-primary text-white text-[15px] font-semibold rounded-full px-10 py-3.5 shadow-[0_4px_24px_rgba(14,165,233,0.35)]"
          >
            <UserCheck className="h-4 w-4" />
            Register Your Charity
          </Link>
          <span className="text-xs text-fg-muted">Takes ~5 minutes · 10M SANC required to stake</span>
        </div>
      </section>

      {/* ===== 09 FINAL CTA ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto rounded-2xl px-6 sm:px-10 lg:px-16 py-12 lg:py-20 flex flex-col items-center gap-6 text-center" style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-bold text-white">Start Your Transparent<br />Giving Journey</h2>
          <p className="text-sm sm:text-base lg:text-[17px] text-white/70 max-w-2xl">Connect your wallet. Choose a verified cause. Every dollar tracked on-chain. Every milestone community-verified.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <ComingSoonOverlay action="Connect wallet">
              <button className="flex items-center gap-2 bg-white text-[#0F172A] text-[15px] font-semibold rounded-full px-8 py-3.5">
                <Wallet className="h-4 w-4" />Connect Wallet &amp; Donate
              </button>
            </ComingSoonOverlay>
            <Link href="/charity/register" className="text-[15px] text-white rounded-full px-8 py-3.5 border border-white/20">Register Your Charity</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
