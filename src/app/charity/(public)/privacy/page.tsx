import { PageContainer } from "@/components/layout/PageContainer";
import { ShieldCheck, Eye, Database, Globe, Trash2, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — SancCharity",
  description: "How SancCharity collects, uses, and protects your data on our blockchain-verified charitable giving platform.",
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "**Wallet address** — When you connect your wallet, we read your public address to identify your account. We never request or store private keys.",
      "**On-chain transaction data** — Donations, staking actions, and governance votes are recorded on the BNB Smart Chain. This data is public by design and not controlled by SancCharity.",
      "**Charity registration details** — Organizations that register on the platform provide their name, description, country, registration documents, and a wallet address for receiving funds.",
      "**Usage analytics** — We collect anonymized page-view and interaction data (via privacy-respecting analytics) to improve the platform. No personal identifiers are attached.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Data",
    content: [
      "**Platform operation** — Wallet addresses and transaction data are used to display your donation history, NFT receipts, governance participation, and impact dashboard stats.",
      "**Charity verification** — Registration documents are reviewed (manually or via automated KYB providers) to verify legitimacy before a charity is listed publicly.",
      "**Communication** — If you provide an email (optional), we may send campaign updates or governance notifications. You can opt out at any time.",
      "**Aggregated insights** — We publish anonymized, aggregated statistics (total donated, campaigns funded, etc.) on the Impact Dashboard.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Data Protection",
    content: [
      "**No custodial storage** — SancCharity never holds your funds. All donations flow through audited smart contracts with milestone-based escrow.",
      "**Minimal off-chain data** — We store only what is necessary for platform operation (charity profiles, metadata). Sensitive documents are encrypted at rest.",
      "**No selling of data** — We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      "**Access controls** — Internal access to charity registration data is restricted to authorized personnel and automated verification systems.",
    ],
  },
  {
    icon: Globe,
    title: "Blockchain Transparency",
    content: [
      "All donation transactions, milestone releases, and governance votes are permanently recorded on the BNB Smart Chain. This is a core feature of SancCharity, not a side effect.",
      "Your wallet address and transaction history are publicly visible on any block explorer. SancCharity cannot delete or modify on-chain data.",
      "NFT donation receipts are minted to your wallet and stored on IPFS. These are permanent, verifiable records of your charitable contributions.",
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention & Deletion",
    content: [
      "**Off-chain data** — You may request deletion of your off-chain profile data (email, display preferences) by contacting us. Charity registration data is retained for compliance purposes.",
      "**On-chain data** — Blockchain records are immutable and cannot be deleted by SancCharity or any party. This is inherent to decentralized technology.",
      "**Account disconnection** — You can disconnect your wallet at any time. This removes your active session but does not erase historical on-chain activity.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    content: [
      "This policy may be updated as the platform evolves. Material changes will be announced on our official channels.",
      "For privacy-related questions or data deletion requests, reach out via our community channels or submit a request through the platform.",
      "**Last updated:** April 2026",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Privacy Policy</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            How SancCharity handles your data — built on transparency, minimal collection, and blockchain-native principles.
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
