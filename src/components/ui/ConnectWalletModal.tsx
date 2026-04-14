"use client";

import { useEffect, useCallback } from "react";
import { X, Hexagon, Shield, Link, CircleDot, ChevronRight } from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const wallets = [
  {
    name: "MetaMask",
    subtitle: "Most popular",
    icon: Hexagon,
    iconColor: "#F6851B",
  },
  {
    name: "Trust Wallet",
    subtitle: "Mobile friendly",
    icon: Shield,
    iconColor: "#3375BB",
  },
  {
    name: "WalletConnect",
    subtitle: "Scan with QR code",
    icon: Link,
    iconColor: "#3B99FC",
  },
  {
    name: "Coinbase Wallet",
    subtitle: "Browser extension",
    icon: CircleDot,
    iconColor: "#0052FF",
  },
];

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="modal-panel relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full max-w-[480px] mx-4">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-2">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[22px] font-bold text-[#0F172A]">Connect Wallet</h2>
            <p className="text-sm text-[#94A3B8]">Choose your preferred wallet to connect</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors flex-shrink-0"
          >
            <X className="h-[18px] w-[18px] text-[#475569]" />
          </button>
        </div>

        {/* Wallet rows */}
        <div className="px-8 py-4 flex flex-col gap-[10px]">
          {wallets.map((wallet) => {
            const Icon = wallet.icon;
            return (
              <ComingSoonOverlay key={wallet.name} action={`Connect ${wallet.name}`}>
                <div className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3.5 flex items-center gap-3.5 hover:border-[#94A3B8] transition-colors cursor-pointer">
                  <Icon className="w-7 h-7 flex-shrink-0" style={{ color: wallet.iconColor }} />
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-[15px] font-semibold text-[#0F172A]">{wallet.name}</span>
                    <span className="text-xs text-[#94A3B8]">{wallet.subtitle}</span>
                  </div>
                  <ChevronRight className="w-[18px] h-[18px] text-[#94A3B8] flex-shrink-0" />
                </div>
              </ComingSoonOverlay>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 pt-2">
          <p className="text-xs text-[#94A3B8] text-center">
            By connecting, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
