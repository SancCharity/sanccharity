"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";
import { Gem, ShieldCheck, LinkIcon, Download, BadgeCheck, Flag, CircleCheck, CircleDashed, ArrowRightLeft, ExternalLink, Copy, Heart, Info } from "lucide-react";
import { useNFTDetail } from "@/hooks/useNFTDetail";

export default function NFTDetailPage() {
  const params = useParams();
  const tokenId = parseInt(params.id as string) || 4821;
  const { nft, verification, isLoading } = useNFTDetail(tokenId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <span className="text-[#94A3B8]">Loading NFT receipt...</span>
      </div>
    );
  }

  const display = {
    tokenId: nft?.tokenId ?? tokenId,
    donor: nft?.donor ?? "—",
    campaignName: nft?.campaignName ?? "—",
    charityName: nft?.charityName ?? "—",
    tokenSymbol: nft?.tokenSymbol ?? "—",
    amount: nft ? (parseFloat(nft.amount) / 1e18).toFixed(2) : "—",
    amountUSD: nft?.amountUSD ?? 0,
    feeAmount: nft ? (parseFloat(nft.feeAmount) / 1e18).toFixed(4) : "—",
    timestamp: nft ? new Date(nft.timestamp * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
    txHash: nft?.txHash ?? "—",
    blockNumber: nft?.blockNumber?.toLocaleString() ?? "—",
    standard: "BEP-721",
    ipfsMetadataHash: nft?.ipfsMetadataHash ?? "—",
    donationTier: nft?.donationTier ?? "—",
    category: nft?.category ?? "—",
    impactScore: nft?.impactScore ?? 0,
    contractAddress: nft?.contractAddress ?? "—",
  };

  const tierGradient = display.donationTier === "Gold"
    ? "linear-gradient(180deg, #FEF3C7 0%, #F59E0B 100%)"
    : display.donationTier === "Silver"
    ? "linear-gradient(180deg, #F1F5F9 0%, #94A3B8 100%)"
    : "linear-gradient(180deg, #FEF2F2 0%, #CD7F32 100%)";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <PageContainer className="flex items-center gap-2 py-4">
        <Link href="/charity" className="text-[13px] text-[#94A3B8]">Home</Link>
        <span className="text-[13px] text-[#94A3B8]">/</span>
        <Link href="/charity/dashboard" className="text-[13px] text-[#94A3B8]">Donations</Link>
        <span className="text-[13px] text-[#94A3B8]">/</span>
        <span className="text-[13px] font-medium text-[#0F172A]">Receipt #{tokenId}</span>
      </PageContainer>

      {/* Main Content */}
      <PageContainer className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 pt-6 lg:pt-10 pb-10 lg:pb-[60px]">
        {/* Left Column */}
        <div className="w-full lg:w-[400px] flex flex-col gap-5 shrink-0">
          {/* NFT Card */}
          <div className="flex flex-col items-center justify-center gap-4 h-[480px] rounded-2xl overflow-hidden"
            style={{ background: tierGradient }}>
            <Gem className="h-20 w-20 text-white" />
            <span className="text-[22px] font-bold text-white">Donation Receipt</span>
            <span className="text-[48px] font-bold text-white/80 font-mono">#{display.tokenId}</span>
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white/20 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              <span className="text-[12px] font-semibold text-white">Verified On-Chain</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3 justify-center w-full">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-lg">
              <svg className="h-4 w-4 text-[#475569]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <span className="text-[13px] font-medium text-[#475569]">Share on Twitter</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-lg">
              <LinkIcon className="h-4 w-4 text-[#475569]" />
              <span className="text-[13px] font-medium text-[#475569]">Copy Link</span>
            </button>
          </div>

          {/* Download Receipt */}
          <button className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#0EA5E9] rounded-lg">
            <Download className="h-4 w-4 text-white" />
            <span className="text-[13px] font-medium text-white">Download Receipt</span>
          </button>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[460px] flex flex-col gap-6">
          {/* Title Row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-[26px] font-bold text-[#0F172A]">Donation Receipt #{display.tokenId}</h1>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#DCFCE7] rounded-full">
              <BadgeCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              <span className="text-[11px] font-semibold text-[#16A34A]">Verified</span>
            </div>
          </div>

          {/* Campaign Row */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#94A3B8]">Campaign</span>
            <Link href={`/charity/campaign/${nft?.campaignId ?? ""}`} className="text-[15px] font-semibold text-[#0EA5E9] hover:underline">
              {display.campaignName}
            </Link>
          </div>

          {/* Charity Row */}
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-medium text-[#475569]">{display.charityName}</span>
            <BadgeCheck className="h-3.5 w-3.5 text-[#0EA5E9]" />
          </div>

          {/* Milestone Status */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-[#0EA5E9]" />
                <span className="text-[15px] font-semibold text-[#0F172A]">Campaign Progress</span>
              </div>
              <span className="text-[14px] font-semibold text-[#0EA5E9]">3 of 4</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded">
              <div className="h-1.5 bg-[#0EA5E9] rounded" style={{ width: "75%" }} />
            </div>
            <div className="flex gap-2">
              {[
                { label: "Phase 1", done: true },
                { label: "Phase 2", done: true },
                { label: "Phase 3", done: true },
                { label: "Phase 4", done: false },
              ].map((ms) => (
                <div key={ms.label} className="flex-1 flex flex-col items-center gap-0.5">
                  {ms.done ? (
                    <CircleCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                  ) : (
                    <CircleDashed className="h-3.5 w-3.5 text-[#94A3B8]" />
                  )}
                  <span className="text-[10px] text-[#94A3B8]">{ms.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="p-5 bg-[#F0F9FF] rounded-xl flex flex-col gap-3.5">
            <span className="text-[15px] font-semibold text-[#0F172A]">Transaction Details</span>
            <div className="h-px bg-[#E2E8F0]" />
            {[
              { label: "Amount", value: `${display.amount} ${display.tokenSymbol}`, mono: false },
              { label: "USD Value", value: `$${display.amountUSD.toFixed(2)}`, mono: false },
              { label: "Date", value: display.timestamp, mono: false },
              { label: "Token ID", value: `#${display.tokenId}`, mono: true },
              { label: "Token Standard", value: display.standard, mono: true },
              { label: "Block", value: `#${display.blockNumber}`, mono: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-[13px] text-[#94A3B8]">{row.label}</span>
                <span className={`text-[14px] font-semibold text-[#0F172A] ${row.mono ? "font-mono" : ""}`}>{row.value}</span>
              </div>
            ))}

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Status</span>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-[#DCFCE7] rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                <span className="text-[12px] font-semibold text-[#16A34A]">Confirmed</span>
              </div>
            </div>

            {/* Donor */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Donor</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-[#0EA5E9] font-mono">{display.donor}</span>
                <Copy className="h-3 w-3 text-[#94A3B8] cursor-pointer" />
              </div>
            </div>

            {/* Tx Hash */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Tx Hash</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-[#0EA5E9] font-mono">{display.txHash}</span>
                <ExternalLink className="h-3 w-3 text-[#94A3B8] cursor-pointer" />
              </div>
            </div>

            {/* Platform Fee */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#94A3B8]">Platform Fee</span>
              <span className="text-[14px] font-semibold text-[#0F172A]">{display.feeAmount} BNB (2%)</span>
            </div>
          </div>

          {/* Transfer History */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-[#0EA5E9]" />
              <span className="text-[15px] font-semibold text-[#0F172A]">Transfer History</span>
            </div>

            {/* Tx 1 - Mint */}
            <div className="flex items-center gap-3">
              <div className="w-5 flex justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[12px] font-semibold text-[#22C55E]">Minted</span>
                  <span className="text-[12px] text-[#94A3B8] font-mono">{display.timestamp}</span>
                </div>
                <span className="text-[11px] text-[#475569] font-mono">To: {display.donor}</span>
              </div>
            </div>

            <div className="h-px bg-[#E2E8F0]" />

            {/* Tx 2 - Current */}
            <div className="flex items-center gap-3">
              <div className="w-5 flex justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0EA5E9]" />
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[12px] font-semibold text-[#0EA5E9]">Current Owner</span>
                  <span className="text-[12px] text-[#94A3B8] font-mono">{display.timestamp}</span>
                </div>
                <span className="text-[11px] font-medium text-[#0EA5E9] font-mono">{display.donor} (You)</span>
              </div>
            </div>
          </div>

          {/* On-Chain Verification */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-3.5">
            <span className="text-[15px] font-semibold text-[#0F172A]">On-Chain Verification</span>

            {verification && (
              <div className="flex flex-col gap-2">
                {[
                  { label: "Metadata on IPFS", checked: !!verification.ipfsHash },
                  { label: "Block Number Confirmed", checked: verification.blockNumber > 0 },
                  { label: "Contract Address Verified", checked: !!verification.contractAddress },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.checked ? (
                      <CircleCheck className="h-3.5 w-3.5 text-[#22C55E]" />
                    ) : (
                      <CircleDashed className="h-3.5 w-3.5 text-[#94A3B8]" />
                    )}
                    <span className="text-[13px] text-[#475569]">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-[#94A3B8]">IPFS Metadata Hash</span>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F9FF] rounded-lg">
                <span className="text-[13px] text-[#475569] font-mono flex-1">{display.ipfsMetadataHash}</span>
                <Copy className="h-3.5 w-3.5 text-[#94A3B8] cursor-pointer" />
              </div>
            </div>

            <div className="flex gap-2.5">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F0F9FF] rounded-lg">
                <ExternalLink className="h-3.5 w-3.5 text-[#0EA5E9]" />
                <span className="text-[13px] font-medium text-[#0EA5E9]">View on BSCScan</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F0F9FF] rounded-lg">
                <ExternalLink className="h-3.5 w-3.5 text-[#0EA5E9]" />
                <span className="text-[13px] font-medium text-[#0EA5E9]">View on IPFS</span>
              </button>
            </div>
          </div>

          {/* Recent Campaign Donations */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#EF4444]" />
                <span className="text-[15px] font-semibold text-[#0F172A]">Recent Campaign Donations</span>
              </div>
              <span className="text-[12px] font-medium text-[#0EA5E9] cursor-pointer">View All</span>
            </div>

            {[
              { addr: "0x7a3f...e92b", time: "2 hours ago", amount: "1.2 BNB" },
              { addr: "0x4c8d...a15f", time: "5 hours ago", amount: "500 USDT" },
              { addr: "0x1e5b...d47c", time: "1 day ago", amount: "2M SANC" },
            ].map((d, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-[#E2E8F0] mb-3.5" />}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                    <span className="text-[11px] font-semibold text-[#0EA5E9] font-mono">0x</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-px">
                    <span className="text-[12px] font-medium text-[#0F172A] font-mono">{d.addr}</span>
                    <span className="text-[10px] text-[#94A3B8]">{d.time}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#0F172A] font-mono">{d.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* NFT Attributes */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col gap-3.5">
            <span className="text-[15px] font-semibold text-[#0F172A]">NFT Attributes</span>

            <div className="flex gap-2.5">
              {[
                { label: "Donation Tier", value: display.donationTier, color: "#CA8A04" },
                { label: "Category", value: display.category, color: "#0EA5E9" },
                { label: "Impact Score", value: `${display.impactScore}/100`, color: "#16A34A" },
              ].map((attr) => (
                <div key={attr.label} className="flex-1 flex flex-col items-center gap-1 p-3 bg-[#F0F9FF] rounded-lg">
                  <span className="text-[11px] font-medium text-[#94A3B8]">{attr.label}</span>
                  <span className="text-[14px] font-bold" style={{ color: attr.color }}>{attr.value}</span>
                </div>
              ))}
            </div>

            {/* Impact Score Progress */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#475569]">Impact Score</span>
                <span className="text-[12px] font-semibold text-[#16A34A]">{display.impactScore}%</span>
              </div>
              <div className="w-full h-2 bg-[#E2E8F0] rounded-full">
                <div className="h-2 bg-[#16A34A] rounded-full" style={{ width: `${display.impactScore}%` }} />
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="flex items-center gap-2 pt-4">
            <Info className="h-3.5 w-3.5 text-[#94A3B8] shrink-0" />
            <span className="text-[12px] text-[#94A3B8]">This NFT is a permanent on-chain record of your donation.</span>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
