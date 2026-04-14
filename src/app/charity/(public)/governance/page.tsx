"use client";

import { useState } from "react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useGovernance } from "@/hooks/useGovernance";
import { useAccount } from "wagmi";
import {
  ShieldCheck, Award, Zap, CheckCheck, ExternalLink, CircleCheck, CircleAlert,
  Timer, Info, Users, Coins, Wallet, TrendingUp, Vote, Activity,
} from "lucide-react";

function daysLeft(deadline: number): string {
  const diff = deadline - Math.floor(Date.now() / 1000);
  if (diff <= 0) return "Ended";
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  if (d > 0) return `${d}d ${h}h left`;
  return `${h}h left`;
}

export default function GovernancePage() {
  const { isConnected } = useAccount();
  const [stakeTab, setStakeTab] = useState<"stake" | "unstake">("stake");
  const {
    voterInfo,
    activeVotes,
    voteHistory,
    isLoadingVotes,
    handleVote,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  } = useGovernance();

  const govStats = [
    { icon: Coins, label: "Total Staked", value: "2.4B SANC" },
    { icon: Vote, label: "Active Proposals", value: String(activeVotes.length) },
    { icon: Users, label: "Active Stakers", value: "1,847" },
    { icon: Activity, label: "Avg Participation", value: "78.3%", accent: true },
  ];

  const tierLabel = voterInfo
    ? voterInfo.tier === "elite_donor" ? "Elite Donor · 3x Voting Power"
    : voterInfo.tier === "featured_donor" ? "Featured Donor · 2x Voting Power"
    : "Standard · 1x Voting Power"
    : "Not Staked";

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

      <div className="flex flex-col gap-6 px-12 py-8 max-w-[1440px] mx-auto">

        {/* Page Header */}
        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A]">Governance Dashboard</h1>
          <p className="text-[16px] text-[#475569] mt-2">Stake SANC tokens to participate in community governance. Vote on milestone releases and help ensure donation transparency.</p>
        </div>

        {/* Governance Stats */}
        <div className="flex gap-4">
          {govStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex-1 flex items-center gap-2.5 px-5 py-4 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div className="h-8 w-8 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-[#0EA5E9]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-[#94A3B8]">{s.label}</span>
                  <span className={`text-[16px] font-bold ${s.accent ? "text-[#0EA5E9]" : "text-[#0F172A]"}`}>{s.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile & Staking Row */}
        <div className="flex gap-4">
          {/* Voter Profile (dark) */}
          <div className="flex-1 flex flex-col gap-5 p-7 bg-[#0F172A] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-[#38BDF8]" />
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-bold text-white font-mono">
                  {voterInfo?.address ?? "Not Connected"}
                </span>
                <span className="px-3 py-1 bg-white/[0.13] rounded-full text-[12px] font-semibold text-[#FFD700] w-fit">
                  {tierLabel}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { label: "Staked SANC", value: voterInfo ? (Number(voterInfo.stakedAmount) / 1e9).toLocaleString() : "—" },
                { label: "Voting Power", value: voterInfo ? `${voterInfo.votingPower}x` : "—" },
                { label: "Votes Cast", value: String(voterInfo?.votesCount ?? "—") },
                { label: "Participation", value: voterInfo ? `${voterInfo.participationRate}%` : "—", gold: true },
              ].map((s) => (
                <div key={s.label} className="flex-1 flex flex-col gap-1 p-4 bg-white/[0.07] rounded-xl">
                  <span className="text-[12px] text-white/50">{s.label}</span>
                  <span className={`text-[20px] font-bold ${s.gold ? "text-[#FFD700]" : "text-white"}`}>{s.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {(voterInfo?.badges ?? ["Gold Staker", "Early Voter", "100% Participation"]).map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.13] rounded-full">
                  <Award className="h-3.5 w-3.5 text-[#FFD700]" />
                  <span className="text-[11px] font-semibold text-white">{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Stake/Unstake Panel */}
          <div className="flex-1 flex flex-col gap-5 p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="text-[18px] font-bold text-[#0F172A]">Stake SANC</span>

            <div className="flex bg-[#F0F9FF] rounded-xl">
              <button onClick={() => setStakeTab("stake")} className={`flex-1 py-2.5 rounded-xl text-center text-[14px] ${stakeTab === "stake" ? "bg-[#0EA5E9] font-semibold text-white" : "text-[#94A3B8]"}`}>Stake</button>
              <button onClick={() => setStakeTab("unstake")} className={`flex-1 py-2.5 rounded-xl text-center text-[14px] ${stakeTab === "unstake" ? "bg-[#0EA5E9] font-semibold text-white" : "text-[#94A3B8]"}`}>Unstake</button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-[#475569]">Amount</span>
              <div className="flex items-center gap-2 px-4 py-3.5 bg-[#F0F9FF] rounded-xl">
                <span className="flex-1 text-[16px] text-[#0F172A]">10,000,000</span>
                <span className="px-3 py-1 bg-[#E0F2FE] rounded-full text-[12px] font-bold text-[#0EA5E9]">MAX</span>
              </div>
              <span className="text-[12px] text-[#94A3B8]">Balance: 62,000,000 SANC</span>
            </div>

            <div className="flex flex-col gap-3 p-5 bg-[#F0F9FF] rounded-xl">
              <span className="text-[15px] font-bold text-[#0F172A]">Staking Tiers & Benefits</span>
              <div className="h-px bg-[#E2E8F0]" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0F172A]">Standard · 1M+ SANC</span>
                <span className="text-[12px] text-[#475569]">1x voting power · Vote on milestones</span>
              </div>
              <div className="h-px bg-[#E2E8F0]" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0F172A]">Featured · 10M+ SANC</span>
                <span className="text-[12px] text-[#475569]">2x voting power · Featured donor badge</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#0F172A]">Elite · 50M+ SANC</span>
                <span className="text-[12px] text-[#B45309]">3x voting power · Badge + Suggest campaigns</span>
              </div>
              {voterInfo && (
                <div className="flex items-center gap-1.5">
                  <CircleCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span className="text-[12px] font-semibold text-[#16A34A]">
                    Your current tier: {tierLabel}
                  </span>
                </div>
              )}
            </div>

            <ComingSoonOverlay action="Stake SANC tokens">
              <button className="w-full py-3.5 bg-[#0EA5E9] rounded-full text-[16px] font-bold text-white">Stake SANC</button>
            </ComingSoonOverlay>

            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FEF3C7] rounded-xl">
              <Timer className="h-4 w-4 text-[#D97706]" />
              <span className="text-[12px] text-[#92400E]">3-day cooldown period applies to unstaking</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-[#94A3B8]" />
              <span className="text-[12px] text-[#94A3B8]">You can partially unstake — enter any amount up to your staked balance</span>
            </div>
          </div>
        </div>

        {/* Active Milestone Votes */}
        <h2 className="text-[22px] font-bold text-[#0F172A]">
          Active Milestone Votes ({isLoadingVotes ? "…" : activeVotes.length})
        </h2>

        {isLoadingVotes ? (
          <div className="h-40 bg-white rounded-2xl animate-pulse" />
        ) : activeVotes.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-white rounded-2xl border border-black/[0.04]">
            <span className="text-[14px] text-[#94A3B8]">No active milestone votes right now</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {activeVotes.map((vote) => {
              const pct = vote.approvalPercentage;
              const quorumMet = pct >= 66;
              return (
                <div key={`${vote.campaignId}-${vote.milestoneIndex}`}
                  className="p-6 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="px-2.5 py-0.5 bg-[#E0F2FE] rounded-full text-[10px] font-semibold text-[#0EA5E9] w-fit">Milestone</span>
                      <span className="text-[16px] font-bold text-[#0F172A]">{vote.campaignName}</span>
                      <span className="text-[13px] text-[#475569]">Milestone {vote.milestoneIndex + 1}: {vote.milestoneName}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <ExternalLink className="h-[13px] w-[13px] text-[#0EA5E9]" />
                        <span className="text-[12px] font-semibold text-[#0EA5E9]">View Proof on IPFS</span>
                      </div>
                    </div>
                    <span className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold ${quorumMet ? "bg-[#FEF3C7] text-[#B45309]" : "bg-[#0EA5E9]/10 text-[#0EA5E9]"}`}>
                      ⏳ {daysLeft(vote.reviewDeadline)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-2.5 bg-[#F0F9FF] rounded-full">
                      <div className="h-2.5 bg-[#0EA5E9] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[12px] font-medium text-[#0EA5E9]">{pct}% approval (needs 66%)</span>
                      <span className="text-[12px] text-[#94A3B8]">${vote.milestoneAmount.toLocaleString()} requested</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quorumMet ? (
                        <><CircleCheck className="h-3.5 w-3.5 text-[#0EA5E9]" /><span className="text-[11px] font-medium text-[#0EA5E9]">Quorum reached ({pct}% &gt; 66% required)</span></>
                      ) : (
                        <><CircleAlert className="h-3.5 w-3.5 text-[#F59E0B]" /><span className="text-[11px] font-medium text-[#D97706]">Quorum not reached ({pct}% &lt; 66% required)</span></>
                      )}
                    </div>
                  </div>

                  {vote.hasVoted ? (
                    <>
                      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#F0FDF4] rounded-xl">
                        <CircleCheck className="h-4 w-4 text-[#16A34A]" />
                        <span className="text-[13px] font-semibold text-[#15803D]">You voted: {vote.userVote}</span>
                      </div>
                      <button className="w-full py-3 bg-[#F1F5F9] rounded-full text-[14px] font-medium text-[#94A3B8] cursor-not-allowed">Vote Cast — Cannot change</button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <ComingSoonOverlay action="Vote on milestone">
                        <button className="flex-1 py-3 bg-[#0EA5E9] rounded-full text-[14px] font-semibold text-white">Vote Approve</button>
                      </ComingSoonOverlay>
                      <ComingSoonOverlay action="Vote on milestone">
                        <button className="flex-1 py-3 bg-[#F8FAFC] rounded-full text-[14px] font-semibold text-[#0F172A]">Vote Reject</button>
                      </ComingSoonOverlay>
                      <ComingSoonOverlay action="Vote on milestone">
                        <button className="flex-1 py-3 bg-[#F8FAFC] rounded-full text-[14px] font-medium text-[#94A3B8]">Abstain</button>
                      </ComingSoonOverlay>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* History & Suggest */}
        <div className="flex gap-4">
          {/* Vote History */}
          <div className="flex-1 flex flex-col gap-3 p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-bold text-[#0F172A]">Vote History</span>
              <span className="text-[13px] font-semibold text-[#0EA5E9] cursor-pointer">View All →</span>
            </div>
            {voteHistory.length === 0 ? (
              <span className="text-[13px] text-[#94A3B8]">No votes cast yet</span>
            ) : voteHistory.map((v, i) => {
              const isApprove = v.choice === "approve";
              return (
                <div key={i} className="flex items-center justify-between py-3 border-b border-black/[0.04] last:border-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium text-[#0F172A]">{v.campaignName} · {v.milestoneName}</span>
                    <span className="text-[12px] text-[#94A3B8]">{new Date(v.votedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    v.outcome === "passed" ? "bg-[#DCFCE7] text-[#16A34A]"
                    : v.outcome === "rejected" ? "bg-[#FEE2E2] text-[#DC2626]"
                    : "bg-[#FEF3C7] text-[#B45309]"
                  }`}>
                    {v.outcome === "passed" ? "Approved" : v.outcome === "rejected" ? "Rejected" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Suggest Campaign */}
          <div className="flex-1 flex flex-col gap-5 p-7 bg-white rounded-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3">
              <span className="text-[24px]">💡</span>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#0F172A]">Suggest a Campaign</span>
                <span className="text-[12px] text-[#94A3B8]">Elite Donor exclusive (50M+ SANC)</span>
              </div>
            </div>
            <p className="text-[14px] text-[#475569]">As a Gold tier staker, you can suggest new campaigns for the platform. Your suggestions will be reviewed by the community.</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#475569]">Campaign Title</span>
                <input className="px-4 py-3 bg-[#F0F9FF] rounded-xl text-[14px] text-[#0F172A] outline-none" placeholder="Enter campaign title..." />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#475569]">Category</span>
                <select className="px-4 py-3 bg-[#F0F9FF] rounded-xl text-[14px] text-[#0F172A] outline-none">
                  <option>Select category</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Environment</option>
                  <option>Disaster Relief</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#475569]">Description</span>
                <textarea className="px-4 py-3 bg-[#F0F9FF] rounded-xl text-[14px] text-[#0F172A] outline-none resize-none h-20" placeholder="Describe your campaign idea..." />
              </div>
            </div>
            <ComingSoonOverlay action="Submit suggestion">
              <button className="w-full py-3.5 bg-[#0EA5E9] rounded-full text-[14px] font-semibold text-white">Submit Suggestion</button>
            </ComingSoonOverlay>
          </div>
        </div>

        {/* Governance Info Banner */}
        <div className="flex items-center gap-4 p-6 bg-[#0F172A] rounded-2xl">
          <ShieldCheck className="h-6 w-6 text-white shrink-0" />
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[16px] font-bold text-white">Decentralized Governance on BSC</span>
            <span className="text-[13px] text-white/65">All votes are recorded on-chain via the CharityGovernance smart contract. 14-day voting periods, 66% quorum requirement, 3-day unstake cooldown.</span>
          </div>
          <button className="px-5 py-2.5 bg-white rounded-full shrink-0">
            <span className="text-[13px] font-semibold text-[#0F172A]">View Contract</span>
          </button>
        </div>
      </div>
    </div>
  );
}
