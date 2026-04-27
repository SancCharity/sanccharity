"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  ShieldCheck, Clock, FileSearch, AlertCircle, CheckCircle2, Lock, Bug, Zap,
  ExternalLink, FlaskConical,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────── */

const auditTimeline = [
  {
    phase: "Phase 1 — Internal Review",
    status: "completed",
    desc: "Manual code review of all 8 contracts. Focus areas: reentrancy, access control, arithmetic overflow, external call safety. Team review + peer review process.",
  },
  {
    phase: "Phase 2 — Automated Analysis",
    status: "completed",
    desc: "Slither, Mythril, and Foundry invariant testing. 140+ unit tests passing. Coverage across all critical paths including donation flow, milestone escrow, governance voting, and staking mechanics.",
  },
  {
    phase: "Phase 3 — SANC Token Audit",
    status: "completed",
    desc: "SourceHat third-party audit. No critical findings. Fee-on-transfer mechanism, excludeFromFee, and liquidity lock verified.",
  },
  {
    phase: "Phase 4 — Platform Contracts Audit",
    status: "upcoming",
    desc: "Full third-party audit of CharityRegistry, CharityGovernance, DonationVault, CampaignManager, DonationNFT, PriceOracle, and SancTimelock. Will cover: escrow fund flow, milestone release logic, voting weight calculation, oracle manipulation resistance, NFT minting permissions.",
  },
  {
    phase: "Phase 5 — Bug Bounty",
    status: "upcoming",
    desc: "Community bug bounty program post-audit. Tiered rewards for vulnerability disclosure. Scope: all deployed contracts + frontend security.",
  },
];

const sourceHatFindings = [
  "Standard BEP-20 implementation with fee-on-transfer mechanism",
  "Owner functions properly secured with access control",
  "Fee exclusion mechanism validated (excludeFromFee function)",
  "Liquidity locked on-chain — verified",
];

