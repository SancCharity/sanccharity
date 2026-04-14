"use client";

import { useEffect, useCallback } from "react";
import { X, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

interface TransactionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash?: string;
  block?: string;
  nftId?: string;
}

export function TransactionSuccessModal({
  isOpen,
  onClose,
  txHash = "0x7a3f...e42b",
  block = "#38,291,045",
  nftId = "SANC-2847",
}: TransactionSuccessModalProps) {
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
      <div className="modal-panel relative w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col items-center gap-5 pt-6 sm:pt-8 pb-6 px-5 sm:px-8 mx-3 sm:mx-4">
        {/* Close */}
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors"
          >
            <X className="h-[18px] w-[18px] text-[#475569]" />
          </button>
        </div>

        {/* Check Circle */}
        <div className="h-[72px] w-[72px] rounded-full bg-[#E0F2FE] flex items-center justify-center">
          <Check className="h-9 w-9 text-[#0EA5E9]" />
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-[22px] font-bold text-[#0F172A] text-center">Transaction Successful!</h2>

        {/* Subtitle */}
        <p className="text-sm text-[#94A3B8] text-center">Your donation has been recorded on-chain</p>

        {/* Tx Details Card */}
        <div className="w-full rounded-xl bg-[#F0F9FF] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#94A3B8]">Tx Hash</span>
            <span className="text-[13px] font-semibold text-[#0F172A]">{txHash}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#94A3B8]">Block</span>
            <span className="text-[13px] font-semibold text-[#0F172A]">{block}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#94A3B8]">NFT Receipt</span>
            <span className="text-[13px] font-semibold text-[#0EA5E9]">{nftId}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] py-3.5 hover:bg-[#F8FAFC] transition-colors">
            <ExternalLink className="h-4 w-4 text-[#475569]" />
            <span className="text-sm font-semibold text-[#475569]">View on BscScan</span>
          </button>
          <Link
            href="/charity/dashboard"
            className="flex-1 flex items-center justify-center rounded-xl bg-[#0EA5E9] py-3.5 hover:bg-[#0284C7] transition-colors"
          >
            <span className="text-sm font-semibold text-white">Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
