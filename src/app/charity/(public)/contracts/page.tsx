import { PageContainer } from "@/components/layout/PageContainer";
import { Code2, ShieldCheck, ExternalLink, FileCode2, Lock, Eye } from "lucide-react";

export const metadata = {
  title: "Smart Contracts — SancCharity",
  description: "On-chain smart contract addresses, ABIs, and verification details for the SancCharity platform on BNB Smart Chain.",
};

const contracts = [
  {
    name: "SANC Token",
    address: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF",
    description: "BEP-20 token with 5% buy/sell tax (1% liquidity, 1% marketing, 1% development, 1% charity, 1% burn). 9 decimals. Supports excludeFromFee for donation contracts.",
    status: "Deployed",
    verified: true,
    features: ["Deflationary", "Auto-LP", "Fee Exclusion", "Owner Renounce-ready"],
  },
  {
    name: "DonationManager",
    address: "0x — Deployment pending",
    description: "Core donation contract. Accepts BNB, SANC, USDT, and BUSD. Routes funds to milestone escrow. Applies 1.5% platform fee (0% for SANC). Mints NFT receipts on donation.",
    status: "In Development",
    verified: false,
    features: ["Milestone Escrow", "Multi-token", "NFT Minting", "Fee Routing"],
  },
  {
    name: "GovernanceVoting",
    address: "0x — Deployment pending",
    description: "On-chain governance. SANC stakers vote on proposals, milestone releases, and platform parameter changes. Weighted by tier (1x/2x/3x). 66% quorum required.",
    status: "In Development",
    verified: false,
    features: ["Weighted Voting", "Quorum Enforcement", "Tier System", "Time-locked"],
  },
  {
    name: "StakingPool",
    address: "0x — Deployment pending",
    description: "Stake SANC to activate governance. Minimum 1M SANC (Standard tier). 3-day cooldown on unstake. Tier thresholds: 1M (Standard), 10M (Featured), 50M (Elite).",
    status: "In Development",
    verified: false,
    features: ["Tiered Staking", "Cooldown Period", "Governance Activation"],
  },
  {
    name: "DonationNFT",
    address: "0x — Deployment pending",
    description: "ERC-721 NFT receipt minted to the donor on every donation. Metadata includes amount, token, campaign ID, timestamp, and tx hash. Stored on IPFS.",
    status: "In Development",
    verified: false,
    features: ["ERC-721", "IPFS Metadata", "Auto-mint", "Non-transferable Option"],
  },
];

const securityFeatures = [
  { icon: ShieldCheck, title: "Audited", desc: "All contracts will undergo independent third-party security audits before mainnet deployment." },
  { icon: Lock, title: "Non-custodial", desc: "The platform never holds user funds. All assets are managed by immutable smart contracts with transparent logic." },
  { icon: Eye, title: "Open Source", desc: "Contract source code will be verified on BscScan and published on GitHub for community review." },
  { icon: FileCode2, title: "Upgradability", desc: "Core contracts are non-upgradable by design. Governance parameters can be changed only through on-chain votes." },
];

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <Code2 className="h-3.5 w-3.5" /> Technical
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Smart Contracts</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Every transaction on SancCharity runs through audited, non-custodial smart contracts on BNB Smart Chain.
          </p>
        </div>

        {/* Contract List */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-10">
          {contracts.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-black/[0.06] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0F172A]">{c.name}</h2>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    c.status === "Deployed"
                      ? "bg-[#F0FDF4] text-[#22C55E]"
                      : "bg-[#FFF7ED] text-[#F59E0B]"
                  }`}>
                    {c.status}
                  </span>
                </div>
                {c.verified && (
                  <a
                    href={`https://bscscan.com/address/${c.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#0EA5E9] hover:underline"
                  >
                    View on BscScan <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="bg-[#F8FAFC] rounded-lg px-3 py-2 mb-3">
                <span className="text-xs font-mono text-[#64748B] break-all">{c.address}</span>
              </div>
              <p className="text-[13px] text-[#475569] leading-relaxed mb-3">{c.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.features.map((f) => (
                  <span key={f} className="text-[10px] font-medium bg-[#F0F9FF] text-[#0EA5E9] px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-lg font-bold mb-5">Security Principles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((s) => (
                <div key={s.title} className="bg-white/10 rounded-xl p-5 flex flex-col gap-2">
                  <s.icon className="h-5 w-5 text-[#38BDF8]" />
                  <span className="text-sm font-bold">{s.title}</span>
                  <p className="text-[13px] text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
