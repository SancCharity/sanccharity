"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

interface DonationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName?: string;
  amount?: string;
  token?: string;
}

export function DonationConfirmModal({
  isOpen,
  onClose,
  campaignName = "Clean Water for Rural Communities",
  amount = "0.5",
  token = "BNB",
}: DonationConfirmModalProps) {
  const platformFee = 0.01;
  const estimatedGas = 0.001;
  const total = (parseFloat(amount) + platformFee + estimatedGas).toFixed(3);

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
      <div className="modal-panel relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full max-w-[480px] mx-3 sm:mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 pt-6 sm:pt-8 pb-4">
          <h2 className="text-lg sm:text-[22px] font-bold text-[#0F172A]">Confirm Donation</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors flex-shrink-0"
          >
            <X className="h-[18px] w-[18px] text-[#475569]" />
          </button>
        </div>

        {/* Summary card */}
        <div className="px-5 sm:px-8">
          <div className="rounded-xl bg-[#F0F9FF] p-5 flex flex-col gap-3.5">
            <span className="text-[15px] font-semibold text-[#0F172A]">{campaignName}</span>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">Amount</span>
              <span className="text-sm font-semibold text-[#0F172A]">
                {amount} {token}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">Platform fee</span>
              <span className="text-sm text-[#94A3B8]">
                {platformFee} {token} (2%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">NFT receipt</span>
              <span className="text-sm font-semibold text-[#0EA5E9]">Yes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">Estimated gas</span>
              <span className="text-sm text-[#94A3B8]">
                ~{estimatedGas} {token}
              </span>
            </div>

            <div className="h-px bg-[#E2E8F0]" />

            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#0F172A]">Total</span>
              <span className="text-[15px] font-bold text-[#0F172A]">
                {total} {token}
              </span>
            </div>
          </div>
        </div>

        {/* Button row */}
        <div className="px-5 sm:px-8 pt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E2E8F0] py-3.5 text-center text-[15px] font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <ComingSoonOverlay action="Confirm & Donate">
            <button className="flex-1 rounded-xl bg-[#0EA5E9] py-3.5 text-center text-[15px] font-semibold text-white hover:bg-[#0284C7] transition-colors">
              Confirm & Donate
            </button>
          </ComingSoonOverlay>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 pb-6 pt-4">
          <p className="text-xs text-[#94A3B8] text-center">
            This transaction is irreversible. Funds will be held in escrow until milestones are verified.
          </p>
        </div>
      </div>
    </div>
  );
}
