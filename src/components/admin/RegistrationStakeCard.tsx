"use client";

import { useState } from "react";
import { DollarSign, RefreshCw, Bot, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { useRegistrationStake } from "@/hooks/useRegistrationStake";

// Mock last-sync metadata (would come from a backend status endpoint in production)
const MOCK_BOT_STATUS = {
  lastSyncedAt: "2026-04-16T09:12:00Z",
  lastDrift: 3.2,
  healthy: true,
};

// Static tier config — USD thresholds and durations are admin-adjustable on-chain;
// SANC equivalents are computed proportionally from the live registration stake.
const TIER_ROWS = [
  { label: "Tier 1", usd: 495,  duration: "1 month",  maxDays: 30  },
  { label: "Tier 2", usd: 1250, duration: "3 months", maxDays: 90  },
  { label: "Tier 3", usd: 2150, duration: "6 months", maxDays: 180 },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
    timeZoneName: "short",
  });
}

export function RegistrationStakeCard() {
  const { stakeUsd, stakeTokens } = useRegistrationStake();
  const [overrideUsd, setOverrideUsd] = useState("");
  const [overrideAmount, setOverrideAmount] = useState("");

  const stakeDisplay = stakeTokens.toLocaleString();
  const bot = MOCK_BOT_STATUS;

  // Approximate SANC per tier proportional to live registration stake
  function tierSanc(usdThreshold: number): string {
    if (stakeUsd === 0) return "—";
    return Math.round((stakeTokens * usdThreshold) / stakeUsd).toLocaleString();
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent-light flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-accent-primary" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-fg-primary">Registration Stake</h3>
            <p className="text-[11px] text-fg-muted">USD-denominated, synced by price bot</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
          bot.healthy ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-error-bg text-error"
        }`}>
          {bot.healthy
            ? <><CheckCircle2 className="h-3 w-3" /> Bot Active</>
            : <><AlertCircle className="h-3 w-3" /> Bot Offline</>
          }
        </div>
      </div>

      {/* Current values */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-primary rounded-xl p-4">
          <span className="text-[11px] text-fg-muted block mb-1">USD Target</span>
          <span className="text-[22px] font-bold text-fg-primary">${stakeUsd}</span>
        </div>
        <div className="bg-surface-primary rounded-xl p-4">
          <span className="text-[11px] text-fg-muted block mb-1">SANC Equivalent</span>
          <span className="text-[22px] font-bold text-fg-primary">{stakeDisplay}</span>
          <span className="text-[10px] text-fg-muted"> SANC</span>
        </div>
      </div>

      {/* Bot last-sync info */}
      <div className="flex items-center justify-between text-[12px] text-fg-muted bg-surface-primary rounded-lg px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5" />
          <span>Last synced: {formatDate(bot.lastSyncedAt)}</span>
        </div>
        <span className={`font-medium ${bot.lastDrift > 5 ? "text-warning" : "text-[#16A34A]"}`}>
          {bot.lastDrift}% drift
        </span>
      </div>

      {/* Campaign duration tiers */}
      <div>
        <p className="text-[12px] font-semibold text-fg-secondary mb-2.5 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          Campaign Duration Tiers
        </p>
        <div className="rounded-xl overflow-hidden border border-line-subtle">
          <div className="grid grid-cols-3 bg-surface-primary px-3 py-2 text-[10px] font-semibold text-fg-muted uppercase tracking-wide">
            <span>Min Stake</span>
            <span className="text-center">SANC Equiv.</span>
            <span className="text-right">Max Duration</span>
          </div>
          {TIER_ROWS.map((tier) => (
            <div
              key={tier.label}
              className="grid grid-cols-3 items-center px-3 py-2.5 border-t border-line-subtle text-[12px]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-accent-primary bg-accent-light px-1.5 py-0.5 rounded-md">
                  {tier.label}
                </span>
                <span className="font-semibold text-fg-primary">${tier.usd.toLocaleString()}</span>
              </div>
              <span className="text-center text-fg-secondary font-mono text-[11px]">
                {tierSanc(tier.usd)}
              </span>
              <span className="text-right text-fg-secondary font-medium">{tier.duration}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-fg-muted mt-1.5">
          SANC equivalents updated by price bot · USD thresholds adjustable on-chain
        </p>
      </div>

      {/* Manual override */}
      <div className="border-t border-line-subtle pt-4">
        <p className="text-[12px] font-semibold text-fg-secondary mb-3">Manual Override</p>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div>
            <label className="text-[11px] text-fg-muted block mb-1.5">USD Target</label>
            <div className="flex items-center bg-surface-primary border border-line-subtle rounded-lg px-3 py-2.5 gap-1.5">
              <span className="text-[13px] text-fg-muted">$</span>
              <input
                type="number"
                value={overrideUsd}
                onChange={(e) => setOverrideUsd(e.target.value)}
                placeholder={String(stakeUsd)}
                className="flex-1 bg-transparent text-[13px] text-fg-primary outline-none min-w-0"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-fg-muted block mb-1.5">SANC Amount</label>
            <div className="flex items-center bg-surface-primary border border-line-subtle rounded-lg px-3 py-2.5 gap-1.5">
              <input
                type="number"
                value={overrideAmount}
                onChange={(e) => setOverrideAmount(e.target.value)}
                placeholder={String(stakeTokens)}
                className="flex-1 bg-transparent text-[13px] text-fg-primary outline-none min-w-0"
              />
              <span className="text-[11px] text-fg-muted">SANC</span>
            </div>
          </div>
        </div>
        <ComingSoonOverlay action="Registration stake update">
          <button className="w-full flex items-center justify-center gap-2 bg-accent-primary text-white rounded-full py-2.5 text-[13px] font-semibold hover:bg-accent-primary/90 transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Update Stake Parameters
          </button>
        </ComingSoonOverlay>
        <p className="text-[11px] text-fg-muted text-center mt-2">
          Updates registration stake + all tier SANC thresholds in one tx · Requires STAKE_UPDATER_ROLE
        </p>
      </div>
    </div>
  );
}
