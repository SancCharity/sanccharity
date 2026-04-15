"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { useParams } from "next/navigation";
import {
  Heart, BadgeCheck, ShieldCheck, Globe, MapPin, Calendar, Copy,
  ExternalLink, Building2, Milestone, Sparkles,
  FileText, Download, Users, School, Droplets, HeartPulse, Check, Timer,
  TrendingUp, BookOpen, Stethoscope,
} from "lucide-react";
import { useCharityProfile } from "@/hooks/useCharityProfile";

const milestoneHistory = [
  { name: "Foundation & Permits", details: "Completed · 18.5 BNB released · 94% approval", date: "Jan 29, 2025", status: "done" },
  { name: "Structural Construction", details: "Completed · 15.0 BNB released · 91% approval", date: "Mar 15, 2025", status: "done" },
  { name: "Equipment Purchase", details: "Under Review · Voting ends Apr 20, 2025", date: "In Progress", status: "review" },
];

const impactStats = [
  { icon: Users, value: "2,450+", label: "People Impacted" },
  { icon: School, value: "3", label: "Schools Built" },
  { icon: Droplets, value: "5", label: "Water Wells" },
  { icon: HeartPulse, value: "890", label: "Medical Visits" },
];

const campaignGradients = [
  { gradientFrom: "#E0F2FE", gradientTo: "#BAE6FD", iconColor: "#0EA5E9", icon: Droplets },
  { gradientFrom: "#FEF3C7", gradientTo: "#FDE68A", iconColor: "#D97706", icon: BookOpen },
  { gradientFrom: "#DCFCE7", gradientTo: "#BBF7D0", iconColor: "#16A34A", icon: Stethoscope },
  { gradientFrom: "#EDE9FE", gradientTo: "#DDD6FE", iconColor: "#7C3AED", icon: Sparkles },
];

