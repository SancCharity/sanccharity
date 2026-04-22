"use client";

import { useState } from "react";
import {
  Building2,
  Megaphone,
  Heart,
  Coins,
  UserCheck,
  Flag,
  Octagon,
  Star,
  FileText,
  Search,
  Flame,
  Vault,
  ShieldOff,
  Activity,
  ExternalLink,
  RefreshCw,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useAdmin } from "@/hooks/useAdmin";
import { CharityStatus, CampaignStatus } from "@/types/charity";

const kycStatusStyle = (status: string) =>
  status === "docs_received"
    ? { bg: "bg-[#E0F2FE]", color: "text-accent-primary", label: "Docs Received" }
    : { bg: "bg-[#FEF3C7]", color: "text-[#D97706]", label: "Pending Review" };

const charityStatusStyle = (status: CharityStatus) => {
  switch (status) {
    case CharityStatus.Verified:
      return { bg: "bg-[#DCFCE7]", color: "text-[#16A34A]" };
    case CharityStatus.Suspended:
      return { bg: "bg-[#FEF3C7]", color: "text-[#D97706]" };
    default:
      return { bg: "bg-[#F1F5F9]", color: "text-[#475569]" };
  }
};

const contractNames = ["DonationEscrow", "CampaignManager", "GovernanceVoting", "CharityRegistry", "DonationNFT"];
const contractAddresses: Record<string, string> = {
  "DonationEscrow": "0x1A2b...3C4d",
  "CampaignManager": "0x5E6f...7G8h",
  "GovernanceVoting": "0x9I0j...1K2l",
  "CharityRegistry": "0x3M4n...5O6p",
  "DonationNFT": "0x5Q6r...7S8t",
};

const recentEvents = [
  { name: "DonationReceived", block: "#38,847,221", time: "12s ago", color: "bg-[#22C55E]" },
  { name: "VoteCast", block: "#38,847,219", time: "45s ago", color: "bg-accent-primary" },
  { name: "CharityRegistered", block: "#38,847,215", time: "2m ago", color: "bg-[#D97706]" },
];

