import { PageContainer } from "@/components/layout/PageContainer";
import { FileText, AlertTriangle, Scale, Wallet, Ban, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Terms of Service — SancCharity",
  description: "Terms and conditions for using the SancCharity blockchain-verified charitable giving platform.",
};

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using SancCharity (the \"Platform\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.",
      "SancCharity is a decentralized application (dApp) that facilitates charitable giving via smart contracts on the BNB Smart Chain. The Platform provides a front-end interface; all transactions are executed on-chain.",
      "You must be at least 18 years old (or the legal age in your jurisdiction) to use the Platform.",
    ],
  },
  {
    icon: Wallet,
    title: "2. Wallet & Account",
    content: [
      "**No custody** — SancCharity never holds, controls, or has access to your private keys or funds. You connect your own Web3 wallet and authorize every transaction yourself.",
      "**Your responsibility** — You are solely responsible for the security of your wallet, seed phrase, and private keys. SancCharity cannot recover lost funds or reverse transactions.",
      "**Network fees** — All blockchain transactions incur gas fees paid directly to network validators. These are separate from any platform fees and are non-refundable.",
    ],
  },
  {
    icon: Scale,
    title: "3. Platform Fees",
    content: [
      "**SANC token donations** — 0% platform fee. Donors using SANC pay no additional fee beyond the on-chain gas cost.",
      "**BNB / USDT / BUSD donations** — 1.5% platform fee at launch. This rate may be adjusted through community governance.",
      "**Private campaigns** — 0% platform fee. Private campaigns created by registered charities are fee-free.",
      "**Fee allocation** — Platform fees are allocated to SANC buyback & burn (40%), matching fund pool (30%), and platform operations (30%). These percentages are subject to governance votes.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "4. Risks & Disclaimers",
    content: [
      "**Cryptocurrency volatility** — The value of SANC, BNB, and other tokens can fluctuate significantly. Donation values may change between the time of donation and milestone release.",
      "**Smart contract risk** — While our contracts are designed with security best practices and will undergo third-party audits, no smart contract is guaranteed to be free of vulnerabilities.",
      "**No investment advice** — SANC token is a utility and governance token. Nothing on the Platform constitutes financial, investment, or legal advice. Do your own research.",
      "**Regulatory uncertainty** — Cryptocurrency regulations vary by jurisdiction. You are responsible for compliance with your local laws.",
      "**\"As-is\" service** — The Platform is provided as-is, without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.",
    ],
  },
  {
    icon: Ban,
    title: "5. Prohibited Conduct",
    content: [
      "You may not use the Platform to launder money, finance terrorism, or engage in any illegal activity.",
      "You may not register a fraudulent charity, submit false documentation, or misrepresent a campaign's purpose.",
      "You may not exploit, attack, or attempt to manipulate the Platform's smart contracts, governance system, or front-end interface.",
      "You may not use bots, scripts, or automated systems to manipulate governance votes or artificially inflate donation metrics.",
      "SancCharity reserves the right to delist campaigns or restrict front-end access for violations. On-chain data remains immutable regardless.",
    ],
  },
  {
    icon: RefreshCw,
    title: "6. Changes & Governance",
    content: [
      "These terms may be updated as the Platform evolves. Material changes will be communicated through official channels before taking effect.",
      "Certain platform parameters (fee rates, quorum thresholds, matching allocations) are subject to change via on-chain governance votes by SANC stakers.",
      "If you disagree with updated terms, your recourse is to discontinue using the Platform. Continued use after changes constitutes acceptance.",
      "**Last updated:** April 2026",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <Scale className="h-3.5 w-3.5" /> Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Terms of Service</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            The rules of engagement for using SancCharity — a decentralized charitable giving platform on BNB Smart Chain.
          </p>
        </div>

        {/* Sections */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {sections.map((s, i) => (
            <section key={i} className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center">
                  <s.icon className="h-[18px] w-[18px] text-[#0EA5E9]" />
                </div>
                <h2 className="text-lg font-bold text-[#0F172A]">{s.title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {s.content.map((item, j) => (
                  <li key={j} className="text-[14px] text-[#475569] leading-relaxed pl-4 border-l-2 border-[#E2E8F0]"
                    dangerouslySetInnerHTML={{
                      __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0F172A] font-semibold">$1</strong>'),
                    }}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
