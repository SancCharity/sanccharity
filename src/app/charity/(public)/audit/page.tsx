import { PageContainer } from "@/components/layout/PageContainer";
import { ShieldCheck, Clock, FileSearch, AlertCircle, CheckCircle2, Lock, Bug, Zap } from "lucide-react";

export const metadata = {
  title: "Audit Report — SancCharity",
  description: "Security audit status and details for SancCharity smart contracts on BNB Smart Chain.",
};

const auditTimeline = [
  { phase: "Internal Review", status: "completed", desc: "Core team code review and testing of all contract logic, access controls, and edge cases." },
  { phase: "Automated Analysis", status: "completed", desc: "Static analysis via Slither, Mythril, and custom fuzz testing to identify common vulnerability patterns." },
  { phase: "Third-Party Audit", status: "upcoming", desc: "Independent security audit by a reputable blockchain auditing firm. Report will be published here upon completion." },
  { phase: "Bug Bounty Program", status: "upcoming", desc: "Post-audit bug bounty program for the community to identify any remaining issues. Rewards paid in SANC." },
];

const contractStatus = [
  { name: "SANC Token", risk: "Low", note: "Standard BEP-20 with fee mechanism. Straightforward logic, no external dependencies." },
  { name: "DonationManager", risk: "Medium", note: "Multi-token handling, escrow logic, and NFT minting. Primary attack surface — requires thorough audit." },
  { name: "GovernanceVoting", risk: "Medium", note: "Weighted voting and quorum logic. Must resist vote manipulation and flash-loan governance attacks." },
  { name: "StakingPool", risk: "Low", note: "Standard staking with cooldown. Simpler logic, fewer external interactions." },
  { name: "DonationNFT", risk: "Low", note: "Standard ERC-721 with metadata. Auto-mint triggered by DonationManager only." },
];

const securityChecks = [
  { icon: Bug, label: "Reentrancy Protection", status: true },
  { icon: Zap, label: "Integer Overflow Guards", status: true },
  { icon: Lock, label: "Access Control (Ownable)", status: true },
  { icon: ShieldCheck, label: "Input Validation", status: true },
  { icon: FileSearch, label: "External Call Safety", status: true },
  { icon: AlertCircle, label: "Flash Loan Resistance", status: true },
];

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">Audit Report</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Transparency is core to SancCharity. Here&apos;s the current security status of our smart contracts.
          </p>
        </div>

        {/* Status Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-[#FFF7ED] border border-[#F59E0B]/20 rounded-2xl p-5 sm:p-6 flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#F59E0B] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#92400E] mb-1">Audit In Progress</p>
              <p className="text-[13px] text-[#78350F]/70 leading-relaxed">
                Our smart contracts are currently undergoing internal review and automated analysis. A third-party audit will be commissioned before mainnet launch. The full report will be published on this page.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Audit Timeline</h2>
            <div className="flex flex-col gap-0">
              {auditTimeline.map((t, i) => (
                <div key={t.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      t.status === "completed" ? "bg-[#F0FDF4]" : "bg-[#F8FAFC]"
                    }`}>
                      {t.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      ) : (
                        <Clock className="h-4 w-4 text-[#94A3B8]" />
                      )}
                    </div>
                    {i < auditTimeline.length - 1 && (
                      <div className={`w-px flex-1 min-h-[32px] ${t.status === "completed" ? "bg-[#22C55E]/30" : "bg-[#E2E8F0]"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#0F172A]">{t.phase}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        t.status === "completed" ? "bg-[#F0FDF4] text-[#22C55E]" : "bg-[#F8FAFC] text-[#94A3B8]"
                      }`}>
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

        {/* Contract Risk Assessment */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Contract Risk Assessment</h2>
            <div className="flex flex-col gap-3">
              {contractStatus.map((c) => (
                <div key={c.name} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-2 sm:w-48 shrink-0">
                    <span className="text-sm font-semibold text-[#0F172A]">{c.name}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      c.risk === "Low" ? "bg-[#F0FDF4] text-[#22C55E]" : "bg-[#FFF7ED] text-[#F59E0B]"
                    }`}>
                      {c.risk}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Checklist */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Security Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {securityChecks.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3 bg-[#F0FDF4] rounded-xl">
                  <s.icon className="h-4 w-4 text-[#22C55E]" />
                  <span className="text-sm text-[#0F172A] font-medium">{s.label}</span>
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E] ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
