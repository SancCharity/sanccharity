"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { charityApi } from "@/services/charityApi";
import type { CategoryBreakdownItem } from "@/types/charity";
import {
  DollarSign, Users, Trophy, Flame, Download, ShieldCheck,
  HandCoins, TrendingUp, Target,
} from "lucide-react";

const periodTabs = ["7D", "30D", "90D", "All Time"];


const topDonors = [
  { address: "0x7a3B...4f2E", totalUSD: "$48,200", count: 142, rank: 1 },
  { address: "0xB2c1...8dA7", totalUSD: "$31,750", count: 98, rank: 2 },
  { address: "0xF9e4...2c1B", totalUSD: "$24,300", count: 76, rank: 3 },
  { address: "0xC3d2...7eF9", totalUSD: "$18,900", count: 52, rank: 4 },
  { address: "0xA8b1...3cD4", totalUSD: "$15,200", count: 41, rank: 5 },
];

const recentActivity = [
  { icon: "💰", text: "New donation of 2.5 BNB", sub: "to Build a School in Rural Kenya", time: "2 min ago" },
  { icon: "📋", text: "Milestone 2 approved by vote", sub: "Mobile Clinic Campaign", time: "15 min ago" },
  { icon: "🏆", text: "Campaign completed!", sub: "Reforest the Amazon Basin", time: "1 hour ago" },
  { icon: "🔥", text: "12,500 SANC burned", sub: "Buyback & burn executed", time: "3 hours ago" },
  { icon: "✅", text: "New charity verified", sub: "Hope Foundation registered", time: "5 hours ago" },
];

const completedCampaigns = [
  { title: "Build a School in Rural Kenya", charity: "Hope Foundation", raised: "45.2 BNB", pct: 100, image: "https://images.unsplash.com/photo-1597515751759-cc67d3fe3f44?w=600&q=80" },
  { title: "Reforest the Amazon Basin", charity: "Green Earth Org", raised: "32.5 BNB", pct: 100, image: "https://images.unsplash.com/photo-1639278001900-e772db0c6b4a?w=600&q=80" },
  { title: "Clean Water Initiative", charity: "WaterAid Kenya", raised: "28.8 BNB", pct: 100, image: "https://images.unsplash.com/photo-1714897079746-4b8b6111c350?w=600&q=80" },
];

const impactStories = [
  { title: "Foundation Milestone Completed in Kilifi County", campaign: "School Building", beneficiaries: "450+", date: "Mar 15, 2026", gradient: "from-[#0EA5E9] via-[#06B6D4] to-[#10B981]" },
  { title: "Medical Supplies Delivered to 5 Villages", campaign: "Medical Aid for Gaza", beneficiaries: "1,200+", date: "Feb 28, 2026", gradient: "from-[#F97316] via-[#EF4444] to-[#EC4899]" },
  { title: "Community Clean Water Wells Now Active", campaign: "Clean Water Initiative", beneficiaries: "2,000+", date: "Jan 20, 2026", gradient: "from-[#10B981] via-[#059669] to-[#0D9488]" },
];