export default function CharityProfilePage() {
  const params = useParams();
  const charityId = (params.id as string) ?? "1";
  const { profile, campaigns: charityCampaigns, trustScore, impactReports, isLoading } = useCharityProfile(charityId);
  const now = Math.floor(Date.now() / 1000);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-[#94A3B8]">Loading...</span>
    </div>
  );

  const display = {
    name: profile?.name ?? "—",
    description: profile?.description ?? "—",
    website: profile?.website ?? "—",
    location: profile?.location ?? "—",
    registeredDate: profile
      ? new Date(profile.registeredAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "—",
    wallet: "—",
    sancStaked: profile ? (parseFloat(profile.stakeAmount) / 1e18 / 1e6).toFixed(0) + "M SANC" : "—",
    trustScore: (trustScore as { trustScore?: number } | undefined)?.trustScore ?? profile?.trustScore ?? 0,
    totalRaisedUSD: profile ? "$" + (profile.totalRaisedUSD / 1000).toFixed(0) + "K" : "—",
    donors: profile?.donorCount ?? 0,
    campaignsCount: profile?.campaignCount ?? 0,
    campaignsCompleted: (profile?.campaignCount ?? 0) - (profile?.activeCampaignCount ?? 0),
    focusAreas: profile?.focusAreas ?? [],
    isVerified: profile?.verified === true,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden pb-12">
      {/* Gradient Hero */}
      <div className="h-[200px]" style={{ background: "linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)" }} />

      {/* Body Content */}
      <PageContainer className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
        {/* Left Column */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 md:-mt-16">

          {/* Avatar Card */}
          <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="h-24 w-24 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Building2 className="h-10 w-10 text-[#0EA5E9]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#0F172A]">{display.name}</span>
              {display.isVerified && <BadgeCheck className="h-5 w-5 text-[#0EA5E9]" />}
            </div>
            {display.isVerified && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DCFCE7] rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                <span className="text-[12px] font-semibold text-[#16A34A]">Verified Charity</span>
              </div>
            )}
            <p className="text-[13px] text-[#475569] leading-[1.6] text-center">{display.description}</p>
            <div className="w-full flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span className="text-[13px] text-[#0EA5E9]">{display.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span className="text-[13px] text-[#475569]">{display.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span className="text-[13px] text-[#475569]">Registered {display.registeredDate}</span>
              </div>
            </div>
          </div>

          {/* On-Chain Identity Card */}
          <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] font-bold text-[#0F172A]">On-Chain Identity</span>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Wallet</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-[#475569] font-mono">{display.wallet}</span>
                <Copy className="h-3 w-3 text-[#94A3B8]" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">SANC Staked</span>
              <span className="text-[13px] font-semibold text-[#0F172A] font-mono">{display.sancStaked}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Multi-Sig Wallet</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0EA5E9]" />
                <span className="text-[13px] font-semibold text-[#0F172A]">3 of 5 signers</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Tax-Exempt Status</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                <span className="text-[13px] font-semibold text-[#22C55E]">Verified</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">KYC Verified</span>
              <span className="text-[13px] font-semibold text-[#22C55E]">
                {profile?.verified ? "✓ Approved" : "—"}
              </span>
            </div>

            <button className="flex items-center justify-center gap-1.5 h-9 border border-[#E2E8F0] rounded-lg">
              <ExternalLink className="h-3.5 w-3.5 text-[#475569]" />
              <span className="text-[12px] font-semibold text-[#475569]">View on BSCScan</span>
            </button>
          </div>

          {/* Connect / Social Card */}
          <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] font-bold text-[#0F172A]">Connect</span>
            <button className="flex items-center justify-center gap-2 h-10 bg-[#F0F9FF] rounded-lg">
              <Globe className="h-4 w-4 text-[#0EA5E9]" />
              <span className="text-[13px] font-semibold text-[#0EA5E9]">Visit Website</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-10 bg-[#F0F9FF] rounded-lg">
              <svg className="h-4 w-4 text-[#0EA5E9]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span className="text-[13px] font-semibold text-[#0EA5E9]">@KenyaEduTrust</span>
            </button>
          </div>

          {/* Focus Areas Card */}
          <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] font-semibold text-[#0F172A]">Focus Areas</span>
            <div className="flex flex-wrap gap-2">
              {display.focusAreas.map((area) => (
                <span key={area} className="px-3 py-1.5 bg-[#E0F2FE] rounded-full text-[12px] font-medium text-[#0EA5E9]">{area}</span>
              ))}
            </div>
          </div>

          {/* Trust Score Card */}
          <div className="flex flex-col gap-4 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] font-semibold text-[#0F172A]">Trust Score</span>

            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                <span className="text-[20px] font-bold text-[#16A34A]">{display.trustScore}</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[14px] font-semibold text-[#16A34A]">Excellent</span>
                <span className="text-[12px] text-[#94A3B8] leading-[1.4]">Based on on-chain activity, milestone completions, and community votes</span>
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0]" />

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#475569]">KYC Verified</span>
                <span className="text-[12px] font-semibold text-[#16A34A]">{profile?.verified ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#475569]">Active Since</span>
                <span className="text-[12px] font-semibold text-[#0F172A]">{display.registeredDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 pt-6">
            <Link href="/charity" className="text-[12px] text-[#94A3B8]">Home</Link>
            <span className="text-[12px] text-[#94A3B8]">/</span>
            <span className="text-[12px] text-[#94A3B8]">Charities</span>
            <span className="text-[12px] text-[#94A3B8]">/</span>
            <span className="text-[12px] font-semibold text-[#0F172A]">{display.name}</span>
          </div>

          {/* Stat Cards */}
          <div className="flex gap-4">
            {/* Total Raised */}
            <div className="flex-1 flex flex-col gap-2 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Total Raised</span>
                <TrendingUp className="h-4 w-4 text-[#22C55E]" />
              </div>
              <span className="text-[24px] font-bold text-[#0F172A]">{display.totalRaisedUSD}</span>
              <span className="text-[13px] text-[#94A3B8] font-mono">≈ {display.totalRaisedUSD}</span>
            </div>

            {/* Campaigns */}
            <div className="flex-1 flex flex-col gap-2 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] text-[#94A3B8]">Campaigns</span>
              <span className="text-[24px] font-bold text-[#0F172A]">{display.campaignsCount}</span>
              <span className="text-[13px] text-[#94A3B8]">{display.campaignsCount - display.campaignsCompleted} active · {display.campaignsCompleted} completed</span>
            </div>

            {/* Donors */}
            <div className="flex-1 flex flex-col gap-2 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] text-[#94A3B8]">Donors</span>
              <span className="text-[24px] font-bold text-[#0F172A]">{display.donors}</span>
              <span className="text-[13px] text-[#94A3B8]">Unique wallets</span>
            </div>

            {/* Milestones */}
            <div className="flex-1 flex flex-col gap-2 p-5 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] text-[#94A3B8]">Milestones</span>
              <span className="text-[24px] font-bold text-[#0F172A]">{display.campaignsCompleted}/{display.campaignsCount}</span>
              <span className="text-[13px] text-[#22C55E]">
                {display.campaignsCount > 0 ? Math.round((display.campaignsCompleted / display.campaignsCount) * 100) : 0}% completion
              </span>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[20px] font-bold text-[#0F172A]">Active Campaigns</span>
              <span className="text-[13px] font-semibold text-[#0EA5E9] cursor-pointer">View All →</span>
            </div>

            <div className="flex gap-4">
              {(charityCampaigns ?? []).map((c, i) => {
                const style = campaignGradients[i % campaignGradients.length];
                const Icon = style.icon;
                const goal = parseFloat(String(c.totalGoalUSD ?? 0));
                const raised = parseFloat(String(c.totalRaisedUSD ?? 0));
                const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
                return (
                  <Link
                    key={c.id}
                    href={`/charity/campaign/${c.id}`}
                    className="flex-1 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${style.gradientFrom} 0%, ${style.gradientTo} 100%)` }}>
                      <Icon className="h-10 w-10 opacity-40" style={{ color: style.iconColor }} />
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-[#E0F2FE] rounded-full text-[11px] font-medium text-[#0EA5E9]">{c.category}</span>
                      </div>
                      <span className="text-[16px] font-bold text-[#0F172A]">{c.name}</span>
                      <p className="text-[13px] text-[#475569] leading-[1.5]">{c.description}</p>
                      <div className="flex flex-col gap-1.5">
                        <div className="w-full h-1.5 bg-[#E0F2FE] rounded-full">
                          <div className="h-1.5 bg-[#0EA5E9] rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#94A3B8]">{progress.toFixed(0)}% funded</span>
                          <span className="text-[11px] text-[#94A3B8]">{c.donorCount} donors</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Milestone Track Record */}
          <div className="p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Milestone className="h-5 w-5 text-[#0EA5E9]" />
                <span className="text-[18px] font-bold text-[#0F172A]">Milestone Track Record</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#94A3B8]">12 of 15 completed</span>
                <div className="w-[120px] h-1.5 bg-[#E0F2FE] rounded-full">
                  <div className="h-1.5 bg-[#22C55E] rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </div>

            {milestoneHistory.map((ms, i) => (
              <div key={ms.name}>
                {i > 0 && <div className="h-px bg-[#E2E8F0] mb-5" />}
                <div className="flex items-center gap-4 py-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${ms.status === "done" ? "bg-[#DCFCE7]" : "bg-[#FEF3C7]"}`}>
                    {ms.status === "done" ? (
                      <Check className="h-4 w-4 text-[#22C55E]" />
                    ) : (
                      <Timer className="h-4 w-4 text-[#D97706]" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#0F172A]">{ms.name}</span>
                    <span className={`text-[12px] ${ms.status === "done" ? "text-[#94A3B8]" : "text-[#D97706]"}`}>{ms.details}</span>
                  </div>
                  <span className={`text-[12px] font-mono ${ms.status === "done" ? "text-[#94A3B8]" : "font-semibold text-[#D97706]"}`}>{ms.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Verified Impact */}
          <div className="p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-[#0EA5E9]" />
              <span className="text-[18px] font-bold text-[#0F172A]">Verified Impact</span>
            </div>

            <div className="flex gap-4">
              {impactStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex-1 flex flex-col items-center gap-2 p-5 bg-[#F0F9FF] rounded-xl">
                    <Icon className="h-7 w-7 text-[#0EA5E9]" />
                    <span className="text-[24px] font-bold text-[#0F172A]">{s.value}</span>
                    <span className="text-[12px] text-[#94A3B8] text-center">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Annual Impact Reports */}
          <div className="p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-[#0EA5E9]" />
              <span className="text-[18px] font-bold text-[#0F172A]">Annual Impact Reports</span>
            </div>

            {impactReports && impactReports.length > 0 ? (
              impactReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between px-4 py-3.5 bg-[#F0F9FF] rounded-xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#0F172A]">{report.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#94A3B8]">
                        Published {new Date(report.publishedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {report.mediaIPFS.length > 0 && (
                        <span className="px-2 py-0.5 bg-[#E0F2FE] rounded-full text-[11px] font-medium text-[#0EA5E9]">IPFS</span>
                      )}
                    </div>
                  </div>
                  <Download className="h-[18px] w-[18px] text-[#0EA5E9]" />
                </div>
              ))
            ) : (
              <>
                {/* Fallback static reports when no live data */}
                <div className="flex items-center justify-between px-4 py-3.5 bg-[#F0F9FF] rounded-xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#0F172A]">Annual Report 2024</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#94A3B8]">Published Jan 15, 2025</span>
                      <span className="px-2 py-0.5 bg-[#E0F2FE] rounded-full text-[11px] font-medium text-[#0EA5E9]">IPFS</span>
                    </div>
                  </div>
                  <Download className="h-[18px] w-[18px] text-[#0EA5E9]" />
                </div>

                <div className="flex items-center justify-between px-4 py-3.5 bg-[#F0F9FF] rounded-xl">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-[#0F172A]">Annual Report 2023</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#94A3B8]">Published Feb 1, 2024</span>
                      <span className="px-2 py-0.5 bg-[#E0F2FE] rounded-full text-[11px] font-medium text-[#0EA5E9]">IPFS</span>
                    </div>
                  </div>
                  <Download className="h-[18px] w-[18px] text-[#0EA5E9]" />
                </div>
              </>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Trust Banner */}
      <PageContainer className="mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 px-5 sm:px-6 bg-[#0F172A] rounded-xl">
          <ShieldCheck className="h-6 w-6 text-[#0EA5E9] shrink-0" />
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[16px] font-bold text-white">Transparency Guaranteed</span>
            <span className="text-[13px] text-[#94A3B8] leading-[1.5]">All donations are tracked on BSC blockchain. Funds are held in escrow and released through community-verified milestone voting.</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] rounded-full shrink-0">
            <Heart className="h-4 w-4 text-white" />
            <span className="text-[14px] font-semibold text-white">Donate Now</span>
          </button>
        </div>
      </PageContainer>
    </div>
  );
}
