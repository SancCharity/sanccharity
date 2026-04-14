"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useCampaignDetails } from "@/hooks/useCampaignDetails";
import { MilestoneStatus, CampaignStatus, CharityStatus, ImpactReport } from "@/types/charity";
import {
  Wallet, MapPin, Share2, Hexagon, FileLock, ExternalLink,
  CircleCheck, Circle, Timer, Star, Building2, ChevronDown, TriangleAlert,
} from "lucide-react";

export default function CampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { address } = useAccount();
  const { campaign, milestones, donations, totalDonations, impact, isLoading, isError } = useCampaignDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <span className="text-fg-muted">Loading campaign...</span>
      </div>
    );
  }

  if (isError || !campaign) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-12 w-12 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <TriangleAlert className="h-6 w-6 text-[#DC2626]" />
          </div>
          <p className="text-lg font-semibold text-fg-primary">Campaign not found</p>
          <p className="text-sm text-fg-muted">This campaign may have been removed or the link is invalid.</p>
        </div>
      </div>
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const daysLeft = campaign ? Math.max(0, Math.ceil((campaign.deadline - now) / 86400)) : 0;
  const pct = campaign ? Math.round((parseFloat(campaign.totalRaised) / parseFloat(campaign.totalGoal)) * 100) : 0;
  const raisedBNB = campaign ? (parseFloat(campaign.totalRaised) / 1e18).toFixed(1) : "0";
  const goalBNB = campaign ? (parseFloat(campaign.totalGoal) / 1e18).toFixed(0) : "0";

  function msStatusStyle(status: MilestoneStatus) {
    switch (status) {
      case MilestoneStatus.Released:
        return { bg: "bg-accent-primary", text: "text-white", circle: "bg-accent-primary", label: "Released" };
      case MilestoneStatus.UnderReview:
        return { bg: "bg-[#F59E0B]", text: "text-white", circle: "bg-[#F59E0B]", label: "Under Review" };
      case MilestoneStatus.Active:
        return { bg: "bg-white border border-[#E2E8F0]", text: "text-fg-secondary", circle: "bg-white border border-[#E2E8F0]", label: "Active" };
      case MilestoneStatus.Approved:
        return { bg: "bg-[#22C55E]", text: "text-white", circle: "bg-[#22C55E]", label: "Approved" };
      default:
        return { bg: "bg-white border border-[#E2E8F0]", text: "text-fg-muted", circle: "bg-white border border-[#E2E8F0]", label: "Locked" };
    }
  }

  function timeAgo(ts: number) {
    const diff = Math.floor(Date.now() / 1000) - ts;
    if (diff < 3600) return `${Math.round(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)} hours ago`;
    return `${Math.round(diff / 86400)} days ago`;
  }

  const activeReviewMs = milestones.find((m) => m.status === MilestoneStatus.UnderReview);
  const impactReports = (impact as unknown as ImpactReport[]) ?? [];

  const charityRegisteredAt = campaign?.charity.registeredAt
    ? new Date(campaign.charity.registeredAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Wallet Context Banner */}
      <div className="flex items-center justify-center gap-2 bg-[#E0F2FE] px-4 py-2">
        <Wallet className="h-3.5 w-3.5 text-accent-primary" />
        <span className="text-xs text-fg-secondary">
          {shortAddress
            ? `Connected: ${shortAddress}`
            : "Connect your wallet to donate or vote"}
        </span>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 flex flex-col gap-6">
        {/* Back Link */}
        <Link href="/charity" className="text-sm text-fg-muted">← Back to Campaigns</Link>

        {/* Hero Bento */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Campaign Image */}
          <div className="w-full lg:w-[840px] h-[250px] sm:h-[350px] lg:h-[480px] rounded-2xl overflow-hidden">
            {campaign?.coverImage ? (
              <img
                src={campaign.coverImage}
                alt="Campaign hero"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD]" />
            )}
          </div>

          {/* Campaign Info Card */}
          <div className="flex-1 bg-white rounded-2xl p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            {/* Verified Row */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-primary" />
              <span className="text-[11px] text-accent-primary font-mono">
                {campaign?.charity.status === CharityStatus.Verified ? "Verified Charity" : "Charity"}
              </span>
              {campaign?.status === CampaignStatus.Active && (
                <span className="flex items-center gap-1 bg-[#22C55E1A] rounded-full px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-[10px] font-semibold text-[#22C55E] font-mono">Active</span>
                </span>
              )}
            </div>
            {/* Category */}
            <span className="self-start bg-surface-primary text-fg-secondary text-[11px] font-mono rounded-full px-3 py-1">
              {campaign?.category ?? "—"}
            </span>
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-fg-muted" />
              <span className="text-[13px] text-fg-secondary">{campaign?.location ?? "—"}</span>
            </div>
            {/* Title */}
            <h1 className="text-[28px] font-bold text-fg-primary">{campaign?.name ?? "—"}</h1>
            {/* Stats Row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6">
              {[
                { value: `${raisedBNB} BNB`, label: "Raised" },
                { value: `${goalBNB} BNB`, label: "Goal" },
                { value: String(campaign?.donorCount ?? 0), label: "Donors" },
                { value: `${pct}%`, label: "Funded" },
                { value: `${daysLeft} days`, label: "Deadline", valueColor: "text-[#F59E0B]" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className={`text-2xl font-bold ${s.valueColor || "text-fg-primary"}`}>{s.value}</span>
                  <span className="text-[11px] text-fg-muted font-mono">{s.label}</span>
                </div>
              ))}
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-surface-primary rounded-full overflow-hidden">
              <div className="h-full bg-accent-primary rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
            </div>
            {/* Buttons */}
            <div className="flex gap-3">
              <ComingSoonOverlay action="Donate">
                <button className="flex-1 bg-accent-primary text-white text-[15px] font-semibold rounded-full py-3.5 text-center">Donate to This Campaign</button>
              </ComingSoonOverlay>
              <button className="flex items-center gap-2 bg-surface-primary text-accent-primary text-sm font-semibold rounded-full px-6 py-3.5 border-[1.5px] border-accent-primary">
                <Share2 className="h-4 w-4" />Share Campaign
              </button>
            </div>
            {/* NFT Receipt */}
            <div className="flex items-center justify-center gap-1.5">
              <Hexagon className="h-3.5 w-3.5 text-accent-primary" />
              <span className="text-[11px] text-fg-muted">You&apos;ll receive an ERC-721 NFT receipt for your donation</span>
            </div>
            {/* Escrow */}
            <div className="flex items-center gap-2.5 bg-surface-primary rounded-lg px-3.5 py-2.5">
              <FileLock className="h-3.5 w-3.5 text-accent-primary" />
              <span className="text-[11px] text-fg-secondary font-mono">Escrow Contract: 0x7c3...4f2d</span>
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 text-accent-primary" />
                <span className="text-[11px] font-semibold text-accent-primary">View on BSCScan</span>
              </div>
            </div>
            {/* Fee */}
            <span className="text-[10px] text-fg-muted font-mono text-center">2% platform fee · 1% with SANC discount</span>
          </div>
        </div>

        {/* Campaign Gallery */}
        {campaign?.gallery && campaign.gallery.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-fg-primary">Campaign Gallery</span>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {campaign.gallery.slice(0, 4).map((url, i) => (
                <div key={i} className="h-[120px] sm:h-[160px] rounded-xl overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charity Identity Card */}
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-[#E0F2FE] flex items-center justify-center overflow-hidden">
              {campaign?.charity.logoUrl ? (
                <img src={campaign.charity.logoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="h-7 w-7 text-accent-primary" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-bold text-fg-primary">
                  {campaign?.charity.name ?? "—"}
                </span>
                {campaign?.charity.status === CharityStatus.Verified && (
                  <span className="flex items-center gap-1 bg-[#10B981] text-white text-[10px] font-mono rounded-full px-2 py-0.5">
                    <CircleCheck className="h-2.5 w-2.5" />Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {campaign?.charity.website && (
                  <span className="text-[13px] text-accent-primary">{campaign.charity.website}</span>
                )}
                {charityRegisteredAt && (
                  <>
                    <span className="text-[13px] text-fg-muted">·</span>
                    <span className="text-[13px] text-fg-muted">Registered {charityRegisteredAt}</span>
                  </>
                )}
              </div>
              {campaign?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-fg-muted" />
                  <span className="text-[13px] text-fg-muted">{campaign.location}</span>
                </div>
              )}
            </div>
          </div>
          {campaign?.charity.description && (
            <>
              <div className="h-px bg-[#E2E8F0]" />
              <p className="text-sm text-fg-secondary leading-relaxed">{campaign.charity.description}</p>
            </>
          )}
          <div className="h-px bg-[#E2E8F0]" />
          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-fg-primary">About This Campaign</span>
            <p className="text-sm text-fg-secondary leading-relaxed">
              {campaign?.description ?? "—"}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-semibold text-accent-primary">Read more</span>
              <ChevronDown className="h-3.5 w-3.5 text-accent-primary" />
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="flex flex-col items-center">
          <h2 className="text-[22px] font-bold text-fg-primary self-start mb-4">Milestone Timeline</h2>
          {milestones.map((ms, i) => {
            const style = msStatusStyle(ms.status);
            const isReleased = ms.status === MilestoneStatus.Released || ms.status === MilestoneStatus.Approved;
            const isUnderReview = ms.status === MilestoneStatus.UnderReview;
            const isLocked = ms.status === MilestoneStatus.Locked || ms.status === MilestoneStatus.Active;
            const amountBNB = (parseFloat(ms.amount) / 1e18).toFixed(1);
            const deliverablesAreDone = ms.status === MilestoneStatus.Released;

            // Deliverable chip colors based on status
            let delBg = "bg-[#F0F9FF]";
            let delColor = "text-fg-muted";
            if (ms.status === MilestoneStatus.Released) { delBg = "bg-[#E0F2FE]"; delColor = "text-accent-primary"; }
            else if (ms.status === MilestoneStatus.UnderReview) { delBg = "bg-[#FEF3C7]"; delColor = "text-[#F59E0B]"; }

            // Review deadline days left
            const reviewDaysLeft = ms.reviewDeadline
              ? Math.max(0, Math.ceil((ms.reviewDeadline - now) / 86400))
              : 0;

            return (
              <div key={ms.index} className="w-full flex flex-col items-center">
                {isReleased && (
                  <div className="flex items-center gap-2 mb-2 self-start">
                    <CircleCheck className="h-3 w-3 text-[#22C55E]" />
                    <span className="text-[10px] text-fg-muted font-mono">
                      Approved {ms.approvalPercentage}% · {ms.votesFor + ms.votesAgainst} votes
                    </span>
                  </div>
                )}
                <div className={`w-full ${isLocked ? "bg-surface-primary" : "bg-white"} rounded-2xl p-6 flex flex-col gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]`}>
                  <div className="flex items-center gap-4">
                    <div className={`h-9 w-9 rounded-full ${style.circle} flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${style.text}`}>{ms.index + 1}</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-fg-primary">{ms.name}</span>
                      <span className="text-sm text-fg-secondary">{amountBNB} BNB</span>
                      <span className="text-[13px] text-fg-muted">{ms.description}</span>
                    </div>
                    <span className={`${style.bg} ${style.text} text-[11px] font-mono rounded-full px-2.5 py-0.5`}>
                      {style.label}
                    </span>
                    {isUnderReview && (
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-sm font-bold text-accent-primary">{ms.approvalPercentage}% Approval</span>
                        <span className="text-[11px] text-fg-muted font-mono">{reviewDaysLeft} days left</span>
                      </div>
                    )}
                  </div>
                  {ms.deliverables.length > 0 && (
                    <div className={`${delBg} rounded-lg px-3.5 py-2.5 flex flex-col gap-1`}>
                      <span className={`text-[11px] font-bold ${delColor}`}>Deliverables</span>
                      {ms.deliverables.map((del, di) => (
                        <div key={di} className="flex items-center gap-1.5">
                          {deliverablesAreDone ? (
                            <CircleCheck className={`h-3 w-3 ${delColor}`} />
                          ) : (
                            <Circle className={`h-3 w-3 ${delColor}`} />
                          )}
                          <span className="text-xs text-fg-secondary">{del}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {i < milestones.length - 1 && <div className="w-0.5 h-4 bg-accent-primary" />}
              </div>
            );
          })}
        </div>

        {/* Community Review Banner */}
        <div className="flex items-center gap-2.5 bg-accent-primary/[0.04] border border-accent-primary/10 rounded-xl px-5 py-3">
          <Timer className="h-[18px] w-[18px] text-accent-primary" />
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-fg-primary">Community Review Period</span>
            <span className="text-xs text-fg-secondary">Each milestone undergoes a 7–14 day community review before funds are released</span>
          </div>
          <span className="bg-[#E0F2FE] text-accent-primary text-[11px] font-semibold font-mono rounded-full px-3 py-1">7-14 days</span>
        </div>

        {/* Vote Panel — shown when there is an active under-review milestone */}
        {activeReviewMs && (
          <div className="bg-[#0F172A] rounded-2xl p-5 sm:p-8 flex flex-col gap-5">
            <span className="text-[20px] font-bold text-white">Active Vote: {activeReviewMs.name}</span>
            <span className="text-sm text-white/70">Review the submitted proof and cast your vote.</span>
            {activeReviewMs.proofIPFS && (
              <button className="flex items-center justify-center gap-2 bg-white/[0.08] border border-white/20 rounded-full px-6 py-2.5">
                <ExternalLink className="h-3.5 w-3.5 text-white/80" />
                <span className="text-[13px] font-semibold text-white/80">View Proof on IPFS</span>
                <span className="text-[10px] text-white/40 font-mono">
                  {activeReviewMs.proofIPFS.slice(0, 8)}...{activeReviewMs.proofIPFS.slice(-4)}
                </span>
              </button>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { val: `${activeReviewMs.approvalPercentage}%`, label: "Approval" },
                { val: String(activeReviewMs.votesFor + activeReviewMs.votesAgainst), label: "Votes Cast" },
                { val: "66%", label: "Quorum Req." },
                {
                  val: activeReviewMs.reviewDeadline
                    ? `${Math.max(0, Math.ceil((activeReviewMs.reviewDeadline - now) / 86400))}d`
                    : "—",
                  label: "Time Left",
                },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[20px] font-bold text-white">{s.val}</span>
                  <span className="text-[11px] text-white/50 font-mono">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ComingSoonOverlay action="Vote"><button className="bg-accent-primary text-white text-sm font-semibold rounded-full px-8 py-3.5 sm:py-3 w-full sm:w-auto">Approve</button></ComingSoonOverlay>
              <ComingSoonOverlay action="Vote"><button className="bg-red-600/50 text-white text-sm font-semibold rounded-full px-8 py-3.5 sm:py-3 w-full sm:w-auto">Reject</button></ComingSoonOverlay>
              <ComingSoonOverlay action="Vote"><button className="bg-white/[0.13] text-white/80 text-sm font-semibold rounded-full px-8 py-3.5 sm:py-3 w-full sm:w-auto">Abstain</button></ComingSoonOverlay>
            </div>
            <span className="text-[11px] text-white/40 font-mono text-center">Requires 1M+ SANC staked to vote</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] text-white/40 font-mono">Your Tier:</span>
              <span className="flex items-center gap-1 bg-[#F59E0B33] text-[#F59E0B] text-[10px] font-semibold font-mono rounded-full px-2.5 py-0.5">
                <Star className="h-2.5 w-2.5" />Featured Donor · 2x Power
              </span>
            </div>
          </div>
        )}

        {/* Recent Donations */}
        <div className="flex flex-col gap-3">
          <span className="text-[20px] font-bold text-fg-primary">Recent Donations</span>
          {donations.map((d, i) => {
            const isSanc = d.tokenSymbol === "SANC";
            const formattedAmount = isSanc
              ? `${(parseFloat(d.amount) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 0 })} ${d.tokenSymbol}`
              : `${(parseFloat(d.amount) / 1e18).toFixed(2)} ${d.tokenSymbol}`;
            const rowBg = isSanc ? "bg-[#F0F9FF]" : "bg-white";
            return (
              <div
                key={d.id ?? i}
                className={`flex items-center justify-between ${rowBg} rounded-xl px-5 py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-accent-primary" />
                  <span className="text-[13px] font-mono text-fg-primary">
                    {d.donorAddress.slice(0, 6)}...{d.donorAddress.slice(-4)}
                  </span>
                  <span className="bg-surface-primary text-fg-secondary text-[10px] font-mono rounded-full px-2 py-0.5">
                    {d.tokenSymbol}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-sm font-semibold text-fg-primary">{formattedAmount}</span>
                  <span className="text-xs text-fg-muted">{timeAgo(d.timestamp)}</span>
                </div>
              </div>
            );
          })}
          {/* Pagination */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-fg-muted font-mono">
              Showing 1–{donations.length} of {totalDonations} donations
            </span>
            <div className="flex gap-1">
              <button className="bg-surface-primary text-fg-muted text-xs rounded-lg px-3 py-1.5 border border-[#E2E8F0]">Previous</button>
              <button className="bg-accent-primary text-white text-xs font-semibold rounded-lg px-2.5 py-1.5">1</button>
              <button className="bg-surface-primary text-fg-secondary text-xs rounded-lg px-2.5 py-1.5 border border-[#E2E8F0]">2</button>
              <button className="bg-surface-primary text-fg-secondary text-xs rounded-lg px-2.5 py-1.5 border border-[#E2E8F0]">3</button>
              <button className="bg-surface-primary text-fg-secondary text-xs rounded-lg px-3 py-1.5 border border-[#E2E8F0]">Next</button>
            </div>
          </div>
        </div>

        {/* Impact Reports */}
        {impactReports.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="text-[22px] font-bold text-fg-primary">Impact Reports</span>
            {impactReports.map((r, i) => (
              <div
                key={r.id ?? i}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]"
              >
                <div className="h-[200px] overflow-hidden">
                  {r.mediaIPFS && r.mediaIPFS.length > 0 ? (
                    <img src={r.mediaIPFS[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD]" />
                  )}
                </div>
                <div className="px-6 pb-5 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold text-fg-primary">{r.title}</span>
                    <span className="text-xs text-fg-muted">
                      {new Date(r.publishedAt * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm text-fg-secondary leading-relaxed">{r.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
