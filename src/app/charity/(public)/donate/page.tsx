"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { mockCampaigns } from "@/services/mockData/campaigns";
import {
  ACCEPTED_TOKENS,
  BUYBACK_BURN_PCT,
  MATCHING_FUND_PCT,
  OPERATIONS_PCT,
  LARGE_DONATION_THRESHOLD_BNB,
} from "@/lib/constants";
import {
  ArrowLeft,
  Heart,
  Info,
  Shield,
  Lock,
  AlertTriangle,
  Award,
  ChevronDown,
  Flame,
  HandCoins,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";

const quickAmounts = [
  { label: "0.1 BNB", value: "0.1" },
  { label: "0.5 BNB", value: "0.5" },
  { label: "1 BNB", value: "1" },
  { label: "5 BNB", value: "5" },
];

const percentages = ["25%", "50%", "75%", "MAX"];

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-[#94A3B8]">
          Loading...
        </div>
      }
    >
      <DonateContent />
    </Suspense>
  );
}

function DonateContent() {
  const searchParams = useSearchParams();
  const preSelectedCampaign = searchParams.get("campaign");

  const [selectedToken, setSelectedToken] = useState(ACCEPTED_TOKENS[0]);
  const [amount, setAmount] = useState("0.5");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [selectedCampaignId] = useState(
    preSelectedCampaign || mockCampaigns[0].id
  );

  const campaign =
    mockCampaigns.find((c) => c.id === selectedCampaignId) || mockCampaigns[0];
  const amountNum = parseFloat(amount) || 0;
  const feeRate = selectedToken.fee;
  const feeAmount = amountNum * (feeRate / 100);
  const usdRate =
    selectedToken.symbol === "BNB"
      ? 625
      : selectedToken.symbol === "SANC"
        ? 0.0005
        : 1;
  const amountUSD = amountNum * usdRate;
  const netToCampaign = amountNum - feeAmount;

  const buybackAmount = feeAmount * (BUYBACK_BURN_PCT / 100);
  const matchingAmount = feeAmount * (MATCHING_FUND_PCT / 100);
  const opsAmount = feeAmount * (OPERATIONS_PCT / 100);

  const isLargeDonation =
    selectedToken.symbol === "BNB" && amountNum >= LARGE_DONATION_THRESHOLD_BNB;
  const isERC20 = selectedToken.symbol !== "BNB";

  const tokenColors: Record<string, string> = {
    BNB: "#F0B90B",
    SANC: "#0EA5E9",
    USDT: "#26A17B",
    BUSD: "#F0B90B",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Back link */}
        <Link
          href="/charity"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#475569] hover:text-[#0F172A] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaign
        </Link>

        {/* Header */}
        <h1 className="text-[32px] font-bold text-[#0F172A]">
          Make a Donation
        </h1>
        <p className="text-[15px] text-[#475569] mt-1">
          Donate to Build a School in Rural Kenya. All donations are tracked on-chain and funds are released via milestone-based community voting.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mt-6 mb-8">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center text-[12px] font-bold">
              1
            </div>
            <span className="text-[13px] font-semibold text-[#0F172A]">
              Select Token
            </span>
          </div>
          <div className="h-[2px] flex-1 bg-[#0EA5E9] mx-3" />
          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#94A3B8] flex items-center justify-center text-[12px] font-bold">
              2
            </div>
            <span className="text-[13px] text-[#94A3B8]">Enter Amount</span>
          </div>
          <div className="h-[2px] flex-1 bg-[#E2E8F0] mx-3" />
          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E2E8F0] text-[#94A3B8] flex items-center justify-center text-[12px] font-bold">
              3
            </div>
            <span className="text-[13px] text-[#94A3B8]">
              Review &amp; Confirm
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Left: Form */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] p-8">
              {/* Token Selection */}
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-4">
                Select Token
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {ACCEPTED_TOKENS.map((token) => {
                  const isSelected = selectedToken.symbol === token.symbol;
                  return (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token)}
                      className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                        isSelected
                          ? "border-[#0EA5E9] bg-[#F0F9FF]"
                          : "border-[#E2E8F0] hover:border-[#0EA5E9]/30"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-[14px] font-bold text-white mb-2"
                        style={{
                          backgroundColor: tokenColors[token.symbol] || "#94A3B8",
                        }}
                      >
                        {token.symbol[0]}
                      </div>
                      <p className="text-[14px] font-semibold text-[#0F172A]">
                        {token.symbol}
                      </p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">
                        Balance: 0.00
                      </p>
                      <p
                        className={`text-[11px] mt-1 font-medium ${token.fee === 1 ? "text-[#16A34A]" : "text-[#94A3B8]"}`}
                      >
                        {token.fee}% fee
                        {token.fee === 1 && " ✓"}
                      </p>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0EA5E9] flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Amount Input */}
              <h3 className="text-[16px] font-semibold text-[#0F172A] mt-8 mb-4">
                Donation Amount
              </h3>
              <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-[28px] font-bold text-[#0F172A] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.0"
                    step="0.01"
                  />
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E2E8F0] px-3 py-2">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor:
                          tokenColors[selectedToken.symbol] || "#94A3B8",
                      }}
                    />
                    <span className="text-[14px] font-semibold text-[#0F172A]">
                      {selectedToken.symbol}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[13px] text-[#94A3B8]">
                    ≈ $
                    {amountUSD.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </span>
                  <span className="text-[13px] text-[#94A3B8]">
                    Balance: 0.00 {selectedToken.symbol}
                  </span>
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {quickAmounts.map((qa) => (
                  <button
                    key={qa.value}
                    onClick={() => setAmount(qa.value)}
                    className={`py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                      amount === qa.value
                        ? "bg-[#0EA5E9] text-white"
                        : "bg-[#F0F9FF] text-[#475569] hover:bg-[#E0F2FE]"
                    }`}
                  >
                    {qa.label}
                  </button>
                ))}
              </div>

              {/* Percentage Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {percentages.map((pct) => (
                  <button
                    key={pct}
                    className="py-2 rounded-full text-[12px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:border-[#0EA5E9]/30 transition-colors"
                  >
                    {pct}
                  </button>
                ))}
              </div>

              {/* Message */}
              <h3 className="text-[16px] font-semibold text-[#0F172A] mt-8 mb-3">
                Message{" "}
                <span className="text-[13px] font-normal text-[#94A3B8]">
                  (Optional)
                </span>
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add an on-chain message to your donation..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] resize-none h-[80px]"
              />

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between mt-4 p-3 bg-[#F8FAFC] rounded-xl">
                <div className="flex items-center gap-2">
                  {anonymous ? (
                    <EyeOff className="w-4 h-4 text-[#475569]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#475569]" />
                  )}
                  <span className="text-[14px] text-[#475569]">
                    Donate anonymously
                  </span>
                </div>
                <button
                  onClick={() => setAnonymous(!anonymous)}
                  className={`relative w-10 h-[22px] rounded-full transition-colors ${anonymous ? "bg-[#0EA5E9]" : "bg-[#CBD5E1]"}`}
                >
                  <div
                    className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${anonymous ? "translate-x-[20px]" : "translate-x-[2px]"}`}
                  />
                </button>
              </div>

              {/* Security Bar */}
              <div className="flex items-center gap-2 mt-4 p-3 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0]">
                <Shield className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[13px] text-[#16A34A] font-medium">
                  Secured by BNB Smart Chain · 256-bit encryption · Milestone
                  escrow
                </span>
              </div>

              {/* Large Donation Warning */}
              {isLargeDonation && (
                <div className="flex items-start gap-3 mt-4 p-4 bg-[#FFFBEB] rounded-xl border border-[#FDE68A]">
                  <AlertTriangle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-semibold text-[#92400E]">
                      Large Donation Warning
                    </p>
                    <p className="text-[12px] text-[#92400E]/80 mt-0.5">
                      Donations over {LARGE_DONATION_THRESHOLD_BNB} BNB require
                      additional on-chain confirmation and may take longer to
                      process.
                    </p>
                  </div>
                </div>
              )}

              {/* ERC-20 Approval Flow */}
              {isERC20 && (
                <div className="mt-4 p-4 bg-[#F0F9FF] rounded-xl border border-[#BAE6FD]">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="text-[13px] font-semibold text-[#0F172A]">
                      Token Approval Required
                    </span>
                  </div>
                  <p className="text-[12px] text-[#475569]">
                    You need to approve the contract to spend your{" "}
                    {selectedToken.symbol} before donating. This is a one-time
                    gas fee per token.
                  </p>
                  <ComingSoonOverlay action="Approve token spending">
                    <button className="mt-3 w-full py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-[13px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-colors">
                      Approve {selectedToken.symbol}
                    </button>
                  </ComingSoonOverlay>
                </div>
              )}

              {/* Donate CTA */}
              <ComingSoonOverlay action="Donate to this campaign">
                <button className="w-full mt-6 py-4 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-[16px] font-semibold transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" fill="white" />
                  Donate {amount || "0"} {selectedToken.symbol}
                </button>
              </ComingSoonOverlay>

              {/* Refund note */}
              <p className="text-[12px] text-[#94A3B8] text-center mt-3">
                Funds are held in escrow and released per milestone vote. If a
                campaign fails, you can request a refund.
              </p>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="w-[400px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] p-6 sticky top-8">
              <h3 className="text-[16px] font-semibold text-[#0F172A] mb-5">
                Order Summary
              </h3>

              {/* Campaign */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#E2E8F0]">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#7DD3FC] flex-shrink-0 overflow-hidden">
                  {campaign.coverImage && (
                    <img
                      src={campaign.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#0F172A] truncate">
                    {campaign.name}
                  </p>
                  <p className="text-[12px] text-[#0EA5E9]">
                    by {campaign.charity.name}
                  </p>
                </div>
              </div>

              {/* Summary Lines */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#475569]">
                    Donation Amount
                  </span>
                  <span className="text-[13px] font-semibold text-[#0F172A]">
                    {amount || "0"} {selectedToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#475569]">
                    Platform Fee ({feeRate}%)
                  </span>
                  <span className="text-[13px] font-medium text-[#0F172A]">
                    -{feeAmount.toFixed(4)} {selectedToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#475569]">
                    Net to Campaign
                  </span>
                  <span className="text-[13px] font-medium text-[#16A34A]">
                    {netToCampaign.toFixed(4)} {selectedToken.symbol}
                  </span>
                </div>
                <div className="h-px bg-[#E2E8F0]" />
                <div className="flex justify-between">
                  <span className="text-[14px] font-bold text-[#0F172A]">
                    Total
                  </span>
                  <span className="text-[14px] font-bold text-[#0F172A]">
                    {amountNum.toFixed(4)} {selectedToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#94A3B8]">USD Value</span>
                  <span className="text-[12px] text-[#94A3B8]">
                    ≈ $
                    {amountUSD.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {/* SANC fee tip */}
              {selectedToken.symbol !== "SANC" && (
                <div className="mt-4 p-3 bg-[#F0F9FF] rounded-xl flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#0369A1]">
                    <span className="font-semibold">
                      Pay with SANC for 50% off fees
                    </span>{" "}
                    — only 1% instead of 2%
                  </p>
                </div>
              )}

              {/* Fee Breakdown */}
              <div className="mt-5 pt-5 border-t border-[#E2E8F0]">
                <h4 className="text-[13px] font-semibold text-[#0F172A] mb-3">
                  Where Your Fee Goes
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span className="text-[12px] text-[#475569]">
                        40% → Buyback &amp; Burn
                      </span>
                    </div>
                    <span className="text-[12px] font-medium text-[#0F172A]">
                      {buybackAmount.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HandCoins className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      <span className="text-[12px] text-[#475569]">
                        30% → Charity Matching
                      </span>
                    </div>
                    <span className="text-[12px] font-medium text-[#0F172A]">
                      {matchingAmount.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span className="text-[12px] text-[#475569]">
                        30% → Platform Ops
                      </span>
                    </div>
                    <span className="text-[12px] font-medium text-[#0F172A]">
                      {opsAmount.toFixed(4)}
                    </span>
                  </div>
                </div>

                {/* Fee visual bar */}
                <div className="flex h-2 rounded-full overflow-hidden mt-3">
                  <div className="bg-[#F59E0B]" style={{ width: "40%" }} />
                  <div className="bg-[#0EA5E9]" style={{ width: "30%" }} />
                  <div className="bg-[#8B5CF6]" style={{ width: "30%" }} />
                </div>
              </div>

              {/* NFT Receipt Card */}
              <div className="mt-5 p-4 bg-[#0F172A] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      Donation NFT Receipt
                    </p>
                    <p className="text-[12px] text-white/60">
                      ERC-721 on-chain proof of your donation
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#0EA5E9]"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span className="text-[11px] text-white/50">
                    Auto-minted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