const sourceHatDetails = [
  { label: "Auditor", value: "SourceHat" },
  { label: "Date", value: "2024 (approximate)" },
  { label: "Scope", value: "SANC Token (BEP-20) smart contract" },
  { label: "Network", value: "BNB Smart Chain (BSC)" },
  { label: "Contract", value: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF", mono: true },
  { label: "Status", value: "Passed — no critical or high-severity findings" },
];

interface ContractRisk {
  name: string;
  risk: "Low" | "Medium";
  note: string;
  vectors: { risk: string; mitigation: string }[];
}

const contractStatus: ContractRisk[] = [
  {
    name: "SANC Token",
    risk: "Low",
    note: "Standard BEP-20 with fee mechanism. Audited by SourceHat. Liquidity locked on-chain.",
    vectors: [
      { risk: "Fee manipulation", mitigation: "Fixed fee percentages — not adjustable after deployment" },
      { risk: "Unlimited minting", mitigation: "No mint function exists — total supply fixed at deploy" },
      { risk: "Liquidity drain", mitigation: "Liquidity locked on-chain with verifiable lock contract" },
    ],
  },
  {
    name: "DonationVault",
    risk: "Medium",
    note: "Multi-token donation handling, escrow, fee collection, milestone fund releases, pull-pattern refunds.",
    vectors: [
      { risk: "Reentrancy on withdraw", mitigation: "ReentrancyGuard on all state-changing functions" },
      { risk: "Fund misrouting", mitigation: "Milestone release requires governance vote before funds move" },
      { risk: "Unauthorized milestone release", mitigation: "Pull-pattern refunds — users withdraw, contract doesn't push" },
    ],
  },
  {
    name: "CharityGovernance",
    risk: "Medium",
    note: "SANC staking for governance, weighted voting on milestone releases, tier-based voting power.",
    vectors: [
      { risk: "Flash-loan voting", mitigation: "Snapshot-based voting weight — tokens must be staked before proposal" },
      { risk: "Quorum manipulation", mitigation: "66% quorum threshold prevents low-turnout attacks" },
      { risk: "Vote replay", mitigation: "One-vote-per-address-per-proposal enforced on-chain" },
    ],
  },
  {
    name: "CharityRegistry",
    risk: "Low",
    note: "Charity registration, KYC lifecycle, SANC stake holding, trust scores, USD-based stake tiers.",
    vectors: [
      { risk: "Withdrawal during active vote", mitigation: "3-day cooldown on unstake prevents stake-vote-unstake attacks" },
      { risk: "Stake amount manipulation", mitigation: "USD-based registration threshold via PriceOracle" },
    ],
  },
  {
    name: "CampaignManager",
    risk: "Medium",
    note: "Campaign lifecycle, milestone management, proof submission. Handles campaign creation, status transitions, and milestone release triggers.",
    vectors: [
      { risk: "Unauthorized milestone approval", mitigation: "Role-based access (OPERATOR_ROLE)" },
      { risk: "Campaign state manipulation", mitigation: "State machine enforces valid transitions" },
      { risk: "Proof submission spoofing", mitigation: "Proof stored on IPFS with on-chain hash" },
    ],
  },
  {
    name: "SancTimelock",
    risk: "Low",
    note: "Time-locked admin operations. Enforces delay between proposal and execution for critical governance actions.",
    vectors: [
      { risk: "Bypass timelock delay", mitigation: "OpenZeppelin TimelockController" },
      { risk: "Unauthorized proposal", mitigation: "Multi-role access control" },
    ],
  },
  {
    name: "PriceOracle",
    risk: "Medium",
    note: "TWAP-based price feed for staking tier calculations. Not used in critical fund flow.",
    vectors: [
      { risk: "TWAP manipulation", mitigation: "Multi-block TWAP window resists single-block manipulation" },
      { risk: "Stale price data", mitigation: "Chainlink BNB/USD as secondary price source with freshness check" },
      { risk: "Critical path dependency", mitigation: "Registration-only usage — not used in donation or withdrawal flow" },
    ],
  },
  {
    name: "DonationNFT",
    risk: "Low",
    note: "Standard ERC-721 with metadata. Auto-mint triggered by DonationVault only.",
    vectors: [
      { risk: "Unauthorized minting", mitigation: "Only DonationVault contract can call mint — enforced on-chain" },
      { risk: "Metadata tampering", mitigation: "Metadata set at mint time and immutable after" },
    ],
  },
];

const securityChecks = [
  {
    icon: Bug,
    label: "Reentrancy Protection",
    desc: "ReentrancyGuard applied to all external-calling functions in DonationVault and CharityRegistry",
  },
  {
    icon: Zap,
    label: "Integer Overflow Guards",
    desc: "Solidity 0.8+ built-in overflow checks. SafeMath not needed.",
  },
  {
    icon: Lock,
    label: "Access Control",
    desc: "Ownable2Step for admin functions. Two-step ownership transfer prevents accidental loss.",
  },
  {
    icon: ShieldCheck,
    label: "Input Validation",
    desc: "All user inputs validated — zero-amount donations rejected, invalid campaign IDs revert, milestone index bounds checked.",
  },
  {
    icon: FileSearch,
    label: "External Call Safety",
    desc: "SafeERC20 for all token transfers. No raw .call() or .delegatecall() usage.",
  },
  {
    icon: AlertCircle,
    label: "Flash Loan Resistance",
    desc: "Governance votes use snapshot-based staking weights. Staking requires 3-day cooldown before voting eligibility.",
  },
];

const testCategories = [
  { category: "Donation flow (deposit, refund, milestone release)", tests: 38, passing: true },
  { category: "Governance (proposal, vote, quorum, execution)", tests: 32, passing: true },
  { category: "Staking (stake, unstake, tier calculation, cooldown)", tests: 28, passing: true },
  { category: "NFT minting & metadata", tests: 18, passing: true },
  { category: "Token tax & fee exclusion", tests: 14, passing: true },
  { category: "Edge cases & access control", tests: 10, passing: true },
];

const testStats = [
  { label: "Tests", value: "140+" },
  { label: "Contracts", value: "8" },
  { label: "Audit Rounds", value: "3" },
  { label: "Critical Issues", value: "0" },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export default function AuditPage() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Audit Report</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Transparency is core to SancCharity. Here&apos;s the current security status of our smart contracts.
          </p>
        </div>

        {/* ── Status Banner ── */}
        <div className="max-w-4xl mx-auto mb-10 reveal">
          <div className="bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-5 sm:p-6 flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#F59E0B] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#92400E] mb-1">Audit In Progress</p>
              <p className="text-[13px] text-[#78350F]/70 leading-relaxed">
                The SANC Token contract has been audited by SourceHat. Platform contracts (CharityRegistry, CharityGovernance, DonationVault, CampaignManager, DonationNFT, PriceOracle, SancTimelock) are in development — third-party audit will be completed before mainnet deployment. Internal review and automated analysis are complete for all contracts.
              </p>
            </div>
          </div>
        </div>

        {/* ── SourceHat Audit Summary ── */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h2 className="reveal text-lg font-bold text-[#0F172A]">SANC Token — SourceHat Audit</h2>
              <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#22C55E] text-xs font-semibold px-3 py-1 rounded-full w-fit">
                <CheckCircle2 className="h-3.5 w-3.5" /> Completed
              </span>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
              {sourceHatDetails.map((d) => (
                <div key={d.label} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                  <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide shrink-0 sm:w-24">{d.label}</span>
                  <span className={`text-[13px] text-[#0F172A] leading-relaxed break-all ${d.mono ? "font-mono text-[12px]" : ""}`}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Key findings */}
            <div className="bg-[#F8FAFC] rounded-xl p-4 sm:p-5 mb-5">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">Key Findings</p>
              <ul className="flex flex-col gap-2">
                {sourceHatFindings.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-[#475569] leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-[#22C55E] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* BscScan link */}
            <a
              href="https://bscscan.com/address/0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              View on BscScan <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* ── Audit Timeline ── */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="reveal text-lg font-bold text-[#0F172A] mb-5">Audit Timeline</h2>
            <div className="flex flex-col gap-0">
              {auditTimeline.map((t, i) => (
                <div key={t.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                        t.status === "completed" ? "bg-[#F0FDF4]" : "bg-[#F8FAFC]"
                      }`}
                    >
                      {t.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      ) : (
                        <Clock className="h-4 w-4 text-[#94A3B8]" />
                      )}
                    </div>
                    {i < auditTimeline.length - 1 && (
                      <div
                        className={`w-px flex-1 min-h-[32px] ${
                          t.status === "completed" ? "bg-[#22C55E]/30" : "bg-[#E2E8F0]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#0F172A]">{t.phase}</span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          t.status === "completed"
                            ? "bg-[#F0FDF4] text-[#22C55E]"
                            : "bg-[#F8FAFC] text-[#94A3B8]"
                        }`}
                      >
                        {t.status === "completed" ? "Done" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#475569] leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contract Risk Assessment ── */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="reveal text-lg font-bold text-[#0F172A] mb-5">Contract Risk Assessment</h2>
            <div className="flex flex-col gap-4">
              {contractStatus.map((c) => (
                <div key={c.name} className="border border-black/[0.04] rounded-xl overflow-hidden">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-[#F8FAFC]">
                    <div className="flex items-center gap-2 sm:w-48 shrink-0">
                      <span className="text-sm font-semibold text-[#0F172A]">{c.name}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          c.risk === "Low"
                            ? "bg-[#F0FDF4] text-[#22C55E]"
                            : "bg-[#FFF7ED] text-[#F59E0B]"
                        }`}
                      >
                        {c.risk}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#475569] leading-relaxed">{c.note}</p>
                  </div>
                  {/* Risk vectors */}
                  <div className="p-4 grid grid-cols-1 gap-2">
                    {c.vectors.map((v) => (
                      <div key={v.risk} className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-[13px]">
                        <span className="text-[#EF4444] font-medium shrink-0 sm:w-56">
                          <AlertCircle className="h-3.5 w-3.5 inline-block mr-1 -mt-0.5" />
                          {v.risk}
                        </span>
                        <span className="text-[#475569] leading-relaxed">
                          <ShieldCheck className="h-3.5 w-3.5 inline-block mr-1 -mt-0.5 text-[#22C55E]" />
                          {v.mitigation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Security Checklist ── */}
        <div className="max-w-4xl mx-auto mb-10 reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="reveal text-lg font-bold text-[#0F172A] mb-5">Security Checklist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {securityChecks.map((s) => (
                <div key={s.label} className="flex items-start gap-3 p-4 bg-[#F0FDF4] rounded-xl">
                  <s.icon className="h-4 w-4 text-[#22C55E] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm text-[#0F172A] font-medium">{s.label}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#22C55E] ml-auto shrink-0" />
                    </div>
                    <p className="text-[12px] text-[#475569] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testing Summary ── */}
        <div className="max-w-4xl mx-auto reveal-scale">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="reveal text-lg font-bold text-[#0F172A] mb-5">
              <FlaskConical className="h-5 w-5 inline-block mr-2 -mt-0.5 text-[#64748B]" />
              Testing Summary
            </h2>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {testStats.map((s) => (
                <div key={s.label} className="bg-[#F8FAFC] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-[#475569] leading-relaxed mb-5">
              All contracts tested with Foundry (<span className="font-mono text-[12px]">forge test</span>). Test coverage includes unit tests, integration tests, and fuzz testing for critical paths.
            </p>

            {/* Test categories table */}
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <th className="text-left py-2 px-2 text-[#64748B] font-semibold text-xs uppercase tracking-wide">Category</th>
                    <th className="text-center py-2 px-2 text-[#64748B] font-semibold text-xs uppercase tracking-wide w-20">Tests</th>
                    <th className="text-center py-2 px-2 text-[#64748B] font-semibold text-xs uppercase tracking-wide w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {testCategories.map((t) => (
                    <tr key={t.category} className="border-b border-black/[0.03] last:border-0">
                      <td className="py-2.5 px-2 text-[#0F172A]">{t.category}</td>
                      <td className="py-2.5 px-2 text-center font-medium text-[#0F172A]">{t.tests}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className="inline-flex items-center gap-1 text-[#22C55E] font-medium text-[12px]">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Passing
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
