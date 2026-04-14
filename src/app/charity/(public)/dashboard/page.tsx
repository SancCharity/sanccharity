"use client";

import { useAccount } from "wagmi";
import Link from "next/link";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useDonorDashboard } from "@/hooks/useDonorDashboard";
import {
  Gem, Pencil, Star, Trophy, Vote, Medal, Award, TriangleAlert,
  Heart, Layers, Flame, Coins, ArrowRight, ChevronLeft, ChevronRight,
  GraduationCap, Trees, Stethoscope, FileText, Download, ShieldCheck,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Education: GraduationCap,
  Environment: Trees,
  Health: Stethoscope,
};

const statusTabs = ["All", "Active", "Completed"];
const tokenTabs = ["All Tokens", "BNB", "SANC", "USDT"];

function formatAmount(amount: string, symbol: string): string {
  const n = Number(amount);
  if (symbol === "BNB") return `${(n / 1e18).toFixed(3)} BNB`;
  if (symbol === "SANC") return `${(n / 1e9 / 1e6).toFixed(1)}M SANC`;
  return `${(n / 1e18).toFixed(0)} ${symbol}`;
}

export default function DonorDashboardPage() {
  const { address } = useAccount();
  const {
    profile,
    donations,
    totalDonations,
    totalDonationPages,
    nfts,
    impact,
    taxSummary,
    refunds,
    isLoading,
    donationFilter,
    setDonationFilter,
    handleClaimRefund,
    handleDownloadTax,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  } = useDonorDashboard(address);

  const claimableRefund = refunds.find((r) => r.status === "claimable");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#0EA5E9] border-t-transparent animate-spin" />
          <span className="text-[14px] text-[#94A3B8]">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden">
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 flex flex-col gap-4 text-center shadow-card-dark">
            <p className="text-lg font-bold text-fg-primary">Coming Soon</p>
            <p className="text-sm text-fg-secondary">{comingSoonMessage}</p>
            <button onClick={() => setShowComingSoon(false)} className="mt-2 px-6 py-2.5 bg-accent-primary text-fg-inverse rounded-full text-sm font-semibold">Got it</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 max-w-[1440px] mx-auto">

        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl md:text-[32px] font-bold text-[#0F172A]">My Dashboard</h1>
              {profile && (
                <span className="flex items-center gap-1 px-3 py-1 bg-[#E0F2FE] rounded-full">
                  <Gem className="h-3.5 w-3.5 text-[#0EA5E9]" />
                  <span className="text-[12px] font-semibold text-[#0EA5E9]">{profile.tier.replace("_", " ")} Tier</span>
                </span>
              )}
              <ComingSoonOverlay action="Edit profile">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] rounded-lg">
                  <Pencil className="h-3.5 w-3.5 text-[#475569]" />
                  <span className="text-[12px] font-semibold text-[#475569]">Edit Profile</span>
                </button>
              </ComingSoonOverlay>
            </div>
            <p className="text-[16px] text-[#475569]">Track your donations, NFT receipts, and impact across all campaigns.</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {(profile?.badges ?? []).map((badge) => (
                <span key={badge} className="flex items-center gap-1 px-2.5 py-1 bg-[#EDE9FE] rounded-full">
                  <Star className="h-3 w-3 text-[#7C3AED]" />
                  <span className="text-[11px] font-semibold text-[#7C3AED]">{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Refund Alert */}
        {claimableRefund && (
          <div className="flex items-center justify-between p-4 px-5 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl">
            <div className="flex items-center gap-3 flex-1">
              <TriangleAlert className="h-5 w-5 text-[#D97706]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold text-[#92400E]">You have {refunds.filter(r => r.status === "claimable").length} pending refund</span>
                <span className="text-[12px] text-[#A16207]">{claimableRefund.campaignName} was cancelled — {claimableRefund.tokenSymbol} available to claim</span>
              </div>
            </div>
            <ComingSoonOverlay action="Claim refund">
              <button className="px-5 py-2.5 bg-[#F59E0B] rounded-full">
                <span className="text-[13px] font-semibold text-white">Claim Refund</span>
              </button>
            </ComingSoonOverlay>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col gap-2 p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="h-9 w-9 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Heart className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
            <span className="text-[13px] font-medium text-[#94A3B8]">Total Donated</span>
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold text-[#0F172A]">${(profile?.totalDonatedUSD ?? 0).toLocaleString()}</span>
            <span className="text-[12px] text-[#475569]">Across {profile?.donationCount ?? 0} donations</span>
          </div>

          <div className="flex flex-col gap-2 p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="h-9 w-9 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Award className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
            <span className="text-[13px] font-medium text-[#94A3B8]">NFT Receipts</span>
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold text-[#0F172A]">{profile?.nftTokenIds.length ?? 0}</span>
            <span className="text-[12px] text-[#475569]">BEP-721 donation proofs</span>
          </div>

          <div className="flex flex-col gap-2 p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="h-9 w-9 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Layers className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
            <span className="text-[13px] font-medium text-[#94A3B8]">Campaigns Supported</span>
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold text-[#0F172A]">{profile?.campaignsSupported ?? 0}</span>
            <span className="text-[12px] text-[#0EA5E9]">{profile?.campaignsCompleted ?? 0} completed, {profile?.campaignsActive ?? 0} active</span>
          </div>

          <div className="flex flex-col gap-2 p-5 sm:p-6 bg-[#0F172A] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="h-9 w-9 rounded-full bg-white/[0.13] flex items-center justify-center">
              <Flame className="h-[18px] w-[18px] text-white/70" />
            </div>
            <span className="text-[13px] font-medium text-white/50">SANC Fee Saved</span>
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold text-white">${(profile?.feeSaved ?? 0).toFixed(2)}</span>
            <span className="text-[12px] text-white/50">50% discount with SANC</span>
          </div>

          <div className="flex flex-col gap-2 p-5 sm:p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="h-9 w-9 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <Coins className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
            <span className="text-[13px] font-medium text-[#94A3B8]">Governance</span>
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold text-[#0F172A]">
              {profile ? `${(profile.votingPower / 1e9 / 1e6).toFixed(0)}M SANC` : "—"}
            </span>
            <Link href="/charity/governance" className="flex items-center gap-1.5">
              <span className="text-[12px] font-medium text-[#0EA5E9]">{profile?.votingPower}x Power · Governance</span>
              <ArrowRight className="h-3 w-3 text-[#0EA5E9]" />
            </Link>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-7 py-5">
            <span className="text-[18px] font-bold text-[#0F172A]">Donation History</span>
            <div className="flex items-center gap-2 flex-wrap">
              {statusTabs.map((t) => (
                <button key={t}
                  onClick={() => setDonationFilter((f) => ({ ...f, status: t === "All" ? undefined : t.toLowerCase(), page: 1 }))}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium ${
                    (donationFilter.status ?? "all") === (t === "All" ? "all" : t.toLowerCase())
                      ? "bg-[#0EA5E9] text-white font-semibold"
                      : "bg-[#F0F9FF] text-[#475569]"
                  }`}>
                  {t}
                </button>
              ))}
              <div className="w-px h-5 bg-[#E2E8F0] mx-1" />
              {tokenTabs.map((t) => (
                <button key={t}
                  onClick={() => setDonationFilter((f) => ({ ...f, token: t === "All Tokens" ? undefined : t, page: 1 }))}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium ${
                    (donationFilter.token ?? "All Tokens") === t
                      ? "bg-[#0EA5E9] text-white font-semibold"
                      : "bg-[#F0F9FF] text-[#475569]"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="flex items-center px-5 sm:px-7 py-3 bg-[#F0F9FF]">
                <span className="flex-1 text-[12px] font-semibold text-[#94A3B8] uppercase">Campaign</span>
                <span className="w-[140px] text-[12px] font-semibold text-[#94A3B8] uppercase">Amount</span>
                <span className="w-[80px] text-[12px] font-semibold text-[#94A3B8] uppercase">Token</span>
                <span className="w-[120px] text-[12px] font-semibold text-[#94A3B8] uppercase">Date</span>
                <span className="w-[100px] text-[12px] font-semibold text-[#94A3B8] uppercase">Fee</span>
                <span className="w-[60px] text-[12px] font-semibold text-[#94A3B8] uppercase">NFT</span>
              </div>

              {donations.length === 0 ? (
                <div className="flex items-center justify-center h-24 px-7">
                  <span className="text-[14px] text-[#94A3B8]">No donations found</span>
                </div>
              ) : donations.map((d, i) => (
                <div key={d.id}>
                  <div className={`flex items-center px-5 sm:px-7 py-3.5 ${i % 2 === 1 ? "bg-[#F0F9FF]" : ""}`}>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-[14px] font-medium text-[#0EA5E9]">{d.campaignName}</span>
                      <span className="text-[12px] text-[#94A3B8]">{d.charityName}</span>
                    </div>
                    <span className="w-[140px] text-[14px] font-semibold text-[#0F172A]">{formatAmount(d.amount, d.tokenSymbol)}</span>
                    <span className="w-[80px] text-[14px] text-[#475569]">{d.tokenSymbol}</span>
                    <span className="w-[120px] text-[14px] text-[#475569]">{new Date(d.timestamp * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="w-[100px] text-[13px] text-[#94A3B8]">{formatAmount(d.feeAmount, d.tokenSymbol)}</span>
                    <div className="w-[60px] flex justify-center">
                      <Link href={`/charity/nft/${d.nftTokenId}`}>
                        <Award className="h-[18px] w-[18px] text-[#0EA5E9]" />
                      </Link>
                    </div>
                  </div>
                  {i < donations.length - 1 && <div className="h-px bg-black/[0.04]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 py-4">
            <button
              disabled={donationFilter.page <= 1}
              onClick={() => setDonationFilter((f) => ({ ...f, page: f.page - 1 }))}
              className="h-8 w-8 rounded-lg bg-[#F0F9FF] flex items-center justify-center disabled:opacity-40">
              <ChevronLeft className="h-4 w-4 text-[#94A3B8]" />
            </button>
            {Array.from({ length: Math.min(totalDonationPages, 5) }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setDonationFilter((f) => ({ ...f, page: p }))}
                className={`h-8 w-8 rounded-lg flex items-center justify-center text-[13px] font-medium ${donationFilter.page === p ? "bg-[#0EA5E9] text-white" : "bg-[#F0F9FF] text-[#475569]"}`}>
                {p}
              </button>
            ))}
            <button
              disabled={donationFilter.page >= totalDonationPages}
              onClick={() => setDonationFilter((f) => ({ ...f, page: f.page + 1 }))}
              className="h-8 w-8 rounded-lg bg-[#F0F9FF] flex items-center justify-center disabled:opacity-40">
              <ChevronRight className="h-4 w-4 text-[#94A3B8]" />
            </button>
            <span className="text-[12px] text-[#94A3B8] ml-2">Showing {donations.length} of {totalDonations}</span>
          </div>
        </div>

        {/* NFT Collection */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[22px] font-bold text-[#0F172A]">My Donation NFTs</span>
            <span className="text-[13px] font-semibold text-[#0EA5E9]">Total: {nfts.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nfts.slice(0, 4).map((nft) => (
              <Link key={nft.tokenId} href={`/charity/nft/${nft.tokenId}`}>
                <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="h-[140px] bg-[#0F172A] flex items-center justify-center">
                    <Award className={`h-10 w-10 ${nft.donationTier === "Gold" ? "text-[#FFD700]" : nft.donationTier === "Silver" ? "text-[#C0C0C0]" : "text-[#CD7F32]"}`} />
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold text-[#94A3B8] font-mono">Donation #{nft.tokenId.toString().padStart(4, "0")}</span>
                    <span className="text-[14px] font-semibold text-[#0F172A]">{nft.campaignName}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#0EA5E9]">{formatAmount(nft.amount, nft.tokenSymbol)}</span>
                      <span className="text-[12px] text-[#94A3B8]">{new Date(nft.timestamp * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#0EA5E9]">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Impact & Tax Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[18px] font-bold text-[#0F172A]">My Impact</span>
            <div className="flex flex-col gap-3">
              {impact.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.category] ?? GraduationCap;
                return (
                  <div key={cat.category} className="flex items-center gap-3 p-3.5 bg-[#F0F9FF] rounded-xl">
                    <div className="h-9 w-9 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
                      <Icon className="h-[18px] w-[18px] text-[#0EA5E9]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#0F172A]">{cat.category}</span>
                      <span className="text-[12px] text-[#94A3B8]">{cat.description}</span>
                    </div>
                    <span className="text-[14px] font-bold text-[#0EA5E9]">${cat.totalUSD.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5 p-5 sm:p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0EA5E9]" />
              <span className="text-[18px] font-bold text-[#0F172A]">Tax Receipts</span>
            </div>
            <p className="text-[14px] text-[#475569]">All donation NFTs serve as immutable tax receipts. Download a summary for your records.</p>

            <div className="flex flex-col gap-2 p-4 bg-[#F0F9FF] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#475569]">{taxSummary?.year ?? 2026} YTD Donations</span>
                <span className="text-[13px] font-bold text-[#0F172A]">${(taxSummary?.totalDonatedUSD ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#475569]">Total Transactions</span>
                <span className="text-[13px] font-bold text-[#0F172A]">{taxSummary?.totalTransactions ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#475569]">Unique Charities</span>
                <span className="text-[13px] font-bold text-[#0F172A]">{taxSummary?.uniqueCharities ?? 0}</span>
              </div>
            </div>

            <ComingSoonOverlay action="Download tax summary">
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#0EA5E9] rounded-full">
                <Download className="h-4 w-4 text-white" />
                <span className="text-[14px] font-semibold text-white">Download Tax Summary</span>
              </button>
            </ComingSoonOverlay>

            <div className="flex flex-col gap-2 p-4 bg-[#F0F9FF] rounded-xl">
              <span className="text-[13px] font-semibold text-[#0F172A]">Connected Wallet</span>
              <span className="text-[14px] text-[#475569] font-mono">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
                <span className="text-[12px] text-[#94A3B8]">BNB Smart Chain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 bg-[#0F172A] rounded-2xl">
          <ShieldCheck className="h-6 w-6 text-white shrink-0" />
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[14px] sm:text-[16px] font-bold text-white">Your donations are permanently recorded on-chain</span>
            <span className="text-[12px] sm:text-[13px] text-white/65">Every donation mints an ERC-721 NFT receipt with immutable proof. Verify any transaction on BscScan.</span>
          </div>
          <button className="px-5 py-2.5 bg-white rounded-full shrink-0">
            <span className="text-[13px] font-semibold text-[#0F172A]">View on BscScan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