export default function ImpactDashboardPage() {
  const [period, setPeriod] = useState("30D");

  const impactQuery = useQuery({
    queryKey: ["impact-data"],
    queryFn: () => charityApi.getImpactDashboard(),
    staleTime: 5 * 60 * 1000,
  });
  const platformStatsQuery = useQuery({
    queryKey: ["platform-stats"],
    queryFn: () => charityApi.getDonationStats(),
    staleTime: 5 * 60 * 1000,
  });

  const impactData = impactQuery.data;
  const platformStats = platformStatsQuery.data;

  const stats = [
    { label: "Total Donated", value: platformStats?.totalDonated ?? "$2,847,350", sub: "+12.4% this month", icon: DollarSign },
    { label: "Total Donors", value: platformStats?.totalDonors ?? "18,492", sub: "+843 new donors", icon: Users },
    { label: "Campaigns Completed", value: String(impactData?.completedCampaigns ?? 127), sub: "94% success rate", icon: Trophy },
    { label: "SANC Burned", value: platformStats?.sancBurned ?? "4.2M SANC", sub: "From buyback & burn", icon: Flame, dark: true },
    { label: "Total Beneficiaries", value: "24,850+", sub: "+2,150 this quarter", icon: Target },
  ];

  const CATEGORY_COLORS: Record<string, string> = {
    "Education": "#0EA5E9",
    "Health": "#3B82F6",
    "Environment": "#22C55E",
    "Disaster Relief": "#D97706",
    "Community": "#94A3B8",
    "Animal Welfare": "#F97316",
    "Technology": "#8B5CF6",
    "Arts & Culture": "#C0C0C0",
  };

  const categories = impactData?.categoryBreakdown.map((cb: CategoryBreakdownItem) => ({
    name: cb.category,
    pct: cb.percentage,
    color: CATEGORY_COLORS[cb.category] ?? "#94A3B8",
  })) ?? [
    { name: "Education", pct: 28, color: "#0EA5E9" },
    { name: "Healthcare", pct: 22, color: "#3B82F6" },
    { name: "Environment", pct: 18, color: "#22C55E" },
    { name: "Disaster Relief", pct: 14, color: "#D97706" },
    { name: "Community", pct: 10, color: "#94A3B8" },
  ];

  const monthlyData = impactData?.monthlyDonations ?? [
    { month: "Nov", amount: 320 },
    { month: "Dec", amount: 380 },
    { month: "Jan", amount: 420 },
    { month: "Feb", amount: 390 },
    { month: "Mar", amount: 480 },
    { month: "Apr", amount: 520 },
  ];

  type MonthlyItem = { month: string; amountUSD?: number; amount?: number };
  const maxAmount = Math.max(...(monthlyData as MonthlyItem[]).map((d) => d.amountUSD ?? d.amount ?? 0));

  const matchingFundUSD = impactData
    ? (parseFloat(impactData.matchingFundBalance) / 1e18 * 625).toFixed(0)
    : "142350";

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden">
      <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-[32px] font-bold text-[#0F172A]">Impact Dashboard</h1>
            <p className="text-[14px] sm:text-[16px] text-[#475569]">Real-time transparency into every donation, milestone, and community vote on the SancCharity platform.</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#E0F2FE] border border-[#0EA5E9]/10 rounded-full shrink-0">
            <Download className="h-3.5 w-3.5 text-[#0EA5E9]" />
            <span className="text-[13px] font-semibold text-[#0EA5E9]">Export Report</span>
          </button>
        </div>

        {/* Period Filters */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#94A3B8]">Period:</span>
          {periodTabs.map((t) => (
            <button key={t} onClick={() => setPeriod(t)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium ${period === t ? "bg-[#0EA5E9] text-white font-semibold" : "bg-[#F0F9FF] text-[#475569]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(impactQuery.isLoading || platformStatsQuery.isLoading)
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.04]">
                  <div className="skeleton h-9 w-9 rounded-full" />
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-8 w-full" />
                  <div className="skeleton h-3 w-16" />
                </div>
              ))
            : stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className={`flex flex-col gap-2 p-5 sm:p-6 rounded-2xl ${s.dark ? "bg-[#0F172A] shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : "bg-white border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"}`}>
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${s.dark ? "bg-white/[0.13]" : "bg-[#E0F2FE]"}`}>
                      <Icon className={`h-[18px] w-[18px] ${s.dark ? "text-white/70" : "text-[#0EA5E9]"}`} />
                    </div>
                    <span className={`text-[13px] font-medium ${s.dark ? "text-white/60" : "text-[#94A3B8]"}`}>{s.label}</span>
                    <span className={`text-[28px] font-bold ${s.dark ? "text-white" : "text-[#0F172A]"}`}>{s.value}</span>
                    <span className={`text-[12px] ${s.dark ? "text-white/60" : "text-[#0EA5E9]"}`}>{s.sub}</span>
                  </div>
                );
              })
          }
        </div>

        {/* Matching Fund Banner */}
        <div className="flex items-center gap-3 px-6 py-4 bg-[#0EA5E9]/[0.04] border border-[#0EA5E9]/10 rounded-2xl">
          <HandCoins className="h-6 w-6 text-[#0EA5E9]" />
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-[14px] font-semibold text-[#0F172A]">Charity Matching Fund</span>
            <span className="text-[12px] text-[#475569]">Fueled by 30% of all platform fees — available to match qualifying donations</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[24px] font-bold text-[#0EA5E9]">${parseInt(matchingFundUSD).toLocaleString()}</span>
            <span className="text-[11px] text-[#94A3B8] font-mono">Available</span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Breakdown */}
          <div className="flex-1 flex flex-col gap-4 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[18px] font-bold text-[#0F172A]">Donations by Category →</span>
            <div className="flex flex-col gap-2.5">
              {(categories as { name: string; pct: number; color: string }[]).map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[13px] text-[#475569] w-28 shrink-0">{cat.name}</span>
                  <div className="flex-1 h-2 bg-[#F0F9FF] rounded-full">
                    <div className="h-2 rounded-full" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                  </div>
                  <span className="text-[13px] font-semibold text-[#0F172A] w-10 text-right">{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="flex-1 flex flex-col gap-4 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[18px] font-bold text-[#0F172A]">Monthly Donation Trend</span>
            <span className="text-[13px] text-[#94A3B8]">Last 6 months</span>

            {/* Simple Bar Chart */}
            <div className="flex items-end gap-2 sm:gap-3 h-[140px] sm:h-[200px]">
              {(monthlyData as MonthlyItem[]).map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[#0EA5E9] rounded-t-md" style={{ height: `${((d.amountUSD ?? d.amount ?? 0) / maxAmount) * 160}px` }} />
                  <span className="text-[11px] text-[#94A3B8]">{d.month}</span>
                </div>
              ))}
            </div>

            {/* Trend Stats */}
            <div className="flex gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#94A3B8]">This Month</span>
                <span className="text-[18px] font-bold text-[#0F172A]">$520K</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#94A3B8]">Avg / Month</span>
                <span className="text-[18px] font-bold text-[#0F172A]">$418K</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#94A3B8]">Growth</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-[#22C55E]" />
                  <span className="text-[18px] font-bold text-[#22C55E]">+28.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Campaigns */}
        <span className="text-[22px] font-bold text-[#0F172A]">Completed Campaigns</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedCampaigns.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <span className="text-[16px] font-bold text-[#0F172A]">{c.title}</span>
                <span className="text-[12px] text-[#94A3B8]">{c.charity}</span>
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full">
                  <div className="h-2 bg-[#22C55E] rounded-full w-full" />
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] font-bold text-[#0EA5E9]">{c.raised}</span>
                  <span className="text-[11px] font-semibold text-[#22C55E]">✓ 100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-[22px] font-bold text-[#0F172A]">Impact Stories</span>
            <p className="text-[14px] text-[#94A3B8] mt-1">Reports submitted by verified charities</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactStories.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className={`h-40 bg-gradient-to-br ${s.gradient}`} />
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-[#0F172A]">{s.title}</span>
                  <span className="text-[12px] text-[#94A3B8]">{s.campaign} · {s.date}</span>
                  <span className="text-[12px] font-medium text-[#22C55E]">{s.beneficiaries} beneficiaries</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard & Activity */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Top Donors */}
          <div className="flex-1 flex flex-col gap-3 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-bold text-[#0F172A]">Top Donors</span>
              <span className="text-[13px] font-semibold text-[#0EA5E9] cursor-pointer">View All →</span>
            </div>
            {topDonors.map((d) => (
              <div key={d.rank} className="flex items-center gap-3 py-2">
                <span className={`text-[16px] font-bold w-6 ${d.rank <= 3 ? "text-[#FFD700]" : "text-[#94A3B8]"}`}>{d.rank}</span>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${d.rank === 1 ? "bg-[#FFD700]" : d.rank === 2 ? "bg-[#C0C0C0]" : d.rank === 3 ? "bg-[#CD7F32]" : "bg-[#94A3B8]"}`}>
                  {d.address.slice(2, 4)}
                </div>
                <div className="flex-1 flex flex-col gap-px">
                  <span className="text-[13px] font-medium text-[#0F172A] font-mono">{d.address}</span>
                  <span className="text-[11px] text-[#94A3B8]">{d.count} donations</span>
                </div>
                <span className="text-[13px] font-bold text-[#0F172A]">{d.totalUSD}</span>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="flex-1 flex flex-col gap-3 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-bold text-[#0F172A]">Recent Activity</span>
              <span className="text-[13px] font-semibold text-[#0EA5E9] cursor-pointer">View All →</span>
            </div>
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <span className="text-[18px]">{a.icon}</span>
                <div className="flex-1 flex flex-col gap-px">
                  <span className="text-[13px] font-medium text-[#0F172A]">{a.text}</span>
                  <span className="text-[11px] text-[#94A3B8]">{a.sub} · {a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly Reports */}
        <div className="flex flex-col gap-4 p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-1">
            <span className="text-[22px] font-bold text-[#0F172A]">Quarterly Reports</span>
            <span className="text-[14px] text-[#94A3B8]">Stored on IPFS for permanent transparency</span>
          </div>
          {[
            { title: "Q1 2026 Donation Summary", date: "Published Apr 1, 2026" },
            { title: "Q4 2025 Donation Summary", date: "Published Jan 1, 2026" },
            { title: "Q3 2025 Donation Summary", date: "Published Oct 1, 2025" },
          ].map((r) => (
            <div key={r.title} className="flex items-center justify-between px-5 py-3.5 bg-[#F0F9FF] rounded-xl">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-[#0F172A]">{r.title}</span>
                <span className="text-[12px] text-[#94A3B8]">{r.date}</span>
              </div>
              <Download className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
          ))}
        </div>

        {/* Third-Party Audits */}
        <div className="flex flex-col gap-4 p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-1">
            <span className="text-[22px] font-bold text-[#0F172A]">Third-Party Audits</span>
            <span className="text-[14px] text-[#94A3B8]">Independent verification of platform operations</span>
          </div>
          {[
            { title: "SourceHat Smart Contract Audit", date: "Dec 2025", status: "Passed" },
            { title: "Quarterly Financial Audit Q4 2025", date: "Jan 2026", status: "Passed" },
          ].map((a) => (
            <div key={a.title} className="flex items-center justify-between px-5 py-3.5 bg-[#F0F9FF] rounded-xl">
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-semibold text-[#0F172A]">{a.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#94A3B8]">{a.date}</span>
                  <span className="px-2 py-0.5 bg-[#DCFCE7] rounded-full text-[10px] font-semibold text-[#16A34A]">{a.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 bg-[#0F172A] rounded-2xl">
          <ShieldCheck className="h-6 w-6 text-white shrink-0" />
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[14px] sm:text-[16px] font-bold text-white">All data verified on BNB Smart Chain</span>
            <span className="text-[13px] text-white/65">Every donation, vote, and milestone is permanently recorded on-chain. Verify any transaction on BscScan.</span>
          </div>
          <button className="px-5 py-2.5 bg-white rounded-full shrink-0">
            <span className="text-[13px] font-semibold text-[#0F172A]">View on BscScan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
