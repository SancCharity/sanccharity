import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";
import {
  BookOpen, Wallet, Heart, Building2, ShieldCheck, Vote,
  Award, BarChart3, ArrowRight, Coins, FileText, Globe,
} from "lucide-react";

export const metadata = {
  title: "Documentation — SancCharity",
  description: "Guides for donors, charities, and governance participants on the SancCharity platform.",
};

const donorGuides = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    desc: "Install MetaMask or any WalletConnect-compatible wallet. Switch to BNB Smart Chain (Chain ID 56). Click \"Connect Wallet\" on the platform.",
  },
  {
    icon: Heart,
    title: "Make a Donation",
    desc: "Browse campaigns, pick one, choose your token (SANC = 0% fee), enter an amount, and confirm the transaction. Funds go to milestone escrow — not directly to the charity.",
  },
  {
    icon: Award,
    title: "Claim Your NFT Receipt",
    desc: "Every donation mints a unique NFT receipt to your wallet. It records the amount, campaign, timestamp, and transaction hash — permanent on-chain proof.",
  },
  {
    icon: BarChart3,
    title: "Track Your Impact",
    desc: "Visit the Impact Dashboard to see your donation history, total contributed, and the campaigns you've supported. All data is read directly from the blockchain.",
  },
];

const charityGuides = [
  {
    icon: Building2,
    title: "Register Your Organization",
    desc: "Submit your charity name, country, description, wallet address, and registration documents. Verification is done via automated KYB or manual review.",
  },
  {
    icon: FileText,
    title: "Create a Campaign",
    desc: "Set a funding goal, add milestone descriptions, upload cover media, and publish. Campaigns can be public (listed) or private (direct link only).",
  },
  {
    icon: ShieldCheck,
    title: "Milestone-Based Escrow",
    desc: "Donations are held in smart contract escrow. Funds release per milestone — approved by community governance vote or admin review. No lump-sum payouts.",
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "SancCharity is open to registered nonprofits worldwide. No EIN or US-specific tax ID required. Verification is document-based and jurisdiction-agnostic.",
  },
];

const governanceGuides = [
  {
    icon: Coins,
    title: "Stake SANC",
    desc: "Stake a minimum of 10M SANC to activate governance participation. Staking determines your voter tier: Standard (1x), Featured (2x), or Elite (3x) voting power.",
  },
  {
    icon: Vote,
    title: "Vote on Proposals",
    desc: "Active proposals appear in the Governance dashboard. Review the details, then vote Approve, Reject, or Abstain. Each vote is recorded on-chain.",
  },
  {
    icon: ShieldCheck,
    title: "Milestone Approvals",
    desc: "When a charity requests a milestone release, it goes to a governance vote. If quorum (66%) is reached and the majority approves, funds are released from escrow.",
  },
];

function GuideSection({ title, badge, guides }: { title: string; badge: string; guides: typeof donorGuides }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
        <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#F0F9FF] text-[#0EA5E9] px-2.5 py-1 rounded-full">{badge}</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {guides.map((g) => (
          <div key={g.title} className="bg-white rounded-2xl border border-black/[0.06] p-5 sm:p-6 flex flex-col gap-2">
            <div className="h-9 w-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center mb-1">
              <g.icon className="h-[18px] w-[18px] text-[#0EA5E9]" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">{g.title}</h3>
            <p className="text-[13px] text-[#475569] leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <BookOpen className="h-3.5 w-3.5" /> Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Documentation</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Everything you need to donate, register a charity, or participate in governance on SancCharity.
          </p>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "For Donors", href: "#donors", color: "#0EA5E9" },
              { label: "For Charities", href: "#charities", color: "#22C55E" },
              { label: "Governance", href: "#governance", color: "#8B5CF6" },
            ].map((q) => (
              <Link key={q.label} href={q.href} className="bg-white rounded-xl border border-black/[0.06] p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <span className="text-sm font-semibold text-[#0F172A]">{q.label}</span>
                <ArrowRight className="h-4 w-4" style={{ color: q.color }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Guide Sections */}
        <div className="max-w-4xl mx-auto">
          <div id="donors"><GuideSection title="For Donors" badge="Donor" guides={donorGuides} /></div>
          <div id="charities"><GuideSection title="For Charities" badge="Charity" guides={charityGuides} /></div>
          <div id="governance"><GuideSection title="Governance" badge="Staker" guides={governanceGuides} /></div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="bg-[#F0F9FF] rounded-2xl border border-[#0EA5E9]/10 p-6 sm:p-8 text-center">
            <p className="text-sm text-[#475569] mb-3">Need more detail? Full technical documentation and smart contract references are available.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/charity/contracts" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:underline">
                Smart Contracts <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/charity/tokenomics" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:underline">
                Tokenomics <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/charity/audit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EA5E9] hover:underline">
                Audit Report <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
