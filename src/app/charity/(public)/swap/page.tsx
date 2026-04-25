"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { ArrowDownUp, Zap, ShieldCheck, Coins, TrendingUp, Clock, ExternalLink } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Swap",
    desc: "Swap BNB, USDT, BUSD, and SANC directly within the SancCharity ecosystem. No need to leave the platform.",
  },
  {
    icon: ShieldCheck,
    title: "Best Rate Routing",
    desc: "SancSwap routes through PancakeSwap liquidity pools to find the best available rate for your trade.",
  },
  {
    icon: Coins,
    title: "Buy SANC Easily",
    desc: "Convert BNB or stablecoins to SANC in one click — then donate with 0% platform fee.",
  },
  {
    icon: TrendingUp,
    title: "Supports the Ecosystem",
    desc: "Every swap that touches SANC contributes to auto-liquidity and the charity matching pool via the 5% token tax.",
  },
];

const pairs = [
  { from: "BNB", to: "SANC", note: "Most popular" },
  { from: "USDT", to: "SANC", note: "Stablecoin entry" },
  { from: "BUSD", to: "SANC", note: "Stablecoin entry" },
  { from: "BNB", to: "USDT", note: "Standard pair" },
  { from: "SANC", to: "BNB", note: "Exit to BNB" },
];

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <ArrowDownUp className="h-3.5 w-3.5" /> DEX
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">SancSwap</h1>
          <p className="text-[15px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
            A built-in swap interface for converting tokens within the SancCharity ecosystem. Powered by PancakeSwap liquidity.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 text-center">
            <div className="h-16 w-16 rounded-2xl bg-[#F0F9FF] flex items-center justify-center mx-auto mb-5">
              <ArrowDownUp className="h-8 w-8 text-[#0EA5E9]" />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Swap Interface Coming Soon</h2>
            <p className="text-[13px] text-[#64748B] leading-relaxed mb-5 max-w-sm mx-auto">
              SancSwap is under development. In the meantime, you can swap tokens directly on PancakeSwap.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://pancakeswap.finance/swap?outputCurrency=0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0EA5E9] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0284C7] transition-colors"
              >
                Buy SANC on PancakeSwap <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-[#94A3B8]">
              <Clock className="h-3 w-3" />
              <span>Expected launch: Q3 2026</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-lg font-bold text-[#0F172A] mb-5 text-center">What SancSwap Will Offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-black/[0.06] p-5 sm:p-6 flex flex-col gap-2">
                <div className="h-9 w-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center mb-1">
                  <f.icon className="h-[18px] w-[18px] text-[#0EA5E9]" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">{f.title}</h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Pairs */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Supported Pairs</h2>
            <div className="flex flex-col gap-2">
              {pairs.map((p) => (
                <div key={`${p.from}-${p.to}`} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#0F172A]">{p.from}</span>
                    <ArrowDownUp className="h-3.5 w-3.5 text-[#94A3B8]" />
                    <span className="text-sm font-semibold text-[#0F172A]">{p.to}</span>
                  </div>
                  <span className="text-[11px] text-[#94A3B8] font-medium">{p.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
