import Link from "next/link";
import { MessageCircle, Globe } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

export function Footer() {
  return (
    <footer className="pt-12 pb-8">
      <PageContainer className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex flex-col gap-3.5 w-full md:w-[320px]">
          <span className="text-[22px] font-bold text-[#0F172A]">SancCharity</span>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed max-w-[290px]">Blockchain-verified charity. Milestone-based escrow. Community governance. NFT receipts for every donation.</p>
          <div className="flex gap-3.5">
            <svg className="h-[18px] w-[18px] text-[#94A3B8]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            <svg className="h-[18px] w-[18px] text-[#94A3B8]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            <MessageCircle className="h-[18px] w-[18px] text-[#94A3B8]" />
            <Globe className="h-[18px] w-[18px] text-[#94A3B8]" />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium text-[#0F172A] tracking-wider uppercase">Platform</span>
            {[
              { label: "How It Works", href: "/charity#how" },
              { label: "Browse Campaigns", href: "/charity#campaigns" },
              { label: "Donate", href: "/charity/donate" },
              { label: "Impact Dashboard", href: "/charity/impact" },
              { label: "Register Charity", href: "/charity/manage" },
              { label: "SancSwap", href: "/charity/swap" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-[13px] text-[#94A3B8] hover:text-[#0F172A] transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium text-[#0F172A] tracking-wider uppercase">Governance</span>
            {[
              { label: "SANC Token", href: "/charity/governance" },
              { label: "Staking & Voting", href: "/charity/governance" },
              { label: "Voter Tiers", href: "/charity/governance" },
              { label: "Proposals", href: "/charity/governance" },
              { label: "Tokenomics", href: "/charity/tokenomics" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-[13px] text-[#94A3B8] hover:text-[#0F172A] transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-medium text-[#0F172A] tracking-wider uppercase">Resources</span>
            {[
              { label: "Documentation", href: "/charity/docs" },
              { label: "Smart Contracts", href: "/charity/contracts" },
              { label: "Audit Report", href: "/charity/audit" },
              { label: "Privacy Policy", href: "/charity/privacy" },
              { label: "Terms of Service", href: "/charity/terms" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="text-[13px] text-[#94A3B8] hover:text-[#0F172A] transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-[#E2E8F0]" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs text-[#94A3B8]">&copy; 2026 SancCharity. Sanctuary Token Ecosystem.</span>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-xs text-[#94A3B8]">Powered by</span>
          <span className="text-xs font-semibold text-[#0EA5E9]">BSC</span>
          <span className="text-xs text-[#94A3B8]">&middot;</span>
          <span className="text-xs font-semibold text-[#0EA5E9]">PancakeSwap</span>
          <span className="text-xs text-[#94A3B8]">&middot;</span>
          <span className="text-xs font-semibold text-[#0EA5E9]">IPFS</span>
          <span className="text-xs text-[#94A3B8]">&middot;</span>
          <span className="text-xs font-semibold text-[#0EA5E9]">SancSwap</span>
        </div>
      </div>
      </PageContainer>
    </footer>
  );
}