export default function SuperAdminDashboard() {
  const {
    dashboard, kycQueue, charities, totalCharities, campaigns,
    feePools, buybackHistory, treasury, contractStatus, eventListener,
    activityLog, isLoading,
    handleApproveKyc, handleRejectKyc, handleVerifyCharity, handleSuspendCharity,
    handleReactivateCharity, handleRevokeCharity, handleFeatureCampaign,
    handleForceCancelCampaign, handleExecuteBuyback, handlePauseContract, handleUnpauseContract,
    showComingSoon, setShowComingSoon, comingSoonMessage,
  } = useAdmin();

  const [privateFeeInput, setPrivateFeeInput] = useState("0");

  const stats = [
    { label: "Total Charities", value: String(dashboard?.totalCharities ?? 47), change: "+3 this month", changeColor: "text-[#22C55E]", icon: Building2, iconColor: "text-accent-primary" },
    { label: "Active Campaigns", value: String(dashboard?.totalCampaigns ?? 124), change: "+12 this month", changeColor: "text-[#22C55E]", icon: Megaphone, iconColor: "text-accent-primary" },
    { label: "Total Donated", value: dashboard ? "$" + (dashboard.totalDonated / 1e6).toFixed(1) + "M" : "$2.4M", change: "+$124K this month", changeColor: "text-[#22C55E]", icon: Heart, iconColor: "text-accent-primary" },
    { label: "Fee Revenue", value: dashboard ? "$" + (dashboard.feeRevenue / 1000).toFixed(1) + "K" : "$48.2K", change: "+$3.1K this month", changeColor: "text-[#22C55E]", icon: Coins, iconColor: "text-accent-primary" },
    { label: "Pending KYC", value: String(dashboard?.pendingKycCount ?? 8), change: "Requires review", changeColor: "text-[#D97706]", valueColor: "text-[#D97706]", icon: UserCheck, iconColor: "text-[#D97706]" },
    { label: "Flagged Activity", value: String(dashboard?.flaggedActivity ?? 3), change: "Needs investigation", changeColor: "text-[#EF4444]", valueColor: "text-[#EF4444]", icon: Flag, iconColor: "text-[#EF4444]" },
  ];

  const feePoolBalances = feePools.map(pool => ({
    label: pool.token + " Pool",
    value: pool.token === "BNB"
      ? (parseFloat(pool.balance) / 1e18).toFixed(1) + " BNB"
      : pool.token === "SANC"
      ? (parseFloat(pool.balance) / 1e9 / 1e9 * 1e6).toFixed(0) + " SANC"
      : (parseFloat(pool.balance) / 1e18).toFixed(0) + " " + pool.token,
  }));

  const burnHistory = buybackHistory.slice(0, 3).map((b, i) => ({
    label: `Burn #${buybackHistory.length - i}`,
    date: new Date(b.executedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    amount: (parseFloat(b.sancOut) / 1e18).toLocaleString() + " SANC",
    hash: b.burnTxHash.slice(0, 6) + "..." + b.burnTxHash.slice(-2),
  }));

  const totalBNB = treasury ? (parseFloat(treasury.totalValue) / 1e18).toFixed(1) : "186.5";
  const totalUSD = treasury?.totalValueUSD ?? 116562;
  const treasuryBreakdown = [
    { label: "Matching Fund", value: treasury ? (parseFloat(treasury.matchingFund) / 1e18).toFixed(1) + " BNB" : "45.2 BNB", pct: 24 },
    { label: "Operations Fund", value: treasury ? (parseFloat(treasury.operationsFund) / 1e18).toFixed(1) + " BNB" : "98.1 BNB", pct: 53 },
    { label: "Escrow Active", value: treasury ? (parseFloat(treasury.totalEscrowed) / 1e18).toFixed(1) + " BNB" : "43.2 BNB", pct: 23 },
  ];

  const contracts = contractNames.map(name => ({
    name,
    address: contractAddresses[name],
    paused: contractStatus[name] ?? false,
    status: contractStatus[name] ? "Paused" : "Active",
  }));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 lg:py-8 flex flex-col gap-5 sm:gap-7">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-fg-primary">Platform Administration</h1>
          <p className="text-xs sm:text-sm text-fg-muted">Contract owner dashboard — manage charities, campaigns, treasury & emergency controls</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#F0F9FF] border border-accent-primary px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[11px] font-medium text-accent-primary">2 admins online</span>
          </div>
          <ComingSoonOverlay action="Emergency Pause All">
            <button className="flex items-center gap-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA] px-3 sm:px-4 py-2 sm:py-2.5">
              <Octagon className="h-4 w-4 text-[#EF4444]" />
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#EF4444]">Emergency Pause All</span>
            </button>
          </ComingSoonOverlay>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-fg-muted">{stat.label}</span>
              <stat.icon className={`h-[18px] w-[18px] ${stat.iconColor}`} />
            </div>
            <span className={`text-lg sm:text-2xl lg:text-[28px] font-bold ${(stat as any).valueColor || "text-fg-primary"}`}>{stat.value}</span>
            <span className={`text-xs ${stat.changeColor}`}>{stat.change}</span>
          </div>
        ))}
      </div>

      {/* KYC Queue */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-fg-primary">KYC Queue</h2>
            <span className="text-xs font-semibold text-[#D97706] bg-[#FEF3C7] rounded-full px-2.5 py-1">
              {dashboard?.pendingKycCount ?? 8} pending
            </span>
          </div>
          <Link href="/charity/admin/super/kyc" className="text-[13px] font-semibold text-accent-primary hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
        {/* Column Headers */}
        <div className="flex items-center px-4 sm:px-6 py-2.5 bg-[#F0F9FF] text-xs font-semibold text-fg-muted">
          <span className="w-[280px]">Organization</span>
          <span className="w-[140px]">Submitted</span>
          <span className="w-[120px]">Documents</span>
          <span className="w-[120px]">Status</span>
          <span className="flex-1" />
          <span>Actions</span>
        </div>
        {/* Rows */}
        {kycQueue.map((item, i) => {
          const style = kycStatusStyle(item.status);
          const dateStr = new Date(item.submittedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          return (
            <div key={item.charityId}>
              <div className="flex items-center px-4 sm:px-6 py-3.5">
                <div className="w-[280px] flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-fg-primary">{item.name}</span>
                  <span className="text-xs text-fg-muted">{item.website}</span>
                </div>
                <span className="w-[140px] text-[13px] text-fg-secondary font-mono">{dateStr}</span>
                <div className="w-[120px] flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-accent-primary" />
                  <span className="text-xs text-fg-secondary">{item.documentsIPFS.length} files (IPFS)</span>
                  <span className="text-[11px] font-medium text-accent-primary ml-1">Preview</span>
                </div>
                <div className="w-[120px]">
                  <span className={`text-[11px] font-semibold ${style.color} ${style.bg} rounded-full px-2.5 py-1`}>{style.label}</span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveKyc(item.charityId)}
                    className="text-xs font-semibold text-white bg-[#22C55E] rounded-md px-3.5 py-1.5"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectKyc(item.charityId)}
                    className="text-xs font-semibold text-fg-secondary border border-[#FECACA] rounded-md px-3.5 py-1.5"
                  >
                    Reject
                  </button>
                </div>
              </div>
              {i < kycQueue.length - 1 && <div className="h-px bg-line-subtle" />}
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* Charity Management */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-fg-primary">Charity Management</h2>
            <span className="text-xs font-semibold text-accent-primary bg-[#E0F2FE] rounded-full px-2.5 py-1">
              {totalCharities} total
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#F0F9FF] border border-line-subtle rounded-lg px-3.5 py-2">
            <Search className="h-4 w-4 text-fg-muted" />
            <span className="text-[13px] text-fg-muted">Search charities...</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[880px]">
        {/* Column Headers */}
        <div className="flex items-center px-4 sm:px-6 py-2.5 bg-[#F0F9FF] text-xs font-semibold text-fg-muted">
          <span className="w-[260px]">Charity Name</span>
          <span className="w-[160px]">Wallet</span>
          <span className="w-[100px]">Campaigns</span>
          <span className="w-[120px]">Stake</span>
          <span className="w-[120px]">Status</span>
          <span className="flex-1" />
          <span>Actions</span>
        </div>
        {/* Rows */}
        {charities.map((c, i) => {
          const style = charityStatusStyle(c.status);
          const statusLabel = c.status.charAt(0).toUpperCase() + c.status.slice(1);
          const registeredDate = new Date(c.registeredAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" });
          const sub =
            c.status === CharityStatus.Verified
              ? "Verified since " + registeredDate
              : c.status === CharityStatus.Suspended
              ? "Suspended"
              : "Registered " + registeredDate;
          const subColor =
            c.status === CharityStatus.Suspended ? "text-[#EF4444]" : "text-fg-muted";

          type ActionDef = { label: string; fill?: string; border?: string; onClick: () => void };
          let actions: ActionDef[] = [];
          if (c.status === CharityStatus.Verified) {
            actions = [
              { label: "Suspend", border: "border-[#FDE68A]", onClick: () => handleSuspendCharity(c.id) },
              { label: "Revoke", border: "border-[#FECACA]", onClick: () => handleRevokeCharity(c.id) },
            ];
          } else if (c.status === CharityStatus.Suspended) {
            actions = [
              { label: "Reactivate", fill: "bg-[#22C55E] text-white", onClick: () => handleReactivateCharity(c.id) },
              { label: "Revoke", border: "border-[#FECACA]", onClick: () => handleRevokeCharity(c.id) },
            ];
          } else {
            actions = [
              { label: "Verify", fill: "bg-accent-primary text-white", onClick: () => handleVerifyCharity(c.id) },
              { label: "Reject", border: "border-[#FECACA]", onClick: () => handleRevokeCharity(c.id) },
            ];
          }

          return (
            <div key={c.id}>
              <div className="flex items-center px-6 py-3.5">
                <div className="w-[260px] flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-fg-primary">{c.name}</span>
                  <span className={`text-xs ${subColor}`}>{sub}</span>
                </div>
                <span className="w-[160px] text-xs text-fg-secondary font-mono">{c.ownerAddress}</span>
                <span className="w-[100px] text-[13px] text-fg-secondary">{c.campaignCount} campaigns</span>
                <span className="w-[120px] text-[13px] text-fg-secondary font-mono">10M SANC</span>
                <div className="w-[120px]">
                  <span className={`text-[11px] font-semibold ${style.color} ${style.bg} rounded-full px-2.5 py-1 inline-flex items-center gap-1`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${c.status === CharityStatus.Verified ? "bg-[#22C55E]" : c.status === CharityStatus.Suspended ? "bg-[#D97706]" : "bg-[#94A3B8]"}`} />
                    {statusLabel}
                  </span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className={`text-xs font-semibold rounded-md px-3.5 py-1.5 ${action.fill || `text-fg-secondary border ${action.border}`}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
              {i < charities.length - 1 && <div className="h-px bg-line-subtle" />}
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* Campaign Moderation */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-fg-primary">Campaign Moderation</h2>
            <span className="text-xs font-semibold text-[#EF4444] bg-[#FEF2F2] rounded-full px-2.5 py-1">3 flagged</span>
          </div>
          <Link href="/charity/admin/super/campaigns" className="text-[13px] font-semibold text-accent-primary hover:underline">View All Campaigns →</Link>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
        {/* Column Headers */}
        <div className="flex items-center px-4 sm:px-6 py-2.5 bg-[#F0F9FF] text-xs font-semibold text-fg-muted">
          <span className="w-[300px]">Campaign</span>
          <span className="w-[180px]">Charity</span>
          <span className="w-[120px]">Raised</span>
          <span className="w-[120px]">Status</span>
          <span className="flex-1" />
          <span>Actions</span>
        </div>
        {/* Rows */}
        {campaigns.map((c, i) => {
          const isFeatured = c.featured;
          const isActive = c.status === CampaignStatus.Active;
          const isFlagged = c.status === ("flagged" as CampaignStatus);
          const statusLabel = isFeatured ? "Featured" : c.status.charAt(0).toUpperCase() + c.status.slice(1);
          const statusBg = isFeatured ? "bg-[#FEF3C7]" : isActive ? "bg-[#DCFCE7]" : isFlagged ? "bg-[#FEF2F2]" : "bg-[#F1F5F9]";
          const statusColor = isFeatured ? "text-[#D97706]" : isActive ? "text-[#16A34A]" : isFlagged ? "text-[#EF4444]" : "text-fg-secondary";
          const dotColor = isFeatured ? "bg-[#D97706]" : isActive ? "bg-[#22C55E]" : isFlagged ? "bg-[#EF4444]" : "bg-[#94A3B8]";
          const raised = "$" + (c.totalRaisedUSD / 1000).toFixed(0) + "K";
          const icon = isFeatured ? Star : isFlagged ? Flag : null;
          const iconColor = isFeatured ? "text-[#D97706]" : "text-[#EF4444]";

          return (
            <div key={c.id}>
              <div className="flex items-center px-6 py-3.5">
                <div className="w-[300px] flex items-center gap-2">
                  {icon ? <>{icon === Star ? <Star className={`h-4 w-4 ${iconColor}`} /> : <Flag className={`h-4 w-4 ${iconColor}`} />}</> : <span className="w-4" />}
                  <span className="text-sm font-semibold text-fg-primary">{c.name}</span>
                </div>
                <span className="w-[180px] text-[13px] text-fg-secondary">{c.charity.name}</span>
                <span className="w-[120px] text-[13px] text-fg-secondary font-mono">{raised}</span>
                <div className="w-[120px]">
                  <span className={`text-[11px] font-semibold ${statusColor} ${statusBg} rounded-full px-2.5 py-1 inline-flex items-center gap-1`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                    {statusLabel}
                  </span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  {isFeatured ? (
                    <button
                      onClick={() => handleFeatureCampaign(c.id, false)}
                      className="text-xs font-semibold text-fg-secondary border border-line-subtle rounded-md px-3.5 py-1.5"
                    >
                      Unfeature
                    </button>
                  ) : isFlagged ? (
                    <>
                      <button
                        onClick={() => setShowComingSoon(true)}
                        className="text-xs font-semibold text-white bg-[#D97706] rounded-md px-3.5 py-1.5"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleForceCancelCampaign(c.id)}
                        className="text-xs font-semibold text-white bg-[#EF4444] rounded-md px-3.5 py-1.5"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleFeatureCampaign(c.id, true)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white bg-accent-primary rounded-md px-3.5 py-1.5"
                    >
                      <Star className="h-3 w-3" />
                      Feature
                    </button>
                  )}
                </div>
              </div>
              {i < campaigns.length - 1 && <div className="h-px bg-line-subtle" />}
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* Buyback & Burn + Treasury Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buyback & Burn */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4 sm:gap-5 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2.5">
            <Flame className="h-5 w-5 text-[#EF4444] shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-fg-primary">Buyback & Burn</h2>
          </div>

          <span className="text-[13px] font-semibold text-fg-muted">Fee Pool Balances</span>
          <div className="flex flex-col gap-2">
            {feePoolBalances.map((pool) => (
              <div key={pool.label} className="flex items-center justify-between gap-2 bg-[#F0F9FF] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3">
                <span className="text-[12px] sm:text-[13px] text-fg-secondary min-w-0 truncate">{pool.label}</span>
                <span className="text-sm sm:text-base font-bold text-fg-primary font-mono shrink-0">{pool.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[12px] sm:text-[13px] font-semibold text-fg-primary">Slippage Tolerance</span>
            <div className="flex items-center gap-1 bg-[#F0F9FF] border border-line-subtle rounded-lg px-3 py-2">
              <span className="text-sm font-semibold text-fg-primary">2</span>
              <span className="text-sm text-fg-muted">%</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-fg-muted font-mono">minSancOut: 125,000</span>
          </div>

          <button
            onClick={() => handleExecuteBuyback("125000")}
            className="flex items-center justify-center gap-2 w-full h-11 bg-accent-primary rounded-lg"
          >
            <Flame className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Execute Buyback & Burn</span>
          </button>

          <span className="text-[13px] font-semibold text-fg-muted">Burn History</span>
          <div className="flex flex-col gap-2">
            {burnHistory.map((burn) => (
              <div key={burn.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 bg-[#FEF2F2] rounded-lg px-3 sm:px-3.5 py-2.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-fg-primary">{burn.label}</span>
                  <span className="text-[10px] sm:text-[11px] text-fg-muted">{burn.date}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#EF4444] font-mono truncate">{burn.amount}</span>
                  <span className="text-[10px] sm:text-[11px] text-fg-muted font-mono shrink-0">{burn.hash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treasury Overview */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4 sm:gap-5 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2.5">
            <Vault className="h-5 w-5 text-accent-primary shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-fg-primary">Treasury Overview</h2>
          </div>

          <div className="bg-surface-inverse rounded-xl p-4 sm:p-5 flex flex-col gap-1">
            <span className="text-xs text-fg-muted">Total Platform Value</span>
            <span className="text-xl sm:text-2xl lg:text-[32px] font-bold text-white font-mono">{totalBNB} BNB</span>
            <span className="text-xs sm:text-sm text-fg-muted font-mono">≈ ${totalUSD.toLocaleString()}</span>
          </div>

          <div className="flex flex-col gap-3.5">
            {treasuryBreakdown.map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-fg-secondary">{item.label}</span>
                  <span className="text-[13px] font-semibold text-fg-primary font-mono">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[#F0F9FF] overflow-hidden">
                  <div className="h-full rounded-full bg-accent-primary" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Private Campaign Fee Configuration */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center gap-2.5">
          <Lock className="h-5 w-5 text-[#7C3AED] shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-fg-primary">Private Campaign Fee</h2>
          <span className="ml-auto text-[11px] font-semibold text-[#7C3AED] bg-[#F5F3FF] rounded-full px-2.5 py-1">
            Currently 0%
          </span>
        </div>

        <p className="text-[13px] text-fg-muted">
          Set the platform fee applied to donations made through <span className="font-semibold text-fg-primary">private (unlisted) campaigns</span>. Public campaigns always charge 2% (1% when donors pay with SANC) and are not configurable here.
        </p>

        <div className="bg-[#F5F3FF] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#4C1D95]">Active Fee Rate</span>
            <span className="text-xl font-bold text-[#7C3AED] font-mono">0%</span>
          </div>
          <div className="h-px bg-[#DDD6FE]" />
          <div className="flex items-center gap-2 text-[12px] text-[#6D28D9]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shrink-0" />
            100% of every private-campaign donation goes directly to the charity
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-fg-primary">New Fee Rate (%)</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-line-subtle rounded-xl px-4 py-3 bg-[#F8FAFC] flex-1 max-w-[180px]">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={privateFeeInput}
                onChange={(e) => setPrivateFeeInput(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-fg-primary outline-none"
                placeholder="0"
              />
              <span className="text-sm font-semibold text-fg-muted">%</span>
            </div>
            <span className="text-[12px] text-fg-muted">Range: 0% – 10%</span>
          </div>
          <p className="text-[11px] text-fg-muted">
            Calls <code className="font-mono bg-[#F1F5F9] px-1.5 py-0.5 rounded text-[#475569]">setPrivateCampaignFeeBps()</code> on the DonationManager contract. Only the contract owner can execute this.
          </p>
        </div>

        <ComingSoonOverlay action="Update Private Campaign Fee">
          <button className="flex items-center justify-center gap-2 w-full h-11 bg-[#7C3AED] rounded-xl">
            <Lock className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">Update Private Campaign Fee</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Emergency Controls + Event Listener Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-2 border-[#FEF2F2] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldOff className="h-5 w-5 text-[#EF4444]" />
              <h2 className="text-lg font-bold text-fg-primary">Emergency Controls</h2>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              All Systems Active
            </span>
          </div>

          <p className="text-[13px] text-fg-muted">Pausable circuit breaker — pause/unpause individual smart contracts</p>

          <div className="flex flex-col gap-2.5">
            {contracts.map((contract) => (
              <div
                key={contract.name}
                className={`flex items-center justify-between rounded-lg px-4 py-3.5 ${contract.paused ? "bg-[#FEF2F2] border border-[#FECACA]" : "bg-[#F0F9FF]"}`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-fg-primary">{contract.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-accent-primary font-mono">{contract.address}</span>
                    <ExternalLink className="h-2.5 w-2.5 text-accent-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1 ${contract.paused ? "text-[#EF4444] bg-[#FEF2F2]" : "text-[#16A34A] bg-[#DCFCE7]"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${contract.paused ? "bg-[#EF4444]" : "bg-[#22C55E]"}`} />
                    {contract.status}
                  </span>
                  {contract.paused ? (
                    <button
                      onClick={() => handleUnpauseContract(contract.name)}
                      className="text-xs font-semibold text-white bg-[#22C55E] rounded-md px-3.5 py-1.5"
                    >
                      Unpause
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePauseContract(contract.name)}
                      className="text-xs font-semibold text-[#EF4444] border border-[#FECACA] rounded-md px-3.5 py-1.5"
                    >
                      Pause
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Listener Status */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="h-5 w-5 text-accent-primary" />
              <h2 className="text-lg font-bold text-fg-primary">Event Listener Status</h2>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              {(eventListener?.syncLag ?? 99) < 10 ? "Healthy" : "Disconnected"}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { label: "Last Synced Block", value: eventListener ? eventListener.latestBlock.toLocaleString() : "38,847,221", mono: true, color: "text-fg-primary" },
              { label: "Sync Lag", value: eventListener ? eventListener.syncLag + " blocks" : "2 blocks", mono: true, color: "text-[#22C55E]" },
              { label: "Last Event Processed", value: "12 seconds ago", mono: true, color: "text-fg-primary" },
              { label: "Events Today", value: eventListener ? eventListener.eventsToday.toLocaleString() : "1,247", mono: true, color: "text-fg-primary", bold: true },
              { label: "Failed Events", value: "0", mono: true, color: "text-[#22C55E]", bold: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-[#F0F9FF] rounded-lg px-4 py-3">
                <span className="text-[13px] text-fg-muted">{item.label}</span>
                <span className={`text-sm ${item.bold ? "font-bold" : "font-semibold"} ${item.color} ${item.mono ? "font-mono" : ""}`}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#F0F9FF] border border-line-subtle rounded-lg px-3.5 py-2.5 flex-1">
              <span className="text-[13px] text-fg-muted">From Block:</span>
              <span className="text-[13px] font-semibold text-fg-primary font-mono">
                {eventListener ? eventListener.latestBlock.toLocaleString() : "38,847,221"}
              </span>
            </div>
            <ComingSoonOverlay action="Trigger Backfill">
              <button className="flex items-center justify-center gap-2 border border-line-subtle rounded-lg px-5 h-11">
                <RefreshCw className="h-4 w-4 text-fg-secondary" />
                <span className="text-sm font-semibold text-fg-secondary">Trigger Backfill</span>
              </button>
            </ComingSoonOverlay>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-fg-muted">Recent Events</span>
            {recentEvents.map((event) => (
              <div key={event.name} className="flex items-center gap-2 py-2">
                <span className={`h-1.5 w-1.5 rounded-full ${event.color}`} />
                <span className="text-xs font-semibold text-fg-primary font-mono">{event.name}</span>
                <div className="flex-1" />
                <span className="text-[11px] text-fg-muted font-mono">Block {event.block}</span>
                <span className="text-[11px] text-fg-muted font-mono">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showComingSoon && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowComingSoon(false)}>
          <div className="bg-white rounded-2xl p-5 sm:p-8 max-w-sm w-full mx-3 sm:mx-4 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <span className="text-lg font-bold text-fg-primary">Coming Soon</span>
            <p className="text-sm text-fg-secondary">{comingSoonMessage}</p>
            <button onClick={() => setShowComingSoon(false)} className="bg-accent-primary text-white rounded-lg px-6 py-2.5 text-sm font-semibold">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
