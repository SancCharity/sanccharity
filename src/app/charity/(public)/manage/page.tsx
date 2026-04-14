"use client";

import { useState } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useCharityManage } from "@/hooks/useCharityManage";
import { CharityStatus } from "@/types/charity";
import {
  DollarSign, Megaphone, CircleCheck, Users as UsersIcon, Plus, Timer, Heart, X,
  CloudUpload, Send, Coins, Lock, ExternalLink, ShieldCheck, BadgeCheck,
  Settings, Pencil, Image as ImageIcon, FileText, FileCheck, Upload, Clock4, TriangleAlert, Copy, Circle,
} from "lucide-react";

const fmtDate = (ts: number) =>
  new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const fmtSanc = (raw: string) => {
  const n = Number(raw) / 1e9;
  return n >= 1_000_000
    ? `${(n / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M SANC`
    : `${n.toLocaleString()} SANC`;
};

export default function CharityManagePage() {
  const [alerts, setAlerts] = useState({ vote: true, donation: true });
  const { dashboard, campaigns, releasedFunds, pendingReleases, stakeStatus, isLoading, showComingSoon, setShowComingSoon, comingSoonMessage } = useCharityManage();

  const isVerified = dashboard?.status === CharityStatus.Verified;
  const isSuspended = dashboard?.status === CharityStatus.Suspended;
  const isRevoked = dashboard?.status === CharityStatus.Revoked;

  if (isRevoked) {
    return (
      <div className="bg-surface-primary min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-24 gap-6 max-w-md text-center">
          <div className="h-16 w-16 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <TriangleAlert className="h-8 w-8 text-[#DC2626]" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold text-fg-primary">Charity Revoked</p>
            <p className="text-sm text-fg-muted">Your charity registration has been revoked. This decision is final. Contact support if you believe this is an error.</p>
          </div>
          <ComingSoonOverlay action="Contact support">
            <button className="flex items-center gap-2 rounded-lg bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white">
              Contact Support
            </button>
          </ComingSoonOverlay>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-primary min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 flex flex-col gap-6">

        {/* Suspended Banner */}
        {isSuspended && (
          <div className="flex items-center gap-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] px-4 py-3">
            <TriangleAlert className="h-[18px] w-[18px] text-[#D97706] flex-shrink-0" />
            <p className="flex-1 text-[13px] font-medium text-[#92400E]">
              Your charity has been suspended. Contact support to resolve.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-lg sm:text-2xl font-bold text-fg-primary">Welcome back, {dashboard?.name ?? "Your Charity"}</h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#16A34A]">
                  <CircleCheck className="h-3 w-3" /> Verified Charity
                </span>
              )}
            </div>
            <p className="text-sm text-fg-muted">Verified since January 15, 2026 · BSC Registry</p>
          </div>
          <Link href="/charity/manage/create-campaign">
            <button
              disabled={isSuspended}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-fg-inverse ${isSuspended ? "bg-fg-muted cursor-not-allowed opacity-60" : "bg-accent-primary"}`}
            >
              <Plus className="h-[18px] w-[18px]" /> Create New Campaign
            </button>
          </Link>
        </div>

        {/* Alerts */}
        <div className="flex flex-col gap-2.5">
          {alerts.vote && (
            <div className="flex items-center gap-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] px-4 py-3">
              <Timer className="h-[18px] w-[18px] text-[#D97706]" />
              <p className="flex-1 text-[13px] font-medium text-[#92400E]">
                Milestone vote for &apos;Clean Water Initiative&apos; ends in 2 days — 72% approval so far
              </p>
              <button onClick={() => setAlerts((a) => ({ ...a, vote: false }))}>
                <X className="h-4 w-4 text-[#D97706]" />
              </button>
            </div>
          )}
          {alerts.donation && (
            <div className="flex items-center gap-2.5 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] px-4 py-3">
              <Heart className="h-[18px] w-[18px] text-[#16A34A]" />
              <p className="flex-1 text-[13px] font-medium text-[#166534]">
                New donation received: 2.5 BNB ($1,562) for &apos;Build a School in Rural Kenya&apos;
              </p>
              <button onClick={() => setAlerts((a) => ({ ...a, donation: false }))}>
                <X className="h-4 w-4 text-[#16A34A]" />
              </button>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { icon: DollarSign, label: "Total Raised", value: dashboard ? `$${dashboard.totalRaisedUSD.toLocaleString()}` : "—" },
            { icon: Megaphone, label: "Active Campaigns", value: String(dashboard?.activeCampaigns ?? "—") },
            { icon: CircleCheck, label: "Milestones Completed", value: dashboard ? `${dashboard.milestonesCompleted} / ${dashboard.milestonesTotal}` : "—" },
            { icon: UsersIcon, label: "Donor Count", value: dashboard ? dashboard.donorCount.toLocaleString() : "—" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 sm:gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-black/[0.04]">
              <div className="h-11 w-11 rounded-xl bg-[#E0F2FE] flex items-center justify-center">
                <stat.icon className="h-[22px] w-[22px] text-accent-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-fg-muted">{stat.label}</span>
                <span className="text-base sm:text-[22px] font-bold font-mono text-fg-primary">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-card border border-black/[0.04] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-fg-primary">Active Campaigns</h2>
              <span className="rounded-full bg-[#E0F2FE] px-2.5 py-1 text-xs font-semibold text-accent-primary">3 Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-accent-primary">
              <Coins className="h-3.5 w-3.5 text-fg-muted" />
              View token breakdown
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[780px]">
          <div className="flex px-4 sm:px-6 py-2.5 bg-surface-sage text-[11px] font-semibold text-fg-muted uppercase">
            <span className="w-[260px]">Campaign</span>
            <span className="w-[100px]">Category</span>
            <span className="w-[200px]">Progress</span>
            <span className="w-[80px]">Funded</span>
            <span className="flex-1">Status</span>
            <span className="w-[140px]">Actions</span>
          </div>
          {campaigns.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-20 px-6">
              <span className="text-[13px] text-fg-muted">No campaigns yet — create your first one.</span>
            </div>
          )}
          {campaigns.map((c, i) => (
            <div key={c.id}>
              {i > 0 && <div className="h-px bg-line-subtle" />}
              <div className="flex items-center px-4 sm:px-6 py-3.5">
                <span className="w-[260px] text-[13px] font-semibold text-fg-primary">{c.name}</span>
                <span className="w-[100px]">
                  <span className="inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium bg-[#E0F2FE] text-accent-primary">{c.category}</span>
                </span>
                <div className="w-[200px] flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-fg-muted">${c.totalRaisedUSD.toLocaleString()} / ${c.totalGoalUSD.toLocaleString()}</span>
                    <span className="font-semibold text-accent-primary">{c.fundedPercent}%</span>
                  </div>
                  <ProgressBar value={c.fundedPercent} size="sm" />
                </div>
                <span className="w-[80px] text-[13px] font-bold font-mono text-accent-primary">{c.fundedPercent}%</span>
                <span className="flex-1">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    c.status === "active" ? "bg-[#E0F2FE] text-accent-primary"
                    : c.status === "paused" ? "bg-[#FEF3C7] text-[#92400E]"
                    : c.status === "completed" ? "bg-[#DCFCE7] text-[#16A34A]"
                    : "bg-surface-sage text-fg-secondary"
                  }`}>MS {c.activeMilestone + 1} · {c.status}</span>
                </span>
                <div className="w-[140px] flex gap-2">
                  {c.status === "active" && (
                    <ComingSoonOverlay action="Pause campaign">
                      <button className="text-[11px] font-medium text-fg-secondary bg-surface-sage rounded-lg px-2 py-1">Pause</button>
                    </ComingSoonOverlay>
                  )}
                  {c.status === "paused" && (
                    <ComingSoonOverlay action="Resume campaign">
                      <button className="text-[11px] font-medium text-[#16A34A] bg-[#DCFCE7] rounded-lg px-2 py-1">Resume</button>
                    </ComingSoonOverlay>
                  )}
                  <ComingSoonOverlay action="Cancel campaign">
                    <button className="text-[11px] font-medium text-[#DC2626] bg-[#FEF2F2] rounded-lg px-2 py-1">Cancel</button>
                  </ComingSoonOverlay>
                </div>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>

        {/* Submit Milestone Proof */}
        <div className="bg-white rounded-2xl shadow-card border border-black/[0.04] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                <Upload className="h-[18px] w-[18px] text-accent-primary" />
              </div>
              <h2 className="text-lg font-bold text-fg-primary">Submit Milestone Proof</h2>
            </div>
            <span className="rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-semibold text-[#92400E]">Action Required</span>
          </div>

          <div className="bg-surface-sage rounded-xl p-4 flex flex-col gap-2">
            <p className="text-[13px]"><span className="font-medium text-fg-muted">Current Milestone:</span> <span className="font-semibold text-fg-primary">Milestone 3: Purchase classroom furniture</span></p>
            <p className="text-[13px]"><span className="font-medium text-fg-muted">Campaign:</span> <span className="font-semibold text-fg-primary">Build a School in Rural Kenya</span></p>
            <p className="text-[13px]"><span className="font-medium text-fg-muted">Required:</span> <span className="font-semibold text-fg-primary">Upload proof documents, photos, receipts</span></p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-surface-primary border-[1.5px] border-line-subtle h-[120px]">
            <CloudUpload className="h-8 w-8 text-fg-muted" />
            <p className="text-[13px] text-fg-muted">Drag & drop files here, or click to browse</p>
            <p className="text-[11px] text-fg-muted">PDF, JPG, PNG up to 10MB each</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#DCFCE7] px-3.5 py-2.5">
            <CircleCheck className="h-4 w-4 text-[#16A34A]" />
            <span className="text-xs font-semibold text-[#16A34A]">IPFS:</span>
            <span className="text-xs font-mono text-[#15803D]">QmX7bKd9...4kF9pRt</span>
            <Copy className="h-3.5 w-3.5 text-[#16A34A]" />
          </div>

          <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-3.5 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <TriangleAlert className="h-3.5 w-3.5 text-[#DC2626]" />
              <span className="text-[13px] font-semibold text-[#DC2626]">Previous Submission Rejected</span>
            </div>
            <p className="text-[11px] text-[#991B1B]">Submitted Mar 20, 2026 · Rejected Mar 25, 2026 (38% approval, needed 66%)</p>
            <p className="text-[11px] text-[#991B1B]">Reason: Insufficient documentation — receipts for materials not included</p>
            <div className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3 text-[#DC2626]" />
              <span className="text-[11px] font-medium text-[#DC2626]">View previous proof on IPFS</span>
            </div>
          </div>

          <p className="text-[13px] font-semibold text-fg-primary">Description</p>
          <div className="rounded-lg bg-surface-sage border border-line-subtle h-20 px-4 py-3">
            <span className="text-[13px] text-fg-muted">Describe what was accomplished in this milestone...</span>
          </div>

          <div className="flex items-center justify-between">
            <ComingSoonOverlay action="Submit milestone proof for community vote">
              <button className="flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse">
                <Send className="h-4 w-4" /> Submit for Community Vote
              </button>
            </ComingSoonOverlay>
            <span className="text-xs italic text-fg-muted">66% community approval required for fund release</span>
          </div>
        </div>

        {/* Impact Reports Table */}
        <div className="bg-white rounded-2xl shadow-card border border-black/[0.04] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-bold text-fg-primary">Impact Reports</h2>
            <ComingSoonOverlay action="Create new impact report">
              <button className="flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-[13px] font-semibold text-fg-inverse">
                <Plus className="h-4 w-4" /> New Report
              </button>
            </ComingSoonOverlay>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[580px]">
              <div className="flex px-4 sm:px-6 py-2.5 bg-surface-sage text-xs font-semibold text-fg-muted">
                <span className="w-[220px]">Report Title</span>
                <span className="w-[180px]">Campaign</span>
                <span className="w-[120px]">Date</span>
                <span className="flex-1">Status</span>
              </div>
              <div className="flex items-center px-4 sm:px-6 py-3.5">
                <span className="w-[220px] text-[13px] font-medium text-fg-primary">Q1 2026 Impact Summary</span>
                <span className="w-[180px] text-[13px] text-fg-secondary">Clean Water Initiative</span>
                <span className="w-[120px] text-[13px] text-fg-secondary">Mar 30, 2026</span>
                <span className="flex-1"><span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">Published</span></span>
              </div>
              <div className="h-px bg-line-subtle" />
              <div className="flex items-center px-4 sm:px-6 py-3.5">
                <span className="w-[220px] text-[13px] font-medium text-fg-primary">Annual Donor Report 2025</span>
                <span className="w-[180px] text-[13px] text-fg-secondary">Education for All</span>
                <span className="w-[120px] text-[13px] text-fg-secondary">Mar 15, 2026</span>
                <span className="flex-1"><span className="rounded-full bg-surface-sage px-2.5 py-1 text-[11px] font-semibold text-fg-muted">Draft</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Stake + Verification Row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {/* Stake Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Coins className="h-5 w-5 text-accent-primary" />
                <h2 className="text-lg font-bold text-fg-primary">Your Stake</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${stakeStatus?.eligible ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                {stakeStatus?.eligible ? "Eligible" : "Locked"}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-fg-muted">Staked Amount</span>
                  <span className="text-sm font-semibold text-fg-primary">{stakeStatus ? fmtSanc(stakeStatus.stakeAmount) : (dashboard ? fmtSanc(dashboard.stakeAmount) : "—")}</span>
                </div>
                <div className="flex flex-col gap-1"><span className="text-xs text-fg-muted">Staked Since</span><span className="text-sm font-semibold text-fg-primary">January 15, 2026</span></div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-1"><span className="text-xs text-fg-muted">Current Value</span><span className="text-sm font-semibold text-fg-primary">—</span></div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-fg-muted">Withdrawal</span>
                  <span className={`text-sm font-semibold ${stakeStatus?.eligible ? "text-[#16A34A]" : "text-[#D97706]"}`}>
                    {stakeStatus?.eligible ? "Eligible" : "Not eligible"}
                  </span>
                </div>
              </div>
            </div>
            {stakeStatus?.eligible ? (
              <ComingSoonOverlay action="Withdraw stake">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-accent-primary py-3 text-sm font-semibold text-fg-inverse w-full">
                  Withdraw Stake
                </button>
              </ComingSoonOverlay>
            ) : (
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#F1F5F9] py-3 text-sm font-semibold text-fg-muted" disabled>
                <Lock className="h-4 w-4" /> Withdraw Stake
              </button>
            )}
            <p className="text-[11px] text-fg-muted">{stakeStatus?.reason ?? "Stake can only be withdrawn when all campaigns are completed or cancelled"}</p>
          </div>

          {/* Verification Status Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                  <ShieldCheck className="h-[18px] w-[18px] text-accent-primary" />
                </div>
                <h2 className="text-lg font-bold text-fg-primary">Verification Status</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-semibold text-accent-primary">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>
                <button className="flex items-center gap-1.5 rounded-lg border border-line-subtle px-3.5 py-1.5 text-xs font-medium text-fg-secondary">
                  <Pencil className="h-3.5 w-3.5" /> Edit Profile
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-4">
                <div className="rounded-lg bg-surface-sage p-3 flex flex-col gap-1"><span className="text-[11px] text-fg-muted">BSC Address</span><span className="text-[13px] font-mono font-semibold text-fg-primary">0xAB12...9fCD</span></div>
                <div className="rounded-lg bg-surface-sage p-3 flex flex-col gap-1"><span className="text-[11px] text-fg-muted">Registration Date</span><span className="text-[13px] font-semibold text-fg-primary">January 15, 2026</span></div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="rounded-lg bg-surface-sage p-3 flex flex-col gap-1"><span className="text-[11px] text-fg-muted">Registry Status</span><span className="text-[13px] font-semibold text-[#16A34A]">Verified ✓</span></div>
                <div className="rounded-lg bg-surface-sage p-3 flex flex-col gap-1"><span className="text-[11px] text-fg-muted">Category</span><span className="text-[13px] font-semibold text-fg-primary">Education, Health</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-surface-sage px-3.5 py-2.5">
              <ImageIcon className="h-3.5 w-3.5 text-accent-primary" />
              <span className="flex-1 text-xs font-medium text-accent-primary">Manage campaign images & gallery on IPFS</span>
              <span className="text-accent-primary text-sm">›</span>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-surface-inverse py-2.5 text-[13px] font-semibold text-fg-inverse">
              <ExternalLink className="h-4 w-4" /> View on BscScan
            </button>
          </div>
        </div>

        {/* Multi-Sig + Annual Reports Row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {/* Multi-Sig Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-accent-primary" />
                <h2 className="text-lg font-bold text-fg-primary">Multi-Sig Wallet (3 of 5)</h2>
              </div>
              <ComingSoonOverlay action="Manage multi-sig signers">
                <button className="flex items-center gap-1.5 rounded-lg bg-surface-sage px-3.5 py-2 text-xs font-semibold text-fg-secondary">
                  <Settings className="h-3.5 w-3.5" /> Manage Signers
                </button>
              </ComingSoonOverlay>
            </div>
            <div className="bg-surface-sage rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-[13px]"><span className="text-fg-secondary">Required signatures</span><span className="font-semibold text-fg-primary">3 of 5</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-fg-secondary">Wallet address</span><span className="font-mono font-semibold text-fg-primary">0x9a4B...7c3E</span></div>
              <div className="flex justify-between text-[13px] items-center"><span className="text-fg-secondary">Pending transactions</span><span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">2</span></div>
            </div>
            <p className="text-sm font-semibold text-fg-primary">Authorized Signers</p>
            {[
              { addr: "0x7a3B...4f2E (You)", active: true, role: "Owner", roleBg: "bg-[#E0F2FE]", roleText: "text-accent-primary" },
              { addr: "0x2c8F...9b1A (Board Member)", active: true, role: "Active", roleBg: "bg-[#DCFCE7]", roleText: "text-[#16A34A]" },
              { addr: "0x5d1E...3c7F (Treasurer)", active: true, role: "Active", roleBg: "bg-[#DCFCE7]", roleText: "text-[#16A34A]" },
              { addr: "0x8f2C...6a4D (Advisor)", active: false, role: "Inactive", roleBg: "bg-[#F1F5F9]", roleText: "text-fg-muted" },
              { addr: "0x1b9A...8e2B (Co-founder)", active: false, role: "Inactive", roleBg: "bg-[#F1F5F9]", roleText: "text-fg-muted" },
            ].map((s) => (
              <div key={s.addr} className="flex items-center gap-2.5 rounded-lg bg-surface-primary border border-line-subtle px-3.5 py-2.5">
                {s.active ? <CircleCheck className="h-4 w-4 text-[#16A34A]" /> : <Circle className="h-4 w-4 text-fg-muted" />}
                <span className={`text-[13px] font-medium font-mono ${s.active ? "text-fg-primary" : "text-fg-muted"}`}>{s.addr}</span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.roleBg} ${s.roleText}`}>{s.role}</span>
              </div>
            ))}
          </div>

          {/* Annual Reports Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-accent-primary" />
                <h2 className="text-lg font-bold text-fg-primary">Annual Impact Reports</h2>
              </div>
              <ComingSoonOverlay action="Submit impact report">
                <button className="flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold text-fg-inverse">
                  <Upload className="h-3.5 w-3.5" /> Submit Report
                </button>
              </ComingSoonOverlay>
            </div>
            <p className="text-[13px] text-fg-secondary">Submit quarterly and annual reports to maintain transparency. Reports are stored on IPFS.</p>

            <div className="flex items-center gap-3 rounded-lg bg-surface-sage px-4 py-3">
              <FileCheck className="h-[18px] w-[18px] text-[#16A34A]" />
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-fg-primary">Annual Report 2025</span>
                <span className="text-xs text-fg-muted">Submitted Jan 15, 2026</span>
              </div>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">IPFS Stored</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-surface-primary border border-line-subtle px-4 py-3">
              <FileCheck className="h-[18px] w-[18px] text-[#16A34A]" />
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-fg-primary">Annual Report 2024</span>
                <span className="text-xs text-fg-muted">Submitted Jan 10, 2025</span>
              </div>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">IPFS Stored</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] px-3.5 py-2.5">
              <Clock4 className="h-3.5 w-3.5 text-[#D97706]" />
              <span className="text-xs font-medium text-[#92400E]">Q1 2026 Quarterly Report due by Apr 30, 2026</span>
            </div>
          </div>
        </div>

        {/* Funds Row: Released + Pending */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {/* Released Funds */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                <CircleCheck className="h-[18px] w-[18px] text-accent-primary" />
              </div>
              <h2 className="text-base font-bold text-fg-primary">Released Funds</h2>
            </div>
            {releasedFunds.length === 0 && !isLoading && (
              <p className="text-[13px] text-fg-muted px-1">No funds released yet.</p>
            )}
            {releasedFunds.map((f, i) => (
              <div key={`${f.milestoneIndex}-${f.releasedAt}`} className={`flex items-center justify-between rounded-lg px-4 py-3 ${i === 0 ? "bg-surface-sage" : "bg-surface-primary"}`}>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-fg-primary">{f.milestoneName}</span>
                  <span className="text-[11px] text-fg-muted">Released {fmtDate(f.releasedAt)}</span>
                </div>
                <span className="text-sm font-bold font-mono text-accent-primary">${f.amountUSD.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Pending Releases */}
          <div className="flex-1 bg-white rounded-2xl shadow-card border border-black/[0.04] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                <Timer className="h-[18px] w-[18px] text-[#92400E]" />
              </div>
              <h2 className="text-base font-bold text-fg-primary">Pending Releases</h2>
            </div>
            {pendingReleases.length === 0 && !isLoading && (
              <p className="text-[13px] text-fg-muted px-1">No pending releases.</p>
            )}
            {pendingReleases.map((p) => {
              const passing = p.approvalPercent >= 66;
              return (
                <div key={`${p.milestoneIndex}-${p.reviewDeadline}`} className={`rounded-lg px-4 py-3 flex flex-col gap-2 ${passing ? "bg-surface-sage" : "bg-surface-primary"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-fg-primary">{p.milestoneName}</span>
                    <span className="text-sm font-bold font-mono text-fg-primary">${p.amountUSD.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-fg-muted">Vote progress</span>
                    <span className={`font-semibold ${passing ? "text-accent-primary" : "text-[#92400E]"}`}>{p.approvalPercent}% approved</span>
                  </div>
                  <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${passing ? "bg-accent-primary" : "bg-[#FBBF24]"}`}
                      style={{ width: `${p.approvalPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
