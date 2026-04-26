"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useCharity } from "@/hooks/useCharity";
import type { CampaignFilters } from "@/hooks/useCharity";
import { CampaignCategory, CharityStatus, MilestoneStatus } from "@/types/charity";
import { StatCardSkeleton } from "@/components/ui/Skeleton";
import { AnimatedHeroBg } from "@/components/ui/AnimatedHeroBg";
import {
  Wallet, Search, Target, Flame, DollarSign, Users, Shield,
  FileText, ExternalLink, Lock, Undo, BadgeCheck,
  Coins, UserCheck, ChevronRight, Smartphone,
  CircleCheck, Hexagon, TriangleAlert, ScanSearch, Vote, ShieldCheck, Zap, Eye,
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
  const { campaigns, platformStats, isLoading, isError } = useCharity(filters);
  const now = Math.floor(Date.now() / 1000);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Scroll reveal for .reveal and .reveal-scale elements
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("revealed");
          revealObs.unobserve(e.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    // Bar sections — activate bar animations when section enters viewport
    const barSections = document.querySelectorAll<HTMLElement>("[data-bars]");
    const barObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("bars-active");
          barObs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    barSections.forEach((el) => barObs.observe(el));

    return () => { revealObs.disconnect(); barObs.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen">
      {/* ===== 01 HERO ===== */}
      {/* To test variants, change "blockchain" → "orbs" or "grid" */}
      <section className="relative overflow-hidden bg-white border-b border-line-subtle px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <AnimatedHeroBg variant="grid" />
        {/* Badge */}
        <span className="relative z-10 inline-flex items-center gap-1.5 bg-accent-light text-accent-primary rounded-full px-4 py-1.5 text-xs font-mono">
          <Hexagon className="h-3 w-3" />Blockchain-verified charity
        </span>

        {/* Headline — no forced break on mobile, natural wrap */}
        <h1 className="relative z-10 text-[32px] sm:text-5xl lg:text-[64px] font-bold text-fg-primary text-center leading-[1.1] max-w-[800px]">
          Where Every Donation<span className="hidden sm:inline"><br /></span>{" "}Finds Its Purpose
        </h1>

        {/* Subtext */}
        <p className="relative z-10 text-[15px] lg:text-[18px] text-fg-secondary text-center max-w-[520px] leading-relaxed -mt-1">
          Your donation is locked until real results are proven — verified by the community, recorded on-chain forever.
        </p>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <ComingSoonOverlay action="Connect wallet">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-primary text-white text-[15px] font-semibold rounded-full px-8 py-3.5 hover:bg-accent-primary/90 hover:scale-[1.02] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_24px_rgba(14,165,233,0.35)]">
              <Wallet className="h-4 w-4" />Start Donating
            </button>
          </ComingSoonOverlay>
          <Link href="#campaigns" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface-primary text-fg-primary text-[15px] rounded-full px-8 py-3.5 border border-line-subtle hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-150">
            <Search className="h-4 w-4" />Browse Campaigns
          </Link>
        </div>

        {/* Cards — stack on mobile (no transforms), arc on desktop */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-4 w-full max-w-[860px] mt-1">
          {/* Card 1 — Donation receipt */}
          <div className="w-full sm:flex-1 bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-black/[0.04] sm:[transform:rotate(-1.5deg)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                <CircleCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              </div>
              <span className="text-[12px] font-semibold text-fg-primary">Donation Confirmed</span>
            </div>
            <p className="text-[10px] text-fg-muted mb-2">Your receipt lives on the blockchain forever</p>
            <p className="text-[11px] text-fg-muted mb-2">School Building · Kenya</p>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-fg-primary">2.5</span>
              <span className="text-sm text-fg-muted">BNB</span>
            </div>
            <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
              <div className="h-full bar-fill bg-accent-primary rounded-full" style={{ "--bar-w": "60%" } as React.CSSProperties} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-fg-muted">60% of goal</span>
              <span className="text-[10px] text-accent-primary font-mono">NFT #1247</span>
            </div>
          </div>

          {/* Card 2 — Platform stats (elevated on desktop only) */}
          <div className="w-full sm:flex-1 bg-white rounded-2xl p-5 card-float-glow">
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
            <div className="flex items-center gap-2 mb-1">
              <div className="h-6 w-6 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                <Shield className="h-3.5 w-3.5 text-accent-primary" />
              </div>
              <span className="text-[12px] font-semibold text-fg-primary">Milestone Vote</span>
            </div>
            <p className="text-[10px] text-fg-muted mb-2">Donors vote before any money is released</p>
            <p className="text-[11px] text-fg-muted mb-3">Clean Water Initiative · M2</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-fg-muted">Approval</span>
              <span className="text-[14px] font-bold text-accent-primary">72%</span>
            </div>
            <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
              <div className="h-full bar-fill bg-accent-primary rounded-full" style={{ "--bar-w": "72%" } as React.CSSProperties} />
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
          <span className="text-[11px] sm:text-[12px] text-fg-muted">Audited by SourceHat</span>
          <span className="text-fg-muted text-[11px]">·</span>
          <span className="text-[11px] sm:text-[12px] text-fg-muted">BSC Mainnet</span>
        </div>
      </section>

      {/* ===== 02 HOW IT WORKS ===== */}
      <section id="how" className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8 lg:gap-12">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">How It Works</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Three Steps to Transparent Giving</h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 max-w-4xl mx-auto w-full">
          {/* Dashed connector line — desktop only, sits behind the circles */}
          <div className="hidden sm:block absolute top-8 left-[16.67%] right-[16.67%] h-0 border-t-2 border-dashed border-accent-primary/30" />

          {/* Vertical connector — mobile only */}
          <div className="sm:hidden absolute top-16 bottom-16 left-8 w-0 border-l-2 border-dashed border-accent-primary/25" />

          {[
            { icon: Wallet, num: "01", title: "Connect Your Wallet", desc: "Link your BSC wallet. We support BNB, SANC, USDT, and BUSD for maximum flexibility." },
            { icon: Search, num: "02", title: "Choose a Cause", desc: "Browse campaigns across 8 categories. Every charity stakes 10M SANC and passes KYC verification before listing." },
            { icon: Shield, num: "03", title: "Track Your Impact", desc: "Get an NFT receipt. Vote on milestone releases. Watch your donation create real, verified change on-chain." },
          ].map((step, i) => (
            <div key={step.num} className="reveal flex sm:flex-col items-start sm:items-center gap-5 sm:gap-4 text-left sm:text-center"
              style={{ "--reveal-delay": `${i * 150}ms` } as React.CSSProperties}>
              {/* Circle node — boxShadow ring in section bg color visually "cuts" the connector line */}
              <div
                className="relative z-10 flex-shrink-0 h-16 w-16 rounded-full bg-white border-2 border-accent-primary/40 flex items-center justify-center"
                style={{ boxShadow: "0 0 0 8px #F0F9FF, 0 4px 20px rgba(14,165,233,0.15)" }}
              >
                <step.icon className="h-6 w-6 text-accent-primary" />
              </div>
              <div className="flex flex-col gap-2 sm:items-center">
                <span className="inline-flex items-center bg-accent-light rounded-full px-2.5 py-1 text-[10px] font-mono font-bold text-accent-primary tracking-[0.12em]">
                  STEP {step.num}
                </span>
                <span className="text-[18px] font-bold text-fg-primary leading-tight">{step.title}</span>
                <p className="text-[14px] text-fg-secondary leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 03 FEATURED CAMPAIGNS ===== */}
      <section id="campaigns" className="bg-surface-primary px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
          {/* Header */}
          <div className="reveal flex flex-col items-center gap-3">
            <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Featured Campaigns</span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Verified Causes Making Real Impact</h2>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setFilters(f => ({ ...f, category: cat === "All" ? undefined : cat as CampaignCategory }));
                }}
                className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                  activeCategory === cat ? "bg-accent-primary text-white" : "bg-white text-fg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading skeletons — mirrors real layout */}
          {isLoading && (
            <div className="flex flex-col gap-4">
              {/* Hero skeleton */}
              <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.04] flex flex-col lg:flex-row">
                <div className="lg:w-[55%] h-[240px] lg:h-auto skeleton flex-shrink-0" />
                <div className="flex-1 p-6 lg:p-8 flex flex-col gap-4">
                  <div className="skeleton h-4 w-24 rounded" />
                  <div className="skeleton h-7 w-3/4 rounded" />
                  <div className="skeleton h-4 w-1/2 rounded" />
                  <div className="skeleton h-2 w-full rounded-full" />
                  <div className="flex gap-6">
                    {[40, 32, 44].map((w) => <div key={w} className={`skeleton h-8 w-${w === 40 ? "10" : w === 32 ? "8" : "11"} rounded`} />)}
                  </div>
                  <div className="skeleton h-10 w-36 rounded-full mt-auto" />
                </div>
              </div>
              {/* Compact grid skeletons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/[0.04]">
                    <div className="h-[160px] skeleton" />
                    <div className="p-4 flex flex-col gap-2.5">
                      <div className="skeleton h-3 w-20 rounded" />
                      <div className="skeleton h-4 w-4/5 rounded" />
                      <div className="skeleton h-3 w-1/2 rounded" />
                      <div className="skeleton h-1.5 w-full rounded-full" />
                      <div className="skeleton h-9 w-full rounded-full mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="h-12 w-12 rounded-full bg-error-bg flex items-center justify-center">
                <TriangleAlert className="h-6 w-6 text-error" />
              </div>
              <p className="text-lg font-semibold text-fg-primary">Something went wrong</p>
              <p className="text-sm text-fg-muted">Failed to load campaigns. Please try again.</p>
            </div>
          )}

          {/* Magazine grid */}
          {!isLoading && !isError && campaigns.length > 0 && (() => {
            const hero = campaigns[0];
            const heroPct = Math.min(100, Math.max(0, (parseFloat(hero.totalRaised) / parseFloat(hero.totalGoal)) * 100));
            const heroDaysLeft = Math.max(0, Math.ceil((hero.deadline - now) / 86400));
            const heroCompletedMs = hero.milestones.filter(m => m.status === MilestoneStatus.Released).length;
            return (
              <div className="flex flex-col gap-4">

                {/* Hero card — first campaign, full width */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-black/[0.04] flex flex-col lg:flex-row">
                  {/* Cover */}
                  <div className="relative lg:w-[55%] h-[240px] lg:h-auto lg:max-h-[300px] overflow-hidden flex-shrink-0">
                    <img src={hero.coverImage} alt={hero.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1.5 bg-accent-light text-accent-primary text-[11px] font-semibold rounded-full px-3 py-1.5">
                        <Flame className="h-3 w-3" />Featured
                      </span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-6 lg:p-8 flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-surface-primary text-fg-secondary text-[11px] font-mono rounded-full px-3 py-1">{hero.category}</span>
                      {hero.charity.status === CharityStatus.Verified && (
                        <span className="flex items-center gap-1 text-accent-primary text-[11px] font-mono">
                          <CircleCheck className="h-3 w-3" />Verified
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-[20px] lg:text-[22px] font-bold text-fg-primary leading-tight">{hero.name}</h3>
                      <p className="text-[14px] text-fg-muted mt-1">{hero.charity.name}</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-[20px] font-bold text-fg-primary">${(hero.totalRaisedUSD / 1000).toFixed(1)}K</span>
                        <span className="text-[13px] text-fg-muted">of ${(hero.totalGoalUSD / 1000).toFixed(0)}K goal</span>
                      </div>
                      <div className="h-2 bg-surface-primary rounded-full overflow-hidden">
                        <div className="h-full bg-accent-primary rounded-full" style={{ width: `${heroPct}%` }} />
                      </div>
                      <p className="text-[11px] text-fg-muted mt-1 font-mono">{heroPct.toFixed(0)}% funded</p>
                    </div>
                    <div className="flex items-center gap-6">
                      {[
                        { label: "Donors",     value: String(hero.donorCount) },
                        { label: "Days Left",  value: `${heroDaysLeft}d`      },
                        { label: "Milestones", value: `${heroCompletedMs}/${hero.milestones.length}` },
                      ].map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                          <span className="text-[17px] font-bold text-fg-primary">{s.value}</span>
                          <span className="text-[11px] text-fg-muted">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-auto pt-1">
                      <Link
                        href={`/charity/campaign/${hero.id}`}
                        className="flex items-center gap-2 bg-accent-primary text-white text-[15px] font-semibold rounded-full px-7 py-3 shadow-[0_4px_20px_rgba(14,165,233,0.3)]"
                      >
                        <Wallet className="h-4 w-4" />Donate Now
                      </Link>
                      <Link href={`/charity/campaign/${hero.id}`} className="flex items-center gap-1 text-[13px] text-fg-muted hover:text-fg-secondary transition-colors">
                        View campaign <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Compact grid — remaining campaigns */}
                {campaigns.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.slice(1).map((c) => {
                      const cpct = Math.min(100, Math.max(0, (parseFloat(c.totalRaised) / parseFloat(c.totalGoal)) * 100));
                      const dLeft = Math.max(0, Math.ceil((c.deadline - now) / 86400));
                      return (
                        <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                          <div className="h-[160px] overflow-hidden">
                            <img src={c.coverImage} alt={c.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4 flex flex-col gap-2.5">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-surface-primary text-fg-secondary text-[10px] font-mono rounded-full px-2.5 py-0.5">{c.category}</span>
                              {c.charity.status === CharityStatus.Verified && (
                                <span className="flex items-center gap-1 text-accent-primary text-[10px] font-mono">
                                  <CircleCheck className="h-2.5 w-2.5" />Verified
                                </span>
                              )}
                            </div>
                            <h3 className="text-[14px] font-semibold text-fg-primary leading-snug">{c.name}</h3>
                            <p className="text-[12px] text-fg-muted">{c.charity.name}</p>
                            <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                              <div className="h-full bg-accent-primary rounded-full" style={{ width: `${cpct}%` }} />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-fg-muted font-mono">
                              <span>${(c.totalRaisedUSD / 1000).toFixed(0)}K raised</span>
                              <span>{cpct.toFixed(0)}%</span>
                              <span>{dLeft}d left</span>
                            </div>
                            <Link
                              href={`/charity/campaign/${c.id}`}
                              className="flex items-center justify-center bg-surface-primary text-fg-primary text-[13px] font-semibold rounded-full py-2.5 hover:bg-accent-light hover:text-accent-primary transition-colors mt-1"
                            >
                              Donate Now
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })()}
        </div>
      </section>

      {/* ===== 04 DONATION FLOW ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Donation Experience</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Donate in Any Token. Pay Less with SANC.</h2>
        </div>
        <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">

          {/* Proof card — donation in progress */}
          <div className="reveal-scale bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col sm:flex-row">
            {/* Campaign thumbnail */}
            <div className="relative sm:w-[200px] lg:w-[220px] h-[140px] sm:h-auto flex-shrink-0 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80" alt="Donation experience preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 sm:hidden">
                <p className="text-sm font-bold text-white leading-snug">School Building · Kenya</p>
              </div>
            </div>

            {/* Form area */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col gap-3.5">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[13px] font-semibold text-fg-primary">School Building · Kenya Education Trust</span>
                <span className="flex items-center gap-1 text-accent-primary text-[11px] font-mono"><CircleCheck className="h-3 w-3" />Verified</span>
              </div>

              {/* Token + Amount */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                <div className="flex gap-2 pointer-events-none">
                  {["BNB", "SANC", "USDT", "BUSD"].map((t, i) => (
                    <button key={t} className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${i === 1 ? "bg-accent-primary text-white" : "bg-surface-primary text-fg-secondary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-surface-primary rounded-xl px-4 py-2.5 sm:ml-auto">
                  <span className="text-[18px] font-bold text-fg-primary">$500</span>
                  <span className="text-sm text-fg-muted font-mono">worth of SANC</span>
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 pointer-events-none">
                {["$100", "$250", "$500", "$1K", "$5K"].map((q) => (
                  <button key={q} className={`flex-1 text-xs rounded-full py-1.5 ${q === "$500" ? "bg-accent-primary text-white" : "bg-surface-primary text-fg-secondary"}`}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Fee summary + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-0.5">
                <div className="flex flex-col gap-0.5 flex-1">
                  <p className="text-[12px] text-fg-muted font-mono">
                    $500 worth of SANC · <span className="text-success font-medium">0% fee</span> · <span className="font-semibold text-fg-primary">$500.00 to charity</span>
                  </p>
                  <p className="text-[11px] text-fg-muted flex items-center gap-1">
                    <Flame className="h-2.5 w-2.5 text-warning flex-shrink-0" />BNB/USDT fees fund SANC buyback & burn
                  </p>
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-primary text-white text-sm font-semibold rounded-full px-6 py-2.5 shadow-[0_4px_20px_rgba(14,165,233,0.3)] whitespace-nowrap pointer-events-none opacity-60">
                  Confirm Donation
                </button>
              </div>
            </div>
          </div>

          {/* Benefit chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Hexagon, title: "NFT Receipt Included",    desc: "ERC-721 minted to your wallet automatically after every donation."      },
              { icon: Coins,   title: "Zero Fee with SANC", desc: "Donate with SANC and pay zero platform fee — 100% of your donation reaches the charity." },
              { icon: Lock,    title: "Funds Held in Escrow",   desc: "DonationVault holds all funds. Released only after community vote."      },
            ].map((b, i) => (
              <div key={b.title} className="reveal flex items-start gap-3.5 bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.03]"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <div className="h-8 w-8 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <b.icon className="h-4 w-4 text-accent-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-fg-primary">{b.title}</p>
                  <p className="text-[12px] text-fg-muted mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security notice */}
          <div className="reveal flex items-center gap-3 bg-white border border-line-subtle rounded-xl px-5 py-3 w-full"
            style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
            <Shield className="h-4 w-4 text-accent-primary flex-shrink-0" />
            <span className="text-xs text-fg-secondary">Large donations (&gt;10 BNB) trigger multi-sig approval for added security. All transactions are publicly verifiable on BSCScan.</span>
          </div>

        </div>
      </section>

      {/* ===== 05 IMPACT DASHBOARD ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Platform Impact</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Transparency in Numbers</h2>
        </div>

        {/* Single unified card */}
        <div className="reveal-scale max-w-7xl mx-auto w-full bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-black/[0.04] overflow-hidden flex flex-col lg:flex-row">

          {/* Left: stats + category chart */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-line-subtle">

            {/* 2×2 stat grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
                : [
                    { icon: DollarSign, value: platformStats?.totalDonated      ?? "$2.4M+", label: "Total Donated",    trend: "12%" },
                    { icon: Users,      value: platformStats?.totalDonors        ?? "12,847", label: "Unique Donors",    trend: "8%"  },
                    { icon: Target,     value: platformStats?.campaignsCompleted ?? "86",     label: "Campaigns Funded", trend: "4%"  },
                    { icon: Flame,      value: platformStats?.sancBurned         ?? "1.2B",   label: "SANC Burned",      trend: "23%" },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <s.icon className="h-4 w-4 text-fg-muted" />
                        <span className="text-[11px] text-fg-muted">{s.label}</span>
                      </div>
                      <span className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-fg-primary leading-none">{s.value}</span>
                      <span className="text-[11px] font-semibold text-success">↑ {s.trend} this month</span>
                    </div>
                  ))
              }
            </div>

            <div className="h-px bg-line-subtle" />

            {/* Category bar chart */}
            <div data-bars>
              <span className="text-[12px] font-semibold text-fg-secondary uppercase tracking-[0.08em] mb-4 block">Impact by Category</span>
              <div className="flex flex-col gap-2.5">
                {impactCategories.map((cat) => {
                  const val = parseFloat(cat.value.replace(/[$K]/g, ""));
                  const pct = (val / 420) * 100;
                  return (
                    <div key={cat.label} className="flex items-center gap-3">
                      <span className="text-[12px] text-fg-muted w-20 flex-shrink-0">{cat.label}</span>
                      <div className="flex-1 h-1.5 bg-surface-primary rounded-full overflow-hidden">
                        <div className="h-full bg-accent-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[12px] font-semibold text-fg-primary w-12 text-right flex-shrink-0">{cat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: leaderboard */}
          <div className="lg:w-[360px] flex-shrink-0 p-6 lg:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-fg-primary">Top Donors</span>
              <span className="text-[11px] text-fg-muted font-mono">All time</span>
            </div>

            <div className="flex flex-col gap-4" data-bars>
              {topDonors.map((d) => {
                const amount = parseFloat(d.total.replace(/[$,]/g, ""));
                const barPct = (amount / 48200) * 100;
                const avatarColors = ["bg-accent-primary", "bg-success", "bg-warning"];
                return (
                  <div key={d.rank} className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`h-9 w-9 rounded-full ${avatarColors[d.rank - 1]} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[11px] font-bold text-white">{d.addr.slice(2, 4).toUpperCase()}</span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-mono text-fg-primary truncate">{d.addr}</span>
                        <span className="text-[13px] font-bold text-fg-primary flex-shrink-0 ml-2">{d.total}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-primary rounded-full overflow-hidden">
                          <div className="h-full bg-accent-primary rounded-full" style={{ width: `${barPct}%` }} />
                        </div>
                        <span className="text-[10px] text-fg-muted flex-shrink-0">{d.count} donations</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/charity/impact" className="flex items-center justify-center gap-1 text-[13px] text-fg-muted hover:text-fg-secondary transition-colors mt-auto pt-2">
              View full leaderboard <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Section divider */}
      <div className="bg-white flex items-center px-4 sm:px-6 lg:px-8 py-0">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <div className="flex-1 h-px bg-line-subtle" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent-primary/40" />
          <div className="flex-1 h-px bg-line-subtle" />
        </div>
      </div>

      {/* ===== 06 GOVERNANCE & VOTING ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Governance &amp; Voting</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Community-Powered<br />Fund Releases</h2>
          <p className="text-base text-fg-secondary text-center max-w-xl">Stake SANC tokens to gain voting power. Every milestone fund release requires community approval.</p>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-4 items-stretch">

          {/* Left: light tier ladder (40%) */}
          <div className="reveal lg:w-[38%] flex-shrink-0 bg-white rounded-2xl p-6 lg:p-8 flex flex-col gap-6 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div>
              <span className="text-[11px] font-bold text-fg-muted uppercase tracking-[0.1em]">Voter Tiers</span>
              <p className="text-sm font-semibold text-fg-primary mt-1.5">Stake SANC to earn voting power</p>
              <p className="text-[13px] text-fg-secondary mt-1">Higher stake = more weight per vote. All tiers can approve or reject milestone releases.</p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { tier: "Standard",       stake: "1M SANC",  power: "1×", dot: "bg-[#0EA5E9]", val: "text-[#0EA5E9]", desc: "Base voting rights",  ring: "bg-[#F0F9FF] border-[#0EA5E9]/20" },
                { tier: "Featured Donor", stake: "10M SANC", power: "2×", dot: "bg-[#22C55E]", val: "text-[#22C55E]", desc: "2× weighted vote",    ring: "bg-[#F0FDF4] border-[#22C55E]/20" },
                { tier: "Elite Donor",    stake: "50M SANC", power: "3×", dot: "bg-[#EAB308]", val: "text-[#CA8A04]", desc: "3× maximum impact",   ring: "bg-[#FEFCE8] border-[#EAB308]/20" },
              ].map((t) => (
                <div key={t.tier} className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${t.ring}`}>
                  <span className={`h-2 w-2 rounded-full flex-shrink-0 ${t.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-fg-primary">{t.tier}</span>
                      <span className="text-[11px] font-mono text-fg-muted">{t.stake}</span>
                    </div>
                    <span className="text-[11px] text-fg-muted">{t.desc}</span>
                  </div>
                  <span className={`text-[22px] font-bold flex-shrink-0 ${t.val}`}>{t.power}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2.5 bg-surface-primary border border-line-subtle rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-fg-muted">Your stake</span>
                <span className="text-[12px] font-mono text-fg-muted">Not staked</span>
              </div>
              <div className="h-1.5 bg-line-subtle rounded-full" />
              <ComingSoonOverlay action="Stake SANC">
                <button className="w-full bg-accent-primary text-white text-sm font-semibold rounded-xl py-2.5 hover:bg-accent-primary/90 transition-colors">
                  Stake SANC to Vote
                </button>
              </ComingSoonOverlay>
            </div>
          </div>

          {/* Right: white vote simulation (60%) */}
          <div className="reveal-scale flex-1 bg-white rounded-2xl p-6 lg:p-8 flex flex-col gap-5 card-glow-border"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>

            {/* Proposal header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-fg-muted uppercase tracking-wide">Active Proposal #42</span>
                <p className="text-[16px] sm:text-[17px] font-semibold text-fg-primary mt-0.5 leading-snug">Clean Water Initiative — Milestone #2: Equipment Purchase</p>
              </div>
              <span className="flex-shrink-0 bg-[#F0FDF4] border border-[#22C55E]/30 rounded-full px-3 py-1 text-[11px] font-semibold text-[#22C55E]">● Live</span>
            </div>

            {/* Vote bars */}
            <div className="flex flex-col gap-3" data-bars>
              {[
                { label: "Approve", pct: 72, votes: 112, bar: "bg-[#22C55E]" },
                { label: "Reject",  pct: 19, votes: 30,  bar: "bg-[#EF4444]" },
                { label: "Abstain", pct: 9,  votes: 14,  bar: "bg-fg-muted"  },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-3">
                  <span className="text-[12px] text-fg-muted w-14 flex-shrink-0">{v.label}</span>
                  <div className="flex-1 h-2 bg-surface-primary rounded-full overflow-hidden">
                    <div className={`h-full ${v.bar} rounded-full bar-fill`} style={{ "--bar-w": `${v.pct}%` } as React.CSSProperties} />
                  </div>
                  <span className="text-[12px] font-semibold text-fg-secondary w-9 text-right flex-shrink-0">{v.pct}%</span>
                  <span className="text-[11px] text-fg-muted w-16 flex-shrink-0 hidden sm:block">{v.votes} votes</span>
                </div>
              ))}
            </div>

            {/* Voter breakdown table */}
            <div className="flex flex-col gap-0 border border-line-subtle rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-surface-primary px-4 py-2 border-b border-line-subtle">
                <span className="text-[10px] font-bold text-fg-muted uppercase tracking-wide">Voter</span>
                <span className="text-[10px] font-bold text-fg-muted uppercase tracking-wide">Tier</span>
                <span className="text-[10px] font-bold text-fg-muted uppercase tracking-wide">Vote</span>
              </div>
              {[
                { addr: "0x7a3B...4f2E", tier: "Whale",    vote: "Approve", voteColor: "text-[#22C55E]", tierColor: "text-[#CA8A04]" },
                { addr: "0xB4c1...3fA7", tier: "Elite",    vote: "Approve", voteColor: "text-[#22C55E]", tierColor: "text-[#22C55E]" },
                { addr: "0x2eD8...71cF", tier: "Standard", vote: "Reject",  voteColor: "text-[#EF4444]", tierColor: "text-[#0EA5E9]" },
                { addr: "0x9Fa4...8bC2", tier: "Elite",    vote: "Abstain", voteColor: "text-fg-muted",  tierColor: "text-[#22C55E]" },
              ].map((row, i) => (
                <div key={row.addr} className={`grid grid-cols-3 px-4 py-2.5 ${i < 3 ? "border-b border-line-subtle" : ""}`}>
                  <span className="text-[12px] font-mono text-fg-secondary truncate pr-2">{row.addr}</span>
                  <span className={`text-[12px] font-semibold ${row.tierColor}`}>{row.tier}</span>
                  <span className={`text-[12px] font-semibold ${row.voteColor}`}>{row.vote}</span>
                </div>
              ))}
            </div>

            {/* Quorum banner + vote buttons */}
            <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#22C55E]/20 rounded-xl px-4 py-2.5">
              <CircleCheck className="h-4 w-4 text-[#22C55E] flex-shrink-0" />
              <span className="text-[12px] text-[#22C55E] font-semibold">Quorum reached · 72% approval exceeds the 66% threshold</span>
            </div>

            <div className="flex gap-3 mt-auto pointer-events-none">
              <button className="flex-1 bg-[#F0FDF4] border border-[#22C55E]/30 text-[#22C55E] text-sm font-semibold rounded-xl py-3 px-5 opacity-60">✓ Approve</button>
              <button className="flex-1 bg-[#FEF2F2] border border-[#EF4444]/30 text-[#EF4444] text-sm font-semibold rounded-xl py-3 px-5 opacity-60">✕ Reject</button>
              <button className="flex-1 bg-surface-primary border border-line-subtle text-fg-muted text-sm font-semibold rounded-xl py-3 px-5 opacity-60">— Abstain</button>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 07 NFT & TRANSPARENCY ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">NFT Receipts &amp; Security</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center leading-[1.15]">Immutable Proof.<br />Audited Security.</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full items-stretch">

          {/* Left: NFT Certificate Card (~45%) */}
          <div className="reveal-scale w-full lg:w-[420px] flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-black/[0.06]">
            {/* Art header */}
            <div className="h-[180px] flex flex-col items-center justify-center gap-2 relative overflow-hidden gradient-flow"
              style={{ background: "linear-gradient(-45deg, #0F172A, #1E3A5F, #0EA5E9, #1E3A5F)" }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-[320px] w-[320px] rounded-full border-2 border-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-[220px] w-[220px] rounded-full border border-white" />
              </div>
              <Shield className="h-9 w-9 text-white/90 relative z-10" />
              <span className="text-white text-[13px] font-bold tracking-widest relative z-10 font-mono">SANC CHARITY</span>
              <span className="text-white/50 text-[10px] font-mono relative z-10">ERC-721 · BSC Mainnet</span>
            </div>

            {/* Receipt body */}
            <div className="bg-white p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-fg-muted uppercase tracking-wide">Donation Receipt</span>
                  <p className="text-[15px] font-semibold text-fg-primary mt-0.5 leading-snug">School Building in Rural Kenya</p>
                </div>
                <span className="flex-shrink-0 bg-accent-light text-accent-primary text-[11px] font-bold font-mono rounded-full px-2.5 py-1">#1247</span>
              </div>
              <div className="flex flex-col gap-2 border-t border-line-subtle pt-4">
                {[
                  { label: "Amount",   value: "2.5 BNB",         mono: false },
                  { label: "Date",     value: "Mar 28, 2026",    mono: false },
                  { label: "Token ID", value: "#1247 (ERC-721)", mono: true  },
                  { label: "Contract", value: "0x7a3B...9f2E",   mono: true  },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-fg-muted">{r.label}</span>
                    <span className={`text-[12px] font-semibold ${r.mono ? "font-mono text-accent-primary" : "text-fg-primary"}`}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="flex items-center gap-1.5 bg-accent-light rounded-full px-3 py-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-accent-primary" />
                  <span className="text-[11px] font-semibold text-accent-primary">Verified on BSC</span>
                </span>
                <span className="flex items-center gap-1.5 ml-auto text-fg-muted hover:text-fg-secondary cursor-pointer transition-colors">
                  <ExternalLink className="h-3 w-3" />
                  <span className="text-[11px]">BscScan</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: numbered editorial feature list (~55%) */}
          <div className="flex-1 flex flex-col justify-center gap-0 divide-y divide-line-subtle">
            {[
              { n: "01", icon: Lock,     title: "Smart Contract Escrow",  desc: "DonationVault holds all funds in escrow. Every release requires a milestone proof submission and 66% community vote approval — no admin override." },
              { n: "02", icon: Shield,   title: "SourceHat Audited",      desc: "All 5 core contracts were audited by SourceHat. ReentrancyGuard, Ownable2Step, Pausable circuit breakers, and SafeERC20 throughout." },
              { n: "03", icon: Undo,     title: "Pull-Pattern Refunds",   desc: "If a campaign is cancelled, donors reclaim funds individually. No push transfers, no reentrancy risk, no admin-controlled withdrawals." },
              { n: "04", icon: FileText, title: "On-Chain Tax Receipts",  desc: "Every donation mints an ERC-721 NFT with on-chain metadata: donor address, campaign, token, amount, timestamp, and a tax receipt URI." },
            ].map((item, i) => (
              <div key={item.n} className="reveal flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <span className="text-[32px] font-bold text-line-subtle leading-none flex-shrink-0 w-10 pt-0.5">{item.n}</span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-accent-primary flex-shrink-0" />
                    <span className="text-[15px] font-semibold text-fg-primary">{item.title}</span>
                  </div>
                  <p className="text-[13px] text-fg-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section divider */}
      <div className="bg-white flex items-center px-4 sm:px-6 lg:px-8 py-0">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <div className="flex-1 h-px bg-line-subtle" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent-primary/40" />
          <div className="flex-1 h-px bg-line-subtle" />
        </div>
      </div>

      {/* ===== 08 FOR CHARITIES ===== */}
      <section className="bg-[#F0F9FF] px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center gap-8">
        <div className="reveal flex flex-col items-center gap-3">
          <span className="bg-white border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">For Charities</span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">Register Your Charity.<br />Reach Global Donors.</h2>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 items-stretch">

          {/* Left: value card (~40%) */}
          <div className="reveal-scale lg:w-[38%] flex-shrink-0 card-aurora rounded-2xl p-7 lg:p-8 flex flex-col gap-6 border border-accent-primary/20 shadow-[0_0_0_1px_rgba(14,165,233,0.08),0_8px_32px_rgba(14,165,233,0.08)]">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-accent-primary uppercase tracking-[0.1em]">Why SancCharity</span>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-fg-primary leading-snug">Build Trust.<br />Raise More.</h3>
              <p className="text-[13px] text-fg-secondary leading-relaxed">The only platform where every dollar is milestone-locked, community-verified, and permanently on-chain.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "12",    label: "Verified Charities" },
                { value: "$2.4M", label: "Total Raised"       },
                { value: "86",    label: "Campaigns Funded"   },
                { value: "8",     label: "Categories"         },
              ].map((s) => (
                <div key={s.label} className="bg-surface-primary rounded-xl px-4 py-3 flex flex-col gap-0.5">
                  <span className="text-[20px] font-bold text-fg-primary leading-none">{s.value}</span>
                  <span className="text-[11px] text-fg-muted">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {["Education", "Health", "Environment", "Disaster Relief", "Animals", "Community", "Technology", "Arts"].map((cat) => (
                <span key={cat} className="bg-accent-light text-accent-primary text-[11px] font-medium rounded-full px-3 py-1">{cat}</span>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <Link
                href="/charity/register"
                className="flex items-center justify-center gap-2 bg-accent-primary text-white text-[14px] font-semibold rounded-xl px-6 py-3 shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:bg-accent-primary/90 transition-colors"
              >
                <UserCheck className="h-4 w-4" />Register Your Charity
              </Link>
              <span className="text-[11px] text-fg-muted text-center">Takes ~5 minutes · USD-equivalent SANC stake required</span>
            </div>
          </div>

          {/* Right: numbered steps (~60%) */}
          <div className="flex-1 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col divide-y divide-line-subtle">
            {[
              { n: "01", icon: Coins,     title: "Stake SANC (USD-based)",  desc: "Register by staking a USD-equivalent amount of SANC tokens. The actual SANC quantity varies with market price. Your stake is returned when you leave in good standing — and slashed if revoked for misconduct." },
              { n: "02", icon: UserCheck, title: "Pass KYC Verification", desc: "Submit your organisation's KYC documents (stored on IPFS). A platform admin reviews and verifies your charity before you can publish any campaigns." },
              { n: "03", icon: Target,    title: "Create Milestone Campaigns", desc: "Define a funding goal split across milestones. Submit on-chain proof for each milestone — automated checks validate your evidence before the community votes to release funds." },
              { n: "04", icon: Smartphone, title: "Receive Funds in Local Currency", desc: "Milestone funds release in USDT for stability. Convert to local currency (M-Pesa, bank transfer, mobile money) via integrated off-ramp partners — no exchange account needed." },
            ].map((step, i) => (
              <div key={step.n} className="reveal flex items-start gap-5 p-6 lg:p-8"
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
                <span className="text-[36px] font-bold text-line-subtle leading-none flex-shrink-0 w-12 pt-0.5">{step.n}</span>
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-accent-primary flex-shrink-0" />
                    <span className="text-[15px] font-semibold text-fg-primary">{step.title}</span>
                  </div>
                  <p className="text-[13px] text-fg-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== 09 VERIFICATION & GOVERNANCE ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 border-b border-line-subtle">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="reveal flex flex-col items-center gap-3 mb-10">
            <span className="bg-surface-primary border border-line-subtle rounded-full px-4 py-1.5 text-xs text-fg-secondary font-mono">Trust Architecture</span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary text-center">How Milestones<br />Are Verified</h2>
            <p className="text-[15px] text-fg-secondary max-w-2xl mx-auto text-center leading-relaxed">
              Not just community votes. A powerful automated layer validates proof before governance ever sees it — making Layer 2 human review unnecessary.
            </p>
          </div>

          {/* Two-layer model */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 mb-10">

            {/* Layer 1: Automated */}
            <div className="reveal bg-[#F0F9FF] rounded-2xl border border-[#0EA5E9]/15 p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#0EA5E9] flex items-center justify-center">
                  <ScanSearch className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-wider">Layer 1</span>
                  <h3 className="text-[17px] font-bold text-fg-primary">Automated Verification</h3>
                </div>
              </div>
              <p className="text-[13px] text-fg-secondary leading-relaxed">Runs instantly on every proof submission. The automated layer is designed to be powerful enough that third-party human review is rarely needed.</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: Eye,         label: "GPS & EXIF Metadata Validation", desc: "Verifies photos were taken at the claimed location and time — not recycled from the internet." },
                  { icon: Search,      label: "Reverse Image Search", desc: "Checks if submitted images exist elsewhere online. Catches reused or stolen photos instantly." },
                  { icon: ShieldCheck, label: "AI-Generated Content Detection", desc: "Flags synthetic images, deepfakes, and AI-generated documents before they reach voters." },
                  { icon: Hexagon,     label: "Duplicate Submission Flagging", desc: "Detects if the same proof has been submitted across multiple milestones or campaigns." },
                  { icon: Lock,        label: "Timestamp Consistency Checks", desc: "Cross-references file timestamps, blockchain timestamps, and claimed milestone dates." },
                ].map((check) => (
                  <div key={check.label} className="flex items-start gap-3 bg-white rounded-xl p-3.5 border border-black/[0.04]">
                    <check.icon className="h-4 w-4 text-[#0EA5E9] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[13px] font-semibold text-fg-primary">{check.label}</span>
                      <p className="text-[12px] text-fg-secondary leading-relaxed mt-0.5">{check.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#0EA5E9]/10 mt-auto">
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#0EA5E9]" />
                  <span className="text-[12px] font-bold text-fg-primary">Result: Clean or Flagged</span>
                </div>
                <p className="text-[12px] text-fg-secondary leading-relaxed">Every proof submission gets an automated verification report. Voters see this report alongside the evidence — they&apos;re reviewing validated data, not raw photos.</p>
              </div>
            </div>

            {/* Layer 2: Community Governance */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8 flex flex-col gap-5"
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center">
                  <Vote className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">Layer 2</span>
                  <h3 className="text-[17px] font-bold text-fg-primary">Community Governance</h3>
                </div>
              </div>
              <p className="text-[13px] text-fg-secondary leading-relaxed">SANC stakers cast the final vote. But they&apos;re not guessing — the automated report tells them exactly what passed and what was flagged.</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Quorum", value: "66% of staked SANC" },
                  { label: "Voting Period", value: "14 days" },
                  { label: "Vote Options", value: "Approve · Reject · Abstain" },
                  { label: "Weight", value: "Staked amount × tier (1x / 2x / 3x)" },
                  { label: "Execution", value: "Automatic on-chain if approved" },
                ].map((param) => (
                  <div key={param.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-black/[0.04]">
                    <span className="text-[13px] text-fg-secondary">{param.label}</span>
                    <span className="text-[13px] font-semibold text-fg-primary">{param.value}</span>
                  </div>
                ))}
              </div>

              {/* Anti-whale */}
              <div className="bg-white rounded-xl p-4 border border-[#8B5CF6]/10 mt-auto">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#8B5CF6]" />
                  <span className="text-[12px] font-bold text-fg-primary">Anti-Whale Protection</span>
                </div>
                <p className="text-[12px] text-fg-secondary leading-relaxed">The tier system economically discourages sybil splitting — consolidating into one wallet gives 3x power vs splitting across many at 1x. Vote-cap mechanisms prevent any single address from exceeding a maximum share of total vote weight.</p>
              </div>
            </div>

          </div>

          {/* Dispute escalation note */}
          <div className="reveal max-w-5xl mx-auto">
            <div className="bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-5 sm:p-6 flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-[#F59E0B] mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] font-semibold text-[#92400E] mb-1">Dispute Escalation (Rare)</p>
                <p className="text-[13px] text-[#78350F]/70 leading-relaxed">
                  If automated flags are ambiguous or a vote is contested, a small panel of Elite Donor stakers (3x tier) can trigger a deeper review with extended evidence requirements. This is a safety net, not a regular step — the automated layer is designed to handle 95%+ of submissions cleanly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10 WHY SANCCHARITY — COMMUNITY Q&A ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-20 border-b border-line-subtle">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="reveal text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-surface-primary border border-line-subtle rounded-full px-4 py-1.5 text-[11px] font-medium text-fg-muted mb-4">
              <span className="text-[14px]">💬</span> Community Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-fg-primary mb-2">
              &ldquo;Why SancCharity?&rdquo;
            </h2>
            <p className="text-[15px] text-fg-secondary max-w-2xl mx-auto leading-relaxed">
              Real questions from the community — answered honestly.
            </p>
          </div>

          {/* Q&A Cards */}
          <div className="flex flex-col gap-5">

            {/* Q1 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  How is proof on the platform better than a charity posting proof on social media? A charity could post proof themselves and then each person can decide to donate or not.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p>It&apos;s not about <em>where</em> proof is posted — it&apos;s about <em>when</em> relative to the money.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-4 border border-black/[0.04]">
                      <span className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">Traditional</span>
                      <p className="text-[13px] text-fg-secondary mt-1.5">Donor sends money → Charity <strong className="text-fg-primary">receives it</strong> → Maybe posts proof later. The money is <strong className="text-fg-primary">already gone</strong>.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-[#0EA5E9]/20">
                      <span className="text-[11px] font-bold text-[#0EA5E9] uppercase tracking-wider">SancCharity</span>
                      <p className="text-[13px] text-fg-secondary mt-1.5">Donor sends money → Money <strong className="text-fg-primary">sits in escrow</strong> → Charity does work → Submits proof → Community votes → <strong className="text-fg-primary">Then</strong> money releases.</p>
                    </div>
                  </div>
                  <p>On social media, proof is <em>marketing</em>. On SancCharity, proof is the <strong className="text-fg-primary">key that unlocks the funds</strong>. No proof = no money. Bad proof = community rejects = money stays locked.</p>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  Isn&apos;t the smart contract escrow just adding complexity? Why lock the funds at all?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p>Think of it like hiring a building contractor. You can either:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-4 border border-black/[0.04]">
                      <span className="text-[12px] font-bold text-fg-primary">Pay upfront</span>
                      <p className="text-[13px] text-fg-secondary mt-1">Hope they send progress photos. If they disappear — your money is gone.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-[#0EA5E9]/20">
                      <span className="text-[12px] font-bold text-fg-primary">Use escrow</span>
                      <p className="text-[13px] text-fg-secondary mt-1">Bank releases payment per phase after an inspector signs off. The contractor delivers or doesn&apos;t get paid.</p>
                    </div>
                  </div>
                  <p>Nobody calls construction escrow &ldquo;redundant.&rdquo; It&apos;s the entire protection. The funds aren&apos;t &ldquo;locked forever&rdquo; — they release <strong className="text-fg-primary">progressively per milestone</strong>, verified by the community.</p>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  What does SancCharity offer charities that are already transparent?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p>Even fully transparent charities benefit from infrastructure they can&apos;t build alone:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { title: "Structural credibility", desc: "\"Trust us\" is self-reported. Smart contract verification is third-party and permanent." },
                      { title: "Global donor access", desc: "Borderless crypto donations in seconds — no wire fees, no PayPal blocks, no bank intermediaries." },
                      { title: "Donor incentives", desc: "NFT receipts, 0% SANC fees, governance participation, impact dashboard — reasons donors choose your campaign." },
                      { title: "Matching fund amplification", desc: "30% of platform fees flow into a matching pool. Your campaign gets amplified with money you'd never get solo." },
                    ].map((b) => (
                      <div key={b.title} className="bg-white rounded-xl p-4 border border-black/[0.04]">
                        <span className="text-[12px] font-bold text-fg-primary">{b.title}</span>
                        <p className="text-[13px] text-fg-secondary mt-1">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p>The escrow isn&apos;t a punishment for honest charities — it&apos;s the mechanism that lets donors trust <strong className="text-fg-primary">every</strong> charity equally, which benefits the honest ones most.</p>
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "360ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  Do charities need to buy SANC tokens to use the platform?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p><strong className="text-fg-primary">No.</strong> Charities don&apos;t need to buy or hold any tokens. Here&apos;s who does what:</p>
                  <div className="overflow-x-auto rounded-xl border border-black/[0.06]">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="bg-white">
                          <th className="text-left px-4 py-2.5 font-semibold text-fg-primary">Role</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-fg-primary">What they do</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-fg-primary">Need SANC?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-black/[0.04]">
                          <td className="px-4 py-2.5 font-medium text-fg-primary">Charity</td>
                          <td className="px-4 py-2.5 text-fg-secondary">Stake USD-worth of SANC to register, create campaigns, submit proof</td>
                          <td className="px-4 py-2.5 text-fg-secondary">USD-based stake (refundable)</td>
                        </tr>
                        <tr className="border-t border-black/[0.04]">
                          <td className="px-4 py-2.5 font-medium text-fg-primary">Donor</td>
                          <td className="px-4 py-2.5 text-fg-secondary">Browse, donate in any token</td>
                          <td className="px-4 py-2.5 text-fg-secondary">Optional (0% fee)</td>
                        </tr>
                        <tr className="border-t border-black/[0.04]">
                          <td className="px-4 py-2.5 font-medium text-fg-primary">Governance voter</td>
                          <td className="px-4 py-2.5 text-fg-secondary">Stake, review proof, vote</td>
                          <td className="px-4 py-2.5 font-semibold text-[#0EA5E9]">Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>A charity&apos;s only added work vs traditional fundraising: <strong className="text-fg-primary">submit evidence per milestone</strong>. That&apos;s the accountability mechanism — and it&apos;s what makes donors trust the platform enough to give.</p>
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "480ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  How does a charity in Kenya convert crypto to local currency to actually buy what&apos;s needed?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p>Milestone funds release in <strong className="text-fg-primary">USDT</strong> (stablecoin) for price stability. Then the charity converts to local currency via integrated off-ramp partners — <strong className="text-fg-primary">no exchange account needed</strong>.</p>
                  <div className="bg-white rounded-xl p-4 border border-[#0EA5E9]/10">
                    <span className="text-[12px] font-bold text-fg-primary">The charity experience:</span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 text-[12px] text-fg-secondary">
                      <span className="bg-[#F0F9FF] text-[#0EA5E9] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap">Milestone approved</span>
                      <ChevronRight className="h-3 w-3 text-fg-muted hidden sm:block" />
                      <span className="bg-[#F0F9FF] text-[#0EA5E9] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap">USDT released</span>
                      <ChevronRight className="h-3 w-3 text-fg-muted hidden sm:block" />
                      <span className="bg-[#F0F9FF] text-[#0EA5E9] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap">Click &ldquo;Convert&rdquo;</span>
                      <ChevronRight className="h-3 w-3 text-fg-muted hidden sm:block" />
                      <span className="bg-[#F0FDF4] text-[#22C55E] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap">KES in M-Pesa</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-black/[0.06]">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="bg-white">
                          <th className="text-left px-4 py-2 font-semibold text-fg-primary">Region</th>
                          <th className="text-left px-4 py-2 font-semibold text-fg-primary">Off-ramp</th>
                          <th className="text-left px-4 py-2 font-semibold text-fg-primary">Receives</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Kenya", "Kotani Pay / Yellow Card", "M-Pesa (KES)"],
                          ["Nigeria", "Yellow Card / Quidax", "Bank transfer (NGN)"],
                          ["South Africa", "Luno / VALR", "Bank transfer (ZAR)"],
                          ["India", "WazirX / CoinDCX", "UPI / Bank (INR)"],
                          ["Global", "Transak / Binance P2P", "Local bank / mobile money"],
                        ].map(([region, partner, receives]) => (
                          <tr key={region} className="border-t border-black/[0.04]">
                            <td className="px-4 py-2 font-medium text-fg-primary">{region}</td>
                            <td className="px-4 py-2 text-fg-secondary">{partner}</td>
                            <td className="px-4 py-2 text-fg-secondary">{receives}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>The charity never leaves the platform. Under the hood it&apos;s a partner API — but to the charity it&apos;s just <strong className="text-fg-primary">&ldquo;Convert to M-Pesa.&rdquo;</strong></p>
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div className="reveal bg-surface-primary rounded-2xl border border-line-subtle p-6 sm:p-8"
              style={{ "--reveal-delay": "600ms" } as React.CSSProperties}>
              <div className="flex items-start gap-3 mb-4">
                <span className="h-7 w-7 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">Q</span>
                <p className="text-[15px] font-semibold text-fg-primary leading-snug">
                  What stops large bag holders from gaming the governance votes? Isn&apos;t community voting vulnerable to sybil attacks?
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-[#F0F9FF] text-[#0EA5E9] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                <div className="text-[14px] text-fg-secondary leading-relaxed flex flex-col gap-3">
                  <p>Three mechanisms work together:</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-4 border border-black/[0.04]">
                      <span className="text-[12px] font-bold text-fg-primary">Staking cost</span>
                      <p className="text-[12px] text-fg-secondary mt-1">1M SANC minimum per wallet. Creating fake identities is expensive — and splitting tokens across wallets <em>reduces</em> power due to tier multipliers.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-black/[0.04]">
                      <span className="text-[12px] font-bold text-fg-primary">Tier incentive</span>
                      <p className="text-[12px] text-fg-secondary mt-1">One wallet at Elite (3x) beats fifty at Standard (1x). The system economically rewards consolidation over sybil splitting.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-black/[0.04]">
                      <span className="text-[12px] font-bold text-fg-primary">Automated layer</span>
                      <p className="text-[12px] text-fg-secondary mt-1">Even if a whale pushes a vote, the automated verification report is public. Approving flagged proof destroys community trust — and token value.</p>
                    </div>
                  </div>
                  <p>Plus: governance doesn&apos;t operate in a vacuum. Voters review the <strong className="text-fg-primary">automated verification report</strong>, not raw photos. A whale can have the votes, but they can&apos;t fake a clean automated scan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 11 FINAL CTA ===== */}
      <section className="bg-surface-primary px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.06)]">

          {/* Left: CTA (~55%) */}
          <div className="reveal flex-1 card-aurora p-8 lg:p-12 flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-accent-primary uppercase tracking-[0.1em]">Join the Community</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-fg-primary leading-[1.1]">
                Join {platformStats?.totalDonors ?? "12,847"}+ donors<br />making impact you can verify.
              </h2>
              <p className="text-[15px] text-fg-secondary leading-relaxed max-w-md">Every dollar locked until results are proven. Every milestone voted on by the community. Every transaction on-chain, forever.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ComingSoonOverlay action="Connect wallet">
                <button className="flex items-center justify-center gap-2 bg-accent-primary text-white text-[15px] font-semibold rounded-full px-8 py-3.5 shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:bg-accent-primary/90 hover:scale-[1.02] active:scale-[0.97] transition-all duration-150 whitespace-nowrap">
                  <Wallet className="h-4 w-4" />Connect Wallet &amp; Donate
                </button>
              </ComingSoonOverlay>
              <Link href="/charity/register" className="flex items-center justify-center gap-2 text-[15px] text-fg-secondary rounded-full px-8 py-3.5 border border-line-subtle hover:bg-white hover:text-fg-primary hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 whitespace-nowrap">
                <UserCheck className="h-4 w-4" />Register Your Charity
              </Link>
            </div>
            {/* Live counter strip */}
            <div className="flex items-center gap-2 pt-2">
              {isLoading
                ? <div className="skeleton h-3 w-64 rounded" />
                : <span className="text-[12px] font-mono text-fg-muted">
                    {platformStats?.totalDonors ?? "12,847"} donors &nbsp;·&nbsp; {platformStats?.totalDonated ?? "$2.4M+"} raised &nbsp;·&nbsp; {platformStats?.campaignsCompleted ?? "86"} campaigns funded
                  </span>
              }
            </div>
          </div>

          {/* Right: impact story panel (~45%) */}
          <div className="reveal-scale lg:w-[42%] flex-shrink-0 bg-[#F0F9FF] p-8 lg:p-10 flex flex-col justify-center gap-5 border-t lg:border-t-0 lg:border-l border-line-subtle"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <span className="text-[11px] font-bold text-fg-muted uppercase tracking-[0.1em]">Real Impact</span>

            {/* Impact vignette card */}
            <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-black/[0.04]">
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Kenya+Education+Trust&background=0EA5E9&color=fff&size=48&bold=true"
                  alt="Kenya Education Trust"
                  className="h-10 w-10 rounded-full flex-shrink-0"
                />
                <div>
                  <p className="text-[13px] font-semibold text-fg-primary">Kenya Education Trust</p>
                  <p className="text-[11px] font-mono text-fg-muted">Verified charity · 5 campaigns</p>
                </div>
                <span className="ml-auto flex-shrink-0 bg-[#F0FDF4] border border-[#22C55E]/30 rounded-full px-2.5 py-1 text-[10px] font-semibold text-[#22C55E]">Milestone 3 of 4</span>
              </div>
              <p className="text-[13px] text-fg-secondary leading-relaxed">
                &ldquo;The classroom block is complete. 240 students now have a safe place to learn &mdash; something they didn&apos;t have six months ago.&rdquo;
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-fg-muted">School Building in Rural Kenya</span>
                  <span className="text-[11px] font-semibold text-fg-primary">$48,200 raised</span>
                </div>
                <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-accent-primary rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-[12px] text-fg-muted leading-relaxed">
              Every release above was voted on by SANC stakers. The funds were locked in escrow until the community confirmed the milestone was complete.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
